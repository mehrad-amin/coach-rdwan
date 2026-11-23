"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";
import { ATHLETE_RESULTS_DATA } from "@/data/athlete-results";

/**
 * Direction-Aware Chevron Icons
 */
function ChevronIcon({ direction = "left", className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

/**
 * Medal / Podium Icon
 */
function MedalIcon({ className = "" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

/**
 * Calendar Icon
 */
function CalendarIcon({ className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/**
 * Weight Class Icon
 */
function WeightIcon({ className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="6" y1="6" x2="6" y2="18" />
      <line x1="18" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Distinction / Star Icon
 */
function StarBadgeIcon({ className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function AthleteResults({ className = "" }) {
  const { t, locale, dir } = useLocale();
  const isRtl = dir === "rtl";
  const athleteResults = t?.athleteResults;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimerRef = useRef(null);
  const pointerStartRef = useRef(null);
  const containerRef = useRef(null);

  const total = ATHLETE_RESULTS_DATA.length;
  const currentData = ATHLETE_RESULTS_DATA[activeIndex] || ATHLETE_RESULTS_DATA[0];
  const currentTextItem =
    athleteResults?.items?.[activeIndex] || {
      placementBadge: currentData.placement?.[locale] || currentData.placement?.en,
      championship: currentData.championship?.[locale] || currentData.championship?.en,
      achievement: currentData.title?.[locale] || currentData.title?.en,
      year: currentData.year,
      weightClass: currentData.weightClass?.[locale] || currentData.weightClass?.en,
      extra: currentData.extra?.[locale] || currentData.extra?.en,
      alt: `${currentData.title?.[locale] || currentData.title?.en} (${currentData.year})`,
    };

  useEffect(() => {
    return () => {
      if (animTimerRef.current) {
        clearTimeout(animTimerRef.current);
      }
    };
  }, []);

  const triggerSlide = useCallback(
    (nextIdx) => {
      if (nextIdx === activeIndex) return;
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      setIsAnimating(true);
      setActiveIndex(nextIdx);
      animTimerRef.current = setTimeout(() => {
        setIsAnimating(false);
        animTimerRef.current = null;
      }, 350);
    },
    [activeIndex]
  );

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= total || index === activeIndex) return;
      triggerSlide(index);
    },
    [total, activeIndex, triggerSlide]
  );

  const nextSlide = useCallback(() => {
    triggerSlide((activeIndex + 1) % total);
  }, [activeIndex, total, triggerSlide]);

  const prevSlide = useCallback(() => {
    triggerSlide((activeIndex - 1 + total) % total);
  }, [activeIndex, total, triggerSlide]);

  // Direction-aware keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRtl) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRtl) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    },
    [isRtl, prevSlide, nextSlide]
  );

  // Direction-aware touch / pointer swipe
  const handlePointerDown = (e) => {
    if (e.target instanceof Element && e.target.closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!pointerStartRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    pointerStartRef.current = null;

    // Minimum horizontal swipe distance of 40px and dominant over vertical scroll
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        // Swiped Left
        if (isRtl) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        // Swiped Right
        if (isRtl) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  };

  const formattedCounter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    total
  ).padStart(2, "0")}`;

  return (
    <section
      id="results"
      aria-labelledby="athlete-results-title"
      className={[
        "relative w-full overflow-hidden bg-background scroll-mt-20",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-wide)]">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 border border-brand/30 px-3.5 py-1 font-display text-xs font-bold uppercase tracking-widest text-brand mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span>
                {athleteResults?.eyebrow || "ATHLETE ACHIEVEMENTS & PODIUMS"}
              </span>
            </div>
            <h2
              id="athlete-results-title"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15] rtl:leading-[1.24]"
            >
              {athleteResults?.heading || "نتائج تُثبت العمل"}
            </h2>
            <p className="section-subtitle mt-2 sm:mt-3 text-muted font-sans text-sm sm:text-base lg:text-lg leading-relaxed">
              {athleteResults?.subtitle ||
                "إنجازات حقيقية، ومنافسات، ومراكز متقدمة حققها الرياضيون تحت إشراف رضوان."}
            </p>
          </div>

          {/* Interactive Editorial Showcase Stage */}
          <div
            ref={containerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={
              athleteResults?.carouselLabel ||
              "Coach Rdwan Athlete Results Gallery"
            }
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="rounded-3xl bg-[#141414] border border-white/10 p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {/* Subtle background ambient red highlight */}
            <div
              className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-brand/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch relative z-10">
              {/* ==============================================================
                  LEFT / START COLUMN: PHOTOGRAPHY SHOWCASE (Large visual stage)
                 ============================================================== */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
                <div className="relative h-[380px] sm:h-[460px] lg:h-[540px] w-full rounded-2xl overflow-hidden bg-black/70 border border-white/10 flex items-center justify-center">
                  {/* Ambient backdrop matching the exact photo colors without cropping */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                    <Image
                      src={currentData.image}
                      alt=""
                      fill
                      aria-hidden="true"
                      sizes="10vw"
                      className="object-cover blur-3xl scale-125 opacity-25"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Sharp, uncropped foreground photo */}
                  <div
                    className={`relative w-full h-full p-2 sm:p-3 transition-opacity duration-300 ${
                      isAnimating ? "opacity-60 scale-[0.99]" : "opacity-100 scale-100"
                    }`}
                  >
                    <Image
                      src={currentData.image}
                      alt={currentTextItem.alt || currentTextItem.achievement}
                      fill
                      priority={activeIndex === 0}
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 580px, 680px"
                      className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Floating Top-Start Pill: Placement Badge */}
                  <div className="absolute top-4 start-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-brand/40 text-brand font-display text-xs font-bold uppercase tracking-wider shadow-lg">
                    <MedalIcon className="text-brand shrink-0" />
                    <span>{currentTextItem.placementBadge}</span>
                  </div>

                  {/* Floating Top-End Pill: Year */}
                  <div className="absolute top-4 end-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-foreground font-display text-xs font-bold tracking-wider shadow-lg">
                    <CalendarIcon className="text-muted shrink-0" />
                    <span>{currentData.year}</span>
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  RIGHT / END COLUMN: EDITORIAL DETAILS & CONTROLS
                 ============================================================== */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between py-1 lg:py-2">
                <div>
                  {/* Top Header: Slide Counter & Segmented Progress Track */}
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <span className="font-display text-xs sm:text-sm font-black tracking-widest text-brand uppercase">
                      {formattedCounter}
                    </span>

                    {/* 7 Interactive Segmented Progress Bars */}
                    <div
                      className="flex items-center gap-1 sm:gap-1.5 flex-1 max-w-[200px]"
                      role="tablist"
                      aria-label={athleteResults?.slidesLabel || "Slides"}
                    >
                      {ATHLETE_RESULTS_DATA.map((item, idx) => {
                        const isCurrent = idx === activeIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={isCurrent}
                            onClick={() => goToSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              isCurrent
                                ? "flex-1 bg-brand shadow-[0_0_10px_rgba(255,35,50,0.7)]"
                                : "w-2.5 sm:w-3 bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={
                              athleteResults?.slideOfLabel
                                ? athleteResults.slideOfLabel(idx + 1, total)
                                : `Slide ${idx + 1}`
                            }
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Achievement Typography */}
                  <div
                    className={`mt-6 transition-all duration-300 ${
                      isAnimating ? "opacity-40 translate-y-1" : "opacity-100 translate-y-0"
                    }`}
                  >
                    <span className="inline-block text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider text-muted">
                      {athleteResults?.officialEvent || "Official Competition"}
                    </span>

                    <h3 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground uppercase tracking-tight mt-1 leading-tight">
                      {currentTextItem.placementBadge}
                    </h3>

                    <p className="text-xl sm:text-2xl font-display font-bold text-brand mt-1.5 leading-snug">
                      {currentTextItem.championship}
                    </p>

                    <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border-s-4 border-brand border-white/5">
                      <p className="font-sans text-sm sm:text-base text-foreground/95 font-medium leading-relaxed">
                        {currentTextItem.achievement}
                      </p>
                    </div>

                    {/* Metadata Badges (Year, Category / Weight Class, Special Note) */}
                    <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                      {/* Year Chip */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs font-display font-semibold text-foreground">
                        <CalendarIcon className="text-muted" />
                        <span>{currentData.year}</span>
                      </span>

                      {/* Weight Class Chip */}
                      {currentTextItem.weightClass && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs font-display font-semibold text-foreground">
                          <WeightIcon className="text-brand" />
                          <span>{currentTextItem.weightClass}</span>
                        </span>
                      )}

                      {/* Special Distinction Chip (e.g. Overall SJR or Nutrition Supervision) */}
                      {currentTextItem.extra && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand/15 border border-brand/35 text-xs font-display font-bold text-brand uppercase tracking-wider">
                          <StarBadgeIcon className="text-brand" />
                          <span>{currentTextItem.extra}</span>
                        </span>
                      )}
                    </div>

                    {/* Coach Endorsement / Coaching Note */}
                    <p className="mt-6 text-xs text-muted/80 font-sans leading-relaxed italic border-t border-white/5 pt-4">
                      &ldquo;
                      {athleteResults?.coachingNote ||
                        "Competition peaking, tailored periodization, and direct platform coaching."}
                      &rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-display font-semibold text-muted">
                    <span>{activeIndex + 1}</span>{" "}
                    <span>{athleteResults?.slideCounter || "of"}</span>{" "}
                    <span>{total}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label={athleteResults?.prevLabel || "Previous Slide"}
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/15 bg-surface flex items-center justify-center text-foreground hover:text-brand hover:border-brand hover:bg-brand/10 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand outline-none"
                    >
                      <ChevronIcon
                        direction={isRtl ? "right" : "left"}
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                      />
                    </button>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label={athleteResults?.nextLabel || "Next Slide"}
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/15 bg-surface flex items-center justify-center text-foreground hover:text-brand hover:border-brand hover:bg-brand/10 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand outline-none"
                    >
                      <ChevronIcon
                        direction={isRtl ? "left" : "right"}
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
