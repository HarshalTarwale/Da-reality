"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/properties/FilterBar";
import PropertyCard from "@/components/properties/PropertyCard";
import { defaultFilters, type Filters } from "@/components/properties/types";
import type { ProjectCardData } from "@/lib/types";

const PAGE_SIZE = 12;

function SearchOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M21 21l-4.35-4.35M8 10.5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Zero upstream means "price not published", so treat it as unknown. */
function effectivePrice(project: ProjectCardData) {
  return project.priceFrom && project.priceFrom > 0 ? project.priceFrom : null;
}

function applyFilters(projects: ProjectCardData[], filters: Filters) {
  const min = filters.minPrice ? Number(filters.minPrice) : undefined;
  const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;
  const query = filters.search.trim().toLowerCase();

  const filtered = projects.filter((p) => {
    if (query && !p.title.toLowerCase().includes(query)) return false;
    if (filters.developer !== "All" && p.developer !== filters.developer) return false;
    if (filters.area !== "All" && p.area !== filters.area) return false;

    const price = effectivePrice(p);
    if (min !== undefined && (price === null || price < min)) return false;
    if (max !== undefined && (price === null || price > max)) return false;
    return true;
  });

  if (filters.sort === "Price: Low to High") {
    filtered.sort((a, b) => (effectivePrice(a) ?? Infinity) - (effectivePrice(b) ?? Infinity));
  } else if (filters.sort === "Price: High to Low") {
    filtered.sort((a, b) => (effectivePrice(b) ?? -Infinity) - (effectivePrice(a) ?? -Infinity));
  }
  // "Newest" keeps the server's createdAt DESC ordering.

  return filtered;
}

export default function PropertyGrid({
  projects,
  developers,
  areas,
  initialFilters,
  showDeveloperFilter = true,
}: {
  projects: ProjectCardData[];
  developers: string[];
  areas: string[];
  /** e.g. { developer: "Emaar Properties" } to pre-scope a developer's own page. */
  initialFilters?: Partial<Filters>;
  showDeveloperFilter?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, ...initialFilters });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(() => applyFilters(projects, filters), [projects, filters]);

  function handleFilterChange(next: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...next }));
    setVisibleCount(PAGE_SIZE);
  }

  function handleReset() {
    setFilters({ ...defaultFilters, ...initialFilters });
    setVisibleCount(PAGE_SIZE);
  }

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <div>
      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        resultCount={results.length}
        developers={developers}
        areas={areas}
        showDeveloperFilter={showDeveloperFilter}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-muted py-24 text-center">
            <span className="text-muted-foreground">
              <SearchOffIcon />
            </span>
            <h3 className="mt-5 font-heading text-xl font-medium text-onyx">
              No projects match your filters
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Try adjusting your search criteria or reset your filters to see all available
              projects.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-8 rounded-lg bg-gold px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-muted-foreground">
              Showing {visible.length} of {results.length} projects
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <PropertyCard key={project.id} project={project} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-lg border border-onyx px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
