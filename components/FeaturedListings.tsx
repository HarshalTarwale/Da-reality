import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/properties/PropertyCard";
import { FEATURED_DEVELOPERS, getFeaturedFromTopDevelopers } from "@/lib/properties";

/** Server component: the flagship project from each of our featured developers. */
export default async function FeaturedListings() {
  // 2 rows x 3 columns on desktop = 6 cards, and we lead with 6 developers —
  // so this is exactly one flagship pick each, every developer represented.
  const projects = await getFeaturedFromTopDevelopers(FEATURED_DEVELOPERS.length, 1);

  if (projects.length === 0) return null;

  return (
    <section id="listings" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Developments"
          description="A curated selection from Dubai's leading developers, across our most sought-after new developments."
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PropertyCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/properties"
            className="rounded-lg border border-onyx px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
          >
            View More Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
