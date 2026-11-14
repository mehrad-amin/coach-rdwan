import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import DiagonalBeams from "@/components/ui/DiagonalBeams";
import { HERO_CONTENT } from "@/data/hero";

export default function HeroSection() {
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
          className="pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-luminosity desktop:inset-auto desktop:left-[2px] desktop:top-[22px] desktop:h-[959px] desktop:w-[1438px]"
        >
          <Image
            src={HERO_CONTENT.backgroundImage.src}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 1440px) 100vw, 1438px"
            className="object-cover object-center"
          />
          <div className="hero-photo-vignette absolute inset-0" />
        </div>

        {/* Layer 2: Diagonal translucent white and red light beams (1:40 / Group 36) */}
        <DiagonalBeams />

        {/* Layer 6 in z-order (first in DOM flow so mobile reads headline & CTA before cutout) */}
        <div className="relative z-20 px-5 pt-28 sm:px-8 sm:pt-32 lg:px-0 lg:pb-[110px] lg:pt-[150px] xl:pb-[120px] xl:pt-[170px] desktop:pb-[156px] desktop:pt-[230px]">
          <div className="lg:pl-[11.528%] desktop:pl-[166px]">
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="max-w-[686px] scroll-mt-24 font-display text-[clamp(2.125rem,1rem+4.44vw,5rem)] font-extrabold uppercase leading-[1.2] tracking-[0.02em] text-foreground lg:max-w-[47.64vw] desktop:max-w-[686px]"
            >
              {HERO_CONTENT.headline}
            </h1>

            <p className="mt-3 max-w-[480px] text-pretty font-sans text-[clamp(1.0625rem,0.775rem+0.667vw,1.375rem)] font-normal leading-[1.545] text-foreground/55 lg:ml-[4px] lg:mt-[10px]">
              {HERO_CONTENT.lead}
            </p>

            <div className="mt-8 lg:mt-[44px] desktop:mt-[68px]">
              <CtaButton href={HERO_CONTENT.ctaHref} size="large">
                {HERO_CONTENT.ctaLabel}
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Layer 3: Giant John DOE watermark (1:51) */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-12 left-4 z-[5] select-none whitespace-nowrap bg-gradient-to-t from-white from-[25.833%] to-transparent to-[81.439%] bg-clip-text font-display text-[clamp(4.5rem,15.27vw,13.75rem)] font-extrabold uppercase leading-[1.2] tracking-[-0.01em] text-transparent opacity-30 lg:bottom-auto lg:left-[2px] lg:top-[580px] xl:top-[640px] desktop:top-[750px] desktop:tracking-[-2.2px]"
        >
          {HERO_CONTENT.watermarkText}
        </p>

        {/* Layer 4: Trainer portrait cutout (1:53) mirrored horizontally to face headline */}
        <div className="pointer-events-none relative z-10 mx-auto mt-6 w-[78%] max-w-[360px] select-none sm:max-w-[400px] lg:absolute lg:bottom-0 lg:left-[52.014%] lg:right-auto lg:mt-0 lg:w-[37.153%] lg:max-w-none">
          <div className="relative aspect-[535/883] w-full overflow-hidden -scale-x-100">
            <Image
              src={HERO_CONTENT.trainerCutout.src}
              alt={HERO_CONTENT.trainerCutout.alt}
              width={HERO_CONTENT.trainerCutout.width}
              height={HERO_CONTENT.trainerCutout.height}
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 128vw, 270vw"
              className="absolute left-[-122.42%] top-0 h-[138.97%] w-[344.84%] max-w-none"
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
