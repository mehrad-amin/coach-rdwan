"use client";

import { useState, useRef, useCallback } from "react";
import CtaButton from "@/components/ui/CtaButton";
import { PRICING_CONFIG } from "@/data/pricing";
import { useLocale } from "@/i18n/LocaleProvider";

function FeatureCheckIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function TrainingPrograms({ className = "" }) {
  const { t, dir } = useLocale();
  const pricing = t.pricing;
  const isRtl = dir === "rtl";

  const plans = PRICING_CONFIG.plans.map((plan) => {
    const localized = pricing.plans[plan.id];
    return {
      ...plan,
      name: localized.name,
      description: localized.description,
      features: localized.features,
      cta: localized.cta,
    };
  });

  const totalPlans = plans.length;

  // Mobile / Tablet Coverflow Carousel State (Initial active card: Performance Coaching, index 1)
  const [activeIndex, setActiveIndex] = useState(
    PRICING_CONFIG.defaultActiveIndex,
  );

  // Gesture handling refs
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const isDragging = useRef(false);
  const didSwipe = useRef(false);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalPlans) % totalPlans);
  }, [totalPlans]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPlans);
  }, [totalPlans]);

  // Pointer / Touch handlers for fluid swipe on mobile and tablet (direction-aware for RTL & LTR)
  const handlePointerDown = (e) => {
    if (e.target instanceof Element && e.target.closest("a, button")) {
      return;
    }
    isDragging.current = true;
    didSwipe.current = false;
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 35;
    const delta = dragDeltaX.current;

    if (Math.abs(delta) > threshold) {
      didSwipe.current = true;
      // LTR: swipe left (delta < 0) advances to Next (right); RTL: swipe right (delta > 0) advances to Next (left)
      const shouldAdvance = isRtl ? delta > threshold : delta < -threshold;
      if (shouldAdvance) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    dragDeltaX.current = 0;
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    dragDeltaX.current = 0;
  };

  const directionMultiplier = isRtl ? -1 : 1;

  return (
    <section
      id="services"
      aria-labelledby="training-programs-title"
      className={[
        "relative w-full overflow-x-clip bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-pricing)]">
          {/* Header Block: Display Title, Subtitle & Student Discount */}
          <div className="text-center">
            <h2
              id="training-programs-title"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15] rtl:leading-[1.24]"
            >
              {pricing.heading}
            </h2>
            <p className="section-subtitle mt-2 sm:mt-3">{pricing.subtitle}</p>
            <div className="mt-4 flex justify-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-surface px-4 py-1.5 font-sans text-xs font-semibold text-foreground sm:text-sm ltr:tracking-[0.06em]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <span>{pricing.studentDiscount}</span>
              </p>
            </div>
          </div>

          {/* ==============================================================
              1. DESKTOP VIEW (>= 1024px / lg: and desktop: 1440px)
              Preserves the approved 3-card Figma geometry:
              - Side cards: 302px wide, surface-card-bordered
              - Center featured card: 302px wide, surface-card-featured (+56px taller)
              - 63px gap on desktop (1032px rail)
             ============================================================== */}
          <div
            className="mt-10 hidden sm:mt-12 lg:mt-14 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-[63px] desktop:mt-[60px]"
            role="list"
            aria-label={pricing.desktopListLabel}
          >
            {plans.map((pkg) => {
              const isFeatured = pkg.featured;
              return (
                <div
                  key={`desktop-${pkg.id}`}
                  role="listitem"
                  className={[
                    "relative flex w-[302px] shrink-0 flex-col items-center justify-between text-center transition-all duration-300",
                    isFeatured
                      ? "surface-card-featured z-10 min-h-[532px] pt-[56px] pb-[56px] shadow-[0_12px_40px_rgba(255,35,50,0.18)]"
                      : "surface-card-bordered z-0 min-h-[476px] pt-[33.5px] pb-[33.5px]",
                  ].join(" ")}
                >
                  {/* Top Text & Features Group */}
                  <div className="flex w-full flex-col items-center px-6">
                    <h3 className="font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">
                      {pkg.name}
                    </h3>

                    <div className="mt-3.5 flex items-baseline justify-center gap-1.5 sm:mt-4">
                      <span
                        dir="ltr"
                        className={[
                          "font-display text-4xl font-bold leading-none sm:text-5xl lg:text-[52px] desktop:text-[56px]",
                          isFeatured ? "text-brand" : "text-foreground",
                        ].join(" ")}
                      >
                        {pkg.priceAmount}
                      </span>
                      <span
                        className={[
                          "font-sans text-base font-semibold leading-none sm:text-lg",
                          isFeatured ? "text-brand/90" : "text-foreground/80",
                        ].join(" ")}
                      >
                        {pricing.currency}
                      </span>
                    </div>

                    <span className="mt-2.5 font-sans text-xs font-normal leading-normal text-muted sm:text-sm">
                      {pricing.period}
                    </span>

                    <p className="mt-2.5 max-w-[250px] text-pretty font-sans text-xs leading-relaxed text-muted sm:text-[0.8125rem] rtl:leading-[1.7]">
                      {pkg.description}
                    </p>

                    <ul className="mt-4 w-full space-y-2 border-t border-white/10 pt-4 text-start">
                      {pkg.features.map((feature, featureIndex) => (
                        <li
                          key={`${pkg.id}-desktop-feat-${featureIndex}`}
                          className="flex items-start gap-2 font-sans text-xs leading-snug text-foreground/85 rtl:leading-[1.55]"
                        >
                          <FeatureCheckIcon />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action Button */}
                  <div className="mt-6 flex w-full justify-center px-6">
                    <CtaButton
                      href={pkg.href}
                      size="compact"
                      onClick={() => {
                        try {
                          sessionStorage.setItem("pt_selected_plan", pkg.id);
                        } catch {}
                      }}
                      aria-label={pricing.ctaAriaLabel(
                        pkg.cta,
                        pkg.name,
                        pkg.priceAmount,
                        pricing.currency,
                        pricing.period,
                      )}
                      className="min-w-[121px] px-6"
                    >
                      {pkg.cta}
                    </CtaButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==============================================================
              2. MOBILE & TABLET COVERFLOW CAROUSEL (< 1024px)
              - 1 prominent active center card (scale 1.0, full opacity, z-25)
              - 2 scaled neighbor cards partially visible on sides (direction-aware RTL/LTR)
              - Smooth touch swipe, click-to-activate, and pagination controls
              - 0px horizontal page overflow guaranteed
             ============================================================== */}
          <div className="mt-8 block lg:hidden">
            {/* Carousel Stage Container */}
            <div
              className="relative mx-auto h-[535px] w-full max-w-[480px] select-none touch-pan-y overflow-hidden sm:h-[550px]"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              role="region"
              aria-roledescription="carousel"
              aria-label={pricing.carouselLabel}
            >
              {plans.map((pkg, idx) => {
                // Determine logical slot relative to active index: -1 (Previous), 0 (Active), +1 (Next)
                const diff = (idx - activeIndex + totalPlans) % totalPlans;
                const slot = diff === 0 ? 0 : diff === 1 ? 1 : -1;

                const isActive = slot === 0;
                const isFeatured = pkg.featured;

                // Direction-aware horizontal offset:
                // LTR: Prev (-1) -> -135px (Left), Next (+1) -> +135px (Right)
                // RTL: Prev (-1) -> +135px (Right), Next (+1) -> -135px (Left)
                const offsetX = slot * 135 * directionMultiplier;
                const transformStyle = isActive
                  ? "translate(-50%, -50%) scale(1)"
                  : `translate(calc(-50% + ${offsetX}px), -50%) scale(0.85)`;
                const opacityStyle = isActive ? 1 : 0.72;
                const zIndexStyle = isActive ? 25 : 10;

                return (
                  <div
                    key={`mobile-${pkg.id}`}
                    data-plan-id={pkg.id}
                    data-slot={slot}
                    data-active={isActive ? "true" : "false"}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={pricing.slideOfLabel(
                      idx + 1,
                      totalPlans,
                      pkg.name,
                    )}
                    aria-hidden={!isActive}
                    onClick={() => {
                      if (didSwipe.current) {
                        didSwipe.current = false;
                        return;
                      }
                      if (!isActive) {
                        setActiveIndex(idx);
                      }
                    }}
                    style={{
                      transform: transformStyle,
                      opacity: opacityStyle,
                      zIndex: zIndexStyle,
                    }}
                    className={[
                      "absolute top-1/2 left-1/2 w-[275px] origin-center sm:w-[295px]",
                      "flex flex-col items-center justify-between text-center",
                      "transition-all duration-500 ease-out",
                      isActive
                        ? isFeatured
                          ? "surface-card-featured min-h-[480px] py-7 shadow-[0_12px_40px_rgba(255,35,50,0.22)] sm:min-h-[495px]"
                          : "surface-card-bordered min-h-[452px] py-6 shadow-[var(--shadow-card)] sm:min-h-[465px]"
                        : isFeatured
                          ? "surface-card-featured min-h-[480px] cursor-pointer py-7 sm:min-h-[495px]"
                          : "surface-card-bordered min-h-[452px] cursor-pointer py-6 sm:min-h-[465px]",
                    ].join(" ")}
                  >
                    {/* Content */}
                    <div className="flex w-full flex-col items-center px-5">
                      <h3 className="font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">
                        {pkg.name}
                      </h3>

                      <div className="mt-3 flex items-baseline justify-center gap-1.5">
                        <span
                          dir="ltr"
                          className={[
                            "font-display text-4xl font-bold leading-none sm:text-5xl",
                            isFeatured ? "text-brand" : "text-foreground",
                          ].join(" ")}
                        >
                          {pkg.priceAmount}
                        </span>
                        <span
                          className={[
                            "font-sans text-sm font-semibold leading-none sm:text-base",
                            isFeatured ? "text-brand/90" : "text-foreground/80",
                          ].join(" ")}
                        >
                          {pricing.currency}
                        </span>
                      </div>

                      <span className="mt-2 font-sans text-xs font-normal leading-normal text-muted sm:text-sm">
                        {pricing.period}
                      </span>

                      <p className="mt-2 max-w-[235px] text-pretty font-sans text-xs leading-relaxed text-muted rtl:leading-[1.65]">
                        {pkg.description}
                      </p>

                      <ul className="mt-3.5 w-full space-y-1.5 border-t border-white/10 pt-3.5 text-start">
                        {pkg.features.map((feature, featureIndex) => (
                          <li
                            key={`${pkg.id}-mobile-feat-${featureIndex}`}
                            className="flex items-start gap-2 font-sans text-[0.75rem] leading-snug text-foreground/85 rtl:leading-[1.5]"
                          >
                            <FeatureCheckIcon />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-5 flex w-full justify-center px-5">
                      <CtaButton
                        href={pkg.href}
                        size="compact"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => {
                          try {
                            sessionStorage.setItem("pt_selected_plan", pkg.id);
                          } catch {}
                        }}
                        aria-label={pricing.ctaAriaLabel(
                          pkg.cta,
                          pkg.name,
                          pkg.priceAmount,
                          pricing.currency,
                          pricing.period,
                        )}
                        className="min-w-[121px] px-6"
                      >
                        {pkg.cta}
                      </CtaButton>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls & Indicator Dots */}
            <div className="mt-4 flex items-center justify-center gap-4">
              {/* Previous Button (Left in LTR pointing <, Right in RTL pointing >) */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={pricing.prevLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                <svg
                  className="h-4 w-4 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Indicator Dots */}
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label={pricing.paginationLabel}
              >
                {plans.map((pkg, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={`dot-${pkg.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={pricing.slideOfLabel(
                        idx + 1,
                        totalPlans,
                        pkg.name,
                      )}
                      onClick={() => setActiveIndex(idx)}
                      className={[
                        "h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand",
                        isActive
                          ? "w-6 bg-brand"
                          : "w-2 bg-muted/50 hover:bg-muted",
                      ].join(" ")}
                    />
                  );
                })}
              </div>

              {/* Next Button (Right in LTR pointing >, Left in RTL pointing <) */}
              <button
                type="button"
                onClick={handleNext}
                aria-label={pricing.nextLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                <svg
                  className="h-4 w-4 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
