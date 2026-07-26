import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import LocationSection from "@/components/LocationSection";

export const metadata: Metadata = {
  title: "Contact — Da Reality",
  description:
    "Get in touch with Da Reality's advisory team to arrange a private consultation or property viewing in Dubai.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-stone bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Concierge"
            title="Get in Touch"
            description="Tell us what you're looking for. Our advisory team will curate a shortlist of properties tailored to your requirements and arrange private viewings at your convenience."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <ContactForm />
      </section>

      <LocationSection />
    </div>
  );
}
