"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Qualifications({ className = "" }) {
  const { t } = useLocale();
  const {
    heading,
    description,
    achievementsLabel,
    achievements,
    coachingLabel,
    coachingNote,
    imageAlt,
  } = t.qualifications;

  return (
    <section
      id="qualifications"
      aria-labelledby="qualifications-title"
      className={[
        "relative w-full overflow-hidden bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto grid w-full max-w-[545px] grid-cols-1 gap-y-6 sm:gap-y-7 lg:max-w-[var(--container-qual)] ltr:lg:grid-cols-[minmax(0,477px)_auto] rtl:lg:grid-cols-[auto_minmax(0,477px)] lg:grid-rows-[auto_auto] lg:items-start lg:justify-between lg:gap-x-12 lg:gap-y-0 desktop:gap-x-20">
          {/* 1. Section Heading (Mobile 1st / Desktop Left Column Row 1) */}
          <div className="mb-3 sm:mb-3.5 text-start ltr:lg:col-start-1 rtl:lg:col-start-2 lg:row-start-1 lg:mb-0">
            <h2
              id="qualifications-title"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15] rtl:leading-[1.24]"
            >
              {heading}
            </h2>
          </div>

          {/* 2. Coach Photograph (Mobile 2nd / Desktop Right Column spanning both rows) */}
          <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px] ltr:lg:col-start-2 rtl:lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:w-[375px] lg:max-w-none lg:self-center desktop:w-[396px]">
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-media)] bg-[#141414] shadow-[var(--shadow-card)]">
              <Image
                src="/images/rdwan/rdwan-3.jpg"
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 380px, 396px"
                style={{ objectPosition: "50% 50%" }}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[var(--radius-media)] border border-white/10 bg-gradient-to-t from-black/40 via-transparent to-black/10"
              />
            </div>
          </div>

          {/* 3 & 4. Description, Competition Achievements & Athlete Prep (Mobile 3rd–4th / Desktop Left Column Row 2) */}
          <div className="text-start ltr:lg:col-start-1 rtl:lg:col-start-2 lg:row-start-2 lg:mt-6">
            <p className="section-body max-w-[477px] text-sm leading-relaxed sm:text-base sm:leading-relaxed lg:text-[1.125rem] lg:leading-[1.55] rtl:leading-[1.75]">
              {description}
            </p>

            {/* Verified Personal Competition Achievements — Borderless Figma .surface-card Tiles */}
            <div
              className="mt-7 grid max-w-[477px] grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4 lg:mt-9 desktop:mt-8"
              role="list"
              aria-label={achievementsLabel}
            >
              {achievements.map((item) => (
                <div
                  key={item.id}
                  role="listitem"
                  className="surface-card flex min-h-[86px] flex-col items-center justify-center rounded-[var(--radius-card)] px-3 py-3.5 text-center sm:min-h-[96px] sm:px-4 sm:py-4"
                >
                  <span className="font-display text-lg font-bold leading-none tracking-tight text-brand sm:text-xl lg:text-[1.375rem]">
                    {item.result}
                  </span>
                  <span className="mt-2 font-sans text-xs font-medium leading-snug text-foreground/90 sm:text-[0.8125rem]">
                    {item.location}
                  </span>
                  <span className="mt-1 font-sans text-[0.75rem] font-normal leading-none text-muted">
                    <span dir="ltr">{item.year}</span>
                    <span aria-hidden="true"> • </span>
                    <span>{item.category}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Separate Athlete Preparation Context */}
            <p className="mt-5 max-w-[477px] text-pretty font-sans text-xs leading-relaxed text-muted sm:mt-6 sm:text-sm rtl:leading-[1.8]">
              <strong className="font-semibold text-foreground/90">
                {coachingLabel}:
              </strong>{" "}
              {coachingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
