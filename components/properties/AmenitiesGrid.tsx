function PoolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M3 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0M4 12V6a2 2 0 0 1 2-2h4v8M14 12V8h6a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GymIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M6.5 7v10M17.5 7v10M2 10v4M22 10v4M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M12 3l8 3v6c0 4.5-3.4 7.9-8 9-4.6-1.1-8-4.5-8-9V6l8-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BalconyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M4 9h16M4 9v10M20 9v10M8 9V4h8v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeLinecap="round" />
    </svg>
  );
}

function AcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <rect x="2" y="6" width="20" height="7" rx="2" />
      <path d="M6 17v2M10 17v3M14 17v2M18 17v3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="6" cy="9" r="2" />
      <circle cx="11" cy="6" r="2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="20" cy="10" r="2" />
      <path d="M8 20c-1-3 1-5 2.5-6.5 1-1 2-1 3 0C15 15 17 17 16 20c-1 1.5-3 1-4.5 0S9 18.5 8 20Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KidsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="5" r="2" />
      <path d="M5 21v-6l2-5 5 2 5-2 2 5v6M8 15v6M16 15v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConciergeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M3 19h18M5 19v-3a7 7 0 0 1 14 0v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8V6a2 2 0 0 1 4 0v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const amenityIcons: Record<string, () => React.ReactElement> = {
  "Swimming Pool": PoolIcon,
  Gym: GymIcon,
  "Covered Parking": ParkingIcon,
  "24/7 Security": SecurityIcon,
  Balcony: BalconyIcon,
  "Central A/C": AcIcon,
  "Pet Friendly": PetIcon,
  "Kids Play Area": KidsIcon,
  Concierge: ConciergeIcon,
};

export default function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {amenities.map((amenity) => {
        const Icon = amenityIcons[amenity];
        return (
          <div
            key={amenity}
            className="flex flex-col items-start gap-3 rounded-2xl border border-stone bg-white p-5"
          >
            <span className="text-gold-dark">{Icon ? <Icon /> : null}</span>
            <span className="text-sm font-medium text-onyx">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
}
