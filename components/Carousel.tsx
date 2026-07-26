"use client";

import { useRef } from "react";

export function CarouselArrows({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  function scroll(direction: "left" | "right") {
    const el = targetRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div className="flex gap-3">
      <button
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
      >
        ←
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-onyx transition-colors hover:bg-onyx hover:text-alabaster"
      >
        →
      </button>
    </div>
  );
}

export function useCarouselRef() {
  return useRef<HTMLDivElement>(null);
}

export function CarouselTrack({
  targetRef,
  children,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={targetRef}
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}
