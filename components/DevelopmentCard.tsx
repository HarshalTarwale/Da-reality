import Image from "next/image";
import Link from "next/link";
import type { Development } from "@/lib/data";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-3.5 w-3.5">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

export default function DevelopmentCard({ development }: { development: Development }) {
  return (
    <div className="relative flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-300 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
      <div className="relative aspect-3/4 w-full">
        <Image
          src={development.image}
          alt={development.title}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 420px, 340px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/10 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest-luxe text-onyx">
          Off-Plan
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6 text-alabaster">
          <span className="flex items-center gap-1 text-sm text-alabaster/80">
            <PinIcon /> {development.area}
          </span>
          <h3 className="mt-2 font-heading text-2xl font-medium">
            {development.title}
          </h3>
          <p className="mt-1 text-sm text-alabaster/70">By {development.developer}</p>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest-luxe text-alabaster/60">
                Starting From
              </p>
              <p className="mt-1 font-heading text-lg font-medium">
                From {development.price}
              </p>
            </div>
            <Link
              href="/#contact"
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-5 py-3 text-xs font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-alabaster"
            >
              Enquire →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
