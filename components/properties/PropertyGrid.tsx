"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/properties/FilterBar";
import PropertyCard from "@/components/properties/PropertyCard";
import { defaultFilters, type Filters, type MockProperty } from "@/components/properties/types";
import mockProperties from "@/components/properties/mock-properties.json";

const PAGE_SIZE = 6;

function SearchOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M21 21l-4.35-4.35M8 10.5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function matchesBedrooms(bedrooms: number, filter: string) {
  if (filter === "Any") return true;
  if (filter === "Studio") return bedrooms === 0;
  if (filter === "5+") return bedrooms >= 5;
  return bedrooms === Number(filter);
}

function applyFilters(properties: MockProperty[], filters: Filters) {
  const min = filters.minPrice ? Number(filters.minPrice) : undefined;
  const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;

  const filtered = properties.filter((p) => {
    if (filters.propertyType !== "All" && p.property_type !== filters.propertyType) return false;
    if (!matchesBedrooms(p.bedrooms, filters.bedrooms)) return false;
    if (filters.community !== "All" && p.area !== filters.community) return false;
    if (min !== undefined && p.price < min) return false;
    if (max !== undefined && p.price > max) return false;
    return true;
  });

  if (filters.sort === "Price: Low to High") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "Price: High to Low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

export default function PropertyGrid() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(
    () => applyFilters(mockProperties as MockProperty[], filters),
    [filters]
  );

  function handleFilterChange(next: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...next }));
    setVisibleCount(PAGE_SIZE);
  }

  function handleReset() {
    setFilters(defaultFilters);
    setVisibleCount(PAGE_SIZE);
  }

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <div>
      <FilterBar filters={filters} onChange={handleFilterChange} resultCount={results.length} />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-muted py-24 text-center">
            <span className="text-muted-foreground">
              <SearchOffIcon />
            </span>
            <h3 className="mt-5 font-heading text-xl font-medium text-onyx">
              No properties match your filters
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Try adjusting your search criteria or reset your filters to see all available
              properties.
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((property) => (
                <PropertyCard key={property.id} property={property} />
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
