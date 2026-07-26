"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logo } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Property", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Explore", href: "/properties#areas" },
];

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Da Reality"
            width={56}
            height={56}
            className="h-14 w-14 rounded-xl object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`text-sm font-medium uppercase tracking-widest-luxe transition-colors hover:text-gold ${
                isActive(pathname, link.href) ? "text-gold" : "text-onyx/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-onyx px-7 py-3 text-sm font-medium uppercase tracking-widest-luxe text-alabaster transition-colors hover:bg-onyx/85 md:inline-block"
        >
          Contact
        </Link>

        <button
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="h-px w-6 bg-onyx" />
          <span className="h-px w-6 bg-onyx" />
          <span className="h-px w-4 bg-onyx" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-stone bg-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`py-2 text-sm font-medium uppercase tracking-widest-luxe ${
                isActive(pathname, link.href) ? "text-gold" : "text-onyx/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-onyx px-6 py-3 text-center text-sm font-medium uppercase tracking-widest-luxe text-alabaster"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
