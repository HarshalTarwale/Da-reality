import { contact } from "@/lib/data";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0">
      <path d="M4 5c0 8.284 6.716 15 15 15l1-4-5-2-2 2c-2.5-1.2-4.3-3-5.5-5.5l2-2-2-5-4 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactInfoRow() {
  const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <span className="text-gold">
          <PinIcon />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest-luxe text-alabaster/50">
            Office Location
          </p>
          <p className="mt-1 text-sm text-alabaster/80">{contact.address}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="text-gold">
          <MailIcon />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest-luxe text-alabaster/50">Email</p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-1 block text-sm text-alabaster/80 transition-colors hover:text-gold"
          >
            {contact.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="text-gold">
          <PhoneIcon />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest-luxe text-alabaster/50">Phone</p>
          <a
            href={telHref}
            className="mt-1 block text-sm text-alabaster/80 transition-colors hover:text-gold"
          >
            {contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
