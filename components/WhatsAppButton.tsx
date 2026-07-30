import { contact } from "@/lib/data";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.83-3.01-.2-.31a8.24 8.24 0 1 1 6.95 3.84Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.19 3.71.59.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

/** Site-wide floating WhatsApp chat button. Phone number is a placeholder — swap in lib/data.ts. */
export default function WhatsAppButton() {
  const digits = contact.whatsapp.replace(/[^\d]/g, "");
  const message = encodeURIComponent(
    "Hi Da Reality, I'm interested in learning more about your properties."
  );

  return (
    <a
      href={`https://wa.me/${digits}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Raised on mobile so it clears the sticky "Enquire Now" bar on property
      // detail pages (MobileEnquiryBar); that bar is lg:hidden, so this can sit
      // in the normal corner position from the lg breakpoint up.
      className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
    >
      <WhatsAppIcon />
    </a>
  );
}
