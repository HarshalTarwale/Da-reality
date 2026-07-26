"use client";

import { useState } from "react";
import {
  bedroomOptions,
  communityOptions,
  defaultFilters,
  propertyTypeOptions,
  sortOptions,
  type Filters,
  type SortOption,
} from "@/components/properties/types";

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const selectClasses =
  "w-full rounded-lg border border-stone bg-white px-4 py-3 text-sm text-onyx outline-none transition-colors focus:border-gold";
const labelClasses = "mb-1.5 block text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground";

function FilterFields({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
}) {
  return (
    <>
      <div>
        <label className={labelClasses}>Property Type</label>
        <select
          className={selectClasses}
          value={filters.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value })}
        >
          {propertyTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>Bedrooms</label>
        <select
          className={selectClasses}
          value={filters.bedrooms}
          onChange={(e) => onChange({ bedrooms: e.target.value })}
        >
          {bedroomOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>Community</label>
        <select
          className={selectClasses}
          value={filters.community}
          onChange={(e) => onChange({ community: e.target.value })}
        >
          {communityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>Price Range (AED)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Min"
            className={selectClasses}
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Max"
            className={selectClasses}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Sort By</label>
        <select
          className={selectClasses}
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as SortOption })}
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default function FilterBar({
  filters,
  onChange,
  resultCount,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  resultCount: number;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="border-b border-stone bg-white lg:sticky lg:top-20 lg:z-40">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-12">
        {/* Desktop filter row */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
          <FilterFields filters={filters} onChange={onChange} />
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center justify-between lg:hidden">
          <p className="text-sm text-muted-foreground">
            {resultCount} {resultCount === 1 ? "property" : "properties"}
          </p>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-onyx px-5 py-2.5 text-xs font-medium uppercase tracking-widest-luxe text-onyx"
          >
            <FilterIcon /> Filters
          </button>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-onyx/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-medium text-onyx">Filters</h3>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileOpen(false)}
                className="text-onyx"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mt-6 space-y-5">
              <FilterFields filters={filters} onChange={onChange} />
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => onChange(defaultFilters)}
                className="flex-1 rounded-lg border border-onyx px-6 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg bg-gold px-6 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
              >
                Show {resultCount} {resultCount === 1 ? "Property" : "Properties"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
