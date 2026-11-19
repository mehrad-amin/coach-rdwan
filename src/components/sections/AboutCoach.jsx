"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";

export default function AboutCoach({ className = "" }) {
  const { t } = useLocale();
  const { eyebrow, heading, imageAlt, paragraphs, statsLabel, stats } = t.about;

  return (
    <section
      id="about"
      aria-labelledby="about-coach-title"
      className={[
        "relative w-full overflow-x-clip bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-about)]">
          {/* Top 2-Column Split: Photo fixed on LEFT, Introduction on RIGHT on desktop */}
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row rtl:lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-12 desktop:gap-20">
            {/* Part 1 (LEFT): Coach Squat Photograph */}
            <div className="w-full max-w-[545px] shrink-0">
              <div className="group relative aspect-[544.81/452.03] w-full overflow-hidden rounded-[var(--radius-media)] bg-surface shadow-[var(--shadow-card)]">
                <Image
                  src="/images/rdwan/rdwan-squat.jpg"
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 545px, 545px"
                  style={{ objectPosition: "50% 72%" }}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15"
                />
              </div>
            </div>

            {/* Part 2 (RIGHT): Coach Introduction & Biography */}
            <div className="flex w-full max-w-[549px] flex-col justify-center text-start">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-[0.8125rem]">
                {eyebrow}
              </span>

              <h2
                id="about-coach-title"
                className="section-heading mt-2.5 text-2xl sm:text-3xl lg:text-[2.25rem] desktop:text-[2.625rem] leading-[1.18] rtl:leading-[1.28]"
              >
                {heading}
              </h2>

              <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5 text-sm leading-[1.68] text-muted sm:text-[0.96875rem] lg:text-[1rem] rtl:leading-[1.82]">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === paragraphs.length - 1
                        ? "text-pretty font-medium text-foreground/85"
                        : "text-pretty"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Part 3 (BOTTOM): 4 Verified Experience & Coaching Statistic Cards */}
          <div
            className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-5 desktop:mt-14 desktop:gap-6"
            role="list"
            aria-label={statsLabel}
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                role="listitem"
                className="surface-card flex min-h-[116px] flex-col items-center justify-center rounded-[var(--radius-card)] px-3.5 py-5 text-center sm:min-h-[132px] sm:px-5 sm:py-6"
              >
                <span
                  dir="ltr"
                  className="font-display text-2xl font-bold leading-none tracking-tight text-brand sm:text-3xl lg:text-[2.25rem] desktop:text-[2.5rem]"
                >
                  {stat.value}
                </span>
                <span className="mt-2.5 max-w-[200px] text-xs font-normal leading-snug text-muted sm:mt-3 sm:text-sm rtl:leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
