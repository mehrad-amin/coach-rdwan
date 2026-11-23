"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { PRICING_CONFIG, getProgramById, getExactPrice } from "@/data/pricing";

export default function Step2ProgramSelection({ data, updateData, errors }) {
  const { t, locale, dir } = useLocale();
  const step2 = t?.booking?.step2 || {};
  const pricing = t?.pricing || {};
  const isRtl = dir === "rtl";

  const selectedProgramId = data.program || PRICING_CONFIG.defaultProgramId;
  const selectedDurationId = data.duration || PRICING_CONFIG.defaultDurationId;
  const isStudent = data.student === "yes";

  const currentPrice = getExactPrice(selectedProgramId, selectedDurationId, isStudent);
  const currentProgram = getProgramById(selectedProgramId);
  const localizedProgramInfo = pricing.programs?.[selectedProgramId] || {};

  const handleProgramChange = (progId) => {
    updateData({ program: progId });
    try {
      sessionStorage.setItem("pt_selected_program", progId);
    } catch {}
  };

  const handleDurationChange = (durId) => {
    updateData({ duration: durId });
    try {
      sessionStorage.setItem("pt_selected_duration", durId);
    } catch {}
  };

  const handleStudentChange = (studentValue) => {
    updateData({ student: studentValue });
    try {
      sessionStorage.setItem("pt_is_student", studentValue);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          {step2.title || "Step 2: Program & Subscription"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted font-sans leading-relaxed">
          {step2.subtitle ||
            "Choose your coaching program, subscription duration, and student discount status."}
        </p>
      </div>

      {/* 1. Program Selection */}
      <div className="space-y-2.5">
        <label className="block text-xs sm:text-sm font-medium text-foreground/90">
          {step2.programLabel || "Selected Program"}{" "}
          <span className="text-brand font-bold">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label={step2.programLabel || "Selected Program"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {PRICING_CONFIG.programs.map((prog) => {
            const isSelected = selectedProgramId === prog.id;
            const progInfo = pricing.programs?.[prog.id] || {};
            const samplePrice = getExactPrice(prog.id, selectedDurationId, isStudent);

            return (
              <button
                key={prog.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleProgramChange(prog.id)}
                className={`p-4 sm:p-5 rounded-2xl border-[1.5px] text-start transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_8%,#141414)] shadow-[0_0_20px_rgba(255,35,50,0.18)]"
                    : "border-white/10 bg-[#141414] hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-base sm:text-lg text-foreground">
                      {progInfo.name || prog.id}
                    </h4>
                    {prog.featured && (
                      <span className="text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded-full bg-brand/15 border border-brand/30">
                        {locale === "ar" ? "الأكثر طلبًا" : "Most Popular"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted leading-relaxed font-sans line-clamp-2">
                    {progInfo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-xs text-muted font-sans">
                    {pricing.currency}
                  </span>
                  <span className="font-display font-bold text-lg text-brand" dir="ltr">
                    {samplePrice} {pricing.currency}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {errors.program && (
          <p className="text-xs text-red-400 font-medium">{errors.program}</p>
        )}
      </div>

      {/* 2. Subscription Duration Selection */}
      <div className="space-y-2.5">
        <label className="block text-xs sm:text-sm font-medium text-foreground/90">
          {step2.durationLabel || "Subscription Duration"}{" "}
          <span className="text-brand font-bold">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label={step2.durationLabel || "Subscription Duration"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {PRICING_CONFIG.durations.map((dur) => {
            const isSelected = selectedDurationId === dur.id;
            const durLabel = pricing.durationLabels?.[dur.id] || dur.id;
            const durPrice = getExactPrice(selectedProgramId, dur.id, isStudent);

            return (
              <button
                key={dur.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleDurationChange(dur.id)}
                className={`p-4 rounded-xl border-[1.5px] flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "border-brand bg-brand/10 text-foreground shadow-[0_0_15px_rgba(255,35,50,0.15)]"
                    : "border-white/10 bg-[#141414] text-muted hover:text-foreground hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-brand bg-brand" : "border-white/30"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    )}
                  </span>
                  <span className="font-display font-bold text-sm text-foreground">
                    {durLabel}
                  </span>
                </div>
                <span className="font-display font-extrabold text-sm text-brand" dir="ltr">
                  {durPrice} {pricing.currency}
                </span>
              </button>
            );
          })}
        </div>
        {errors.duration && (
          <p className="text-xs text-red-400 font-medium">{errors.duration}</p>
        )}
      </div>

      {/* 3. Student Status Selection */}
      <div className="space-y-2.5">
        <label className="block text-xs sm:text-sm font-medium text-foreground/90">
          {step2.studentLabel || "Are you a student?"}{" "}
          <span className="text-brand font-bold">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label={step2.studentLabel || "Are you a student?"}
          className="grid grid-cols-2 gap-3"
        >
          <button
            type="button"
            role="radio"
            aria-checked={data.student === "yes"}
            onClick={() => handleStudentChange("yes")}
            className={`p-3.5 rounded-xl border-[1.5px] font-display text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              data.student === "yes"
                ? "border-brand bg-brand/15 text-foreground shadow-[0_0_15px_rgba(255,35,50,0.2)]"
                : "border-white/10 bg-[#141414] text-muted hover:text-foreground hover:border-white/20"
            }`}
          >
            <span>{step2.studentYes || "Yes"}</span>
            <span className="text-[10px] text-brand lowercase font-sans font-normal">
              (-20%)
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={data.student === "no"}
            onClick={() => handleStudentChange("no")}
            className={`p-3.5 rounded-xl border-[1.5px] font-display text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center ${
              data.student === "no"
                ? "border-brand bg-brand/15 text-foreground shadow-[0_0_15px_rgba(255,35,50,0.2)]"
                : "border-white/10 bg-[#141414] text-muted hover:text-foreground hover:border-white/20"
            }`}
          >
            <span>{step2.studentNo || "No"}</span>
          </button>
        </div>
        {errors.student && (
          <p className="text-xs text-red-400 font-medium">{errors.student}</p>
        )}
      </div>

      {/* 4. Live Pricing & Approved Summary Box */}
      <div className="rounded-2xl border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_8%,#141414)] p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-brand/25">
          <span className="font-display font-bold text-xs uppercase tracking-wider text-brand">
            {step2.summaryHeading || "Approved Plan Summary"}
          </span>
          {isStudent && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-2.5 py-0.5 text-[11px] font-sans font-semibold text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span>{step2.studentDiscountTag || "20% Student Discount Active"}</span>
            </span>
          )}
        </div>

        <div className="mt-3.5 flex items-baseline justify-between">
          <div>
            <h4 className="font-display font-extrabold text-lg sm:text-xl text-foreground">
              {localizedProgramInfo.name || currentProgram.id}
            </h4>
            <p className="text-xs text-muted font-sans">
              {pricing.durationLabels?.[selectedDurationId]}
            </p>
          </div>

          <div className="text-end">
            <span
              dir="ltr"
              className="font-display font-extrabold text-2xl sm:text-3xl text-brand"
            >
              {currentPrice} {pricing.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
