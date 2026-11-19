"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Decorative Red Quote Slashes (Figma Group 31 - node 1:1496)
 * Two parallel red slashes angled with dx=21px over dy=71px (#ff2332)
 */
function RedQuoteSlashes({ className = "" }) {
  return (
    <svg
      width="74"
      height="71"
      viewBox="0 0 74 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon points="21,0 40,0 19,71 0,71" fill="#ff2332" />
      <polygon points="54,0 73,0 52,71 33,71" fill="#ff2332" />
    </svg>
  );
}

/**
 * Navigation Chevron Left (Figma weui:arrow-filled - node 1:1502)
 */
function ChevronLeftIcon({ className = "" }) {
  return (
    <svg
      width="32"
      height="64"
      viewBox="0 0 32 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 16L10 32L22 48"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Navigation Chevron Right (Figma weui:arrow-filled - node 1:1500)
 */
function ChevronRightIcon({ className = "" }) {
  return (
    <svg
      width="32"
      height="64"
      viewBox="0 0 32 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 16L22 32L10 48"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Testimonials({ className = "", testimonials }) {
  const { t, dir } = useLocale();
  const section = t.testimonials;
  const isRtl = dir === "rtl";

  const items = testimonials?.length ? testimonials : section.items;
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimerRef = useRef(null);
  const pointerStartRef = useRef(null);
  const carouselRegionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (animTimerRef.current) {
        clearTimeout(animTimerRef.current);
      }
    };
  }, []);

  const safeActiveIndex = count > 0 && activeIndex >= count ? 0 : activeIndex;
  const current = items[safeActiveIndex] || items[0];

  const triggerTransition = useCallback((nextIndex) => {
    if (animTimerRef.current) {
      clearTimeout(animTimerRef.current);
    }
    setIsAnimating(true);
    setActiveIndex(nextIndex);
    animTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
      animTimerRef.current = null;
    }, 300);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      if (index === safeActiveIndex || index < 0 || index >= count) {
        return;
      }
      triggerTransition(index);
    },
    [safeActiveIndex, count, triggerTransition],
  );

  const nextSlide = useCallback(() => {
    if (count <= 1) return;
    triggerTransition((safeActiveIndex + 1) % count);
  }, [count, safeActiveIndex, triggerTransition]);

  const prevSlide = useCallback(() => {
    if (count <= 1) return;
    triggerTransition((safeActiveIndex - 1 + count) % count);
  }, [count, safeActiveIndex, triggerTransition]);

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
    [isRtl, prevSlide, nextSlide],
  );

  // Direction-aware touch / pointer gesture swipe handlers
  const handlePointerDown = (e) => {
    if (e.target instanceof Element && e.target.closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!pointerStartRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = Math.abs(e.clientY - pointerStartRef.current.y);
    pointerStartRef.current = null;

    // Minimum swipe threshold 35px, horizontal dominant
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > deltaY) {
      const shouldAdvance = isRtl ? deltaX > 0 : deltaX < 0;
      if (shouldAdvance) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className={[
        "relative w-full overflow-x-clip bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="relative mx-auto w-full max-w-[var(--container-testimonials)]">
          {/* Subtle Red Atmospheric Background Glow (Figma node 1:1486 - Ellipse 52: 537x537px) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] lg:h-[537px] lg:w-[537px] rounded-full bg-[radial-gradient(circle,rgba(255,35,50,0.18)_0%,rgba(255,35,50,0.06)_45%,transparent_70%)] blur-[75px] lg:blur-[95px] -z-0"
            aria-hidden="true"
          />

          {/* Section Heading (Figma node 1:1499) */}
          <div className="relative z-10 mx-auto max-w-[780px] text-start">
            <h2
              id="testimonials-heading"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] font-extrabold uppercase font-display tracking-tight text-foreground rtl:leading-[1.24]"
            >
              {section.heading}
            </h2>
          </div>

          {/* Carousel Container */}
          <div
            ref={carouselRegionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={section.carouselLabel}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className="relative mt-10 sm:mt-14 lg:mt-[79px] flex items-center justify-center touch-pan-y focus:outline-none"
          >
            {/* Desktop Previous Navigation Arrow (Left in LTR pointing <, Right in RTL pointing >) */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={count <= 1}
              aria-label={section.prevLabel}
              className={`hidden lg:flex absolute start-0 desktop:start-[32px] top-1/2 -translate-y-1/2 z-30 h-16 w-8 items-center justify-center text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronLeftIcon className="h-12 w-6 rtl:rotate-180" />
            </button>

            {/* Primary Centered Testimonial Card (Image & container removed) */}
            <div className="relative w-full max-w-[740px] desktop:max-w-[780px] z-20 flex items-center justify-center">
              <div
                data-slide-id={current.id}
                data-slide-index={safeActiveIndex}
                className="surface-card relative w-full min-h-[240px] sm:min-h-[260px] lg:min-h-[280px] rounded-[16px] bg-surface shadow-[var(--shadow-card)] pt-9 pb-8 px-7 sm:px-10 sm:py-10 lg:px-14 lg:py-12 flex flex-col justify-between text-start"
                aria-live="polite"
              >
                {/* Upper Start-Corner Red Double-Slash Decoration (Figma node 1:1496) */}
                <div
                  data-quote-deco="upper"
                  className="absolute -start-2 -top-5 sm:-start-4 sm:-top-6 lg:-start-[32px] lg:-top-[30px] z-30 pointer-events-none"
                >
                  <RedQuoteSlashes className="w-11 h-10 sm:w-14 sm:h-[54px] lg:w-[74px] lg:h-[71px]" />
                </div>

                {/* Lower Opposite-Corner Red Double-Slash Decoration (Figma Group 31) */}
                <div
                  data-quote-deco="lower"
                  className="absolute -end-2 -bottom-5 sm:-end-4 sm:-bottom-6 lg:-end-[32px] lg:-bottom-[30px] z-30 pointer-events-none"
                >
                  <RedQuoteSlashes className="w-11 h-10 sm:w-14 sm:h-[54px] lg:w-[74px] lg:h-[71px]" />
                </div>

                <div
                  key={current.id}
                  className={`flex flex-1 flex-col justify-between transition-opacity duration-300 ${
                    isAnimating ? "opacity-90" : "opacity-100"
                  }`}
                >
                  <blockquote className="font-sans text-base leading-relaxed sm:text-lg sm:leading-relaxed lg:text-[20px] lg:leading-[1.6] rtl:leading-[1.8] text-foreground font-normal text-pretty">
                    {current.quote}
                  </blockquote>

                  <div className="mt-6 sm:mt-7 pt-1">
                    <cite className="not-italic font-sans text-sm sm:text-base font-normal text-muted tracking-normal block">
                      {current.label}
                    </cite>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Next Navigation Arrow (Right in LTR pointing >, Left in RTL pointing <) */}
            <button
              type="button"
              onClick={nextSlide}
              disabled={count <= 1}
              aria-label={section.nextLabel}
              className={`hidden lg:flex absolute end-0 desktop:end-[32px] top-1/2 -translate-y-1/2 z-30 h-16 w-8 items-center justify-center text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronRightIcon className="h-12 w-6 rtl:rotate-180" />
            </button>
          </div>

          {/* Desktop Pagination Indicators (Figma node 1:1504) */}
          <div
            role="tablist"
            aria-label={section.slidesLabel}
            className="hidden lg:flex items-center justify-center gap-[6px] mt-10 desktop:mt-[42px]"
          >
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                role="tab"
                type="button"
                aria-selected={safeActiveIndex === idx}
                aria-label={section.slideOfLabel(idx + 1, count, item.label)}
                onClick={() => goToSlide(idx)}
                className={`h-[11px] w-[11px] rounded-[2px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand ${
                  safeActiveIndex === idx
                    ? "bg-brand"
                    : "bg-[#383838] hover:bg-[#555555] cursor-pointer"
                }`}
              />
            ))}
          </div>

          {/* Mobile & Tablet Interactive Navigation Controls (< 1024px) */}
          <div className="mt-9 flex items-center justify-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={prevSlide}
              disabled={count <= 1}
              aria-label={section.prevLabel}
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-surface text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronLeftIcon className="h-6 w-3 rtl:rotate-180" />
            </button>

            <div
              role="tablist"
              aria-label={section.slidesLabel}
              className="flex items-center gap-2"
            >
              {items.map((item, idx) => (
                <button
                  key={item.id || idx}
                  role="tab"
                  type="button"
                  aria-selected={safeActiveIndex === idx}
                  aria-label={section.slideOfLabel(idx + 1, count, item.label)}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-[2px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand ${
                    safeActiveIndex === idx
                      ? "w-5 bg-brand"
                      : "w-2.5 bg-[#383838] hover:bg-[#555555] cursor-pointer"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              disabled={count <= 1}
              aria-label={section.nextLabel}
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-surface text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronRightIcon className="h-6 w-3 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
