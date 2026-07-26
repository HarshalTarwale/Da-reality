import Link from "next/link";

export default function AboutCtaBand() {
  return (
    <section className="border-t border-stone bg-muted py-20">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-12">
        <h2 className="font-heading text-3xl font-medium leading-tight text-onyx sm:text-4xl">
          Ready to Find Your Dream Property?
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/properties"
            className="rounded-lg bg-gold px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
          >
            Browse Properties
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-onyx px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-alabaster transition-colors hover:bg-onyx/85"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
