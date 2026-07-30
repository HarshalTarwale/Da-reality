export default function Loading() {
  return (
    <div className="animate-pulse pb-24 lg:pb-0">
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
        <div className="aspect-4/3 w-full rounded-3xl bg-stone/60 sm:aspect-video" />
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-4 w-32 rounded bg-stone/60" />
            <div className="h-8 w-2/3 rounded bg-stone/60" />
            <div className="h-6 w-40 rounded bg-stone/60" />
          </div>
          <div className="h-64 rounded-3xl bg-stone/40" />
        </div>
      </section>
    </div>
  );
}
