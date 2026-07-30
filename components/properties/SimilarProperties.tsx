import PropertyCard from "@/components/properties/PropertyCard";
import type { ProjectCardData } from "@/lib/types";

export default function SimilarProperties({ projects }: { projects: ProjectCardData[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="font-heading text-2xl font-medium text-onyx">You May Also Like</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PropertyCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
