"use client";

import { useState, useRef, useCallback } from "react";
import CtaButton from "@/components/ui/CtaButton";
import { PRICING_CONFIG, getExactPrice } from "@/data/pricing";
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

  // State: Duration ('1_month' | '3_months') & Student discount (true | false)
  const [selectedDuration, setSelectedDuration] = useState("1_month");
  const [isStudent, setIsStudent] = useState(false);

  // Mobile / Tablet Coverflow Carousel State (Initial active card: Powerlifting, index 0)
  const [activeIndex, setActiveIndex] = useState(0);

  const programs = PRICING_CONFIG.programs.map((prog) => {
    const localized = pricing.programs[prog.id] || {};
    const priceAmount = getExactPrice(prog.id, selectedDuration, isStudent);

    const bookingHref = `/booking?program=${prog.id}&duration=${selectedDuration}&student=${
      isStudent ? "yes" : "no"
    }`;

    return {
      ...prog,
      name: localized.name || prog.id,
      description: localized.description || "",
      features: localized.features || [],
      cta: localized.cta || (isRtl ? "ابدأ الآن" : "Start Now"),
      badge: localized.badge || null,
      priceAmount,
      bookingHref,
    };
  });

  const totalPrograms = programs.length;

  // Gesture handling refs
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const isDragging = useRef(false);
  const didSwipe = useRef(false);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalPrograms) % totalPrograms);
  }, [totalPrograms]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPrograms);
  }, [totalPrograms]);

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

  const handleProgramSelect = (programId) => {
    try {
      sessionStorage.setItem("pt_selected_program", programId);
      sessionStorage.setItem("pt_selected_duration", selectedDuration);
      sessionStorage.setItem("pt_is_student", isStudent ? "yes" : "no");
      sessionStorage.setItem("pt_selected_plan", programId);
    } catch {}
  };

  const durationLabel =
    selectedDuration === "1_month"
      ? pricing.durationLabels["1_month"]
      : pricing.durationLabels["3_months"];

  const directionMultiplier = isRtl ? -1 : 1;

  return (
    <section
      id="services"
      aria-labelledby="training-programs-title"
      className={[
        "relative w-full overflow-x-clip bg-background scroll-mt-10 sm:scroll-mt-16",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-pricing)]">
          {/* Header Block: Title, Subtitle, Duration Selector & Student Discount */}
          <div className="text-center">
            <h2
              id="training-programs-title"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15] rtl:leading-[1.24]"
            >
              {pricing.heading}
            </h2>
            <p className="section-subtitle mt-2 sm:mt-3">{pricing.subtitle}</p>

            {/* Interactive Controls Bar: Duration Selector & Student Discount Toggle */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Duration Segmented Control */}
              <div
                role="radiogroup"
                aria-label={pricing.durationAriaLabel || "Select subscription duration"}
                className="inline-flex items-center rounded-full border border-white/10 bg-[#141414] p-1.5 shadow-inner"
              >
                {PRICING_CONFIG.durations.map((dur) => {
                  const active = selectedDuration === dur.id;
                  const label = pricing.durationLabels[dur.id];
                  return (
                    <button
                      key={dur.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`relative rounded-full px-5 py-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? "bg-brand text-foreground shadow-[0_2px_12px_rgba(255,35,50,0.4)]"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Student Discount Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isStudent}
                onClick={() => setIsStudent((prev) => !prev)}
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isStudent
                    ? "border-brand bg-brand/10 text-foreground shadow-[0_0_15px_rgba(255,35,50,0.2)]"
                    : "border-white/10 bg-[#141414] text-muted hover:text-foreground hover:border-white/20"
                }`}
              >
                {/* Visual Switch Indicator */}
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out ${
                    isStudent ? "bg-brand" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      isStudent
                        ? isRtl
                          ? "-translate-x-4"
                          : "translate-x-4"
                        : isRtl
                        ? "-translate-x-1"
                        : "translate-x-1"
                    }`}
                  />
                </span>
                <span>{pricing.studentDiscount}</span>
              </button>
            </div>
          </div>

          {/* ==============================================================
              1. DESKTOP VIEW (>= 1024px / lg: and desktop: 1440px)
              Preserves the original approved Figma card geometry & typography:
              - Side card: 302px wide, surface-card-bordered
              - Featured card: 302px wide, surface-card-featured (+56px taller)
              - Original padding, borders, shadows, currency/price layout, and CTA button
             ============================================================== */}
          <div
            className="mt-10 hidden sm:mt-12 lg:mt-14 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-[63px] desktop:mt-[60px]"
            role="list"
            aria-label={pricing.desktopListLabel}
          >
            {programs.map((pkg) => {
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
                    <div className="flex flex-col items-center gap-1.5">
                      <h3 className="font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">
                        {pkg.name}
                      </h3>
                      {pkg.badge && (
                        <span className="inline-flex items-center rounded-full bg-brand/15 border border-brand/30 px-2.5 py-0.5 font-display text-[0.6875rem] font-bold uppercase tracking-wider text-brand">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

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
                      / {durationLabel}
                    </span>

                    {/* Student Discount Active Note */}
                    {isStudent && (
                      <div className="mt-2 text-xs font-sans text-brand font-medium flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                        <span>{pricing.studentPriceApplied}</span>
                      </div>
                    )}

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
                      href={pkg.bookingHref}
                      size="compact"
                      onClick={() => handleProgramSelect(pkg.id)}
                      aria-label={pricing.ctaAriaLabel(
                        pkg.cta,
                        pkg.name,
                        pkg.priceAmount,
                        pricing.currency,
                        durationLabel,
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
              - Neighbor card partially visible on the side (direction-aware RTL/LTR)
              - Smooth touch swipe, click-to-activate, and pagination controls
              - 0px horizontal page overflow guaranteed
             ============================================================== */}
          <div className="mt-8 block lg:hidden">
            {/* Carousel Stage Container */}
            <div
              className="relative mx-auto h-[545px] w-full max-w-[480px] select-none touch-pan-y overflow-hidden sm:h-[565px]"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              role="region"
              aria-roledescription="carousel"
              aria-label={pricing.carouselLabel}
            >
              {programs.map((pkg, idx) => {
                const slot = idx - activeIndex;
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
                      totalPrograms,
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
                      <div className="flex flex-col items-center gap-1">
                        <h3 className="font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">
                          {pkg.name}
                        </h3>
                        {pkg.badge && (
                          <span className="inline-flex items-center rounded-full bg-brand/15 border border-brand/30 px-2 py-0.5 font-display text-[0.625rem] font-bold uppercase tracking-wider text-brand">
                            {pkg.badge}
                          </span>
                        )}
                      </div>

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

                      <span className="mt-2 font-sans text-xs font-normal leading-normal text-muted">
                        / {durationLabel}
                      </span>

                      {/* Student Discount Active Note */}
                      {isStudent && (
                        <div className="mt-1.5 text-xs font-sans text-brand font-medium flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                          <span>{pricing.studentPriceApplied}</span>
                        </div>
                      )}

                      <p className="mt-2 max-w-[240px] text-pretty font-sans text-xs leading-relaxed text-muted rtl:leading-[1.6]">
                        {pkg.description}
                      </p>

                      <ul className="mt-3.5 w-full space-y-2 border-t border-white/10 pt-3.5 text-start">
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
                        href={pkg.bookingHref}
                        size="compact"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleProgramSelect(pkg.id)}
                        aria-label={pricing.ctaAriaLabel(
                          pkg.cta,
                          pkg.name,
                          pkg.priceAmount,
                          pricing.currency,
                          durationLabel,
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
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={pricing.prevLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
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
                {programs.map((pkg, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={`dot-${pkg.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={pricing.slideOfLabel(
                        idx + 1,
                        totalPrograms,
                        pkg.name,
                      )}
                      onClick={() => setActiveIndex(idx)}
                      className={[
                        "h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer",
                        isActive
                          ? "w-6 bg-brand"
                          : "w-2 bg-muted/50 hover:bg-muted",
                      ].join(" ")}
                    />
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label={pricing.nextLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
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
