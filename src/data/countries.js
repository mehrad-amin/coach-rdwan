/**
 * Supported Countries and Phone Number Utilities for Athlete Registration
 *
 * Strictly limited to the 18 designated countries.
 * Saudi Arabia (+966) is the default country.
 */

export const SUPPORTED_COUNTRIES = [
  {
    id: "SA",
    name: {
      ar: "المملكة العربية السعودية",
      en: "Saudi Arabia",
    },
    dialCode: "966",
    callingCode: "+966",
    flag: "🇸🇦",
    placeholder: "50 000 0000",
    minDigits: 9,
    maxDigits: 9,
    leadingPrefixRegex: /^5/,
  },
  {
    id: "AE",
    name: {
      ar: "الإمارات العربية المتحدة",
      en: "United Arab Emirates",
    },
    dialCode: "971",
    callingCode: "+971",
    flag: "🇦🇪",
    placeholder: "50 000 0000",
    minDigits: 9,
    maxDigits: 9,
    leadingPrefixRegex: /^5/,
  },
  {
    id: "KW",
    name: {
      ar: "الكويت",
      en: "Kuwait",
    },
    dialCode: "965",
    callingCode: "+965",
    flag: "🇰🇼",
    placeholder: "5000 0000",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    id: "BH",
    name: {
      ar: "البحرين",
      en: "Bahrain",
    },
    dialCode: "973",
    callingCode: "+973",
    flag: "🇧🇭",
    placeholder: "3000 0000",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    id: "QA",
    name: {
      ar: "قطر",
      en: "Qatar",
    },
    dialCode: "974",
    callingCode: "+974",
    flag: "🇶🇦",
    placeholder: "3000 0000",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    id: "OM",
    name: {
      ar: "عُمان",
      en: "Oman",
    },
    dialCode: "968",
    callingCode: "+968",
    flag: "🇴🇲",
    placeholder: "9000 0000",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    id: "JO",
    name: {
      ar: "الأردن",
      en: "Jordan",
    },
    dialCode: "962",
    callingCode: "+962",
    flag: "🇯🇴",
    placeholder: "79 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "IQ",
    name: {
      ar: "العراق",
      en: "Iraq",
    },
    dialCode: "964",
    callingCode: "+964",
    flag: "🇮🇶",
    placeholder: "770 000 0000",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    id: "EG",
    name: {
      ar: "مصر",
      en: "Egypt",
    },
    dialCode: "20",
    callingCode: "+20",
    flag: "🇪🇬",
    placeholder: "10 0000 0000",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    id: "LB",
    name: {
      ar: "لبنان",
      en: "Lebanon",
    },
    dialCode: "961",
    callingCode: "+961",
    flag: "🇱🇧",
    placeholder: "70 000 000",
    minDigits: 7,
    maxDigits: 8,
  },
  {
    id: "SY",
    name: {
      ar: "سوريا",
      en: "Syria",
    },
    dialCode: "963",
    callingCode: "+963",
    flag: "🇸🇾",
    placeholder: "93 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "PS",
    name: {
      ar: "فلسطين",
      en: "Palestine",
    },
    dialCode: "970",
    callingCode: "+970",
    flag: "🇵🇸",
    placeholder: "59 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "YE",
    name: {
      ar: "اليمن",
      en: "Yemen",
    },
    dialCode: "967",
    callingCode: "+967",
    flag: "🇾🇪",
    placeholder: "77 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "MA",
    name: {
      ar: "المغرب",
      en: "Morocco",
    },
    dialCode: "212",
    callingCode: "+212",
    flag: "🇲🇦",
    placeholder: "60 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "DZ",
    name: {
      ar: "الجزائر",
      en: "Algeria",
    },
    dialCode: "213",
    callingCode: "+213",
    flag: "🇩🇿",
    placeholder: "60 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "TN",
    name: {
      ar: "تونس",
      en: "Tunisia",
    },
    dialCode: "216",
    callingCode: "+216",
    flag: "🇹🇳",
    placeholder: "20 000 000",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    id: "LY",
    name: {
      ar: "ليبيا",
      en: "Libya",
    },
    dialCode: "218",
    callingCode: "+218",
    flag: "🇱🇾",
    placeholder: "91 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    id: "SD",
    name: {
      ar: "السودان",
      en: "Sudan",
    },
    dialCode: "249",
    callingCode: "+249",
    flag: "🇸🇩",
    placeholder: "91 000 0000",
    minDigits: 9,
    maxDigits: 9,
  },
];

export const DEFAULT_COUNTRY_ID = "SA";

/**
 * Get country definition by ID
 */
export function getCountryById(countryId) {
  return (
    SUPPORTED_COUNTRIES.find((c) => c.id === countryId) ||
    SUPPORTED_COUNTRIES[0]
  );
}

/**
 * Convert Eastern Arabic numerals (٠-٩) and Persian numerals (۰-۹) to ASCII (0-9)
 */
export function convertArabicToAscii(str) {
  if (!str) return "";
  return String(str)
    .replace(/[٠۰]/g, "0")
    .replace(/[١۱]/g, "1")
    .replace(/[٢۲]/g, "2")
    .replace(/[٣۳]/g, "3")
    .replace(/[٤۴]/g, "4")
    .replace(/[٥۵]/g, "5")
    .replace(/[٦۶]/g, "6")
    .replace(/[٧۷]/g, "7")
    .replace(/[٨۸]/g, "8")
    .replace(/[٩۹]/g, "9");
}

/**
 * Clean phone input: convert Arabic numerals, remove spaces, dashes, parens, dots, slashes.
 */
export function cleanPhoneInput(input) {
  if (!input) return "";
  const ascii = convertArabicToAscii(input);
  // Keep leading + if present, strip all spaces, hyphens, brackets, dots
  const hasPlus = ascii.trim().startsWith("+");
  const digitsOnly = ascii.replace(/\D/g, "");
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
}

/**
 * Normalize a phone number using the selected country calling code.
 *
 * Rules:
 * 1. Convert Arabic numerals to ASCII.
 * 2. Strip spaces, hyphens, parentheses, etc.
 * 3. If starts with "+" or "00", check if it already begins with one of the 18 supported country calling codes:
 *    - If so, do NOT duplicate prefix.
 * 4. If digits start directly with the selected country's dial code (or another supported country code),
 *    and the length matches full international number:
 *    - Do NOT duplicate prefix.
 * 5. Otherwise, treat as subscriber number:
 *    - Strip leading "0" (e.g., 0551234567 -> 551234567, 0501234567 -> 501234567).
 *    - Prepend selected country's calling code (e.g., +966551234567).
 *
 * Returns:
 * {
 *   normalized: string, // e.g. "+966551234567"
 *   countryId: string,   // e.g. "SA"
 *   subscriberNumber: string, // e.g. "551234567"
 *   isValid: boolean,
 * }
 */
export function normalizePhoneNumber(rawInput, selectedCountryId = DEFAULT_COUNTRY_ID) {
  const selectedCountry = getCountryById(selectedCountryId);
  const cleaned = cleanPhoneInput(rawInput);

  if (!cleaned) {
    return {
      normalized: "",
      countryId: selectedCountry.id,
      subscriberNumber: "",
      isValid: false,
    };
  }

  // Sort countries by dial code length descending so longer codes (e.g. 966) match before shorter ones (e.g. 20)
  const sortedCountries = [...SUPPORTED_COUNTRIES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length
  );

  let digits = cleaned.replace(/\D/g, "");
  let matchedCountry = null;
  let subscriber = "";

  // 1. User explicitly entered +...
  if (cleaned.startsWith("+")) {
    for (const c of sortedCountries) {
      if (digits.startsWith(c.dialCode)) {
        matchedCountry = c;
        subscriber = digits.slice(c.dialCode.length);
        break;
      }
    }
    // If + was entered but didn't match any supported country, check if user typed + followed by local number
    if (!matchedCountry) {
      matchedCountry = selectedCountry;
      subscriber = digits.startsWith("0") ? digits.slice(1) : digits;
    }
  }
  // 2. User explicitly entered 00...
  else if (cleaned.startsWith("00")) {
    const after00 = digits.slice(2);
    for (const c of sortedCountries) {
      if (after00.startsWith(c.dialCode)) {
        matchedCountry = c;
        subscriber = after00.slice(c.dialCode.length);
        break;
      }
    }
    if (!matchedCountry) {
      matchedCountry = selectedCountry;
      subscriber = after00.startsWith("0") ? after00.slice(1) : after00;
    }
  }
  // 3. User entered number without + or 00
  else {
    // Check if user entered full number starting with selected country dial code (e.g. "966551234567")
    if (digits.startsWith(selectedCountry.dialCode)) {
      const rest = digits.slice(selectedCountry.dialCode.length);
      // Verify rest length looks like subscriber number for this country
      if (rest.length >= selectedCountry.minDigits - 1 && rest.length <= selectedCountry.maxDigits + 1) {
        matchedCountry = selectedCountry;
        subscriber = rest;
      }
    }

    // Check if user entered full number starting with another supported country dial code
    if (!matchedCountry) {
      for (const c of sortedCountries) {
        if (digits.startsWith(c.dialCode)) {
          const rest = digits.slice(c.dialCode.length);
          if (rest.length === c.minDigits || rest.length === c.maxDigits) {
            matchedCountry = c;
            subscriber = rest;
            break;
          }
        }
      }
    }

    // If not matching a full international number, treat as subscriber number with selected country
    if (!matchedCountry) {
      matchedCountry = selectedCountry;
      // Strip leading zero if present (e.g. 0551234567 -> 551234567)
      subscriber = digits.startsWith("0") ? digits.slice(1) : digits;
    }
  }

  // Strip any accidental leading zero from subscriber number
  if (subscriber.startsWith("0") && subscriber.length > 1) {
    subscriber = subscriber.slice(1);
  }

  const normalized = `+${matchedCountry.dialCode}${subscriber}`;

  // Validation: check subscriber length against country rules
  const isValid =
    subscriber.length >= matchedCountry.minDigits &&
    subscriber.length <= matchedCountry.maxDigits;

  return {
    normalized,
    countryId: matchedCountry.id,
    subscriberNumber: subscriber,
    isValid,
  };
}

/**
 * Validate phone number for form validation.
 * Returns true if valid, false otherwise.
 */
export function validatePhoneNumber(rawInput, selectedCountryId = DEFAULT_COUNTRY_ID) {
  if (!rawInput || !String(rawInput).trim()) return false;
  const result = normalizePhoneNumber(rawInput, selectedCountryId);
  return result.isValid;
}
