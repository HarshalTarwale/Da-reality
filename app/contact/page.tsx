import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import LocationSection from "@/components/LocationSection";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Da Reality",
  description:
    "Get in touch with Da Reality's advisory team to arrange a private consultation or property viewing in Dubai.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-onyx">
        <Image
          src={images.marinaApartmentInterior}
          alt="Da Reality — client lounge with Marina view"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-onyx/45" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">Concierge</p>
          <h1 className="mt-3 font-heading text-4xl font-medium leading-tight text-alabaster sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-alabaster/80">
            Tell us what you&apos;re looking for. Our advisory team will curate a shortlist of
            properties tailored to your requirements and arrange private viewings at your
            convenience.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <ContactForm />
      </section>

      <LocationSection />
    </div>
  );
}
