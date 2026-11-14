import Image from "next/image";

const STATS = [
  {
    id: "clients",
    value: "2000+",
    label: "Satisfied Clients",
  },
  {
    id: "experience",
    value: "10",
    label: "Years of Experience",
  },
  {
    id: "sport",
    value: "15",
    label: "Years in Sport",
  },
];

export default function AboutCoach({ className = "" }) {
  return (
    <section
      id="about"
      aria-labelledby="about-coach-title"
      className={[
        "relative w-full overflow-hidden bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto flex w-full max-w-[var(--container-about)] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 desktop:gap-20">
          {/* Left Column: Visual Media with Video Play Button */}
          <div className="w-full max-w-[545px] shrink-0">
            <div className="group relative aspect-[544.81/452.03] w-full overflow-hidden rounded-[var(--radius-media)] bg-surface shadow-[var(--shadow-card)]">
              <Image
                src="/images/about/coach-workout.webp"
                alt="Woman working out with personal trainer John Doe in the gym"
                fill
                priority={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 545px, 545px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Accessible Video Play Trigger Overlay */}
              <button
                type="button"
                aria-label="Play video about Coach John"
                className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
              >
                <span className="sr-only">Play introduction video</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Stat Cards */}
          <div className="flex w-full max-w-[549px] flex-col justify-center">
            {/* Heading & Bio */}
            <div>
              <h2
                id="about-coach-title"
                className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] desktop:leading-[1.15]"
              >
                Who Is John?
              </h2>
              <p className="section-body mt-4 max-w-[500px] text-sm leading-relaxed sm:text-base sm:leading-relaxed lg:mt-6 lg:text-[1.125rem] lg:leading-[1.55]">
                As a passionate personal trainer, I believe in empowering
                individuals to achieve their fitness goals through personalized
                coaching and support.
              </p>
            </div>

            {/* Stat Cards Grid */}
            <div
              className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-4 lg:mt-10 desktop:mt-8"
              role="list"
              aria-label="Coach achievements and experience"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.id}
                  role="listitem"
                  className="surface-card flex min-h-[110px] flex-col items-center justify-center rounded-[var(--radius-card)] p-3 text-center sm:min-h-[127px] sm:p-4"
                >
                  <span className="font-display text-2xl font-bold tracking-tight text-brand sm:text-3xl lg:text-[2rem] desktop:text-[2.5rem] leading-none">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-xs font-normal text-muted sm:mt-3 sm:text-sm leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
