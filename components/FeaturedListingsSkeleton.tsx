import SectionHeading from "@/components/SectionHeading";
import PropertyCardSkeleton from "@/components/properties/PropertyCardSkeleton";

/** Shown instantly while FeaturedListings resolves its database query. */
export default function FeaturedListingsSkeleton() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Developments"
          description="A curated selection from Dubai's leading developers, across our most sought-after new developments."
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
