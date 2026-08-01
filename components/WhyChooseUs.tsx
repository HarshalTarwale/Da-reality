import SectionHeading from "@/components/SectionHeading";
import { whyChooseUs, stats } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  "Exclusive Access": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12.5 7 21l5-3 5 3-2-8.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Investment Expertise": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Full Transparency": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "End-to-End Service": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M3 9a9 9 0 0 1 18 0M3 9v6a2 2 0 0 0 2 2h1v-8H5a2 2 0 0 0-2 2Zm18 0v6a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
      <SectionHeading
        eyebrow="The Da Realty Difference"
        title="Why Choose Us"
        align="center"
      />
      <div className="mt-14 grid grid-cols-1 divide-y divide-stone sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {whyChooseUs.map((item) => (
          <div
            key={item.title}
            className="border-stone px-4 py-8 first:pl-0 last:pr-0 sm:border-l sm:first:border-l-0 sm:py-0"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-stone text-gold-dark">
              {icons[item.title]}
            </div>
            <h3 className="mt-6 font-heading text-lg font-medium text-onyx">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-stone pt-12 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-semibold text-onyx">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest-luxe text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
