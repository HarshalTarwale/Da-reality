import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ValueCard from "@/components/about/ValueCard";
import StatCounter from "@/components/about/StatCounter";
import FAQAccordion from "@/components/about/FAQAccordion";
import AboutCtaBand from "@/components/about/AboutCtaBand";
import { aboutStats, whyChooseUsList, aboutFaqs } from "@/components/about/data";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — Da Reality",
  description:
    "Da Reality is Dubai's trusted partner for ready property sales — learn our story, our values, and why clients choose us.",
};

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExcellenceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12.5 7 21l5-3 5 3-2-8.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClientFirstIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const values = [
  {
    icon: <ShieldIcon />,
    title: "Trust & Integrity",
    description: "We operate with complete honesty — transparent pricing and straight answers, always.",
  },
  {
    icon: <ExcellenceIcon />,
    title: "Excellence",
    description: "Every listing, every interaction, and every detail is held to the highest standard.",
  },
  {
    icon: <ClientFirstIcon />,
    title: "Client First",
    description: "Your goals shape our advice. We succeed only when you find the right property.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-onyx">
        <Image
          src={images.downtownSkyline}
          alt="Dubai skyline — about Da Reality"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-onyx/45" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">About Us</p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight text-alabaster sm:text-5xl">
            Your Trusted Partner in Dubai Real Estate
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            <Image
              src={images.office}
              alt="Da Reality — Downtown Dubai skyline"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Built on a simple idea: property should feel personal"
              description="Da Reality was founded to bring clarity and care to a market that can often feel overwhelming. We saw too many buyers navigating Dubai real estate without a trusted guide — so we set out to be exactly that."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                From the outset, our focus has been the ready, secondary market — homes you can
                view, walk through, and move into, not renderings and promises. We believe there
                is real value in a property you can inspect today and own tomorrow.
              </p>
              <p>
                Every member of our team is trained to put your interests first, not a sales
                target. That means honest advice, even when it means recommending you wait, look
                elsewhere, or negotiate harder — because your trust matters more than any single
                transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative overflow-hidden border-y border-stone bg-onyx py-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_auto] lg:gap-20 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
              Our Mission
            </p>
            <div className="mt-5 h-px w-12 bg-gold" />
            <p className="mt-8 font-heading text-2xl font-medium leading-snug text-alabaster sm:text-4xl">
              To make buying ready property in Dubai simple, transparent, and genuinely
              client-first — connecting people with homes they can trust, guided by advisors they
              can rely on.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-6 border-t border-alabaster/15 pt-8 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
            <span className="font-heading text-6xl font-semibold leading-none text-gold sm:text-7xl">
              01
            </span>
            <p className="max-w-40 text-xs uppercase tracking-widest-luxe text-alabaster/70">
              Guiding principle behind every transaction
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <SectionHeading eyebrow="What Drives Us" title="Our Values" align="center" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      {/* Track Record / Stats */}
      <section className="border-y border-stone bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {aboutStats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <SectionHeading eyebrow="The Da Reality Difference" title="Why Choose Us" align="center" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {whyChooseUsList.map((item) => (
            <div key={item.number} className="flex gap-5 rounded-3xl border border-stone bg-white p-8">
              <span className="font-heading text-2xl font-medium text-gold">{item.number}</span>
              <div>
                <h3 className="font-heading text-lg font-medium text-onyx">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Questions & Answers"
            title="Frequently Asked Questions"
            align="center"
          />
          <div className="mt-14">
            <FAQAccordion items={aboutFaqs} />
          </div>
        </div>
      </section>

      <AboutCtaBand />
    </div>
  );
}
