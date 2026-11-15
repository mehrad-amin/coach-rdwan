"use client";

export default function Step3TrainingLifestyle({ data, updateData, errors }) {
  const locations = [
    {
      id: "gym",
      title: "Gym Facility",
      desc: "Commercial or private fitness club with full equipment & free weights",
    },
    {
      id: "home",
      title: "Home Gym",
      desc: "Workout from home with dumbbells, resistance bands, or bodyweight",
    },
    {
      id: "both",
      title: "Both / Hybrid",
      desc: "Flexible split combining gym sessions with home functional workouts",
    },
  ];

  const daysOptions = [2, 3, 4, 5, 6];

  const packages = [
    {
      id: "personal_training",
      title: "Personal Training",
      price: "$200",
      period: "/month",
      badge: "In-Person / Virtual",
      desc: "Custom weekly workout programming, form analysis, and 1-on-1 coaching sessions.",
    },
    {
      id: "nutrition",
      title: "Diet & Nutrition",
      price: "$150",
      period: "/month",
      badge: "Targeted Nutrition",
      desc: "Caloric & macro targets, personalized meal structure, and weekly dietary adjustments.",
    },
    {
      id: "hybrid",
      title: "Training + Diet",
      price: "$300",
      period: "/month",
      badge: "Most Popular",
      recommended: true,
      desc: "The complete transformation blueprint: full workout coaching + precision nutrition planning.",
    },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          Step 3: Training & Lifestyle
        </h3>
        <p className="mt-1 text-sm text-muted font-sans">
          Select your training logistics and chosen coaching package so we can design your schedule.
        </p>
      </div>

      {/* Preferred Training Location */}
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-2.5">
          Preferred Training Location <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Preferred training location"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {locations.map((loc) => {
            const selected = data.trainingLocation === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateData({ trainingLocation: loc.id })}
                className={`p-4 rounded-xl border-[1.5px] text-left transition-all cursor-pointer ${
                  selected
                    ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#191919)] shadow-[0_0_15px_rgba(255,35,50,0.15)]"
                    : "border-white/10 bg-[#141414] hover:border-white/25"
                }`}
              >
                <h4 className="font-display font-bold text-base text-foreground">
                  {loc.title}
                </h4>
                <p className="text-xs text-muted mt-1 leading-relaxed font-sans">
                  {loc.desc}
                </p>
              </button>
            );
          })}
        </div>
        {errors.trainingLocation && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.trainingLocation}</p>
        )}
      </div>

      {/* Available Days per Week */}
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-2.5">
          Available Training Days Per Week <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Available training days per week"
          className="grid grid-cols-5 gap-2.5 max-w-md"
        >
          {daysOptions.map((days) => {
            const selected = Number(data.daysPerWeek) === days;
            return (
              <button
                key={days}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateData({ daysPerWeek: days })}
                className={`flex flex-col items-center justify-center py-3 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                  selected
                    ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_15%,#191919)] text-foreground font-bold shadow-[0_0_15px_rgba(255,35,50,0.2)]"
                    : "border-white/15 bg-[#141414] text-muted hover:border-white/30 hover:text-foreground"
                }`}
              >
                <span className="font-display text-xl">{days}</span>
                <span className="text-[10px] uppercase font-sans tracking-wide text-muted">
                  Days
                </span>
              </button>
            );
          })}
        </div>
        {errors.daysPerWeek && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.daysPerWeek}</p>
        )}
      </div>

      {/* Preferred Coaching Package */}
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-2.5">
          Preferred Coaching Package <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Preferred coaching package"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
        >
          {packages.map((pkg) => {
            const selected = data.package === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateData({ package: pkg.id })}
                className={`relative p-4 rounded-xl border-[1.5px] text-left flex flex-col justify-between transition-all cursor-pointer ${
                  selected
                    ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#191919)] shadow-[0_0_20px_rgba(255,35,50,0.18)]"
                    : "border-white/10 bg-[#141414] hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex flex-col gap-1.5 mb-2">
                    <span className="font-display font-bold text-base text-foreground">
                      {pkg.title}
                    </span>
                    <div>
                      <span
                        className={`inline-block whitespace-nowrap text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          pkg.recommended
                            ? "bg-brand text-foreground"
                            : "bg-white/10 text-muted"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 my-2">
                    <span className="font-display font-extrabold text-2xl text-foreground">
                      {pkg.price}
                    </span>
                    <span className="font-sans text-xs text-muted">{pkg.period}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed font-sans mt-2">
                    {pkg.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.package && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.package}</p>
        )}
      </div>

      {/* Injuries / Physical Limitations / Notes (Optional) */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-foreground/90 mb-1.5">
          Injuries, Physical Limitations or Coach Notes{" "}
          <span className="text-xs text-muted font-normal">(Optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={data.notes || ""}
          onChange={(e) => updateData({ notes: e.target.value })}
          placeholder="E.g. Past shoulder dislocation, lower back stiffness, asthma, dietary allergies..."
          className="w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors font-sans text-sm resize-y"
        />
      </div>
    </div>
  );
}
