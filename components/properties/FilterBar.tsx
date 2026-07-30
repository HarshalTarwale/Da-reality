"use client";

import { useState } from "react";
import {
  defaultFilters,
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const selectClasses =
  "w-full rounded-lg border border-stone bg-white px-4 py-3 text-sm text-onyx outline-none transition-colors focus:border-gold";
const labelClasses = "mb-1.5 block text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground";

function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: Partial<Filters>) => void;
}) {
  return (
    <div>
      <label className={labelClasses}>Search</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search by property name..."
          className={`${selectClasses} pl-11`}
          value={value}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>
    </div>
  );
}

function FilterFields({
  filters,
  onChange,
  developers,
  areas,
  showDeveloperFilter,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  developers: string[];
  areas: string[];
  showDeveloperFilter: boolean;
}) {
  return (
    <>
      {showDeveloperFilter && (
        <div>
          <label className={labelClasses}>Developer</label>
          <select
            className={selectClasses}
            value={filters.developer}
            onChange={(e) => onChange({ developer: e.target.value })}
          >
            <option value="All">All Developers</option>
            {developers.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className={labelClasses}>District</label>
        <select
          className={selectClasses}
          value={filters.area}
          onChange={(e) => onChange({ area: e.target.value })}
        >
          <option value="All">All Districts</option>
          {areas.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="lg:col-span-2">
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
  developers,
  areas,
  showDeveloperFilter = true,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  resultCount: number;
  developers: string[];
  areas: string[];
  /** Hide the Developer dropdown when the page is already scoped to one developer. */
  showDeveloperFilter?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="border-b border-stone bg-white lg:sticky lg:top-20 lg:z-40">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-12">
        {/* Desktop filter row */}
        <div className="hidden lg:block">
          <div className="lg:max-w-md">
            <SearchField value={filters.search} onChange={onChange} />
          </div>
          <div
            className={`mt-4 grid gap-4 ${
              showDeveloperFilter ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
          >
            <FilterFields
              filters={filters}
              onChange={onChange}
              developers={developers}
              areas={areas}
              showDeveloperFilter={showDeveloperFilter}
            />
          </div>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex-1">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by property name..."
                className={`${selectClasses} pl-11`}
                value={filters.search}
                onChange={(e) => onChange({ search: e.target.value })}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open filters"
            className="flex h-11.5 shrink-0 items-center gap-2 rounded-lg border border-onyx px-5 text-xs font-medium uppercase tracking-widest-luxe text-onyx"
          >
            <FilterIcon /> Filters
          </button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground lg:hidden">
          {resultCount} {resultCount === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-onyx/50" onClick={() => setMobileOpen(false)} />
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
              <FilterFields
                filters={filters}
                onChange={onChange}
                developers={developers}
                areas={areas}
                showDeveloperFilter={showDeveloperFilter}
              />
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
                Show {resultCount} {resultCount === 1 ? "Project" : "Projects"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
