"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Project gallery: large hero image with a thumbnail strip beneath.
 * Images are served from their source URLs so they match exactly.
 */
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-onyx sm:aspect-video">
        <Image
          src={current}
          alt={`${title} — image ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`relative aspect-4/3 w-24 shrink-0 snap-start overflow-hidden rounded-xl border transition-colors sm:w-28 ${
                i === active ? "border-gold" : "border-stone"
              }`}
            >
              <Image
                src={src}
                alt={`${title} — thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
              {i === active && <div className="absolute inset-0 bg-onyx/10" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
