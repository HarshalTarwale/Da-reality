import SectionHeading from "@/components/SectionHeading";
import { contact } from "@/lib/data";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-gold-dark">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-gold-dark">
      <path d="M4 5c0 8.284 6.716 15 15 15l1-4-5-2-2 2c-2.5-1.2-4.3-3-5.5-5.5l2-2-2-5-4 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-gold-dark">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LocationSection() {
  return (
    <section id="location" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Visit Us"
            title="Our Location"
            description="Our flagship office sits in the heart of Downtown Dubai, moments from the Burj Khalifa. We welcome clients by appointment for a private consultation over Arabic coffee."
          />
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <PinIcon />
              <div>
                <p className="text-sm font-medium text-onyx">Address</p>
                <p className="text-sm text-muted-foreground">{contact.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneIcon />
              <div>
                <p className="text-sm font-medium text-onyx">Phone</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon />
              <div>
                <p className="text-sm font-medium text-onyx">Hours</p>
                <p className="text-sm text-muted-foreground">{contact.hours}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <iframe
            title="Da Reality office location in Dubai"
            src="https://www.google.com/maps?q=Boulevard+Plaza+Downtown+Dubai&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
