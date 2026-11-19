"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { PRICING_CONFIG } from "@/data/pricing";

export default function Step3TrainingLifestyle({ data, updateData, errors }) {
  const { t, locale } = useLocale();
  const step3 = t?.booking?.step3 || {};

  const locations = [
    {
      id: "gym",
      title: step3.locations?.gym?.title || "Gym Facility",
      desc: step3.locations?.gym?.desc || "Commercial or private fitness club with full equipment & free weights",
    },
    {
      id: "home",
      title: step3.locations?.home?.title || "Home Gym",
      desc: step3.locations?.home?.desc || "Workout from home with dumbbells, resistance bands, or bodyweight",
    },
    {
      id: "both",
      title: step3.locations?.both?.title || "Both / Hybrid",
      desc: step3.locations?.both?.desc || "Flexible split combining gym sessions with home functional workouts",
    },
  ];

  const daysOptions = [2, 3, 4, 5, 6];

  const currency = t?.pricing?.currency || "SAR";
  const period = t?.pricing?.period || "/month";

  const packages = PRICING_CONFIG.plans.map((plan) => {
    const planInfo = t?.pricing?.plans?.[plan.id] || {};
    const badgeText =
      plan.badge?.[locale] ||
      (plan.featured
        ? locale === "ar"
          ? "الأكثر طلبًا"
          : "Most Popular"
        : null);

    return {
      id: plan.id,
      title: planInfo.name || plan.id,
      price: `${plan.priceAmount} ${currency}`,
      period: period,
      badge: badgeText,
      featured: Boolean(plan.featured),
      desc: planInfo.description || "",
      features: planInfo.features || [],
    };
  });

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          {step3.title || "Step 3: Training & Lifestyle"}
        </h3>
        <p className="mt-1 text-sm text-muted font-sans">
          {step3.subtitle || "Select your training logistics and chosen coaching package so we can design your schedule."}
        </p>
      </div>

      {/* Preferred Training Location */}
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-2.5">
          {step3.locationLabel || "Preferred Training Location"} <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label={step3.locationLabel || "Preferred training location"}
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
                className={`p-4 rounded-xl border-[1.5px] text-start transition-all cursor-pointer ${
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
          {step3.daysLabel || "Available Training Days Per Week"} <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label={step3.daysLabel || "Available training days per week"}
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
                  {step3.daysUnit || "Days"}
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
          {step3.packageLabel || "Preferred Coaching Package"} <span className="text-brand">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label={step3.packageLabel || "Preferred coaching package"}
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
                className={`relative p-4 rounded-xl border-[1.5px] text-start flex flex-col justify-between transition-all cursor-pointer ${
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
                    {pkg.badge && (
                      <div>
                        <span
                          className={`inline-block whitespace-nowrap text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            pkg.featured
                              ? "bg-brand text-foreground"
                              : "bg-white/10 text-muted"
                          }`}
                        >
                          {pkg.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 my-2">
                    <span className="font-display font-extrabold text-2xl text-foreground">
                      {pkg.price}
                    </span>
                    <span className="font-sans text-xs text-muted ms-1">{pkg.period}</span>
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

        {/* Student Discount Notice */}
        <div className="mt-3.5 flex items-start sm:items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted font-sans">
          <span className="shrink-0 font-bold uppercase tracking-wider text-brand">
            {t?.pricing?.studentDiscount || "25% Student Discount"}:
          </span>
          <span className="leading-relaxed">
            {step3.studentDiscountNote ||
              "25% student discount available on all plans upon student ID verification."}
          </span>
        </div>
      </div>

      {/* Injuries / Physical Limitations / Notes (Optional) */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-foreground/90 mb-1.5">
          {step3.notesLabel || "Injuries, Physical Limitations or Coach Notes"}{" "}
          <span className="text-xs text-muted font-normal">
            {step3.notesOptional || "(Optional)"}
          </span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={data.notes || ""}
          onChange={(e) => updateData({ notes: e.target.value })}
          placeholder={step3.notesPlaceholder || "E.g. Past shoulder dislocation, lower back stiffness, asthma, dietary allergies..."}
          className="w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors font-sans text-sm resize-y"
        />
      </div>
    </div>
  );
}
