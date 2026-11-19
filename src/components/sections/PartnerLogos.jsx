"use client";

import { useLocale } from "@/i18n/LocaleProvider";

function MarqueeSequence({ items, isClone = false }) {
  return (
    <ul
      aria-hidden={isClone ? "true" : undefined}
      className={
        isClone
          ? "partner-marquee-sequence partner-marquee-clone min-h-[56px] sm:min-h-[64px] lg:min-h-[76px] desktop:min-h-[84px]"
          : "partner-marquee-sequence min-h-[56px] sm:min-h-[64px] lg:min-h-[76px] desktop:min-h-[84px]"
      }
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="inline-flex shrink-0 items-center whitespace-nowrap"
        >
          <span className="inline-flex items-baseline gap-2 sm:gap-2.5">
            {item.before ? (
              <span className="font-sans text-sm font-medium leading-snug text-foreground/80 sm:text-base lg:text-[1.0625rem] desktop:text-[1.125rem]">
                {item.before}
              </span>
            ) : null}
            <span className="font-display text-lg font-extrabold leading-none text-brand sm:text-xl lg:text-2xl desktop:text-[1.625rem]">
              {item.accent}
            </span>
            <span className="font-sans text-sm font-medium leading-snug text-foreground/85 sm:text-base lg:text-[1.0625rem] desktop:text-[1.125rem] ltr:tracking-[0.06em]">
              {item.after}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="partner-marquee-sep mx-6 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70 sm:mx-8 lg:mx-10 desktop:mx-12"
          />
        </li>
      ))}
    </ul>
  );
}

export default function PartnerLogos({ className = "" }) {
  const { t } = useLocale();
  const { sectionLabel, items } = t.experienceMarquee;

  const sectionClasses = [
    "w-full overflow-hidden bg-surface py-3.5 sm:py-6 lg:py-8 desktop:py-10",
    "mb-12 sm:mb-16 lg:mb-24 desktop:mb-[var(--section-gap-sm)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="partners"
      aria-label={sectionLabel}
      className={sectionClasses}
    >
      <div className="partner-marquee-viewport">
        <div className="partner-marquee-track">
          <div className="partner-marquee-group">
            <MarqueeSequence items={items} />
            <MarqueeSequence items={items} isClone />
          </div>
          <div
            className="partner-marquee-group partner-marquee-clone"
            aria-hidden="true"
          >
            <MarqueeSequence items={items} isClone />
            <MarqueeSequence items={items} isClone />
          </div>
        </div>
      </div>
    </section>
  );
}
