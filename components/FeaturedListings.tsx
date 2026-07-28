import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/properties/PropertyCard";
import { getProjects } from "@/lib/properties";
import { toClientProject } from "@/lib/types";

/** Server component: pulls the newest projects straight from the database. */
export default async function FeaturedListings() {
  // Normalise for the server -> client boundary.
  const projects = (await getProjects()).slice(0, 6).map(toClientProject);

  if (projects.length === 0) return null;

  return (
    <section id="listings" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Developments"
          description="A curated selection of Dubai's most anticipated new developments."
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PropertyCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
