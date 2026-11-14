"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

/**
 * Authentic Testimonials Data with Dedicated Single-Person Portrait Photography
 * Each slide features exactly ONE person with a confident, athletic appearance.
 * Portraits: Bruce Mars (Pexels 863986), Onur Kurt (Pexels 17210041), Julia Larson (Pexels 8520561).
 * Illustrative stock portraits only — see PORTRAITS_ATTRIBUTION.md for licenses.
 */
export const DEFAULT_TESTIMONIALS = [
  {
    id: "daniele-debbians",
    quote:
      "\"I’ve never felt stronger! John pushed me to my limits while providing the support I needed to succeed. Highly recommended!\"",
    author: "Daniele Debbians",
    portrait: "/images/testimonials/testimonial-portrait-1.webp",
    alt: "Daniele Debbians, fitness client smiling after training",
    objectPosition: "center 15%",
  },
  {
    id: "marcus-vance",
    quote:
      "\"Training with John completely transformed my approach to fitness. Down 18 lbs in 12 weeks and stronger than ever!\"",
    author: "Marcus Vance",
    portrait: "/images/testimonials/testimonial-portrait-2.webp",
    alt: "Marcus Vance, dedicated fitness client conditioning in gym",
    objectPosition: "center 10%",
  },
  {
    id: "elena-rostova",
    quote:
      "\"The personalized coaching and nutrition plan gave me real results. I have more energy, discipline, and confidence every day.\"",
    author: "Elena Rostova",
    portrait: "/images/testimonials/testimonial-portrait-3.webp",
    alt: "Elena Rostova, fitness client beaming with confidence and energy",
    objectPosition: "center 10%",
  },
];

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

export default function Testimonials({
  className = "",
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pointerStartRef = useRef(null);
  const carouselRegionRef = useRef(null);

  const count = testimonials.length;
  const safeActiveIndex = count > 0 && activeIndex >= count ? 0 : activeIndex;
  const current = testimonials[safeActiveIndex] || testimonials[0];

  const goToSlide = useCallback(
    (index) => {
      if (index === safeActiveIndex || isAnimating || index < 0 || index >= count) {
        return;
      }
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 450);
    },
    [safeActiveIndex, isAnimating, count]
  );

  const nextSlide = useCallback(() => {
    if (count <= 1 || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % count);
    setTimeout(() => setIsAnimating(false), 450);
  }, [count, isAnimating]);

  const prevSlide = useCallback(() => {
    if (count <= 1 || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + count) % count);
    setTimeout(() => setIsAnimating(false), 450);
  }, [count, isAnimating]);

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    },
    [prevSlide, nextSlide]
  );

  // Touch / Pointer gesture swipe handlers
  const handlePointerDown = (e) => {
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
      if (deltaX < 0) {
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
        "relative w-full overflow-hidden bg-background",
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
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[60%] lg:-translate-x-[55%] -translate-y-[45%] h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] lg:h-[537px] lg:w-[537px] rounded-full bg-[radial-gradient(circle,rgba(255,35,50,0.18)_0%,rgba(255,35,50,0.06)_45%,transparent_70%)] blur-[75px] lg:blur-[95px] -z-0"
            aria-hidden="true"
          />

          {/* Section Heading (Figma node 1:1499) */}
          <div className="relative z-10 lg:ml-[108px] desktop:ml-[108px]">
            <h2
              id="testimonials-heading"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] font-extrabold uppercase font-display tracking-tight text-foreground"
            >
              Hear It From Them
            </h2>
          </div>

          {/* Carousel & Separate Cards Container */}
          <div
            ref={carouselRegionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className="relative mt-8 sm:mt-12 lg:mt-[79px] flex items-center justify-center touch-pan-y focus:outline-none"
          >
            {/* Desktop Left Navigation Arrow (Figma node 1:1502) */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={count <= 1}
              aria-label="Previous testimonial"
              className={`hidden lg:flex absolute left-0 desktop:left-[32px] top-1/2 -translate-y-1/2 z-30 h-16 w-8 items-center justify-center text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronLeftIcon className="h-12 w-6" />
            </button>

            {/* Two Visually Separate Elements (Figma Frame 1000001697: 911x386px with 43px horizontal gap) */}
            <div className="relative w-full max-w-[911px] z-20 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-[43px]">
              
              {/* 1. Left Element: Independent Testimonial Text Card (Figma node 1:1488: 556x280px) */}
              <div
                className="surface-card relative w-full max-w-[556px] lg:w-[556px] min-h-[220px] lg:h-[280px] rounded-[16px] bg-surface shadow-[var(--shadow-card)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0"
                aria-live="polite"
              >
                {/* Top-Left Red Slashes (Figma node 1:1496: 74x71px overlapping top-left of text card) */}
                <div className="absolute -left-3 sm:-left-5 lg:-left-[39px] -top-3 sm:-top-4 lg:top-[6px] z-30 pointer-events-none">
                  <RedQuoteSlashes className="w-11 h-10 sm:w-14 sm:h-13 lg:w-[74px] lg:h-[71px]" />
                </div>

                <blockquote className="font-sans text-base leading-relaxed sm:text-lg sm:leading-relaxed lg:text-[20px] lg:leading-[1.55] text-foreground font-normal">
                  {current.quote}
                </blockquote>

                <div className="mt-4 sm:mt-6 pt-1">
                  <cite className="not-italic font-sans text-sm sm:text-base font-normal text-muted tracking-normal block">
                    {current.author}
                  </cite>
                </div>
              </div>

              {/* 2. Right Element: Independent Portrait Image Panel (Figma node 1:1493: 312x386px) */}
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none lg:w-[312px] h-[360px] sm:h-[400px] lg:h-[386px] rounded-[16px] bg-surface shadow-[var(--shadow-card)] shrink-0">
                {/* Image Container with rounded corners and overflow hidden so image is clipped to border radius */}
                <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                  <Image
                    key={current.id}
                    src={current.portrait}
                    alt={current.alt || "Client portrait for Coach John's personal training program"}
                    fill
                    priority={false}
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 312px"
                    style={{ objectPosition: current.objectPosition || "center 15%" }}
                    className="object-cover transition-opacity duration-300"
                  />
                </div>

                {/* Bottom-Right Red Slashes (Figma Group 31: 74x71px overlapping bottom-right image boundary and extending slightly outside) */}
                <div className="absolute -right-1.5 -bottom-2.5 sm:-right-2 sm:-bottom-3 lg:-right-[12px] lg:-bottom-[18px] z-30 pointer-events-none">
                  <RedQuoteSlashes className="w-[48px] h-[46px] sm:w-[58px] sm:h-[56px] lg:w-[74px] lg:h-[71px]" />
                </div>
              </div>

            </div>

            {/* Desktop Right Navigation Arrow (Figma node 1:1500) */}
            <button
              type="button"
              onClick={nextSlide}
              disabled={count <= 1}
              aria-label="Next testimonial"
              className={`hidden lg:flex absolute right-0 desktop:right-[32px] top-1/2 -translate-y-1/2 z-30 h-16 w-8 items-center justify-center text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronRightIcon className="h-12 w-6" />
            </button>
          </div>

          {/* Desktop Pagination Indicators (Figma node 1:1504 - Frame 1000002075: 45x11px) */}
          <div
            role="tablist"
            aria-label="Testimonial slides"
            className="hidden lg:flex items-center justify-center gap-[6px] mt-8 desktop:mt-[31px]"
          >
            {testimonials.map((item, idx) => (
              <button
                key={item.id || idx}
                role="tab"
                type="button"
                aria-selected={safeActiveIndex === idx}
                aria-label={`Testimonial slide ${idx + 1} of ${count}`}
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
          <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={prevSlide}
              disabled={count <= 1}
              aria-label="Previous testimonial"
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-surface text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronLeftIcon className="h-6 w-3" />
            </button>

            <div
              role="tablist"
              aria-label="Testimonial slides"
              className="flex items-center gap-2"
            >
              {testimonials.map((item, idx) => (
                <button
                  key={item.id || idx}
                  role="tab"
                  type="button"
                  aria-selected={safeActiveIndex === idx}
                  aria-label={`Testimonial slide ${idx + 1} of ${count}`}
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
              aria-label="Next testimonial"
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-surface text-foreground/80 hover:text-foreground active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-brand ${
                count <= 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ChevronRightIcon className="h-6 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
