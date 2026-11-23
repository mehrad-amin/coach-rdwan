"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { getProgramById, getExactPrice } from "@/data/pricing";

export default function Step4ReviewSubmit({
  data,
  updateData,
  goToStep,
  errors,
  isSubmitting,
}) {
  const { t, locale } = useLocale();
  const step4 = t?.booking?.step4 || {};
  const sections = step4.sections || {};
  const fields = step4.fields || {};
  const pricing = t?.pricing || {};

  const programId = data.program || "powerlifting";
  const durationId = data.duration || "1_month";
  const isStudent = data.student === "yes";
  const approvedPrice = getExactPrice(programId, durationId, isStudent);

  const programInfo = pricing.programs?.[programId] || {};
  const durationLabel = pricing.durationLabels?.[durationId] || durationId;

  const isPowerlifting = programId === "powerlifting";

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          {step4.title || "Step 4: Review & Confirm"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted font-sans leading-relaxed">
          {step4.subtitle ||
            "Verify your application details before submitting to Coach Rdwan."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Basic Athlete Information */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
                {sections.personal || "Basic Athlete Information"}
              </h4>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
              >
                {step4.edit || "Edit"}
              </button>
            </div>
            <dl className="space-y-2 text-xs sm:text-sm font-sans">
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.fullName || "Full Name:"}</dt>
                <dd className="font-semibold text-foreground">{data.fullName}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.phone || "WhatsApp:"}</dt>
                <dd className="font-medium text-foreground" dir="ltr">
                  {data.phone}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.email || "Email:"}</dt>
                <dd className="font-medium text-foreground truncate max-w-[180px]" dir="ltr">
                  {data.email}
                </dd>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <dt className="text-muted">{fields.age || "Age:"}</dt>
                <dd className="font-medium text-foreground">{data.age}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.height || "Height:"}</dt>
                <dd className="font-medium text-foreground">{data.height} cm</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.currentWeight || "Current Weight:"}</dt>
                <dd className="font-medium text-foreground">{data.currentWeight} kg</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 2. Program & Subscription */}
        <div className="rounded-2xl border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_8%,#141414)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-brand/25">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
                {sections.subscription || "Program & Subscription"}
              </h4>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
              >
                {step4.edit || "Edit"}
              </button>
            </div>
            <dl className="space-y-2.5 text-xs sm:text-sm font-sans">
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.program || "Selected Program:"}</dt>
                <dd className="font-display font-bold text-base text-foreground">
                  {programInfo.name || programId}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.duration || "Duration:"}</dt>
                <dd className="font-semibold text-foreground">{durationLabel}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted">{fields.studentStatus || "Student:"}</dt>
                <dd className="font-medium">
                  {isStudent ? (
                    <span className="text-brand font-bold">
                      {locale === "ar" ? "نعم (خصم 20%)" : "Yes (20% Discount)"}
                    </span>
                  ) : (
                    <span className="text-muted">
                      {locale === "ar" ? "لا" : "No"}
                    </span>
                  )}
                </dd>
              </div>
              <div className="pt-2.5 border-t border-brand/20 flex justify-between items-baseline">
                <dt className="font-sans text-xs text-muted">
                  {fields.price || "Approved Price:"}
                </dt>
                <dd className="font-display font-extrabold text-2xl text-brand" dir="ltr">
                  {approvedPrice} {pricing.currency}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 3. Program-Specific Questionnaire Answers (Active Track Only) */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#141414] p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
              {sections.questionnaire || "Specialized Questionnaire Answers"}
            </h4>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="text-xs font-sans font-semibold text-brand hover:underline cursor-pointer"
            >
              {step4.edit || "Edit"}
            </button>
          </div>

          {isPowerlifting ? (
            /* Powerlifting Answers */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
              <div className="flex justify-between">
                <span className="text-muted">Squat:</span>
                <span className="font-medium text-foreground">
                  {data.plSquatWeight ? `${data.plSquatWeight} kg` : "—"}{" "}
                  {data.plSquatTechnique ? `(${data.plSquatTechnique})` : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Bench Press:</span>
                <span className="font-medium text-foreground">
                  {data.plBenchWeight ? `${data.plBenchWeight} kg` : "—"}{" "}
                  {data.plFingerPlacement ? `(${data.plFingerPlacement})` : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Deadlift:</span>
                <span className="font-medium text-foreground">
                  {data.plDeadliftWeight ? `${data.plDeadliftWeight} kg` : "—"}{" "}
                  {data.plDeadliftTechnique ? `(${data.plDeadliftTechnique})` : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">RPE Knowledge:</span>
                <span className="font-medium text-foreground">
                  {data.plRpeKnowledge === "yes"
                    ? locale === "ar"
                      ? "أعرف"
                      : "Yes, I know it"
                    : locale === "ar"
                    ? "ما أعرف"
                    : "No, I don't"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Training Days:</span>
                <span className="font-medium text-foreground">
                  {data.plDays} {locale === "ar" ? "أيام / أسبوع" : "Days/Week"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Worked with Coach:</span>
                <span className="font-medium text-foreground">
                  {data.plPreviousCoach === "yes"
                    ? locale === "ar"
                      ? "أيوة"
                      : "Yes"
                    : locale === "ar"
                    ? "لا"
                    : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Calculates Calories:</span>
                <span className="font-medium text-foreground">
                  {data.plCalorieKnowledge === "yes"
                    ? locale === "ar"
                      ? "أيوة"
                      : "Yes"
                    : locale === "ar"
                    ? "لا"
                    : "No"}
                </span>
              </div>
              {data.plCompetition && (
                <div className="flex justify-between">
                  <span className="text-muted">Championship Experience:</span>
                  <span className="font-medium text-foreground">
                    {data.plCompetition === "yes"
                      ? locale === "ar"
                        ? "أيوة"
                        : "Yes"
                      : locale === "ar"
                      ? "لا"
                      : "No"}
                  </span>
                </div>
              )}
              {data.plWhyRdwan && (
                <div className="sm:col-span-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-muted block mb-1">
                    {locale === "ar" ? "سبب اختيار الكوتش:" : "Reason for Choosing Coach:"}
                  </span>
                  <p className="text-xs text-foreground/90 italic">
                    &ldquo;{data.plWhyRdwan}&rdquo;
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Bodybuilding Answers */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
              <div className="flex justify-between">
                <span className="text-muted">Goal:</span>
                <span className="font-semibold text-brand">
                  {data.bbGoal === "fat_loss"
                    ? locale === "ar"
                      ? "خسارة دهون"
                      : "Fat Loss"
                    : locale === "ar"
                    ? "بناء كتلة عضلية"
                    : "Building Muscle Mass"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Training Days:</span>
                <span className="font-medium text-foreground">
                  {data.bbDays} {locale === "ar" ? "أيام / أسبوع" : "Days/Week"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Activity Level:</span>
                <span className="font-medium text-foreground">
                  {data.bbActivityLevel || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Worked with Coach:</span>
                <span className="font-medium text-foreground">
                  {data.bbPreviousCoach === "yes"
                    ? locale === "ar"
                      ? "أيوة"
                      : "Yes"
                    : locale === "ar"
                    ? "لا"
                    : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Calculates Calories:</span>
                <span className="font-medium text-foreground">
                  {data.bbCalorieKnowledge === "yes"
                    ? locale === "ar"
                      ? "أيوة"
                      : "Yes"
                    : locale === "ar"
                    ? "لا"
                    : "No"}
                </span>
              </div>
              {data.bbWhyRdwan && (
                <div className="sm:col-span-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-muted block mb-1">
                    {locale === "ar" ? "سبب اختيار الكوتش:" : "Reason for Choosing Coach:"}
                  </span>
                  <p className="text-xs text-foreground/90 italic">
                    &ldquo;{data.bbWhyRdwan}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Additional details: Instagram & Notes */}
          {(data.instagram || data.additionalNotes) && (
            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-sans">
              {data.instagram && (
                <div className="flex justify-between">
                  <span className="text-muted">Instagram:</span>
                  <span className="font-mono text-foreground" dir="ltr">
                    {data.instagram}
                  </span>
                </div>
              )}
              {data.additionalNotes && (
                <div>
                  <span className="text-muted block mb-0.5">
                    {locale === "ar" ? "ملاحظات إضافية:" : "Additional Notes:"}
                  </span>
                  <p className="text-foreground/80 italic">&ldquo;{data.additionalNotes}&rdquo;</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Required Consent Checkbox */}
      <div className="rounded-2xl bg-[#141414] border border-white/10 p-5">
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
            {step4.consentText ||
              "I confirm that all entered information is accurate and agree to begin coaching with Coach Rdwan."}{" "}
            <span className="text-brand font-bold">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-xs text-red-400 font-medium">{errors.consent}</p>
        )}
      </div>
    </div>
  );
}
