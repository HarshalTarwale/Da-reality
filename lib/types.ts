/**
 * Project-level (off-plan) listing shape used across the site.
 * Mirrors the `properties` table in db/schema.ts.
 */
export type UnitStats = {
  count?: number;
  price_from?: number;
  price_to?: number;
  price_m2_from?: number;
  price_m2_to?: number;
  area_from?: number;
  area_to?: number;
};

/** Keyed by Alnair unit-type code ("110", "111", "164", ...). */
export type UnitBreakdown = Record<string, UnitStats>;

export type Project = {
  id: string;
  slug: string;
  title: string;
  developer: string;
  area: string | null;
  latitude: number | null;
  longitude: number | null;
  constructionPercent: number;
  constructionDate: Date | null;
  priceFrom: number | null;
  priceTo: number | null;
  unitsCount: number;
  unitBreakdown: UnitBreakdown | null;
  /** Source cover URL — also gallery[0]. */
  sourceImageUrl: string | null;
  /** Ordered image URLs: cover first, then photos[]. Empty when none exist. */
  gallery: string[];
  /** Hero image: the source cover, or the local placeholder when none exists. */
  displayImage: string;
  sourceId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Project shape sent to client components. Image URLs are public assets served
 * from the source, so nothing needs stripping — this alias keeps the
 * server/client boundary explicit at call sites.
 */
export type ClientProject = Project;

export function toClientProject(project: Project): ClientProject {
  return project;
}

export function formatAed(price: number) {
  return `AED ${price.toLocaleString("en-US")}`;
}

/** Compact AED for card display: 1250000 -> "AED 1.25M". */
export function formatAedCompact(price: number) {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `AED ${m % 1 === 0 ? m : m.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}M`;
  }
  if (price >= 1_000) return `AED ${Math.round(price / 1_000)}K`;
  return `AED ${price.toLocaleString("en-US")}`;
}

/**
 * A price range for a project. Source data uses 0 to mean "not published",
 * so those render as "Price on request" rather than "AED 0".
 */
export function formatPriceRange(from: number | null, to: number | null) {
  const lo = from && from > 0 ? from : null;
  const hi = to && to > 0 ? to : null;
  if (!lo && !hi) return "Price on request";
  if (lo && hi && lo !== hi) return `${formatAedCompact(lo)} - ${formatAedCompact(hi)}`;
  return formatAedCompact((lo ?? hi) as number);
}

/** "Off-Plan" until construction starts, then a percentage, then "Completed". */
export function constructionLabel(percent: number) {
  if (percent <= 0) return "Off-Plan";
  if (percent >= 100) return "Completed";
  return `${percent % 1 === 0 ? percent : percent.toFixed(1)}% Built`;
}

/**
 * TODO: Alnair unit-type codes ("110", "111", "113", "164", ...) map to unit
 * configurations (studio / 1BR / 2BR / ...), but we do not have the official
 * decode reference yet. Until it is confirmed, surface the raw code — do NOT
 * infer bedroom counts, since a wrong count on a live listing is misleading.
 */
export function unitTypeLabel(code: string) {
  return `Unit Type ${code}`;
}
