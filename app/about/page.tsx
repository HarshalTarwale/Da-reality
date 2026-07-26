import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import WhyChooseUs from "@/components/WhyChooseUs";
import { images, pillars, developers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Da Reality",
  description:
    "Da Reality is Dubai's premier luxury real estate advisory, curating the city's most extraordinary residences for discerning investors worldwide.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-stone bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Why Da Reality"
            title={
              <>
                A gallery approach to
                <br />
                luxury property
              </>
            }
            description="Da Reality was founded on a singular belief: that property acquisition should feel like curating a private collection. We treat every residence as a masterpiece — presenting it with the reverence, context, and discretion it deserves."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            <Image
              src={images.archDetail}
              alt="Da Reality — architectural detail"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-10">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="flex gap-5">
                <span className="font-heading text-2xl font-medium text-gold">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-medium text-onyx">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section id="developers" className="border-t border-stone bg-muted py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-center text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground">
            Trusted Partnerships
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {developers.map((d) => (
              <span
                key={d}
                className="font-heading text-xl font-semibold tracking-widest text-onyx/60"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
