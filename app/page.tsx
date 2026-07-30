import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import WhyChooseUs from "@/components/WhyChooseUs";
import LocationSection from "@/components/LocationSection";
import ContactForm from "@/components/ContactForm";
import ContactInfoRow from "@/components/ContactInfoRow";
import Faq from "@/components/Faq";
import FeaturedListings from "@/components/FeaturedListings";
import FeaturedListingsSkeleton from "@/components/FeaturedListingsSkeleton";
import DevelopmentsSection from "@/components/DevelopmentsSection";
import DevelopmentsSectionSkeleton from "@/components/DevelopmentsSectionSkeleton";
import { images, pillars, developers } from "@/lib/data";

// Featured listings come from the database, but the catalog only changes when
// the import script runs — cache the page and refresh it in the background
// every 5 minutes instead of hitting Neon on every single visit.
export const revalidate = 300;

export default function Home() {

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
      {/*
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
      */}

      <Suspense fallback={<FeaturedListingsSkeleton />}>
        <FeaturedListings />
      </Suspense>

      <Suspense fallback={<DevelopmentsSectionSkeleton />}>
        <DevelopmentsSection />
      </Suspense>

      <WhyChooseUs />
      <LocationSection />

      {/* Get in Touch */}
      <section id="contact" className="bg-onyx py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
              Concierge
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium leading-tight text-alabaster sm:text-4xl">
              Get in Touch
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-gold/30">
                <Image
                  src={images.marinaApartmentInterior}
                  alt="Da Reality client lounge"
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-alabaster/10" />
              </div>
              <div className="mt-8">
                <ContactInfoRow />
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Faq />
    </div>
  );
}
