import Image from "next/image";
import type { Neighborhood } from "@/lib/data";

export default function AreaCard({ area }: { area: Neighborhood }) {
  return (
    <div className="group relative aspect-3/4 w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-stone-300 sm:w-[320px]">
      <Image
        src={area.image}
        alt={area.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(min-width: 640px) 320px, 280px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs uppercase tracking-widest-luxe text-alabaster/70">
          {area.properties} Properties
        </p>
        <h3 className="mt-1 font-heading text-2xl font-medium text-alabaster">
          {area.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-alabaster/70">
          {area.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest-luxe text-alabaster">
          Explore →
        </span>
      </div>
    </div>
  );
}
