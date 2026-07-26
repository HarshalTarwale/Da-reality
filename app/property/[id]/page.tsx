import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, contact } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return {};
  return {
    title: `${property.title} — Da Reality`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  const related = properties.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
        <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-3xl bg-onyx">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10">
            <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold">
              {property.area} · {property.property_type}
            </p>
            <h1 className="mt-3 max-w-2xl font-heading text-3xl font-medium text-alabaster sm:text-5xl">
              {property.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-stone pb-8">
              <div>
                <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">Price</p>
                <p className="mt-1 font-heading text-xl font-medium text-gold-dark">{property.price}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">Bedrooms</p>
                <p className="mt-1 font-heading text-xl font-medium text-onyx">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">Bathrooms</p>
                <p className="mt-1 font-heading text-xl font-medium text-onyx">{property.bathrooms}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">Size</p>
                <p className="mt-1 font-heading text-xl font-medium text-onyx">
                  {property.size_sqft.toLocaleString()} sqft
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">Annual ROI</p>
                <p className="mt-1 font-heading text-xl font-medium text-onyx">{property.annual_roi}</p>
              </div>
            </div>

            <h2 className="mt-10 font-heading text-2xl font-medium text-onyx">
              About This Property
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {property.description}
            </p>

            {property.gallery.length > 1 && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {property.gallery.map((src) => (
                  <div key={src} className="relative aspect-4/3 overflow-hidden rounded-2xl bg-stone">
                    <Image
                      src={src}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="rounded-3xl bg-muted p-8">
              <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">
                Reference
              </p>
              <p className="mt-1 font-heading text-lg font-medium text-onyx">
                {property.reference}
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest-luxe text-muted-foreground">
                Developer
              </p>
              <p className="mt-1 font-heading text-lg font-medium text-onyx">
                {property.developer}
              </p>

              <Link
                href="/#contact"
                className="mt-8 block rounded-full bg-gold px-6 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
              >
                Enquire About This Property
              </Link>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="mt-3 block rounded-full bg-onyx px-6 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-alabaster transition-colors hover:bg-onyx/85"
              >
                Call {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="font-heading text-2xl font-medium text-onyx">
            You May Also Like
          </h2>
          <div className="mt-10 flex flex-wrap gap-8">
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
