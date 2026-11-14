"use client";

import { useState, useRef, useCallback } from "react";
import CtaButton from "@/components/ui/CtaButton";

const PROGRAMS = [
  {
    id: "personal-trainings",
    name: "Personal Trainings",
    price: "200$",
    period: "Monthly Membership",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    cta: "Get Started",
    featured: false,
  },
  {
    id: "personals-training-diet",
    name: "Personals Training + Diet",
    price: "300$",
    period: "Monthly Membership",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    cta: "Get Started",
    featured: true,
  },
  {
    id: "diet",
    name: "Diet",
    price: "150$",
    period: "Monthly Membership",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    cta: "Get Started",
    featured: false,
  },
];

export default function TrainingPrograms({ className = "" }) {
  // Mobile / Tablet Coverflow Carousel State (Initial active card: Personals Training + Diet, index 1)
  const [activeIndex, setActiveIndex] = useState(1);

  // Gesture handling refs
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const isDragging = useRef(false);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 3);
  }, []);

  // Pointer / Touch handlers for fluid swipe on mobile and tablet
  const handlePointerDown = (e) => {
    isDragging.current = true;
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
    const threshold = 35; // minimum swipe distance
    if (dragDeltaX.current < -threshold) {
      handleNext();
    } else if (dragDeltaX.current > threshold) {
      handlePrev();
    }
    dragDeltaX.current = 0;
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    dragDeltaX.current = 0;
  };

  return (
    <section
      id="services"
      aria-labelledby="training-programs-title"
      className={[
        "relative w-full overflow-hidden bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-pricing)]">
          {/* Header Block: Display Title & Subtitle */}
          <div className="text-center">
            <h2
              id="training-programs-title"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15]"
            >
              Training Programs
            </h2>
            <p className="section-subtitle mt-2 sm:mt-3">
              Choose your program
            </p>
          </div>

          {/* ==============================================================
              1. DESKTOP VIEW (>= 1024px / lg: and desktop: 1440px)
              Strictly preserves the approved 3-card static geometry:
              - Side cards: 302px x 354px, pt/pb 33.5px, border-subtle
              - Center card: 302px x 410px, pt/pb 62.5px, border-brand (+56px / ~16% taller)
              - 63px gap on desktop (1032px rail)
             ============================================================== */}
          <div
            className="mt-10 sm:mt-12 lg:mt-14 desktop:mt-[60px] hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-[63px]"
            role="list"
            aria-label="Training packages and pricing plans (Desktop view)"
          >
            {PROGRAMS.map((pkg) => {
              const isFeatured = pkg.featured;
              return (
                <div
                  key={`desktop-${pkg.id}`}
                  role="listitem"
                  className={[
                    "relative flex w-[302px] shrink-0 flex-col items-center justify-between text-center transition-all duration-300",
                    isFeatured
                      ? "surface-card-featured z-10 h-[410px] pt-[62.5px] pb-[62.5px] shadow-[0_12px_40px_rgba(255,35,50,0.18)]"
                      : "surface-card-bordered z-0 h-[354px] pt-[33.5px] pb-[33.5px]",
                  ].join(" ")}
                >
                  {/* Top Text Group */}
                  <div className="flex w-full flex-col items-center px-6">
                    <h3 className="font-sans text-lg font-bold text-foreground sm:text-xl leading-snug">
                      {pkg.name}
                    </h3>

                    <span
                      className={[
                        "font-display text-4xl sm:text-5xl lg:text-[52px] desktop:text-[56px] font-bold leading-none mt-3.5 sm:mt-4",
                        isFeatured ? "text-brand" : "text-foreground",
                      ].join(" ")}
                    >
                      {pkg.price}
                    </span>

                    <span className="font-sans text-xs sm:text-sm text-muted mt-3 font-normal leading-normal">
                      {pkg.period}
                    </span>

                    <p className="font-sans text-xs sm:text-sm text-muted mt-2 max-w-[242px] leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* CTA Action Button */}
                  <div className="mt-auto flex w-full justify-center px-6">
                    <CtaButton
                      href="#cta"
                      size="compact"
                      aria-label={`${pkg.cta} with ${pkg.name} at ${pkg.price} monthly`}
                      className="w-[121px] min-w-[121px]"
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
              - 1 prominent active center card (scale 1.0, full opacity, z-20)
              - 2 scaled neighbor cards partially visible on left and right
              - Smooth touch swipe, click-to-activate, and pagination controls
              - 0px horizontal page overflow guaranteed
             ============================================================== */}
          <div className="mt-8 block lg:hidden">
            {/* Carousel Stage Container */}
            <div
              className="relative mx-auto h-[450px] w-full max-w-[480px] select-none touch-pan-y overflow-hidden"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              role="region"
              aria-roledescription="carousel"
              aria-label="Training packages coverflow carousel"
            >
              {PROGRAMS.map((pkg, idx) => {
                // Determine slot relative to active index: -1 (left), 0 (active center), 1 (right)
                const slot = (idx - activeIndex + 3) % 3 === 0
                  ? 0
                  : (idx - activeIndex + 3) % 3 === 1
                  ? 1
                  : -1;

                const isActive = slot === 0;
                const isLeft = slot === -1;
                const isRight = slot === 1;
                const isFeatured = pkg.featured;

                // Responsive positioning for coverflow cards
                // Using transform translation for 60fps GPU acceleration
                let transformStyle = "";
                let opacityStyle = 1;
                let zIndexStyle = 10;

                if (isActive) {
                  transformStyle = "translate(-50%, -50%) scale(1)";
                  opacityStyle = 1;
                  zIndexStyle = 25;
                } else if (isLeft) {
                  transformStyle = "translate(calc(-50% - 135px), -50%) scale(0.85)";
                  opacityStyle = 0.72;
                  zIndexStyle = 10;
                } else if (isRight) {
                  transformStyle = "translate(calc(-50% + 135px), -50%) scale(0.85)";
                  opacityStyle = 0.72;
                  zIndexStyle = 10;
                }

                return (
                  <div
                    key={`mobile-${pkg.id}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} of 3: ${pkg.name}`}
                    aria-hidden={!isActive}
                    onClick={() => {
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
                      "absolute top-1/2 left-1/2 w-[275px] sm:w-[295px] origin-center",
                      "flex flex-col items-center justify-between text-center",
                      "transition-all duration-500 ease-out",
                      isActive
                        ? isFeatured
                          ? "surface-card-featured h-[395px] sm:h-[405px] py-8 shadow-[0_12px_40px_rgba(255,35,50,0.22)]"
                          : "surface-card-bordered h-[354px] sm:h-[360px] py-7 shadow-[var(--shadow-card)]"
                        : isFeatured
                        ? "surface-card-featured h-[395px] sm:h-[405px] py-8 cursor-pointer"
                        : "surface-card-bordered h-[354px] sm:h-[360px] py-7 cursor-pointer",
                    ].join(" ")}
                  >
                    {/* Content */}
                    <div className="flex w-full flex-col items-center px-5">
                      <h3 className="font-sans text-lg font-bold text-foreground sm:text-xl leading-snug">
                        {pkg.name}
                      </h3>

                      <span
                        className={[
                          "font-display text-4xl sm:text-5xl font-bold leading-none mt-3.5",
                          isFeatured ? "text-brand" : "text-foreground",
                        ].join(" ")}
                      >
                        {pkg.price}
                      </span>

                      <span className="font-sans text-xs sm:text-sm text-muted mt-2.5 font-normal leading-normal">
                        {pkg.period}
                      </span>

                      <p className="font-sans text-xs text-muted mt-2 max-w-[220px] leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto flex w-full justify-center px-5">
                      <CtaButton
                        href="#cta"
                        size="compact"
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`${pkg.cta} with ${pkg.name} at ${pkg.price} monthly`}
                        className="w-[121px] min-w-[121px]"
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
                aria-label="Previous package"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Select package slide">
                {PROGRAMS.map((pkg, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={`dot-${pkg.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Slide ${idx + 1}: ${pkg.name}`}
                      onClick={() => setActiveIndex(idx)}
                      className={[
                        "h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand",
                        isActive ? "w-6 bg-brand" : "w-2 bg-muted/50 hover:bg-muted",
                      ].join(" ")}
                    />
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next package"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
