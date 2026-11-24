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

/**
 * Star Rating Icon
 */
function StarIcon({ filled = false, className = "" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/**
 * Subtle Pen / Write Review Icon
 */
function PenIcon({ className = "" }) {
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
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

/**
 * Close Icon
 */
function CloseIcon({ className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Checkmark Icon
 */
function CheckCircleIcon({ className = "" }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/**
 * Review Submission Modal
 */
function ReviewModal({ isOpen, onClose, modalData, isRtl, locale }) {
  const [displayName, setDisplayName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [publicationConsent, setPublicationConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setDisplayName("");
      setRating(5);
      setHoveredRating(0);
      setReviewText("");
      setPublicationConsent(false);
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!displayName.trim() || displayName.trim().length < 2) {
      setErrorMessage(modalData?.validation?.nameRequired || "Please enter a valid display name.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setErrorMessage(modalData?.validation?.ratingRequired || "Please select a rating.");
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setErrorMessage(modalData?.validation?.reviewRequired || "Please enter at least 10 characters.");
      return;
    }
    if (!publicationConsent) {
      setErrorMessage(modalData?.validation?.consentRequired || "Consent is required to submit.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim(),
          rating,
          reviewText: reviewText.trim(),
          publicationConsent: true,
          language: locale,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.ok) {
        setIsSuccess(true);
      } else if (result?.pendingConfig) {
        setErrorMessage(
          modalData?.pendingConfigMessage ||
            "The review service is currently being configured and will be available soon."
        );
      } else {
        setErrorMessage(result?.error || modalData?.errorMessage || "Failed to submit review.");
      }
    } catch {
      setErrorMessage(modalData?.errorMessage || "Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-surface border border-white/10 p-6 sm:p-8 shadow-2xl text-foreground text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={modalData?.closeButton || "Close"}
          className="absolute top-5 end-5 p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="text-brand mb-4">
              <CheckCircleIcon className="w-12 h-12" />
            </div>
            <h3
              id="review-modal-title"
              className="text-xl sm:text-2xl font-bold font-display text-foreground mb-3"
            >
              {modalData?.successTitle || "Review Received"}
            </h3>
            <p className="text-muted text-sm sm:text-base max-w-sm mb-6 leading-relaxed">
              {modalData?.successMessage ||
                "Thank you for sharing your experience! Your review is pending approval."}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {modalData?.closeButton || "Close"}
            </button>
          </div>
        ) : (
          <div>
            <h3
              id="review-modal-title"
              className="text-xl sm:text-2xl font-bold font-display text-foreground mb-1.5"
            >
              {modalData?.title || "Share Your Review"}
            </h3>
            <p className="text-muted text-xs sm:text-sm mb-6 leading-relaxed">
              {modalData?.description || "Your genuine feedback helps others."}
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mb-5 p-3 rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs sm:text-sm font-sans"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Display Name */}
              <div>
                <label
                  htmlFor="review-display-name"
                  className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
                >
                  {modalData?.nameLabel || "Display Name"} *
                </label>
                <input
                  id="review-display-name"
                  type="text"
                  maxLength={60}
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={modalData?.namePlaceholder || "e.g., Abdullah M."}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-foreground placeholder:text-muted/50 text-sm focus:border-brand focus:outline-none transition-colors"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5">
                  {modalData?.ratingLabel || "Rating"} *
                </label>
                <div className="flex items-center gap-1.5" role="radiogroup" aria-label={modalData?.ratingLabel || "Rating"}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 text-brand hover:scale-110 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                    >
                      <StarIcon
                        filled={(hoveredRating || rating) >= star}
                        className="w-6 h-6"
                      />
                    </button>
                  ))}
                  <span className="text-xs text-muted ms-2" dir="ltr">
                    ({hoveredRating || rating} / 5)
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="review-text-input"
                  className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
                >
                  {modalData?.reviewLabel || "Your Review"} *
                </label>
                <textarea
                  id="review-text-input"
                  rows={4}
                  maxLength={600}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={modalData?.reviewPlaceholder || "Write your feedback..."}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-foreground placeholder:text-muted/50 text-sm focus:border-brand focus:outline-none transition-colors resize-none"
                />
                <div className="text-end text-[11px] text-muted/60 mt-1">
                  {reviewText.length} / 600
                </div>
              </div>

              {/* Publication Consent Checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="review-consent-checkbox"
                  type="checkbox"
                  required
                  checked={publicationConsent}
                  onChange={(e) => setPublicationConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-[#181818] text-brand accent-brand focus:ring-brand focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="review-consent-checkbox"
                  className="text-xs text-muted leading-relaxed cursor-pointer select-none"
                >
                  {modalData?.consentLabel ||
                    "I consent to having my review and display name published on this website."}
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-xs sm:text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  {modalData?.cancelButton || "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-hover active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? modalData?.submittingButton || "Submitting..."
                    : modalData?.submitButton || "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Testimonials({ className = "" }) {
  const { t, dir, locale } = useLocale();
  const section = t.testimonials;
  const isRtl = dir === "rtl";

  // Dynamic review state - strictly initialized to empty array (never mock data)
  const [apiReviews, setApiReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimerRef = useRef(null);
  const pointerStartRef = useRef(null);
  const carouselRegionRef = useRef(null);

  // Fetch approved public reviews from /api/testimonials for active locale
  useEffect(() => {
    const controller = new AbortController();
    setActiveIndex(0);
    async function loadReviews() {
      try {
        const res = await fetch(`/api/testimonials?lang=${encodeURIComponent(locale)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          if (!controller.signal.aborted && data.ok && Array.isArray(data.reviews)) {
            setApiReviews(data.reviews);
          } else if (!controller.signal.aborted) {
            setApiReviews([]);
          }
        } else if (!controller.signal.aborted) {
          setApiReviews([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load testimonials:", err);
          setApiReviews([]);
        }
      }
    }
    loadReviews();
    return () => {
      controller.abort();
    };
  }, [locale]);

  // Approved reviews strictly populated from the API (never fake, mock, or fallback reviews)
  const items = Array.isArray(apiReviews)
    ? apiReviews.map((r, idx) => ({
        id: r.id || `review-${idx}`,
        quote: r.reviewText,
        label: r.displayName,
        rating: r.rating,
        language: r.language,
      }))
    : [];

  const count = items.length;

  useEffect(() => {
    return () => {
      if (animTimerRef.current) {
        clearTimeout(animTimerRef.current);
      }
    };
  }, []);

  const safeActiveIndex = count > 0 && activeIndex >= count ? 0 : activeIndex;
  const current = count > 0 ? items[safeActiveIndex] || items[0] : null;

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
    [safeActiveIndex, count, triggerTransition]
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
    [isRtl, prevSlide, nextSlide]
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

          {/* Section Heading & Review Submission Action */}
          <div className="relative z-10 mx-auto max-w-[780px] flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-start">
            <h2
              id="testimonials-heading"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] font-extrabold uppercase font-display tracking-tight text-foreground rtl:leading-[1.24]"
            >
              {section.heading}
            </h2>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 self-start sm:self-auto text-xs sm:text-sm font-sans font-medium text-brand hover:text-brand-light transition-colors py-2 px-3.5 rounded-lg border border-brand/30 hover:border-brand/60 bg-brand/5 hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer shrink-0"
            >
              <PenIcon className="w-3.5 h-3.5" />
              <span>{section.writeReviewButton || (isRtl ? "شارك تجربتك" : "Share Your Review")}</span>
            </button>
          </div>

          {/* Carousel / Card Container */}
          <div
            ref={carouselRegionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={section.carouselLabel}
            tabIndex={count > 0 ? 0 : -1}
            onKeyDown={count > 0 ? handleKeyDown : undefined}
            onPointerDown={count > 0 ? handlePointerDown : undefined}
            onPointerUp={count > 0 ? handlePointerUp : undefined}
            onPointerCancel={count > 0 ? handlePointerCancel : undefined}
            className="relative mt-10 sm:mt-14 lg:mt-[79px] flex items-center justify-center touch-pan-y focus:outline-none"
          >
            {/* Desktop Previous Navigation Arrow */}
            {count > 0 && (
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
            )}

            {/* Centered Testimonial Card */}
            <div className="relative w-full max-w-[740px] desktop:max-w-[780px] z-20 flex items-center justify-center">
              <div
                data-slide-id={current?.id || "empty"}
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

                {count > 0 && current ? (
                  <div
                    key={current.id}
                    className={`flex flex-1 flex-col justify-between transition-opacity duration-300 ${
                      isAnimating ? "opacity-90" : "opacity-100"
                    }`}
                  >
                    <blockquote className="font-sans text-base leading-relaxed sm:text-lg sm:leading-relaxed lg:text-[20px] lg:leading-[1.6] rtl:leading-[1.8] text-foreground font-normal text-pretty">
                      {current.quote}
                    </blockquote>

                    <div className="mt-6 sm:mt-7 pt-1 flex items-center justify-between gap-4">
                      <cite className="not-italic font-sans text-sm sm:text-base font-normal text-muted tracking-normal block">
                        {current.label}
                      </cite>
                      {current.rating ? (
                        <div
                          className="flex items-center gap-1 text-brand text-xs sm:text-sm shrink-0"
                          aria-label={`${current.rating} / 5`}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} filled={i < current.rating} className="w-3.5 h-3.5" />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  /* Graceful Empty State (Figma card preserved) */
                  <div className="flex flex-1 flex-col items-center justify-center text-center py-6">
                    <p className="font-sans text-base sm:text-lg text-muted max-w-md leading-relaxed text-pretty">
                      {section.emptyState ||
                        (isRtl
                          ? "لا توجد تقييمات منشورة حاليًا. كن أول من يشارك تجربته مع الكوتش رضوان!"
                          : "No published reviews yet. Be the first to share your experience with Coach Rdwan!")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-brand hover:text-brand-light transition-colors py-2 px-4 rounded-lg border border-brand/30 hover:border-brand/60 bg-brand/5 hover:bg-brand/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      <PenIcon className="w-4 h-4" />
                      <span>{section.writeReviewButton || (isRtl ? "شارك تجربتك" : "Share Your Review")}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Next Navigation Arrow */}
            {count > 0 && (
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
            )}
          </div>

          {/* Desktop Pagination Indicators */}
          {count > 0 && (
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
          )}

          {/* Mobile & Tablet Interactive Navigation Controls (< 1024px) */}
          {count > 0 && (
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
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalData={section.modal}
        isRtl={isRtl}
        locale={locale}
      />
    </section>
  );
}
