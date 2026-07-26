import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/PropertyCard";
import DevelopmentCard from "@/components/DevelopmentCard";
import AreaCard from "@/components/AreaCard";
import { properties, developments, neighborhoods } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties — Da Reality",
  description:
    "Browse Da Reality's curated portfolio of luxury penthouses, villas, and mansions across Dubai's most coveted addresses.",
};

export default function PropertiesPage() {
  return (
    <div>
      <section className="border-b border-stone bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Portfolio"
            title="Our Properties"
            description="A curated selection of Dubai's most exceptional residences, hand-selected for architectural merit and investment potential."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="flex flex-wrap justify-center gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section id="developments" className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Off-Plan"
            title="New Developments"
            description="Exclusive early access to Dubai's most anticipated off-plan launches."
          />
          <div className="mt-14 flex flex-wrap justify-center gap-8">
            {developments.map((dev) => (
              <DevelopmentCard key={dev.id} development={dev} />
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Explore Dubai"
            title="Featured Areas"
            description="From man-made islands to golf-front estates — discover Dubai's most coveted addresses."
          />
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {neighborhoods.map((n) => (
              <AreaCard key={n.name} area={n} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
