"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

const YOUTUBE_VIDEO_ID = "ZkdlqczzIzc";
const THUMBNAIL_MAX_RES = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const THUMBNAIL_FALLBACK = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/mqdefault.jpg`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;

/**
 * Centered YouTube-style play icon triangle.
 * Explicitly oriented left-to-right regardless of RTL/LTR document direction.
 */
function PlayTriangleIcon({ className = "" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon points="8,5 20,12 8,19" fill="currentColor" />
    </svg>
  );
}

/**
 * TV Interview Showcase Section
 * - Sits immediately before BottomCTA (Final CTA)
 * - Uses click-to-load YouTube privacy-enhanced embed (youtube-nocookie.com)
 * - No iframe is rendered until the user explicitly clicks Play
 */
export default function TVInterview({ className = "" }) {
  const { t } = useLocale();
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(THUMBNAIL_MAX_RES);

  const copy = t?.tvInterview || {
    heading: "Rdwan on Television",
    subtitle: "The Fine Line Between Physical Activity and Athletic Fatigue",
    description:
      "An exclusive television interview where Rdwan discusses physical activity, athletic fatigue, and his experience in fitness and sports coaching.",
    playLabel:
      "Play TV interview video: The Fine Line Between Physical Activity and Athletic Fatigue",
    thumbnailAlt:
      "Thumbnail for Rdwan's television interview: The Fine Line Between Physical Activity and Athletic Fatigue",
    iframeTitle:
      "The Fine Line Between Physical Activity and Athletic Fatigue — Coach Rdwan TV Interview",
  };

  const handleThumbnailError = () => {
    if (thumbSrc !== THUMBNAIL_FALLBACK) {
      setThumbSrc(THUMBNAIL_FALLBACK);
    }
  };

  const handleThumbnailLoad = (e) => {
    // YouTube returns a 120x90 gray placeholder when maxresdefault is unavailable
    if (
      thumbSrc === THUMBNAIL_MAX_RES &&
      e.currentTarget.naturalWidth > 0 &&
      e.currentTarget.naturalWidth <= 120
    ) {
      setThumbSrc(THUMBNAIL_FALLBACK);
    }
  };

  return (
    <section
      id="interview"
      aria-labelledby="tv-interview-heading"
      className={[
        "relative w-full overflow-hidden bg-background scroll-mt-20",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-cta)]">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="tv-interview-heading"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15] rtl:leading-[1.24]"
            >
              {copy.heading}
            </h2>
            <p className="section-subtitle mt-2.5 sm:mt-3 font-medium text-foreground/90">
              {copy.subtitle}
            </p>
          </div>

          {/* Editorial Video Frame */}
          <div className="mx-auto mt-8 sm:mt-10 lg:mt-12 w-full max-w-[880px] rounded-2xl sm:rounded-3xl bg-[#141414] border border-white/10 p-3 sm:p-4 lg:p-5 shadow-[var(--shadow-card)]">
            {/* Fixed 16:9 Media Stage — zero layout shift when transitioning to iframe */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-media)] bg-black border border-white/10">
              {isPlaying ? (
                <iframe
                  className="absolute inset-0 h-full w-full border-0"
                  src={EMBED_URL}
                  title={copy.iframeTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label={copy.playLabel}
                  className="group relative block h-full w-full cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[-2px]"
                >
                  <img
                    src={thumbSrc}
                    alt={copy.thumbnailAlt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    onError={handleThumbnailError}
                    onLoad={handleThumbnailLoad}
                    className="h-full w-full object-cover"
                  />

                  {/* Subtle dark scrim for reliable play button contrast */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/15"
                  />

                  {/* Centered YouTube-style Play Button */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-11 w-16 sm:h-[52px] sm:w-[74px] items-center justify-center rounded-xl bg-brand/95 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition-transform duration-200 group-hover:bg-brand group-hover:scale-105 group-focus-visible:scale-105">
                      <PlayTriangleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                  </span>
                </button>
              )}
            </div>

            {/* Editorial Description Caption */}
            <div className="mt-3.5 sm:mt-4 px-1 sm:px-1.5 pb-0.5 text-start">
              <p className="border-s-2 border-brand ps-3 font-sans text-xs sm:text-sm lg:text-[15px] text-muted leading-relaxed rtl:leading-[1.8]">
                {copy.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
