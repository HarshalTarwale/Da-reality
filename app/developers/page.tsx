import Image from "next/image";
import type { Metadata } from "next";
import DeveloperCard from "@/components/developers/DeveloperCard";
import { getDeveloperStats } from "@/lib/properties";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Developers — Da Reality",
  description:
    "Browse Dubai's top property developers. Explore projects by EMAAR, DAMAC, NAKHEEL, SOBHA, MERAAS, OMNIYAT and more.",
};

// The catalog only changes when the import script runs — cache and refresh
// in the background every 5 minutes instead of querying Neon on every visit.
export const revalidate = 300;

export default async function DevelopersPage() {
  const developers = await getDeveloperStats();

  return (
    <div>
      {/* Page Header */}
      <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-onyx">
        <Image
          src={images.downtownSkyline}
          alt="Dubai skyline — Da Reality developers"
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
            Developers
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-alabaster/80">
            Explore projects from {developers.length} of Dubai&apos;s leading
            property developers.
          </p>
        </div>
      </section>

      {/* Developer Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((item) => (
            <DeveloperCard
              key={item.developer}
              developer={item.developer}
              count={item.count}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
