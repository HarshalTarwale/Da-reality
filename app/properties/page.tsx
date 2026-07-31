import Image from "next/image";
import type { Metadata } from "next";
import PropertyGrid from "@/components/properties/PropertyGrid";
import CtaBand from "@/components/properties/CtaBand";
import { getProjects, getFilterOptions } from "@/lib/properties";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties — Da Reality",
  description:
    "Browse Da Reality's portfolio of new developments from Dubai's leading developers.",
};

// The catalog only changes when the import script runs, so cache this page
// and refresh it in the background every 5 minutes rather than querying
// Neon on every visit.
export const revalidate = 300;

export default async function PropertiesPage() {
  // getProjects() already returns the lean, client-safe card shape.
  const [projects, { developers, areas }] = await Promise.all([
    getProjects(),
    getFilterOptions(),
  ]);

  return (
    <div>
      <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-onyx">
        <Image
          src={images.downtownSkyline}
          alt="Dubai skyline — Da Reality properties"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
            Portfolio
          </p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight text-alabaster sm:text-5xl">
            Explore Our Properties
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-alabaster/80">
            {`Browse ${projects.length} new developments from ${developers.length} of Dubai's leading developers.`}
          </p>
        </div>
      </section>

      <PropertyGrid projects={projects} developers={developers} areas={areas} />

      <CtaBand />
    </div>
  );
}
