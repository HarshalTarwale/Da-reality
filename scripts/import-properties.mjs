/**
 * Import Alnair project exports into the Neon `properties` table.
 *
 * Usage: npm run db:import
 *
 * Reads every file in IMPORT_DIR, parses `data.items[]`, maps each item to the
 * project-level schema, and upserts on `source_id`.
 *
 * IMAGES: the source image URLs (cover + photos[]) are stored and served
 * directly from files.alnair.ae, so visitors see the exact same images Alnair
 * serves. No image bytes are downloaded, copied, or re-encoded by this script.
 * Projects with no imagery in the source fall back to DISPLAY_IMAGE_PLACEHOLDER.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

const IMPORT_DIR = "Properties data";
const DISPLAY_IMAGE_PLACEHOLDER = "/placeholders/project-generic.svg";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

/** Alnair dates arrive as "2030-10-31 00:00:00"; return an ISO string or null. */
function parseDate(value) {
  if (!value) return null;
  const d = new Date(String(value).replace(" ", "T") + "Z");
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Ordered gallery for a project: cover image first, then every photos[] entry.
 * Duplicates are removed while preserving order. URLs are recorded exactly as
 * they appear in the source — no image bytes are downloaded or re-encoded.
 */
function buildGallery(item) {
  const urls = [];
  if (item.cover?.src) urls.push(item.cover.src);
  for (const photo of item.photos ?? []) {
    if (photo?.src) urls.push(photo.src);
  }
  return [...new Set(urls)];
}

/** Map one Alnair item to a `properties` row. */
function mapItem(item) {
  const stats = item.statistics ?? {};
  const total = stats.total ?? {};
  const gallery = buildGallery(item);

  return {
    id: String(item.id),
    slug: item.slug ?? String(item.id),
    title: item.title ?? "Untitled project",
    developer: item.builder ?? "Unknown",
    area: item.district?.title ?? null,
    latitude: toNumber(item.latitude),
    longitude: toNumber(item.longitude),
    constructionPercent: toNumber(item.construction_percent) ?? 0,
    constructionDate: parseDate(item.construction_inspection_date),
    priceFrom: toNumber(total.price_from),
    priceTo: toNumber(total.price_to),
    unitsCount: toNumber(total.units_count) ?? 0,
    // Stored verbatim — unit-type codes are not decoded. See db/schema.ts TODO.
    unitBreakdown: stats.units && Object.keys(stats.units).length ? stats.units : null,
    sourceImageUrl: gallery[0] ?? null,
    gallery,
    // Projects with no imagery in the source fall back to the local placeholder.
    displayImage: gallery[0] ?? DISPLAY_IMAGE_PLACEHOLDER,
    sourceId: String(item.id),
  };
}

/** True when the incoming row differs from what is already stored. */
function hasChanged(existing, row) {
  // Text columns compare as strings.
  const textFields = [
    ["slug", row.slug],
    ["title", row.title],
    ["developer", row.developer],
    ["area", row.area],
    ["source_image_url", row.sourceImageUrl],
    ["display_image", row.displayImage],
  ];

  for (const [col, next] of textFields) {
    const prev = existing[col] ?? null;
    if (prev !== (next ?? null)) return true;
  }

  // Postgres returns numeric/bigint as strings ("0.00", "1250000"), so these
  // must be compared numerically rather than as text.
  const numericFields = [
    ["construction_percent", row.constructionPercent],
    ["price_from", row.priceFrom],
    ["price_to", row.priceTo],
    ["units_count", row.unitsCount],
    ["latitude", row.latitude],
    ["longitude", row.longitude],
  ];

  for (const [col, next] of numericFields) {
    if (toNumber(existing[col]) !== (next ?? null)) return true;
  }

  const prevDate = existing.construction_date
    ? new Date(existing.construction_date).toISOString()
    : null;
  if (prevDate !== row.constructionDate) return true;

  const prevGallery = existing.gallery ?? [];
  if (prevGallery.length !== row.gallery.length) return true;
  if (prevGallery.some((url, i) => url !== row.gallery[i])) return true;

  // Postgres jsonb does not preserve key order, so compare canonically.
  if (stableStringify(existing.unit_breakdown ?? null) !== stableStringify(row.unitBreakdown ?? null))
    return true;

  return false;
}

/** JSON.stringify with object keys sorted, so key order never affects equality. */
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
}

async function main() {
  console.log("=".repeat(64));
  console.log("Alnair project import");
  console.log("=".repeat(64));
  console.log(`Source folder : ${IMPORT_DIR}/`);
  console.log(`Placeholder   : ${DISPLAY_IMAGE_PLACEHOLDER}`);
  console.log("Images        : URLs recorded only — no files downloaded\n");

  let files;
  try {
    files = readdirSync(IMPORT_DIR)
      .filter((f) => statSync(join(IMPORT_DIR, f)).isFile())
      .sort();
  } catch {
    console.error(`Cannot read "${IMPORT_DIR}/". Does the folder exist?`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error(`No files found in "${IMPORT_DIR}/".`);
    process.exit(1);
  }

  console.log(`Found ${files.length} file(s)\n`);

  const existingRows = await sql`SELECT * FROM properties`;
  const existingBySourceId = new Map(existingRows.map((r) => [r.source_id, r]));
  console.log(`Existing rows in database: ${existingRows.length}\n`);

  const totals = { read: 0, created: 0, updated: 0, skipped: 0, failed: 0 };
  const perDeveloper = new Map();

  for (const file of files) {
    const label = file.padEnd(22);
    let items;

    try {
      const parsed = JSON.parse(readFileSync(join(IMPORT_DIR, file), "utf8"));
      items = parsed?.data?.items;
      if (!Array.isArray(items)) throw new Error("missing data.items[]");
    } catch (error) {
      console.log(`${label} SKIPPED — ${error.message}`);
      continue;
    }

    const fileStats = { read: items.length, created: 0, updated: 0, skipped: 0, failed: 0 };

    for (const item of items) {
      let row;
      try {
        row = mapItem(item);
      } catch (error) {
        fileStats.failed++;
        console.log(`  ! map failed for id=${item?.id}: ${error.message}`);
        continue;
      }

      perDeveloper.set(row.developer, (perDeveloper.get(row.developer) ?? 0) + 1);
      const existing = existingBySourceId.get(row.sourceId);

      if (existing && !hasChanged(existing, row)) {
        fileStats.skipped++;
        continue;
      }

      try {
        await sql`
          INSERT INTO properties (
            id, slug, title, developer, area, latitude, longitude,
            construction_percent, construction_date, price_from, price_to,
            units_count, unit_breakdown, source_image_url, gallery, display_image, source_id
          ) VALUES (
            ${row.id}, ${row.slug}, ${row.title}, ${row.developer}, ${row.area},
            ${row.latitude}, ${row.longitude}, ${row.constructionPercent},
            ${row.constructionDate}, ${row.priceFrom}, ${row.priceTo},
            ${row.unitsCount}, ${row.unitBreakdown}, ${row.sourceImageUrl},
            ${row.gallery}, ${row.displayImage}, ${row.sourceId}
          )
          ON CONFLICT (source_id) DO UPDATE SET
            slug = EXCLUDED.slug,
            title = EXCLUDED.title,
            developer = EXCLUDED.developer,
            area = EXCLUDED.area,
            latitude = EXCLUDED.latitude,
            longitude = EXCLUDED.longitude,
            construction_percent = EXCLUDED.construction_percent,
            construction_date = EXCLUDED.construction_date,
            price_from = EXCLUDED.price_from,
            price_to = EXCLUDED.price_to,
            units_count = EXCLUDED.units_count,
            unit_breakdown = EXCLUDED.unit_breakdown,
            source_image_url = EXCLUDED.source_image_url,
            gallery = EXCLUDED.gallery,
            display_image = EXCLUDED.display_image,
            updated_at = now()
        `;
        if (existing) fileStats.updated++;
        else fileStats.created++;
      } catch (error) {
        fileStats.failed++;
        console.log(`  ! upsert failed for id=${row.id} (${row.title}): ${error.message}`);
      }
    }

    console.log(
      `${label} read ${String(fileStats.read).padStart(3)} | ` +
        `created ${String(fileStats.created).padStart(3)} | ` +
        `updated ${String(fileStats.updated).padStart(3)} | ` +
        `skipped ${String(fileStats.skipped).padStart(3)}` +
        (fileStats.failed ? ` | FAILED ${fileStats.failed}` : "")
    );

    totals.read += fileStats.read;
    totals.created += fileStats.created;
    totals.updated += fileStats.updated;
    totals.skipped += fileStats.skipped;
    totals.failed += fileStats.failed;
  }

  console.log("\n" + "-".repeat(64));
  console.log(
    `TOTAL  read ${totals.read} | created ${totals.created} | ` +
      `updated ${totals.updated} | skipped ${totals.skipped}` +
      (totals.failed ? ` | failed ${totals.failed}` : "")
  );

  console.log("\nProjects per developer:");
  [...perDeveloper.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([dev, n]) => console.log(`  ${String(n).padStart(4)}  ${dev}`));

  const [stats] = await sql`
    SELECT count(*)::int n,
           coalesce(sum(array_length(gallery, 1)), 0)::int images,
           count(*) filter (where coalesce(array_length(gallery, 1), 0) = 0)::int no_images
    FROM properties`;
  console.log(`\nRows in database now: ${stats.n}`);
  console.log(
    `Image URLs stored:    ${stats.images} ` +
      `(${stats.no_images} project(s) fall back to the placeholder)`
  );
  console.log("=".repeat(64));

  if (totals.failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error("\nImport failed:", error);
  process.exit(1);
});
