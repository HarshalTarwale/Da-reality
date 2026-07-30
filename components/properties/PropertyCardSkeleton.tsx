/** Loading placeholder matching PropertyCard's layout, so content doesn't jump when data arrives. */
export default function PropertyCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-stone-300 bg-white">
      <div className="aspect-4/3 bg-stone/60" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-stone/60" />
          <div className="h-4 w-16 rounded bg-stone/60" />
        </div>
        <div className="h-5 w-3/4 rounded bg-stone/60" />
        <div className="h-5 w-1/2 rounded bg-stone/60" />
        <div className="mt-1 h-10 rounded bg-stone/40" />
        <div className="mt-2 h-10 rounded-lg bg-stone/60" />
      </div>
    </div>
  );
}
