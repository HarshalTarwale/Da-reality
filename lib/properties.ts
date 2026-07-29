import { and, asc, desc, eq, gte, lte, ne, or, sql, count } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import type { Project } from "@/lib/types";

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

export type ProjectFilters = {
  developer?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc";
};

export async function getProjects(filters: ProjectFilters = {}) {
  const where = [];

  if (filters.developer && filters.developer !== "All") {
    where.push(eq(properties.developer, filters.developer));
  }
  if (filters.area && filters.area !== "All") {
    where.push(eq(properties.area, filters.area));
  }
  // Zero means "price not published" upstream, so exclude those from price filtering.
  if (filters.minPrice !== undefined) {
    where.push(and(gte(properties.priceFrom, filters.minPrice), ne(properties.priceFrom, 0)));
  }
  if (filters.maxPrice !== undefined) {
    where.push(and(lte(properties.priceFrom, filters.maxPrice), ne(properties.priceFrom, 0)));
  }

  // Placeholder-only properties (gallery <= 1 image) always sort last.
  const noImageLast = sql`case when cardinality(${properties.gallery}) <= 1 then 1 else 0 end`;

  // Unpriced projects (price_from = 0 upstream) always sort last, in both
  // directions — Postgres would otherwise place NULLs first on DESC.
  const orderBy =
    filters.sort === "price-asc"
      ? [noImageLast, sql`nullif(${properties.priceFrom}, 0) asc nulls last`]
      : filters.sort === "price-desc"
        ? [noImageLast, sql`nullif(${properties.priceFrom}, 0) desc nulls last`]
        : [noImageLast, desc(properties.createdAt), asc(properties.title)];

  const rows = await db
    .select()
    .from(properties)
    .where(where.length ? and(...where) : undefined)
    .orderBy(...orderBy);

  return rows.map(toProject);
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
export async function getSimilarProjects(project: Project, limit = 3) {
  const matches = [eq(properties.developer, project.developer)];
  if (project.area) matches.push(eq(properties.area, project.area));

  const rows = await db
    .select()
    .from(properties)
    .where(and(ne(properties.id, project.id), or(...matches)))
    .orderBy(desc(properties.createdAt))
    .limit(limit);

  return rows.map(toProject);
}

/** Distinct developers and districts, for the filter bar. */
export async function getFilterOptions() {
  const [devs, areas] = await Promise.all([
    db
      .selectDistinct({ value: properties.developer })
      .from(properties)
      .orderBy(asc(properties.developer)),
    db
      .selectDistinct({ value: properties.area })
      .from(properties)
      .where(sql`${properties.area} is not null`)
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
          AND p2.display_image NOT LIKE '%placeholder%'
        LIMIT 1
      )`,
    })
    .from(properties)
    .groupBy(properties.developer)
    .orderBy(asc(properties.developer));

  return rows as { developer: string; count: number; image: string | null }[];
}

/** All projects for a specific developer. */
export async function getProjectsByDeveloper(developer: string) {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.developer, developer))
    // Placeholder-only cards (gallery <= 1) sort last.
    .orderBy(
      sql`case when cardinality(${properties.gallery}) <= 1 then 1 else 0 end`,
      desc(properties.createdAt),
      asc(properties.title),
    );

  return rows.map(toProject);
}
