import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/properties/Gallery";
import AmenitiesGrid from "@/components/properties/AmenitiesGrid";
import EnquiryForm from "@/components/properties/EnquiryForm";
import MobileEnquiryBar from "@/components/properties/MobileEnquiryBar";
import SimilarProperties from "@/components/properties/SimilarProperties";
import CtaBand from "@/components/properties/CtaBand";
import { formatAed } from "@/components/properties/PropertyCard";
import type { MockProperty } from "@/components/properties/types";
import mockProperties from "@/components/properties/mock-properties.json";

const properties = mockProperties as MockProperty[];

const proximity = [
  { label: "Dubai Mall", time: "10 min" },
  { label: "Dubai International Airport", time: "18 min" },
  { label: "Nearest Metro Station", time: "5 min" },
  { label: "Beach / Waterfront", time: "12 min" },
];

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18v2M21 18v2M3 13h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11V9a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2M13 11V9a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12V6a2 2 0 0 1 3.2-1.6M4 19l-1 2M20 19l1 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M4 21V9l8-6 8 6v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-7h6v7" strokeLinecap="round" strokeLinejoin="round" />
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

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return {};
  return {
    title: `${property.title} — Da Reality`,
    description: property.description.slice(0, 155),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  const similar = properties
    .filter((p) => p.id !== property.id && (p.property_type === property.property_type || p.area === property.area))
    .slice(0, 3);

  const mapQuery = encodeURIComponent(`${property.area}, Dubai, UAE`);

  return (
    <div className="pb-24 lg:pb-0">
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
        <Gallery images={property.gallery} title={property.title} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Title & key info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <PinIcon /> {property.area}, Dubai
                </span>
                <h1 className="mt-2 font-heading text-3xl font-medium text-onyx sm:text-4xl">
                  {property.title}
                </h1>
                <p className="mt-3 font-heading text-2xl font-medium text-gold-dark">
                  {formatAed(property.price)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Share this property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
                >
                  <ShareIcon />
                </button>
                <button
                  type="button"
                  aria-label="Save this property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
                >
                  <HeartIcon />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y border-stone py-6 text-sm text-onyx">
              <span className="flex items-center gap-2">
                <BedIcon /> {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bedrooms`}
              </span>
              <span className="flex items-center gap-2">
                <BathIcon /> {property.bathrooms} Bathrooms
              </span>
              <span className="flex items-center gap-2">
                <SizeIcon /> {property.size_sqft.toLocaleString()} sqft
              </span>
              <span className="flex items-center gap-2">
                <TypeIcon /> {property.property_type}
              </span>
            </div>

            {/* Description */}
            <h2 className="mt-10 font-heading text-2xl font-medium text-onyx">
              About This Property
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              {property.description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Amenities */}
            <h2 className="mt-14 font-heading text-2xl font-medium text-onyx">Amenities</h2>
            <div className="mt-6">
              <AmenitiesGrid amenities={property.amenities} />
            </div>

            {/* Location */}
            <h2 className="mt-14 font-heading text-2xl font-medium text-onyx">Location</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Located in {property.area}, one of Dubai&apos;s most sought-after communities —
              close to the city&apos;s key landmarks and transport links.
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl">
              <iframe
                title={`${property.area} location`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[340px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <ul className="mt-6 space-y-3">
              {proximity.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between border-b border-stone pb-3 text-sm"
                >
                  <span className="text-onyx">{item.label}</span>
                  <span className="text-muted-foreground">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiry sidebar (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <EnquiryForm propertyTitle={property.title} price={property.price} />
            </div>
          </div>
        </div>
      </section>

      <MobileEnquiryBar propertyTitle={property.title} price={property.price} />

      <SimilarProperties properties={similar} />

      <CtaBand />
    </div>
  );
}
