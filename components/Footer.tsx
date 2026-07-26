import Image from "next/image";
import Link from "next/link";
import { logo, contact } from "@/lib/data";

const companyLinks = [
  { label: "About", href: "/#about" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Our Location", href: "/#location" },
  { label: "Contact", href: "/#contact" },
];

const propertyLinks = [
  { label: "Featured Listings", href: "/#listings" },
  { label: "New Developments", href: "/#developments" },
  { label: "Featured Areas", href: "/#areas" },
  { label: "Top Developers", href: "/#developers" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone/70 bg-onyx text-alabaster">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-4 lg:px-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Da Reality"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="font-heading text-lg font-semibold tracking-wide">
              DA REALITY
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-alabaster/70">
            Dubai&apos;s premier luxury real estate advisory. We curate the
            city&apos;s most extraordinary residences for discerning
            investors worldwide.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-xs font-semibold uppercase tracking-widest-luxe text-gold">
            Company
          </h3>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-alabaster/70 transition-colors hover:text-alabaster"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xs font-semibold uppercase tracking-widest-luxe text-gold">
            Properties
          </h3>
          <ul className="mt-5 space-y-3">
            {propertyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-alabaster/70 transition-colors hover:text-alabaster"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-alabaster/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-alabaster/60 sm:flex-row sm:items-center lg:px-12">
          <p>
            © {year} Da Reality. All rights reserved. · {contact.address}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-alabaster">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-alabaster">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
