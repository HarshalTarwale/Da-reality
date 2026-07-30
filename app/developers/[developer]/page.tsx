import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyGrid from "@/components/properties/PropertyGrid";
import CtaBand from "@/components/properties/CtaBand";
import { getProjects, getFilterOptions } from "@/lib/properties";
import { images } from "@/lib/data";

// Cache and refresh in the background every 5 minutes instead of querying
// Neon on every single visit.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ developer: string }>;
}): Promise<Metadata> {
  const { developer } = await params;
  const name = decodeURIComponent(developer);
  return {
    title: `${name} Projects — Da Reality`,
    description: `Browse all ${name} property developments available through Da Reality in Dubai.`,
  };
}

export default async function DeveloperDetailPage({
  params,
}: {
  params: Promise<{ developer: string }>;
}) {
  const { developer } = await params;
  const name = decodeURIComponent(developer);

  const [allProjects, { developers, areas }] = await Promise.all([
    getProjects(),
    getFilterOptions(),
  ]);

  // If the developer doesn't exist in the catalog at all, 404.
  if (!developers.includes(name)) {
    notFound();
  }

  const developerProjectCount = allProjects.filter((p) => p.developer === name).length;

  return (
    <div>
      {/* Page Header */}
      <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-onyx">
        <Image
          src={images.downtownSkyline}
          alt={`${name} developments — Da Reality`}
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          {/* Breadcrumb */}
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
            <Link href="/developers" className="hover:text-gold-dark">
              Developers
            </Link>{" "}
            / {name}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight text-alabaster sm:text-5xl">
            {name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-alabaster/80">
            {developerProjectCount} {developerProjectCount === 1 ? "project" : "projects"}{" "}
            available — search, filter, or browse every development in our portfolio.
          </p>
        </div>
      </section>

      <PropertyGrid
        projects={allProjects}
        developers={developers}
        areas={areas}
        initialFilters={{ developer: name }}
      />

      <CtaBand />
    </div>
  );
}
