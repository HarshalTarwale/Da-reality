const IMG = "https://media.base44.com/images/public/6a60bd3282d83c7611e9aa36";

export const images = {
  heroVideo: "https://assets.mixkit.co/videos/20114/20114-720.mp4",
  // penthouse terrace lounge with Burj Khalifa view at sunset
  penthouseTerrace: `${IMG}/6966c5095_generated_d574eddc.png`,
  // penthouse interior hallway with night skyline view
  penthouseInterior: `${IMG}/34798ba22_generated_4d191b4a.png`,
  // modern villa, pool, palm trees at dusk
  villaExterior: `${IMG}/5b1d101be_generated_a5a67bee.png`,
  // downtown Dubai skyline, daytime, Burj Khalifa
  downtownSkyline: `${IMG}/1d273fd4f_generated_b2a3bbf6.png`,
  // aerial golf estate villas with skyline background
  golfEstate: `${IMG}/44fd2894e_generated_1231c1b2.png`,
  // grand modern mansion at night with reflecting pool
  mansion: `${IMG}/63512b610_generated_fc7cc19f.png`,
  // bright modern apartment lounge/reception interior
  apartmentInterior: `${IMG}/5fb8511b6_generated_79f959ab.png`,
  // canal-front waterfront villas with private boat berths
  waterfrontVillas: `${IMG}/7c4e10dee_generated_3587ef19.png`,
  // downtown Dubai fountain / Burj Khalifa dusk view — office backdrop
  office: `${IMG}/933713679_generated_d09765cd.png`,
  // Islamic geometric marble architectural detail
  archDetail: `${IMG}/96848535a_generated_8d974919.png`,
  // beachfront Palm villa with pool, Burj skyline behind
  palmVilla: `${IMG}/ab8aa740d_generated_18be4edc.png`,
  // Palm Jumeirah aerial at dusk
  palmAerial: `${IMG}/d14818201_generated_00736406.png`,
  // apartment living room with Marina/sea view
  marinaApartmentInterior: `${IMG}/d60dcbce8_generated_47a46d0e.png`,
  // Dubai Marina skyline with yachts at dusk
  marinaSkyline: `${IMG}/e25813c50_generated_a78dc377.png`,
  // twin-tower waterfront development at sunset
  twinTowers: `${IMG}/19710590b_generated_845f8e61.png`,
};

export const logo = "/logo.jpeg";

export type Property = {
  id: string;
  title: string;
  price: string;
  area: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  annual_roi: string;
  status: string;
  description: string;
  image: string;
  gallery: string[];
  reference: string;
  developer: string;
  is_featured: boolean;
};

export const properties: Property[] = [
  {
    id: "penthouse-burj",
    title: "Sky Penthouse — Burj Khalifa View",
    price: "AED 18,500,000",
    area: "Downtown Dubai",
    property_type: "Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    size_sqft: 4200,
    annual_roi: "6.8% ROI",
    status: "Available",
    description:
      "An extraordinary full-floor penthouse in the heart of Downtown Dubai, offering uninterrupted views of the Burj Khalifa and the city skyline. Floor-to-ceiling windows flood the residence with natural light, while designer finishes and a private terrace create an unparalleled living experience.",
    image: images.penthouseTerrace,
    gallery: [images.penthouseTerrace, images.penthouseInterior],
    reference: "DA-001",
    developer: "EMAAR",
    is_featured: true,
  },
  {
    id: "villa-palm",
    title: "Signature Villa — Palm Jumeirah",
    price: "AED 32,000,000",
    area: "Palm Jumeirah",
    property_type: "Villa",
    bedrooms: 6,
    bathrooms: 7,
    size_sqft: 8500,
    annual_roi: "7.2% ROI",
    status: "Available",
    description:
      "A magnificent beachfront villa on the prestigious Palm Jumeirah, featuring a private infinity pool, direct beach access, and expansive living spaces. This architectural masterpiece blends contemporary design with timeless luxury.",
    image: images.palmVilla,
    gallery: [images.palmVilla, images.palmAerial],
    reference: "DA-002",
    developer: "NAKHEEL",
    is_featured: true,
  },
  {
    id: "mansion-hills",
    title: "Golf Mansion — Dubai Hills",
    price: "AED 45,000,000",
    area: "Dubai Hills",
    property_type: "Mansion",
    bedrooms: 7,
    bathrooms: 9,
    size_sqft: 12000,
    annual_roi: "6.5% ROI",
    status: "Available",
    description:
      "An estate of unprecedented scale overlooking the Dubai Hills Golf Course. This mansion features a grand entrance, private home cinema, spa, and landscaped gardens — the epitome of refined family living.",
    image: images.mansion,
    gallery: [images.mansion, images.golfEstate],
    reference: "DA-003",
    developer: "EMAAR",
    is_featured: true,
  },
  {
    id: "apartment-marina",
    title: "Marina Sky Residence",
    price: "AED 6,200,000",
    area: "Dubai Marina",
    property_type: "Apartment",
    bedrooms: 3,
    bathrooms: 4,
    size_sqft: 2100,
    annual_roi: "7.8% ROI",
    status: "Available",
    description:
      "A sophisticated three-bedroom apartment in Dubai Marina with panoramic water views. Open-plan living, premium finishes, and access to world-class amenities make this an exceptional investment opportunity.",
    image: images.marinaApartmentInterior,
    gallery: [images.marinaApartmentInterior, images.marinaSkyline],
    reference: "DA-004",
    developer: "MERAAS",
    is_featured: true,
  },
  {
    id: "villa-hills-estate",
    title: "Contemporary Villa — Dubai Hills Estate",
    price: "AED 12,500,000",
    area: "Dubai Hills",
    property_type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    size_sqft: 5400,
    annual_roi: "7.0% ROI",
    status: "Available",
    description:
      "A modern five-bedroom villa in the family-friendly Dubai Hills Estate. Featuring an open-plan layout, private garden, and pool, with views over the golf course and skyline.",
    image: images.villaExterior,
    gallery: [images.villaExterior, images.golfEstate],
    reference: "DA-005",
    developer: "EMAAR",
    is_featured: false,
  },
  {
    id: "penthouse-terrace",
    title: "Penthouse with Private Terrace",
    price: "AED 24,000,000",
    area: "Downtown Dubai",
    property_type: "Penthouse",
    bedrooms: 5,
    bathrooms: 6,
    size_sqft: 5800,
    annual_roi: "6.9% ROI",
    status: "Available",
    description:
      "A duplex penthouse with a sprawling private terrace offering 360-degree views of Dubai. Features include a private elevator, infinity pool on the terrace, and bespoke interior design.",
    image: images.penthouseInterior,
    gallery: [images.penthouseInterior, images.penthouseTerrace],
    reference: "DA-006",
    developer: "OMNIYAT",
    is_featured: false,
  },
];

export type Development = {
  id: string;
  title: string;
  price: string;
  area: string;
  handover: string;
  description: string;
  developer: string;
  image: string;
};

export const developments: Development[] = [
  {
    id: "dev-twin-towers",
    title: "Skyline Residences",
    price: "AED 3,200,000",
    area: "Dubai Marina",
    handover: "Q4 2027",
    description:
      "Futuristic twin towers with a sky bridge, offering panoramic marina and sea views.",
    developer: "DAMAC",
    image: images.twinTowers,
  },
  {
    id: "dev-waterfront",
    title: "The Waterfront Collection",
    price: "AED 8,500,000",
    area: "Palm Jumeirah",
    handover: "Q2 2026",
    description:
      "Contemporary canal-side villas with private berths and resort-grade amenities.",
    developer: "SOBHA",
    image: images.waterfrontVillas,
  },
  {
    id: "dev-golf-estate",
    title: "The Golf Estates",
    price: "AED 5,800,000",
    area: "Dubai Hills",
    handover: "Q1 2027",
    description:
      "Exclusive golf-front villas with resort-grade amenities and lush landscaped gardens.",
    developer: "EMAAR",
    image: images.golfEstate,
  },
  {
    id: "dev-marina-gate",
    title: "Marina Gate Towers",
    price: "AED 2,400,000",
    area: "Dubai Marina",
    handover: "Q3 2026",
    description:
      "Twin-tower waterfront landmark with direct marina access and resort amenities.",
    developer: "MERAAS",
    image: images.marinaSkyline,
  },
  {
    id: "dev-downtown-views",
    title: "Downtown Views Tower",
    price: "AED 4,100,000",
    area: "Downtown Dubai",
    handover: "Q4 2026",
    description: "Sky-rise residences steps from Burj Khalifa and The Dubai Mall.",
    developer: "EMAAR",
    image: images.downtownSkyline,
  },
  {
    id: "dev-palm-crescent",
    title: "Palm Crescent Villas",
    price: "AED 12,900,000",
    area: "Palm Jumeirah",
    handover: "Q2 2027",
    description:
      "Signature beachfront villas on the Palm's outer crescent with private pools.",
    developer: "NAKHEEL",
    image: images.palmVilla,
  },
];

export type Neighborhood = {
  name: string;
  description: string;
  properties: number;
  image: string;
};

export const neighborhoods: Neighborhood[] = [
  {
    name: "Palm Jumeirah",
    description:
      "The world's most iconic man-made archipelago, home to ultra-luxury beachfront villas and penthouses.",
    properties: 128,
    image: images.palmAerial,
  },
  {
    name: "Downtown Dubai",
    description:
      "The vibrant centre of the city, framed by the Burj Khalifa and The Dubai Mall.",
    properties: 214,
    image: images.downtownSkyline,
  },
  {
    name: "Dubai Hills Estate",
    description:
      "A master-planned green community of golf-front villas and contemporary townhouses.",
    properties: 96,
    image: images.golfEstate,
  },
  {
    name: "Dubai Marina",
    description:
      "Waterfront living defined by soaring towers, yacht berths, and a vibrant promenade.",
    properties: 172,
    image: images.marinaSkyline,
  },
  {
    name: "Emirates Hills",
    description:
      "An exclusive gated community of grand mansions surrounding the Montgomerie golf course.",
    properties: 64,
    image: images.mansion,
  },
  {
    name: "Bluewaters Island",
    description:
      "A boutique island destination with luxury residences and unmatched sea views.",
    properties: 48,
    image: images.apartmentInterior,
  },
  {
    name: "Jumeirah Bay",
    description:
      "Seaside luxury living with contemporary villas along Dubai's pristine coastline.",
    properties: 82,
    image: images.villaExterior,
  },
];

export const faqs = [
  {
    q: "Why invest in Dubai real estate?",
    a: "Dubai offers zero property tax, high rental yields averaging 6–8%, and a stable dirham pegged to the US dollar. With long-term residency visas available for property owners, it remains one of the world's most attractive markets for high-net-worth investors.",
  },
  {
    q: "Can foreigners buy property in Dubai?",
    a: "Yes. Foreign nationals can purchase freehold property in designated areas across Dubai, including Palm Jumeirah, Downtown, Dubai Marina, and Dubai Hills. The process is straightforward and fully regulated by the Dubai Land Department.",
  },
  {
    q: "What is the minimum investment for a Golden Visa?",
    a: "A 10-year Golden Visa is granted to property investors purchasing real estate valued at AED 2 million or above. Da Reality's specialists will guide you through eligibility and the full application process.",
  },
  {
    q: "Are there additional costs beyond the purchase price?",
    a: "Buyers should budget approximately 4% for the Dubai Land Department transfer fee, plus a nominal admin fee and agent commission if applicable. We provide a transparent cost breakdown before any commitment.",
  },
  {
    q: "How does Da Reality assist with off-plan investments?",
    a: "We offer exclusive early access to off-plan launches from top developers, often at preferred pricing. Our team conducts due diligence on every project and manages the full reservation and payment-plan process end-to-end.",
  },
];

export const pillars = [
  {
    number: "01",
    title: "Curated Excellence",
    description:
      "Every property in our portfolio is hand-selected for architectural merit, investment potential, and uncompromising quality.",
  },
  {
    number: "02",
    title: "Bespoke Advisory",
    description:
      "We don't sell listings — we craft strategies. Each client receives a tailored investment roadmap built on deep market intelligence.",
  },
  {
    number: "03",
    title: "Discreet & Dedicated",
    description:
      "A single point of contact from first viewing to handover, ensuring absolute confidentiality and seamless execution.",
  },
];

export const whyChooseUs = [
  {
    title: "Exclusive Access",
    description:
      "Preferred pricing and early access to off-plan launches from Dubai's top developers, before public release.",
  },
  {
    title: "Investment Expertise",
    description:
      "Data-driven guidance on ROI, capital appreciation, and payment plans — maximising your investment returns.",
  },
  {
    title: "Full Transparency",
    description:
      "No hidden fees. We provide a complete cost breakdown and handle due diligence on every property.",
  },
  {
    title: "End-to-End Service",
    description:
      "From viewing to handover and beyond — a dedicated advisor manages every step of your journey.",
  },
];

export const stats = [
  { value: "AED 2.4B+", label: "Property Sold" },
  { value: "500+", label: "Clients Served" },
  { value: "15+", label: "Years in Dubai" },
  { value: "98%", label: "Client Retention" },
];

export const developers = ["EMAAR", "DAMAC", "NAKHEEL", "SOBHA", "MERAAS", "OMNIYAT"];

export const contact = {
  address: "Boulevard Plaza, Level 14, Downtown Dubai, United Arab Emirates",
  phone: "+971 4 123 4567",
  email: "concierge@dareality.ae",
  hours: "Monday – Saturday: 9:00 – 18:00 / Friday: 14:00 – 18:00",
};

export const propertyTypes = ["Villa", "Penthouse", "Apartment", "Townhouse", "Mansion"];
export const budgetRanges = ["AED 2M – 5M", "AED 5M – 10M", "AED 10M – 25M", "AED 25M+"];
