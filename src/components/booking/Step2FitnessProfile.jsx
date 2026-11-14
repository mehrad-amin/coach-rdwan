"use client";

export default function Step2FitnessProfile({ data, updateData, errors }) {
  const goals = [
    {
      id: "weight_loss",
      title: "Weight Loss",
      desc: "Burn fat, lean down, improve metabolic health & stamina",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
    },
    {
      id: "muscle_building",
      title: "Muscle Building",
      desc: "Hypertrophy, strength gain, progressive overload & mass",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: "body_recomp",
      title: "Body Recomposition",
      desc: "Simultaneously lose body fat and build defined lean muscle",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      id: "general_fitness",
      title: "General Fitness",
      desc: "Cardiovascular endurance, joint mobility & daily energy",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  const experiences = [
    {
      id: "beginner",
      title: "Beginner",
      subtitle: "< 6 months of training",
      desc: "New to structured workouts or returning after a long break",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      subtitle: "6 months – 2 years",
      desc: "Familiar with barbell/dumbbell basics and regular lifting",
    },
    {
      id: "advanced",
      title: "Advanced",
      subtitle: "2+ years",
      desc: "Experienced with structured splits, periodization & technique",
    },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          Step 2: Fitness Profile
        </h3>
        <p className="mt-1 text-sm text-muted font-sans">
          Help us benchmark your physical baseline and clarify your transformation targets.
        </p>
      </div>

      {/* Height & Weight Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Height */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-foreground/90 mb-1.5">
            Height (cm) <span className="text-brand">*</span>
          </label>
          <input
            type="number"
            id="height"
            name="height"
            min="120"
            max="230"
            value={data.height || ""}
            onChange={(e) => updateData({ height: e.target.value })}
            placeholder="e.g. 178"
            aria-invalid={Boolean(errors.height)}
            aria-describedby={errors.height ? "height-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
              errors.height
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/15 focus:border-brand focus:ring-brand"
            }`}
          />
          {errors.height && (
            <p id="height-error" className="mt-1.5 text-xs text-red-400 font-medium">
              {errors.height}
            </p>
          )}
        </div>

        {/* Current Weight */}
        <div>
          <label htmlFor="currentWeight" className="block text-sm font-medium text-foreground/90 mb-1.5">
            Current Weight (kg) <span className="text-brand">*</span>
          </label>
          <input
            type="number"
            id="currentWeight"
            name="currentWeight"
            min="35"
            max="250"
            step="0.5"
            value={data.currentWeight || ""}
            onChange={(e) => updateData({ currentWeight: e.target.value })}
            placeholder="e.g. 82.5"
            aria-invalid={Boolean(errors.currentWeight)}
            aria-describedby={errors.currentWeight ? "currentWeight-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
              errors.currentWeight
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/15 focus:border-brand focus:ring-brand"
            }`}
          />
          {errors.currentWeight && (
            <p id="currentWeight-error" className="mt-1.5 text-xs text-red-400 font-medium">
              {errors.currentWeight}
            </p>
          )}
        </div>

        {/* Target Weight */}
        <div>
          <label htmlFor="targetWeight" className="block text-sm font-medium text-foreground/90 mb-1.5">
            Target Weight (kg) <span className="text-xs text-muted font-normal">(Optional)</span>
          </label>
          <input
            type="number"
            id="targetWeight"
            name="targetWeight"
            min="35"
            max="250"
            step="0.5"
            value={data.targetWeight || ""}
            onChange={(e) => updateData({ targetWeight: e.target.value })}
            placeholder="e.g. 75"
            aria-invalid={Boolean(errors.targetWeight)}
            aria-describedby={errors.targetWeight ? "targetWeight-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
              errors.targetWeight
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/15 focus:border-brand focus:ring-brand"
            }`}
          />
          {errors.targetWeight && (
            <p id="targetWeight-error" className="mt-1.5 text-xs text-red-400 font-medium">
              {errors.targetWeight}
            </p>
          )}
        </div>
      </div>

      {/* Primary Fitness Goal */}
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-2.5">
          Primary Fitness Goal <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Primary fitness goal"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {goals.map((g) => {
            const selected = data.goal === g.id;
            return (
              <button
                key={g.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateData({ goal: g.id })}
                className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selected
                    ? "border-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#191919)] shadow-[0_0_15px_rgba(255,35,50,0.15)]"
                    : "border-white/10 bg-[#141414] hover:border-white/25"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                    selected ? "bg-brand text-foreground" : "bg-white/5 text-muted"
                  }`}
                >
                  {g.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-foreground">
                    {g.title}
                  </h4>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed font-sans">
                    {g.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.goal && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.goal}</p>
        )}
      </div>

      {/* Training Experience */}
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-2.5">
          Training Experience <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Training experience level"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {experiences.map((exp) => {
            const selected = data.experience === exp.id;
            return (
              <button
                key={exp.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateData({ experience: exp.id })}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selected
                    ? "border-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#191919)] shadow-[0_0_15px_rgba(255,35,50,0.15)]"
                    : "border-white/10 bg-[#141414] hover:border-white/25"
                }`}
              >
                <div className="flex flex-col gap-1.5">
                  <span className="font-display font-bold text-base text-foreground">
                    {exp.title}
                  </span>
                  <div>
                    <span className="inline-block whitespace-nowrap text-[11px] font-sans font-medium text-brand bg-brand/10 px-2.5 py-0.5 rounded-full border border-brand/20">
                      {exp.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted mt-2 leading-relaxed font-sans">
                  {exp.desc}
                </p>
              </button>
            );
          })}
        </div>
        {errors.experience && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.experience}</p>
        )}
      </div>
    </div>
  );
}
