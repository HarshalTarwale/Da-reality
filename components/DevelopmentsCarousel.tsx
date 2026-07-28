"use client";

import SectionHeading from "@/components/SectionHeading";
import DevelopmentCard from "@/components/DevelopmentCard";
import { CarouselArrows, CarouselTrack, useCarouselRef } from "@/components/Carousel";
import { developments } from "@/lib/data";

/**
 * Client component: the carousel needs a ref + scroll handlers.
 * Kept separate so the Home page itself can stay a server component
 * and query the database directly.
 */
export default function DevelopmentsCarousel() {
  const developmentsRef = useCarouselRef();

  return (
    <section id="developments" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Off-Plan"
          title="New Developments"
          description="Exclusive early access to the city's most anticipated off-plan launches — at preferred pricing before public release."
          actions={<CarouselArrows targetRef={developmentsRef} />}
        />
        <div className="mt-10">
          <CarouselTrack targetRef={developmentsRef}>
            {developments.map((dev) => (
              <DevelopmentCard key={dev.id} development={dev} />
            ))}
          </CarouselTrack>
        </div>
      </div>
    </section>
  );
}
