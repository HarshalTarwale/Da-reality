import {
  bigint,
  boolean,
  doublePrecision,
  index,
  integer,
  numeric,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Project-level (off-plan) development listings imported from Alnair exports.
 *
 * These are whole developments, not single units: they carry a price RANGE and a
 * per-unit-type breakdown rather than one fixed bedroom/bathroom count.
 */
export const properties = pgTable(
  "properties",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    /** Alnair "builder" field. */
    developer: text("developer").notNull(),
    /** Alnair district.title. */
    area: text("area"),

    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),

    /**
     * 0 = not started / off-plan; 100 = complete.
     * Alnair reports fractional values (e.g. 2.36, 92.73), so this is numeric
     * rather than integer. mode:"number" so Drizzle returns a JS number.
     */
    constructionPercent: numeric("construction_percent", { precision: 5, scale: 2, mode: "number" })
      .notNull()
      .default(0),
    /** Expected completion (Alnair construction_inspection_date). */
    constructionDate: timestamp("construction_date", { withTimezone: true }),

    /** Whole AED. bigint mode:"number" so Drizzle returns a JS number. */
    priceFrom: bigint("price_from", { mode: "number" }),
    priceTo: bigint("price_to", { mode: "number" }),
    unitsCount: integer("units_count").notNull().default(0),

    /**
     * Raw statistics.units object, stored verbatim.
     * Keys are Alnair unit-type codes ("110", "111", "164", ...).
     * TODO: we do not yet have the code -> bedroom-count decode reference,
     * so these are surfaced as "Unit Type <code>" in the UI. Do not infer
     * bedroom counts from these codes until the mapping is confirmed.
     */
    unitBreakdown: jsonb("unit_breakdown"),

    /** Original Alnair cover URL — the project's primary/hero image. */
    sourceImageUrl: text("source_image_url"),
    /**
     * Full ordered gallery: cover first, then every entry in the source
     * photos[] array. Served directly from files.alnair.ae.
     */
    gallery: text("gallery").array().notNull().default([]),
    /** Fallback shown when a project has no imagery in the source data. */
    displayImage: text("display_image").notNull().default("/placeholders/project-generic.svg"),

    /** Alnair item id — unique key used for import dedup/upsert. */
    sourceId: text("source_id").unique(),

    /**
     * Temporary manual hide: excluded from every listing query when true.
     * Used for properties with no real photography yet (source has <= 1
     * gallery image, so the site would only ever show a placeholder card).
     * Flip back to false once real images are available for the listing.
     */
    isHidden: boolean("is_hidden").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("properties_developer_idx").on(table.developer),
    index("properties_area_idx").on(table.area),
    index("properties_price_from_idx").on(table.priceFrom),
    index("properties_created_at_idx").on(table.createdAt),
    index("properties_slug_idx").on(table.slug),
  ]
);

export type PropertyRow = typeof properties.$inferSelect;
export type NewPropertyRow = typeof properties.$inferInsert;
