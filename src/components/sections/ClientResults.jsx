"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";
import { TRANSFORMATIONS_CONFIG } from "@/data/transformations";

/**
 * Client Results / Transformations Section
 *
 * Designed to showcase real before/after client transformations under Coach Rdwan.
 * STRICT POLICY: Hidden from the public website until authentic client photographs are supplied.
 */
export default function ClientResults({ className = "" }) {
  const { t, locale } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Keep completely hidden from the public DOM if disabled or if no authentic photographs exist
  if (!TRANSFORMATIONS_CONFIG.isEnabled || !TRANSFORMATIONS_CONFIG.items.length) {
    return null;
  }

  const results = t?.clientResults || {
    heading: locale === "ar" ? "نتائج المتدربين" : "Client Results",
    subtitle:
      locale === "ar"
        ? "رحلة من الالتزام إلى النتائج"
        : "Progress built through consistency and commitment.",
    allTab: locale === "ar" ? "الكل" : "All",
    beforeLabel: locale === "ar" ? "قبل" : "Before",
    afterLabel: locale === "ar" ? "بعد" : "After",
  };

  const filteredItems =
    selectedCategory === "all"
      ? TRANSFORMATIONS_CONFIG.items
      : TRANSFORMATIONS_CONFIG.items.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="results"
      aria-labelledby="client-results-heading"
      className={[
        "relative w-full overflow-hidden bg-background scroll-mt-10 sm:scroll-mt-16",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-wide)]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2
              id="client-results-heading"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15]"
            >
              {results.heading}
            </h2>
            <p className="section-subtitle mt-2 sm:mt-3">{results.subtitle}</p>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label={results.heading}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {TRANSFORMATIONS_CONFIG.categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-5 py-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-brand text-foreground shadow-[0_4px_16px_rgba(255,35,50,0.35)]"
                        : "bg-surface text-muted hover:text-foreground border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {cat.label[locale] || cat.label.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transformations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="surface-card-bordered overflow-hidden rounded-2xl flex flex-col justify-between"
              >
                {/* Before / After Dual Image Container */}
                <div className="grid grid-cols-2 gap-1 p-2 bg-black/40">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900">
                    {item.beforeImage && (
                      <Image
                        src={item.beforeImage}
                        alt={`${item.athleteName || "Client"} - ${results.beforeLabel}`}
                        fill
                        className="object-cover"
                      />
                    )}
                    <span className="absolute bottom-2 start-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold uppercase text-foreground">
                      {results.beforeLabel}
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900">
                    {item.afterImage && (
                      <Image
                        src={item.afterImage}
                        alt={`${item.athleteName || "Client"} - ${results.afterLabel}`}
                        fill
                        className="object-cover"
                      />
                    )}
                    <span className="absolute bottom-2 start-2 bg-brand/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold uppercase text-foreground">
                      {results.afterLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content & Stats */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                        {item.athleteName}
                      </h3>
                      {item.durationMonths && (
                        <span className="text-xs font-sans text-brand font-semibold">
                          {item.durationMonths} {locale === "ar" ? "أشهر" : "months"}
                        </span>
                      )}
                    </div>
                    {item.caption?.[locale] && (
                      <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                        {item.caption[locale]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
