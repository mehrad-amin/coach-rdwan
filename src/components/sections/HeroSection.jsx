"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import DiagonalBeams from "@/components/ui/DiagonalBeams";
import { HERO_MEDIA } from "@/data/hero";
import { useLocale } from "@/i18n/LocaleProvider";

export default function HeroSection() {
  const { t } = useLocale();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Hero canvas stage anchored to Figma 1440x962 desktop frame */}
      <div className="relative isolate mx-auto w-full max-w-[1440px] overflow-hidden lg:min-h-[760px] xl:min-h-[820px] desktop:min-h-[962px]">
        {/* Layer 1: Background gym interior (1:34) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-luminosity desktop:inset-auto desktop:start-[2px] desktop:top-[22px] desktop:h-[959px] desktop:w-[1438px]"
        >
          <Image
            src={HERO_MEDIA.backgroundImage.src}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 1440px) 100vw, 1438px"
            className="object-cover object-center"
          />
          <div className="hero-photo-vignette absolute inset-0" />
        </div>

        {/* Layer 2: Diagonal translucent white and red light beams (mirrored symmetrically in RTL) */}
        <DiagonalBeams />

        {/* Layer 6 in z-order (first in DOM flow so mobile reads headline & CTA before portrait) */}
        <div className="relative z-20 px-5 pt-28 sm:px-8 sm:pt-32 lg:px-0 lg:pb-[110px] lg:pt-[150px] xl:pb-[120px] xl:pt-[170px] desktop:pb-[156px] desktop:pt-[220px]">
          <div className="lg:ps-[6%] xl:ps-[9%] desktop:ps-[166px]">
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="max-w-[560px] scroll-mt-24 font-display text-[clamp(2.125rem,1rem+4.2vw,4.75rem)] font-extrabold uppercase leading-[1.18] tracking-[0.02em] text-foreground lg:max-w-[490px] xl:max-w-[570px] desktop:max-w-[640px] rtl:leading-[1.24]"
            >
              {t.hero.headline}
            </h1>

            <p className="mt-4 max-w-[490px] text-pretty font-sans text-[clamp(1rem,0.85rem+0.55vw,1.3125rem)] font-normal leading-[1.58] text-foreground/60 lg:mt-4 rtl:leading-[1.75]">
              {t.hero.lead}
            </p>

            <div className="mt-8 lg:mt-[44px] desktop:mt-[64px]">
              <CtaButton href={HERO_MEDIA.ctaHref} size="large">
                {t.hero.ctaLabel}
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Layer 3: Giant brand watermark */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[34px] z-[5] select-none whitespace-nowrap bg-gradient-to-t from-white from-[25.833%] to-transparent to-[81.439%] bg-clip-text text-center font-display text-[clamp(4.75rem,21vw,7.25rem)] font-extrabold uppercase leading-[1.2] tracking-[-0.01em] text-transparent opacity-30 sm:bottom-[54px] rtl:text-[clamp(6rem,28.5vw,8.5rem)] rtl:opacity-[0.45] lg:inset-x-auto lg:bottom-auto lg:start-[2px] lg:top-[580px] lg:text-start lg:text-[clamp(4.5rem,15.27vw,13.75rem)] lg:rtl:text-[clamp(4.5rem,15.27vw,13.75rem)] lg:rtl:opacity-30 xl:top-[640px] desktop:top-[740px] desktop:tracking-[-2.2px] rtl:tracking-normal"
        >
          {t.hero.watermarkText}
        </p>

        {/* Layer 4: Rdwan transparent portrait cutout (natural 1800x2400 aspect, unmirrored) */}
        <div className="pointer-events-none relative z-10 mx-auto -mt-8 w-[92%] max-w-[420px] select-none sm:-mt-10 sm:max-w-[480px] lg:absolute lg:bottom-0 lg:mt-0 lg:w-[540px] lg:max-w-none xl:w-[650px] desktop:w-[780px] ltr:lg:end-[-20px] rtl:lg:end-[-48px] ltr:xl:end-[0px] rtl:xl:end-[-34px] ltr:desktop:end-[36px] rtl:desktop:end-[-6px]">
          {/* Subtle ambient red rim glow behind Rdwan matching design tokens */}
          <div
            aria-hidden="true"
            className="ambient-red-glow absolute left-1/2 top-[58%] h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 blur-[65px]"
          />
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={HERO_MEDIA.coachCutout.src}
              alt={t.hero.portraitAlt}
              width={HERO_MEDIA.coachCutout.width}
              height={HERO_MEDIA.coachCutout.height}
              preload
              fetchPriority="high"
              sizes="(min-width: 1440px) 780px, (min-width: 1280px) 650px, (min-width: 1024px) 540px, 92vw"
              className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Layer 5: Bottom gradient fade into #1a1a1a (1:54 / Rectangle 55) */}
        <div
          aria-hidden="true"
          className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[200px] sm:h-[240px] lg:h-[260px] desktop:h-[321px]"
        />
      </div>
    </section>
  );
}
