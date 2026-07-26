import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="border-t border-stone bg-muted py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <h2 className="font-heading text-3xl font-medium leading-tight text-onyx sm:text-4xl">
          Didn&apos;t find the right property?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Tell us what you&apos;re looking for and our team will find it for you.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-gold px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
