export const DEFAULT_LOCALE = "ar";
export const SUPPORTED_LOCALES = ["ar", "en"];

export const LOCALE_COOKIE = "rdwan_locale";
export const LOCALE_STORAGE_KEY = "rdwan_locale";

/**
 * Configurable coach display names.
 * Update the Arabic spelling here if the client confirms a different preference.
 */
export const BRAND_NAMES = {
  ar: "رضوان",
  en: "RDWAN",
};

export function isSupportedLocale(value) {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value);
}

export function normalizeLocale(value) {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

export function getDirection(locale) {
  return normalizeLocale(locale) === "ar" ? "rtl" : "ltr";
}
