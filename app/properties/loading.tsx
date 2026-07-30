import PropertyCardSkeleton from "@/components/properties/PropertyCardSkeleton";

export default function Loading() {
  return (
    <div>
      <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden bg-onyx" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
