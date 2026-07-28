import Image from "next/image";
import type { Metadata } from "next";
import PropertyGrid from "@/components/properties/PropertyGrid";
import CtaBand from "@/components/properties/CtaBand";
import { getProjects, getFilterOptions } from "@/lib/properties";
import { toClientProject } from "@/lib/types";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties — Da Reality",
  description:
    "Browse Da Reality's portfolio of new developments from Dubai's leading developers.",
};

// Listings come from the database, so render on demand rather than at build time.
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const [allProjects, { developers, areas }] = await Promise.all([
    getProjects(),
    getFilterOptions(),
  ]);
  // Normalise for the server -> client boundary.
  const projects = allProjects.map(toClientProject);

  return (
    <div>
      <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden bg-onyx">
        <Image
          src={images.downtownSkyline}
          alt="Dubai skyline — Da Reality properties"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
            Portfolio
          </p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight text-alabaster sm:text-5xl">
            Explore Our Properties
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-alabaster/80">
            Browse {projects.length} new developments from {developers.length} of Dubai&apos;s
            leading developers.
          </p>
        </div>
      </section>

      <PropertyGrid projects={projects} developers={developers} areas={areas} />

      <CtaBand />
    </div>
  );
}
