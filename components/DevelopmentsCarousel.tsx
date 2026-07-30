"use client";

import SectionHeading from "@/components/SectionHeading";
import DevelopmentCard from "@/components/DevelopmentCard";
import { CarouselArrows, CarouselTrack, useCarouselRef } from "@/components/Carousel";
import type { ProjectCardData } from "@/lib/types";

/**
 * Client component: the carousel needs a ref + scroll handlers, so data is
 * fetched by the server-component wrapper (DevelopmentsSection) and passed in.
 */
export default function DevelopmentsCarousel({ projects }: { projects: ProjectCardData[] }) {
  const developmentsRef = useCarouselRef();

  if (projects.length === 0) return null;

  return (
    <section id="developments" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Off-Plan"
          title="New Developments"
          description="The newest launches to hit the market — early access at preferred pricing before public release."
          actions={<CarouselArrows targetRef={developmentsRef} />}
        />
        <div className="mt-10">
          <CarouselTrack targetRef={developmentsRef}>
            {projects.map((project) => (
              <DevelopmentCard key={project.id} project={project} />
            ))}
          </CarouselTrack>
        </div>
      </div>
    </section>
  );
}
