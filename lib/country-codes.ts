/**
 * Dialling codes for the phone inputs. UAE first (primary market), then the
 * GCC and the markets Dubai buyers most commonly come from, then the rest
 * alphabetically.
 */
export type CountryCode = {
  /** ISO 3166-1 alpha-2, used as the stable option value. */
  iso: string;
  name: string;
  dial: string;
  flag: string;
};

export const countryCodes: CountryCode[] = [
  { iso: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { iso: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { iso: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { iso: "BH", name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { iso: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
  { iso: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { iso: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { iso: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { iso: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { iso: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { iso: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { iso: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { iso: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { iso: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { iso: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { iso: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { iso: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { iso: "IR", name: "Iran", dial: "+98", flag: "🇮🇷" },
  { iso: "IQ", name: "Iraq", dial: "+964", flag: "🇮🇶" },
  { iso: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { iso: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { iso: "KZ", name: "Kazakhstan", dial: "+7", flag: "🇰🇿" },
  { iso: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { iso: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { iso: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { iso: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { iso: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { iso: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { iso: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { iso: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { iso: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { iso: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { iso: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { iso: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { iso: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { iso: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
];

export const defaultCountryIso = "AE";
