import Image from "next/image";
import Link from "next/link";
import {
  constructionLabel,
  formatPriceRange,
  unitTypeLabel,
  type ProjectCardData,
} from "@/lib/types";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-3.5 w-3.5">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function UnitsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M4 21V9l8-6 8 6v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-7h6v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3 13 9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PropertyCard({ project }: { project: ProjectCardData }) {
  const unitTypeCount = project.unitTypeCodes.length;
  // displayImage is already resolved by the query layer:
  //   - real image URL when the source has real photography
  //   - /placeholders/property-no-image.svg for Alnair coming-soon stubs
  const imageSrc = project.displayImage;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-stone-300 bg-white">
      <div className="relative aspect-4/3 overflow-hidden rounded-t-2xl bg-muted">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest-luxe text-onyx">
          {constructionLabel(project.constructionPercent)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <PinIcon /> {project.area ?? "Dubai"}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest-luxe text-gold-dark">
            {project.developer}
          </span>
        </div>
        <h3 className="mt-3 font-heading text-xl font-medium text-onyx">{project.title}</h3>
        <p className="mt-2 font-heading text-lg font-medium text-onyx">
          {formatPriceRange(project.priceFrom, project.priceTo)}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-stone pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <UnitsIcon /> {project.unitsCount.toLocaleString()} Units
          </span>
          {unitTypeCount > 0 && (
            <span className="flex items-center gap-1.5">
              <LayersIcon /> {unitTypeCount} Unit {unitTypeCount === 1 ? "Type" : "Types"}
            </span>
          )}
        </div>
        {unitTypeCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.unitTypeCodes
              .slice()
              .sort()
              .slice(0, 4)
              .map((code) => (
                <span
                  key={code}
                  className="rounded-full border border-stone px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {unitTypeLabel(code)}
                </span>
              ))}
          </div>
        )}
        <Link
          href={`/properties/${project.id}`}
          className="mt-5 block rounded-lg border border-onyx px-3 py-3 text-center text-[11px] font-medium uppercase tracking-wide text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
