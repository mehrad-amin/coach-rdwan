"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Bottom CTA Section (Figma Frame 1000002074 - node 1:1508: 1045x602px)
 * - Ambient radial glow (Ellipse 54 - node 1:1509: 545x545px)
 * - Coach Rdwan portrait photography (rdwan-1.jpg)
 * - Heading: "READY TO START YOUR TRAINING JOURNEY?" / "هل أنت مستعد لبدء رحلتك التدريبية؟"
 * - Subtitle: Bilingual personalized coaching copy
 * - Functional CTA Button navigating to "/booking" with action label: "START YOUR JOURNEY" / "ابدأ رحلتك الآن"
 */
export default function BottomCTA({ className = "" }) {
  const { t } = useLocale();

  const cta = t?.cta || {
    heading: "READY TO START YOUR TRAINING JOURNEY?",
    description:
      "Whether your goal is to build strength, gain muscle, or lose fat, I'm here to help you with a personalized training plan and ongoing guidance to reach your goals.",
    buttonLabel: "START YOUR JOURNEY",
    imageAlt: "Coach Rdwan ready to begin your coaching journey",
  };

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className={[
        "relative w-full overflow-hidden bg-background scroll-mt-10 sm:scroll-mt-16",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="relative mx-auto w-full max-w-[var(--container-cta)]">
          {/* Ambient Red Atmospheric Radial Glow (Figma node 1:1509 - Ellipse 54: 545x545px) */}
          <div
            className="pointer-events-none absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 ltr:translate-x-10 rtl:-translate-x-10 h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] lg:h-[545px] lg:w-[545px] rounded-full bg-[radial-gradient(circle,rgba(255,35,50,0.18)_0%,rgba(255,35,50,0.06)_45%,transparent_70%)] blur-[75px] lg:blur-[95px] -z-0"
            aria-hidden="true"
          />

          {/* 2-Column Split (Figma Frame 1000001695: 1045x602px) */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            
            {/* Coach Portrait Image: Full 3-Panel Vertical Composition (720x1280, 9:16) */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] lg:w-[380px] aspect-[9/16] shrink-0">
              <div className="relative w-full h-full overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src="/images/rdwan/rdwan-1.jpg"
                  alt={cta.imageAlt}
                  fill
                  priority={false}
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
                  style={{ objectPosition: "center" }}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Column: Heading, Subtitle & Action Button (Figma Frame 1000001694: 495x366px) */}
            <div className="relative w-full lg:max-w-[495px] text-center lg:text-start flex flex-col items-center lg:items-start">
              <h2
                id="cta-heading"
                className="font-display font-extrabold uppercase text-3xl sm:text-4xl lg:text-[48px] desktop:text-[56px] leading-[1.08] tracking-tight text-foreground"
              >
                {cta.heading}
              </h2>

              <p className="mt-4 lg:mt-6 font-sans text-base sm:text-lg lg:text-[20px] text-muted leading-relaxed max-w-[456px]">
                {cta.description}
              </p>

              {/* Functional CTA Button to /booking */}
              <div className="mt-8 lg:mt-10">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-control bg-brand px-8 py-4 sm:px-10 sm:py-5 font-display text-base sm:text-lg font-bold uppercase tracking-wider text-foreground shadow-[0_4px_24px_rgba(255,35,50,0.35)] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_6px_32px_rgba(255,35,50,0.5)] active:scale-95 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                >
                  {cta.buttonLabel}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
