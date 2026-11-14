import Image from "next/image";

const CERTIFICATIONS = [
  {
    id: "cpt",
    code: "CPT",
    title: "Certified Personal Trainer",
  },
  {
    id: "cft",
    code: "CFT",
    title: "Certified Fitness Trainer",
  },
  {
    id: "cn",
    code: "CN",
    title: "Certified Nutritionist",
  },
];

export default function Qualifications({ className = "" }) {
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
        <div className="mx-auto flex w-full max-w-[var(--container-qual)] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 desktop:gap-20">
          {/* Left Column: Heading, Description & Certification Badges */}
          <div className="flex w-full max-w-[477px] flex-col justify-center">
            {/* Title & Editorial Description */}
            <div>
              <h2
                id="qualifications-title"
                className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15]"
              >
                Qualifications
              </h2>
              <p className="section-body mt-4 max-w-[477px] text-sm leading-relaxed sm:text-base sm:leading-relaxed lg:mt-6 lg:text-[1.125rem] lg:leading-[1.55]">
                I’m a certified fitness trainer with over 10 years of experience,
                specializing in personal training and nutrition. I’m passionate
                about helping individuals transform their lives and aim to create
                a welcoming environment where everyone can thrive, regardless of
                fitness level.
              </p>
            </div>

            {/* Certification Badges Row */}
            <div
              className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-4 lg:mt-10 desktop:mt-8 max-w-[447px]"
              role="list"
              aria-label="Professional certifications"
            >
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  role="listitem"
                  aria-label={`${cert.title} (${cert.code})`}
                  title={cert.title}
                  className="surface-card flex h-[64px] sm:h-[72px] items-center justify-center rounded-[var(--radius-card)] p-2 text-center"
                >
                  <span className="font-display text-2xl font-bold tracking-tight text-brand sm:text-3xl lg:text-[2rem] desktop:text-[2.25rem] leading-none">
                    {cert.code}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Media */}
          <div className="w-full max-w-[545px] shrink-0">
            <div className="group relative aspect-[544.81/452] w-full overflow-hidden rounded-[var(--radius-media)] bg-surface shadow-[var(--shadow-card)]">
              <Image
                src="/images/qualifications/couple-training-gym.webp"
                alt="Coach John working with client using dumbbells in gym"
                fill
                priority={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 545px, 545px"
                className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
