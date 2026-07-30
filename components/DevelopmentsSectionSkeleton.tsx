import SectionHeading from "@/components/SectionHeading";

/** Shown instantly while DevelopmentsSection resolves its database query. */
export default function DevelopmentsSectionSkeleton() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Off-Plan"
          title="New Developments"
          description="The newest launches to hit the market — early access at preferred pricing before public release."
        />
        <div className="mt-10 flex gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-3/4 w-[85vw] shrink-0 animate-pulse overflow-hidden rounded-2xl border border-stone-300 bg-stone/60 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
