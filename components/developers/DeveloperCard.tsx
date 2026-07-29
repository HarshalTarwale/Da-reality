import Image from "next/image";
import Link from "next/link";

export type DeveloperStat = {
  developer: string;
  count: number;
  image: string | null;
};

const FALLBACK_IMAGE = "/placeholders/project-generic.svg";

export default function DeveloperCard({ developer, count, image }: DeveloperStat) {
  const href = `/developers/${encodeURIComponent(developer)}`;
  const src = image && image.startsWith("http") ? image : FALLBACK_IMAGE;

  return (
    <Link
      href={href}
      className="group relative flex h-64 overflow-hidden rounded-2xl"
    >
      {/* Background image */}
      <Image
        src={src}
        alt={developer}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />

      {/* Gradient overlay — always dark at bottom, slightly darker on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/30 to-transparent transition-opacity duration-300 group-hover:from-onyx/90" />

      {/* Content */}
      <div className="relative flex w-full flex-col justify-end p-6">
        <p className="text-xs font-medium uppercase tracking-widest-luxe text-alabaster/80">
          {count} {count === 1 ? "Project" : "Projects"}
        </p>
        <h3 className="mt-1 font-heading text-2xl font-semibold text-alabaster">
          {developer}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest-luxe text-alabaster/0 transition-all duration-300 group-hover:text-alabaster/70">
          View All <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}
