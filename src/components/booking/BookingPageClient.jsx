"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import BookingForm from "@/components/booking/BookingForm";

export default function BookingPageClient() {
  const { t, locale, setLocale } = useLocale();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand selection:text-foreground overflow-x-hidden">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/85 backdrop-blur-md">
        <div className="section-shell">
          <div className="mx-auto flex h-20 w-full max-w-[var(--container-wide)] items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-wider">
                {t.navbar.brandName}
              </span>
            </Link>

            {/* Header Right: Language Switcher + Back to Home */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Language Switcher */}
              <div
                role="group"
                aria-label={t.navbar.languageSwitcherLabel}
                className="lang-switcher"
              >
                <button
                  type="button"
                  lang="ar"
                  aria-pressed={locale === "ar"}
                  onClick={() => setLocale("ar")}
                  className="lang-option"
                >
                  العربية
                </button>
                <button
                  type="button"
                  lang="en"
                  aria-pressed={locale === "en"}
                  onClick={() => setLocale("en")}
                  className="lang-option"
                >
                  EN
                </button>
              </div>

              {/* Back to Home Link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 sm:px-4 py-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground hover:border-white/30 transition-all focus-visible:outline-2 focus-visible:outline-brand cursor-pointer group"
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0 transition-transform rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
                </svg>
                <span>{t.booking.header.backToHome}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-10 sm:py-16">
        <div className="section-shell">
          <div className="mx-auto w-full max-w-[var(--container-wide)]">
            {/* Page Header Introduction */}
            <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
              <span className="inline-block text-xs uppercase font-display font-bold tracking-widest text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-full mb-3">
                {t.booking.intro.badge}
              </span>
              <h1 className="font-display font-extrabold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground">
                {t.booking.intro.title}
              </h1>
              <p className="mt-3 font-sans text-base sm:text-lg text-muted leading-relaxed">
                {t.booking.intro.description}
              </p>
            </div>

            {/* Interactive Multi-step Form */}
            <BookingForm />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-muted font-sans">
        <div className="section-shell">
          <p>
            {t.booking.footer.copyright(new Date().getFullYear())}
          </p>
        </div>
      </footer>
    </div>
  );
}
