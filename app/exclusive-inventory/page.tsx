import Image from "next/image";
import type { Metadata } from "next";
import PropertyGrid from "@/components/properties/PropertyGrid";
import CtaBand from "@/components/properties/CtaBand";
import { getExclusiveProjects, getExclusiveFilterOptions } from "@/lib/properties";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Exclusive Inventory — Da Reality",
  description:
    "A private collection of Dubai's most distinguished residences, available exclusively through Da Reality.",
};

// Same caching model as the main catalog: refresh in the background every
// 5 minutes rather than querying Neon on every visit.
export const revalidate = 300;

export default async function ExclusiveInventoryPage() {
  const [projects, { developers, areas }] = await Promise.all([
    getExclusiveProjects(),
    getExclusiveFilterOptions(),
  ]);

  return (
    <div>
      <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-onyx">
        <Image
          src={images.penthouseTerrace}
          alt="Da Reality — exclusive inventory"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
            Private Collection
          </p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight text-alabaster sm:text-5xl">
            Our Exclusive Inventory
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-alabaster/80">
            {projects.length > 0
              ? `A curated selection of ${projects.length} distinguished residences, offered through our private advisory.`
              : "A curated selection of distinguished residences, offered through our private advisory."}
          </p>
        </div>
      </section>

      {projects.length > 0 ? (
        <PropertyGrid projects={projects} developers={developers} areas={areas} />
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="flex flex-col items-center justify-center rounded-3xl bg-muted py-24 text-center">
            <h2 className="font-heading text-2xl font-medium text-onyx">
              Our exclusive collection is being curated
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Speak with our advisory team for early access to off-market residences before
              they are publicly released.
            </p>
          </div>
        </section>
      )}

      <CtaBand />
    </div>
  );
}
