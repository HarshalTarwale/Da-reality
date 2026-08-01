import {
  and,
  asc,
  desc,
  eq,
  gte,
  lte,
  ne,
  or,
  sql,
  count,
  type SQL,
} from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import type { Project, ProjectCardData } from "@/lib/types";

/** Drizzle row -> Project (numeric/bigint columns arrive as strings). */
function toProject(row: typeof properties.$inferSelect): Project {
  const gallery = row.gallery ?? [];
  // Properties with exactly 1 gallery image are Alnair "coming soon" placeholders —
  // the CDN hosts a placeholder photo rather than a real project render.
  // Replace with our branded SVG so the UI stays consistent.
  const hasRealImage = gallery.length > 1;
  const displayImage = hasRealImage
    ? row.displayImage
    : "/placeholders/property-no-image.svg";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    developer: row.developer,
    area: row.area,
    latitude: row.latitude,
    longitude: row.longitude,
    constructionPercent: Number(row.constructionPercent ?? 0),
    constructionDate: row.constructionDate,
    priceFrom: row.priceFrom === null ? null : Number(row.priceFrom),
    priceTo: row.priceTo === null ? null : Number(row.priceTo),
    unitsCount: row.unitsCount,
    unitBreakdown: (row.unitBreakdown as Project["unitBreakdown"]) ?? null,
    sourceImageUrl: row.sourceImageUrl,
    gallery,
    displayImage,
    sourceId: row.sourceId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Column set for listing pages: every field PropertyCard renders, minus
 * `gallery` (full URL array) and `unit_breakdown` (per-unit-type price/area
 * stats) — those only matter on the detail page and are 60%+ of the row's
 * weight. `galleryCount`/`unitTypeCodes` are computed in SQL so we still know
 * "has real photos" and "which unit types exist" without shipping the arrays.
 */
const cardColumns = {
  id: properties.id,
  slug: properties.slug,
  title: properties.title,
  developer: properties.developer,
  area: properties.area,
  latitude: properties.latitude,
  longitude: properties.longitude,
  constructionPercent: properties.constructionPercent,
  constructionDate: properties.constructionDate,
  priceFrom: properties.priceFrom,
  priceTo: properties.priceTo,
  unitsCount: properties.unitsCount,
  displayImage: properties.displayImage,
  sourceId: properties.sourceId,
  createdAt: properties.createdAt,
  updatedAt: properties.updatedAt,
  galleryCount: sql<number>`cardinality(${properties.gallery})`,
  unitTypeCodes: sql<string[]>`coalesce(
    (select array_agg(k) from jsonb_object_keys(${properties.unitBreakdown}) k),
    '{}'
  )`,
};

type CardRow = {
  id: string;
  slug: string;
  title: string;
  developer: string;
  area: string | null;
  latitude: number | null;
  longitude: number | null;
  constructionPercent: string | number;
  constructionDate: Date | null;
  priceFrom: string | number | null;
  priceTo: string | number | null;
  unitsCount: number;
  displayImage: string;
  sourceId: string | null;
  createdAt: Date;
  updatedAt: Date;
  galleryCount: number;
  unitTypeCodes: string[];
};

function toProjectCard(row: CardRow): ProjectCardData {
  const galleryCount = Number(row.galleryCount ?? 0);
  const displayImage = galleryCount > 1 ? row.displayImage : "/placeholders/property-no-image.svg";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    developer: row.developer,
    area: row.area,
    latitude: row.latitude,
    longitude: row.longitude,
    constructionPercent: Number(row.constructionPercent ?? 0),
    constructionDate: row.constructionDate,
    priceFrom: row.priceFrom === null ? null : Number(row.priceFrom),
    priceTo: row.priceTo === null ? null : Number(row.priceTo),
    unitsCount: row.unitsCount,
    unitTypeCodes: row.unitTypeCodes ?? [],
    displayImage,
    sourceId: row.sourceId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * The developers we lead with across the site. Their projects are surfaced
 * first in the default listing order and fill the Home page's featured grid.
 * Everything else still appears — this only affects ordering, never inclusion.
 */
export const FEATURED_DEVELOPERS = [
  "Emaar Properties",
  "Damac",
  "Sobha",
  "Binghatti",
  "Ellington",
  "Azizi",
] as const;

/**
 * "High demand" proxy. The source data carries no sales or enquiry figures, so
 * we rank on what it does have: large, fully-published, well-photographed
 * developments — the flagship launches that get the most marketing and
 * buyer attention (Sobha One, Binghatti Skyrise, Damac Riverside, and so on).
 */
const demandRank = [
  // A published price and real photography are table stakes for a good card.
  sql`case when ${properties.priceFrom} > 0 then 0 else 1 end`,
  sql`case when cardinality(${properties.gallery}) > 1 then 0 else 1 end`,
  desc(properties.unitsCount),
];

export type ProjectFilters = {
  developer?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc";
};

export async function getProjects(filters: ProjectFilters = {}) {
  const where: SQL<unknown>[] = [eq(properties.isHidden, false)];

  if (filters.developer && filters.developer !== "All") {
    where.push(eq(properties.developer, filters.developer));
  }
  if (filters.area && filters.area !== "All") {
    where.push(eq(properties.area, filters.area));
  }
  // Zero means "price not published" upstream, so exclude those from price filtering.
  if (filters.minPrice !== undefined) {
    where.push(gte(properties.priceFrom, filters.minPrice), ne(properties.priceFrom, 0));
  }
  if (filters.maxPrice !== undefined) {
    where.push(lte(properties.priceFrom, filters.maxPrice), ne(properties.priceFrom, 0));
  }

  // Placeholder-only properties (gallery <= 1 image) always sort last.
  const noImageLast = sql`case when cardinality(${properties.gallery}) <= 1 then 1 else 0 end`;

  // `created_at`/`updated_at` reflect when *we* imported a row, which is batched
  // per source file — ordering by it clusters results by whichever developer's
  // file ran last, not real recency. Alnair's own id increments as projects are
  // added to their system, so it is a much better "newest" proxy.
  const newestFirst = sql`(${properties.id})::bigint desc`;

  // Default view leads with the flagship projects from our featured developers,
  // then falls back to newest. Explicit user sorts (price/newest) are honoured
  // as-is so choosing a sort always does exactly what it says.
  const featuredDevelopersList = sql.join(
    FEATURED_DEVELOPERS.map((d) => sql`${d}`),
    sql`, `
  );
  const featuredDevelopersFirst = sql`case when ${properties.developer} in (${featuredDevelopersList}) then 0 else 1 end`;

  /**
   * Position of a project within its own developer's flagship list. Ordering by
   * this first round-robins the developers — every featured developer's best
   * project appears before anyone's second-best — so a high-volume developer
   * like Binghatti can't crowd Emaar or Ellington off the first page.
   */
  const rankWithinDeveloper = sql`row_number() over (
    partition by ${properties.developer}
    order by
      case when ${properties.priceFrom} > 0 then 0 else 1 end,
      case when cardinality(${properties.gallery}) > 1 then 0 else 1 end,
      ${properties.unitsCount} desc
  )`;

  // Unpriced projects (price_from = 0 upstream) always sort last, in both
  // directions — Postgres would otherwise place NULLs first on DESC.
  const orderBy =
    filters.sort === "price-asc"
      ? [noImageLast, sql`nullif(${properties.priceFrom}, 0) asc nulls last`]
      : filters.sort === "price-desc"
        ? [noImageLast, sql`nullif(${properties.priceFrom}, 0) desc nulls last`]
        : filters.sort === "newest"
          ? [noImageLast, newestFirst]
          : [
              noImageLast,
              featuredDevelopersFirst,
              rankWithinDeveloper,
              ...demandRank,
              newestFirst,
            ];

  const rows = await db
    .select(cardColumns)
    .from(properties)
    .where(where.length ? and(...where) : undefined)
    .orderBy(...orderBy);

  return rows.map(toProjectCard);
}

export async function getProjectById(id: string) {
  const [row] = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return row ? toProject(row) : undefined;
}

export async function getAllProjectIds() {
  const rows = await db.select({ id: properties.id }).from(properties);
  return rows.map((r) => r.id);
}

/** Same developer or same district, excluding the project itself. */
export async function getSimilarProjects(
  project: Pick<Project, "id" | "developer" | "area">,
  limit = 3
) {
  const matches = [eq(properties.developer, project.developer)];
  if (project.area) matches.push(eq(properties.area, project.area));

  const rows = await db
    .select(cardColumns)
    .from(properties)
    .where(and(eq(properties.isHidden, false), ne(properties.id, project.id), or(...matches)))
    .orderBy(desc(properties.createdAt))
    .limit(limit);

  return rows.map(toProjectCard);
}

/**
 * Flagship projects from FEATURED_DEVELOPERS, one developer at a time and then
 * interleaved, so the Home page grid alternates names instead of showing a
 * block from a single developer. Ranked by `demandRank`.
 */
export async function getFeaturedFromTopDevelopers(
  developerCount = FEATURED_DEVELOPERS.length,
  perDeveloper = 2
) {
  const chosen = FEATURED_DEVELOPERS.slice(0, developerCount);

  const picks = await Promise.all(
    chosen.map((developer) =>
      db
        .select(cardColumns)
        .from(properties)
        .where(and(eq(properties.isHidden, false), eq(properties.developer, developer)))
        .orderBy(...demandRank)
        .limit(perDeveloper)
    )
  );

  // Interleave (one per developer, round-robin) so the grid alternates
  // developers instead of running through one developer's picks in a block.
  const rows = [];
  for (let i = 0; i < perDeveloper; i++) {
    for (const batch of picks) {
      if (batch[i]) rows.push(batch[i]);
    }
  }

  return rows.map(toProjectCard);
}

/**
 * Off-plan projects with the least construction progress — the newest to
 * market. Capped per developer so one prolific developer's launches don't
 * crowd out everyone else's.
 */
export async function getOffPlanProjects(limit = 9, perDeveloperCap = 2) {
  const rows = await db
    .select(cardColumns)
    .from(properties)
    .where(and(eq(properties.isHidden, false), sql`cardinality(${properties.gallery}) > 1`))
    .orderBy(asc(properties.constructionPercent), desc(properties.unitsCount))
    .limit(limit * 4); // wide pool to cap from before trimming to `limit`

  const seen = new Map<string, number>();
  const capped = [];
  for (const row of rows) {
    const n = seen.get(row.developer) ?? 0;
    if (n >= perDeveloperCap) continue;
    seen.set(row.developer, n + 1);
    capped.push(row);
    if (capped.length >= limit) break;
  }

  return capped.map(toProjectCard);
}

/** Distinct developers and districts, for the filter bar. */
export async function getFilterOptions() {
  const [devs, areas] = await Promise.all([
    db
      .selectDistinct({ value: properties.developer })
      .from(properties)
      .where(eq(properties.isHidden, false))
      .orderBy(asc(properties.developer)),
    db
      .selectDistinct({ value: properties.area })
      .from(properties)
      .where(and(eq(properties.isHidden, false), sql`${properties.area} is not null`))
      .orderBy(asc(properties.area)),
  ]);

  return {
    developers: devs.map((d) => d.value).filter(Boolean) as string[],
    areas: areas.map((a) => a.value).filter(Boolean) as string[],
  };
}

/**
 * Minimum price (AED) a listing needs to appear in the exclusive inventory.
 *
 * PLACEHOLDER SELECTION RULE — the source data has no "exclusive" flag, so for
 * now the page shows the top of the portfolio by price. When Da Realty's real
 * exclusive listings are decided, replace this with an `is_exclusive` column on
 * the properties table (set via the import script or an admin action) and swap
 * the filter below for `eq(properties.isExclusive, true)`.
 */
export const EXCLUSIVE_MIN_PRICE = 10_000_000;

/** Listings shown on the Our Exclusive Inventory page. */
export async function getExclusiveProjects() {
  const rows = await db
    .select(cardColumns)
    .from(properties)
    .where(
      and(
        eq(properties.isHidden, false),
        gte(properties.priceFrom, EXCLUSIVE_MIN_PRICE)
      )
    )
    .orderBy(
      sql`case when cardinality(${properties.gallery}) <= 1 then 1 else 0 end`,
      desc(properties.priceFrom)
    );

  return rows.map(toProjectCard);
}

/** Developer/district options limited to what the exclusive listings contain. */
export async function getExclusiveFilterOptions() {
  const [devs, areas] = await Promise.all([
    db
      .selectDistinct({ value: properties.developer })
      .from(properties)
      .where(
        and(eq(properties.isHidden, false), gte(properties.priceFrom, EXCLUSIVE_MIN_PRICE))
      )
      .orderBy(asc(properties.developer)),
    db
      .selectDistinct({ value: properties.area })
      .from(properties)
      .where(
        and(
          eq(properties.isHidden, false),
          gte(properties.priceFrom, EXCLUSIVE_MIN_PRICE),
          sql`${properties.area} is not null`
        )
      )
      .orderBy(asc(properties.area)),
  ]);

  return {
    developers: devs.map((d) => d.value).filter(Boolean) as string[],
    areas: areas.map((a) => a.value).filter(Boolean) as string[],
  };
}

/** Developer name + how many projects they have + one representative cover image. */
export async function getDeveloperStats() {
  const rows = await db
    .select({
      developer: properties.developer,
      count: count(),
      // Pick the first real image for this developer (skip placeholder SVGs)
      image: sql<string>`(
        SELECT display_image FROM properties p2
        WHERE p2.developer = properties.developer
          AND p2.is_hidden = false
          AND p2.display_image NOT LIKE '%placeholder%'
        LIMIT 1
      )`,
    })
    .from(properties)
    .where(eq(properties.isHidden, false))
    .groupBy(properties.developer)
    .orderBy(asc(properties.developer));

  return rows as { developer: string; count: number; image: string | null }[];
}

/** All projects for a specific developer. */
export async function getProjectsByDeveloper(developer: string) {
  const rows = await db
    .select(cardColumns)
    .from(properties)
    .where(and(eq(properties.isHidden, false), eq(properties.developer, developer)))
    // Placeholder-only cards (gallery <= 1) sort last.
    .orderBy(
      sql`case when cardinality(${properties.gallery}) <= 1 then 1 else 0 end`,
      desc(properties.createdAt),
      asc(properties.title),
    );

  return rows.map(toProjectCard);
}
