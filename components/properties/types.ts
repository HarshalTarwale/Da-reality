export type { Project, UnitBreakdown, UnitStats } from "@/lib/types";

export const sortOptions = [
  "Featured",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
] as const;

export type SortOption = (typeof sortOptions)[number];

/**
 * NOTE: the bedroom filter (Studio/1/2/3+) was removed with the move to
 * project-level listings — a development spans many unit types rather than
 * having one bedroom count. Unit types are surfaced on the card instead.
 */
export type Filters = {
  search: string;
  developer: string;
  area: string;
  minPrice: string;
  maxPrice: string;
  sort: SortOption;
};

export const defaultFilters: Filters = {
  search: "",
  developer: "All",
  area: "All",
  minPrice: "",
  maxPrice: "",
  // Matches the server's default order: flagship projects from our featured
  // developers first, then everything else.
  sort: "Featured",
};
