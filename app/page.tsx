"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/PropertyCard";
import DevelopmentCard from "@/components/DevelopmentCard";
import AreaCard from "@/components/AreaCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import LocationSection from "@/components/LocationSection";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { CarouselArrows, CarouselTrack, useCarouselRef } from "@/components/Carousel";
import {
  images,
  properties,
  developments,
  neighborhoods,
  pillars,
  developers,
} from "@/lib/data";

export default function Home() {
  const areasRef = useCarouselRef();
  const developmentsRef = useCarouselRef();

  return (
    <div>
      {/* Hero */}
      <section id="home" className="relative flex h-[90vh] min-h-[640px] items-center overflow-hidden bg-onyx">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={images.penthouseTerrace}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        >
          <source src={images.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/80 via-onyx/25 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-alabaster/80">
            Dubai Luxury Real Estate Advisory
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-alabaster sm:text-7xl">
            The New Standard of Dubai Living
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-alabaster/80">
            We curate the city&apos;s most extraordinary residences — from
            Burj-view penthouses to beachfront villas on Palm Jumeirah. For
            those who expect more.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#listings"
              className="rounded-lg bg-gold px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
            >
              Explore Properties →
            </Link>
            <Link
              href="#contact"
              className="rounded-lg bg-white px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-alabaster"
            >
              Request Private Viewing
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Partnerships */}
      <section id="developers" className="border-b border-stone py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-center text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground">
            Trusted Partnerships
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {developers.map((d) => (
              <span
                key={d}
                className="font-heading text-xl font-semibold tracking-widest text-onyx/60"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Da Reality */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            <Image
              src={images.office}
              alt="Da Reality — Downtown Dubai skyline"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Da Reality"
              title={
                <>
                  A gallery approach to
                  <br />
                  luxury property
                </>
              }
              description="Da Reality was founded on a singular belief: that property acquisition should feel like curating a private collection. We treat every residence as a masterpiece — presenting it with the reverence, context, and discretion it deserves."
            />
            <div className="mt-10 space-y-8">
              {pillars.map((pillar) => (
                <div key={pillar.number} className="flex gap-5">
                  <span className="font-heading text-2xl font-medium text-gold">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-medium text-onyx">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Areas */}
      <section id="areas" className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Explore Dubai"
            title="Featured Areas"
            description="From the iconic Palm to the greens of Dubai Hills, discover the neighbourhoods that define luxury living in the city."
            actions={<CarouselArrows targetRef={areasRef} />}
          />
          <div className="mt-10">
            <CarouselTrack targetRef={areasRef}>
              {neighborhoods.map((area) => (
                <AreaCard key={area.name} area={area} />
              ))}
            </CarouselTrack>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section id="listings" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Listings"
            description="A curated selection of Dubai's most exceptional residences, available now."
          />
          <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* New Developments */}
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

      <WhyChooseUs />
      <LocationSection />

      {/* Get in Touch */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Concierge"
            title="Get in Touch"
            description="Tell us what you're looking for. Our advisory team will curate a shortlist of properties tailored to your requirements and arrange private viewings at your convenience."
          />
          <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src={images.marinaApartmentInterior}
                alt="Da Reality client lounge"
                fill
                className="object-cover"
              />
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Faq />
    </div>
  );
}
