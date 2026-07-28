import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/properties/Gallery";
import EnquiryForm from "@/components/properties/EnquiryForm";
import MobileEnquiryBar from "@/components/properties/MobileEnquiryBar";
import SimilarProperties from "@/components/properties/SimilarProperties";
import UnitBreakdownTable from "@/components/properties/UnitBreakdownTable";
import CtaBand from "@/components/properties/CtaBand";
import { getProjectById, getSimilarProjects } from "@/lib/properties";
import { constructionLabel, formatPriceRange, toClientProject } from "@/lib/types";

// Listings come from the database, so render on demand rather than at build time.
export const dynamic = "force-dynamic";

function UnitsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M4 21V9l8-6 8 6v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-7h6v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3 13 9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M3 21h18M6 21V8l6-4 6 4v13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 21v-5h4v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 20s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-gold-dark">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function formatCompletion(date: Date | null) {
  if (!date) return "To be announced";
  const q = Math.floor(date.getUTCMonth() / 3) + 1;
  return `Q${q} ${date.getUTCFullYear()}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return {};

  return {
    title: `${project.title} — Da Reality`,
    description: `${project.title} by ${project.developer}${
      project.area ? ` in ${project.area}` : ""
    }. ${formatPriceRange(project.priceFrom, project.priceTo)}.`,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  // Normalise for the server -> client boundary.
  const similar = (await getSimilarProjects(project, 3)).map(toClientProject);
  const hasCoords = project.latitude !== null && project.longitude !== null;
  const mapQuery = hasCoords
    ? `${project.latitude},${project.longitude}`
    : encodeURIComponent(`${project.area ?? "Dubai"}, Dubai, UAE`);
  const enquiryPrice = project.priceFrom && project.priceFrom > 0 ? project.priceFrom : null;

  return (
    <div className="pb-24 lg:pb-0">
      {/* Project imagery, served from the source URLs stored at import time. */}
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
        {project.gallery.length > 0 ? (
          <Gallery images={project.gallery} title={project.title} />
        ) : (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-onyx sm:aspect-video">
            <Image
              src={project.displayImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Title & key info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <PinIcon /> {project.area ?? "Dubai"}, Dubai
                </span>
                <h1 className="mt-2 font-heading text-3xl font-medium text-onyx sm:text-4xl">
                  {project.title}
                </h1>
                <p className="mt-1 text-sm uppercase tracking-widest-luxe text-gold-dark">
                  {project.developer}
                </p>
                <p className="mt-3 font-heading text-2xl font-medium text-gold-dark">
                  {formatPriceRange(project.priceFrom, project.priceTo)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Share this project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
                >
                  <ShareIcon />
                </button>
                <button
                  type="button"
                  aria-label="Save this project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
                >
                  <HeartIcon />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y border-stone py-6 text-sm text-onyx">
              <span className="flex items-center gap-2">
                <BuildIcon /> {constructionLabel(project.constructionPercent)}
              </span>
              <span className="flex items-center gap-2">
                <CalendarIcon /> {formatCompletion(project.constructionDate)}
              </span>
              <span className="flex items-center gap-2">
                <UnitsIcon /> {project.unitsCount.toLocaleString()} Units
              </span>
              {project.unitBreakdown && (
                <span className="flex items-center gap-2">
                  <LayersIcon /> {Object.keys(project.unitBreakdown).length} Unit Types
                </span>
              )}
            </div>

            {/* Construction progress */}
            {project.constructionPercent > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-onyx">Construction Progress</span>
                  <span className="text-muted-foreground">{project.constructionPercent}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${Math.min(project.constructionPercent, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Pricing & unit types */}
            <h2 className="mt-14 font-heading text-2xl font-medium text-onyx">
              Pricing &amp; Unit Types
            </h2>
            {project.unitBreakdown ? (
              <div className="mt-6">
                <UnitBreakdownTable units={project.unitBreakdown} />
              </div>
            ) : (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Unit-level pricing for this development has not been published yet. Contact our
                advisory team for the latest availability.
              </p>
            )}

            {/*
              Amenities are intentionally omitted: the Alnair project export carries no
              amenity data. Add a manually curated list here if one is sourced later.
            */}

            {/* Location */}
            <h2 className="mt-14 font-heading text-2xl font-medium text-onyx">Location</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {project.title} is located in {project.area ?? "Dubai"}, Dubai.
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl">
              <iframe
                title={`${project.title} location`}
                src={`https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                className="h-[340px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {hasCoords && (
              <p className="mt-3 text-xs text-muted-foreground">
                Coordinates: {project.latitude?.toFixed(5)}, {project.longitude?.toFixed(5)}
              </p>
            )}
          </div>

          {/* Enquiry sidebar (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <EnquiryForm propertyTitle={project.title} price={enquiryPrice} />
            </div>
          </div>
        </div>
      </section>

      <MobileEnquiryBar propertyTitle={project.title} price={enquiryPrice} />

      <SimilarProperties projects={similar} />

      <CtaBand />
    </div>
  );
}
