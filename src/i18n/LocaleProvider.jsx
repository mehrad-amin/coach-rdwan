"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  getDirection,
  normalizeLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";

const LocaleContext = createContext(null);

function persistLocale(locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Ignore cookie errors in restricted contexts
  }
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function LocaleProvider({ initialLocale = DEFAULT_LOCALE, children }) {
  const [locale, setLocaleState] = useState(() => normalizeLocale(initialLocale));

  const dir = getDirection(locale);
  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    if (
      window.location.pathname === "/" &&
      dictionary?.metadata?.titleDefault
    ) {
      document.title = dictionary.metadata.titleDefault;
    }
  }, [locale, dir, dictionary]);

  const setLocale = useCallback((nextLocale) => {
    const normalized = normalizeLocale(nextLocale);
    setLocaleState((prev) => {
      if (prev === normalized) return prev;
      persistLocale(normalized);
      return normalized;
    });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      persistLocale(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir,
      isRtl: dir === "rtl",
      t: dictionary,
      setLocale,
      toggleLocale,
    }),
    [locale, dir, dictionary, setLocale, toggleLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
