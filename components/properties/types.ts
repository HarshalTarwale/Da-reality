export type MockProperty = {
  id: string;
  title: string;
  price: number;
  area: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  status: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  reference: string;
};

export const propertyTypeOptions = ["All", "Apartment", "Villa", "Townhouse", "Penthouse", "Duplex"];

export const bedroomOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];

export const communityOptions = [
  "All",
  "Downtown Dubai",
  "Dubai Marina",
  "Business Bay",
  "Palm Jumeirah",
  "Dubai Hills Estate",
  "JVC",
  "Arabian Ranches",
];

export const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"] as const;

export type SortOption = (typeof sortOptions)[number];

export type Filters = {
  propertyType: string;
  bedrooms: string;
  community: string;
  minPrice: string;
  maxPrice: string;
  sort: SortOption;
};

export const defaultFilters: Filters = {
  propertyType: "All",
  bedrooms: "Any",
  community: "All",
  minPrice: "",
  maxPrice: "",
  sort: "Newest",
};
