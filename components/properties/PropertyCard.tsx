import Image from "next/image";
import Link from "next/link";
import type { MockProperty } from "@/components/properties/types";

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18v2M21 18v2M3 13h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11V9a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2M13 11V9a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12V6a2 2 0 0 1 3.2-1.6M4 19l-1 2M20 19l1 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-3.5 w-3.5">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function ImageOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M4 4l16 16M5 19h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8M4 6.5V18a1 1 0 0 0 1 1h1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="9.5" r="1.5" />
    </svg>
  );
}

export function formatAed(price: number) {
  return `AED ${price.toLocaleString("en-US")}`;
}

export default function PropertyCard({ property }: { property: MockProperty }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-stone-300 bg-white">
      <div className="relative aspect-4/3 overflow-hidden rounded-t-2xl bg-muted">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOffIcon />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest-luxe text-onyx">
          {property.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <PinIcon /> {property.area}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest-luxe text-gold-dark">
            {property.property_type}
          </span>
        </div>
        <h3 className="mt-3 font-heading text-xl font-medium text-onyx">
          {property.title}
        </h3>
        <p className="mt-2 font-heading text-lg font-medium text-onyx">
          {formatAed(property.price)}
        </p>
        <div className="mt-4 flex gap-5 border-t border-stone pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedIcon /> {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Beds`}
          </span>
          <span className="flex items-center gap-1.5">
            <BathIcon /> {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <SizeIcon /> {property.size_sqft.toLocaleString()} sqft
          </span>
        </div>
        <Link
          href={`/property/${property.id}`}
          className="mt-5 block rounded-lg border border-onyx px-3 py-3 text-center text-[11px] font-medium uppercase tracking-wide text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
