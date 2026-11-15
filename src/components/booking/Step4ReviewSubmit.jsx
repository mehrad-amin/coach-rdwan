"use client";

export default function Step4ReviewSubmit({
  data,
  updateData,
  goToStep,
  errors,
  isSubmitting,
}) {
  const goalLabels = {
    weight_loss: "Weight Loss",
    muscle_building: "Muscle Building",
    body_recomp: "Body Recomposition",
    general_fitness: "General Fitness",
  };

  const experienceLabels = {
    beginner: "Beginner (< 6 mos)",
    intermediate: "Intermediate (6 mos – 2 yrs)",
    advanced: "Advanced (2+ yrs)",
  };

  const locationLabels = {
    gym: "Gym Facility",
    home: "Home Gym",
    both: "Both / Hybrid",
  };

  const packageDetails = {
    personal_training: {
      name: "Personal Training",
      price: "$200 / month",
      desc: "Weekly customized programming & 1-on-1 coaching",
    },
    nutrition: {
      name: "Diet & Nutrition",
      price: "$150 / month",
      desc: "Custom macros, tailored meal structures & weekly audits",
    },
    hybrid: {
      name: "Training + Diet (Complete Transformation)",
      price: "$300 / month",
      desc: "Comprehensive workout programming + customized nutrition coaching",
    },
  };

  const selectedPkg = packageDetails[data.package] || packageDetails.hybrid;

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          Step 4: Review & Confirm
        </h3>
        <p className="mt-1 text-sm text-muted font-sans">
          Review your information below before submitting your coaching application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Personal Information */}
        <div className="rounded-xl border-[1.5px] border-white/10 bg-[#141414] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <h4 className="font-display font-bold text-sm uppercase text-foreground tracking-wide">
                Personal Information
              </h4>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <dl className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Full Name:</dt>
                <dd className="font-medium text-foreground">{data.fullName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Email:</dt>
                <dd className="font-medium text-foreground">{data.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Phone:</dt>
                <dd className="font-medium text-foreground">{data.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Age / Gender:</dt>
                <dd className="font-medium text-foreground">
                  {data.age} yrs • {data.gender}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 2. Fitness Profile */}
        <div className="rounded-xl border-[1.5px] border-white/10 bg-[#141414] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <h4 className="font-display font-bold text-sm uppercase text-foreground tracking-wide">
                Fitness Profile
              </h4>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <dl className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Height:</dt>
                <dd className="font-medium text-foreground">{data.height} cm</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Current Weight:</dt>
                <dd className="font-medium text-foreground">{data.currentWeight} kg</dd>
              </div>
              {data.targetWeight && (
                <div className="flex justify-between">
                  <dt className="text-muted">Target Weight:</dt>
                  <dd className="font-medium text-brand">{data.targetWeight} kg</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted">Primary Goal:</dt>
                <dd className="font-medium text-foreground">
                  {goalLabels[data.goal] || data.goal}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Experience:</dt>
                <dd className="font-medium text-foreground">
                  {experienceLabels[data.experience] || data.experience}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 3. Training & Logistics */}
        <div className="rounded-xl border-[1.5px] border-white/10 bg-[#141414] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <h4 className="font-display font-bold text-sm uppercase text-foreground tracking-wide">
                Training & Schedule
              </h4>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <dl className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Location:</dt>
                <dd className="font-medium text-foreground">
                  {locationLabels[data.trainingLocation] || data.trainingLocation}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Frequency:</dt>
                <dd className="font-medium text-foreground">
                  {data.daysPerWeek} days per week
                </dd>
              </div>
              {data.notes && (
                <div className="pt-2 border-t border-white/5 mt-2">
                  <dt className="text-xs text-muted mb-0.5">Notes / Limitations:</dt>
                  <dd className="text-xs text-foreground/80 italic line-clamp-2">
                    &ldquo;{data.notes}&rdquo;
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* 4. Selected Package */}
        <div className="rounded-xl border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_6%,#141414)] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-brand/30">
              <h4 className="font-display font-bold text-sm uppercase text-brand tracking-wide">
                Selected Package
              </h4>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-display font-bold text-base text-foreground">
                  {selectedPkg.name}
                </span>
                <span className="font-display font-extrabold text-lg text-brand">
                  {selectedPkg.price}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                {selectedPkg.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Required Consent Checkbox */}
      <div className="rounded-xl bg-[#141414] border-[1.5px] border-white/10 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={Boolean(data.consent)}
            onChange={(e) => updateData({ consent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-background text-brand focus:ring-brand focus:ring-offset-0 cursor-pointer accent-brand"
          />
          <span className="text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed">
            I confirm that the information provided is accurate and agree to have it
            used for this demo booking experience.{" "}
            <span className="text-brand font-medium">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-xs text-red-400 font-medium">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Honest Demo Disclaimer */}
      <div className="rounded-xl border-[1.5px] border-white/10 bg-white/[0.02] p-3 text-center">
        <p className="inline-flex items-center justify-center gap-1.5 text-xs text-muted font-sans">
          <svg
            className="w-3.5 h-3.5 shrink-0 text-brand inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          <span>
            <span className="font-medium text-foreground/80">Demo Notice:</span> This is an interactive portfolio prototype. No personal data is stored in databases or transmitted to third-party services.
          </span>
        </p>
      </div>
    </div>
  );
}
