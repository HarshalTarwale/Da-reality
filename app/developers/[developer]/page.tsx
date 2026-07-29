import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/properties/PropertyCard";
import CtaBand from "@/components/properties/CtaBand";
import { getProjectsByDeveloper } from "@/lib/properties";
import { toClientProject } from "@/lib/types";
import { images } from "@/lib/data";

export const dynamic = "force-dynamic";

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

  const allProjects = await getProjectsByDeveloper(name);

  // If developer doesn't exist in DB, return 404
  if (allProjects.length === 0) {
    notFound();
  }

  const projects = allProjects.map(toClientProject);

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
            {projects.length} {projects.length === 1 ? "project" : "projects"} available
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <SectionHeading
          eyebrow={name}
          title="All Projects"
          description={`Explore every development by ${name} in our portfolio.`}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Showing {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PropertyCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
