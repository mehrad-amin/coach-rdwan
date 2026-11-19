import { normalizeLocale } from "@/i18n/config";
import ar from "@/i18n/dictionaries/ar";
import en from "@/i18n/dictionaries/en";

const DICTIONARIES = { ar, en };

export function getDictionary(locale) {
  return DICTIONARIES[normalizeLocale(locale)];
}
