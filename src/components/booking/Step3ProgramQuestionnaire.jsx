"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Step3ProgramQuestionnaire({ data, updateData, errors }) {
  const { t, locale } = useLocale();
  const step3 = t?.booking?.step3 || {};
  const isPowerlifting = (data.program || "powerlifting") === "powerlifting";

  const trainingDays = [3, 4, 5];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 border border-brand/30 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-brand mb-2">
          {isPowerlifting
            ? locale === "ar"
              ? "مسار الباورليفتينق"
              : "Powerlifting Track"
            : locale === "ar"
            ? "مسار البوديبلدينق"
            : "Bodybuilding Track"}
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          {step3.title || "Step 3: Program Questionnaire"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted font-sans leading-relaxed">
          {isPowerlifting
            ? step3.subtitlePowerlifting ||
              "Technical powerlifting questions to assess your lifts and strength baseline."
            : step3.subtitleBodybuilding ||
              "Custom questions to establish your physique goals, routine, and training split."}
        </p>
      </div>

      {/* ==============================================================
          TRACK A: POWERLIFTING QUESTIONNAIRE
         ============================================================== */}
      {isPowerlifting ? (
        <div className="space-y-5">
          {/* 1. Squat Weight & 2. Squat Technique */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
              Squat
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="plSquatWeight"
                  className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
                >
                  {step3.plSquatWeightLabel || "Highest weight lifted in Squat?"}{" "}
                  <span className="text-muted text-xs font-normal">
                    {step3.optionalTag || "(Optional)"}
                  </span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  id="plSquatWeight"
                  name="plSquatWeight"
                  value={data.plSquatWeight || ""}
                  onChange={(e) => updateData({ plSquatWeight: e.target.value })}
                  placeholder={step3.plSquatWeightPlaceholder || "Weight in kg"}
                  className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5">
                  {step3.plSquatTechniqueLabel || "Squat Technique"}{" "}
                  <span className="text-muted text-xs font-normal">
                    {step3.optionalTag || "(Optional)"}
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["High bar", "Low bar"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateData({ plSquatTechnique: opt })}
                      className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                        data.plSquatTechnique === opt
                          ? "border-brand bg-brand/15 text-foreground"
                          : "border-white/10 bg-background text-muted hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bench Press Weight & 4. Finger Placement */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
              Bench Press
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="plBenchWeight"
                  className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
                >
                  {step3.plBenchWeightLabel || "Highest weight lifted in Bench Press?"}{" "}
                  <span className="text-muted text-xs font-normal">
                    {step3.optionalTag || "(Optional)"}
                  </span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  id="plBenchWeight"
                  name="plBenchWeight"
                  value={data.plBenchWeight || ""}
                  onChange={(e) => updateData({ plBenchWeight: e.target.value })}
                  placeholder={step3.plBenchWeightPlaceholder || "Weight in kg"}
                  className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="plFingerPlacement"
                  className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
                >
                  {step3.plFingerPlacementLabel || "Which finger on the ring?"}{" "}
                  <span className="text-muted text-xs font-normal">
                    {step3.optionalTag || "(Optional)"}
                  </span>
                </label>
                <input
                  type="text"
                  id="plFingerPlacement"
                  name="plFingerPlacement"
                  value={data.plFingerPlacement || ""}
                  onChange={(e) => updateData({ plFingerPlacement: e.target.value })}
                  placeholder={step3.plFingerPlacementPlaceholder || "e.g. Ring finger"}
                  className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-brand outline-none"
                />
              </div>
            </div>
          </div>

          {/* 5. Deadlift Weight & 6. Deadlift Technique */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
              Deadlift
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="plDeadliftWeight"
                  className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
                >
                  {step3.plDeadliftWeightLabel || "Highest weight lifted in Deadlift?"}{" "}
                  <span className="text-muted text-xs font-normal">
                    {step3.optionalTag || "(Optional)"}
                  </span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  id="plDeadliftWeight"
                  name="plDeadliftWeight"
                  value={data.plDeadliftWeight || ""}
                  onChange={(e) => updateData({ plDeadliftWeight: e.target.value })}
                  placeholder={step3.plDeadliftWeightPlaceholder || "Weight in kg"}
                  className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5">
                  {step3.plDeadliftTechniqueLabel || "Deadlift Technique"}{" "}
                  <span className="text-muted text-xs font-normal">
                    {step3.optionalTag || "(Optional)"}
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "Sumo Deadlift", label: "Sumo Deadlift" },
                    { id: "Conventional Deadlift", label: "Conventional Deadlift" },
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => updateData({ plDeadliftTechnique: tech.id })}
                      className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                        data.plDeadliftTechnique === tech.id
                          ? "border-brand bg-brand/15 text-foreground"
                          : "border-white/10 bg-background text-muted hover:text-foreground"
                      }`}
                    >
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 7. RPE Knowledge * */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3">
            <label className="block text-xs sm:text-sm font-medium text-foreground/90">
              {step3.plRpeKnowledgeLabel || "Do you know the RPE scale?"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "yes", label: step3.plRpeYes || "Yes, I know it" },
                { val: "no", label: step3.plRpeNo || "No, I don't" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateData({ plRpeKnowledge: opt.val })}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                    data.plRpeKnowledge === opt.val
                      ? "border-brand bg-brand/15 text-foreground shadow-[0_0_12px_rgba(255,35,50,0.2)]"
                      : "border-white/10 bg-background text-muted hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.plRpeKnowledge && (
              <p className="text-xs text-red-400 font-medium">{errors.plRpeKnowledge}</p>
            )}
          </div>

          {/* 8. Preferred Training Days * */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3">
            <label className="block text-xs sm:text-sm font-medium text-foreground/90">
              {step3.plDaysLabel || "How many days per week do you prefer to train?"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {trainingDays.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateData({ plDays: num })}
                  className={`py-3 px-4 rounded-xl border font-display text-base font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    Number(data.plDays) === num
                      ? "border-brand bg-brand/15 text-foreground shadow-[0_0_12px_rgba(255,35,50,0.2)]"
                      : "border-white/10 bg-background text-muted hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <span>{num}</span>
                  <span className="text-[10px] text-muted font-sans font-normal">
                    {locale === "ar" ? "أيام" : "Days"}
                  </span>
                </button>
              ))}
            </div>
            {errors.plDays && (
              <p className="text-xs text-red-400 font-medium">{errors.plDays}</p>
            )}
          </div>

          {/* 9. Previous Coaching Experience * & 11. Calorie Knowledge * */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Coaching */}
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 space-y-3">
              <label className="block text-xs sm:text-sm font-medium text-foreground/90">
                {step3.plPreviousCoachLabel || "Have you worked with a coach before?"}{" "}
                <span className="text-brand font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: "yes", label: step3.yes || "Yes" },
                  { val: "no", label: step3.no || "No" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => updateData({ plPreviousCoach: opt.val })}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                      data.plPreviousCoach === opt.val
                        ? "border-brand bg-brand/15 text-foreground"
                        : "border-white/10 bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.plPreviousCoach && (
                <p className="text-xs text-red-400 font-medium">{errors.plPreviousCoach}</p>
              )}
            </div>

            {/* Calorie Knowledge */}
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 space-y-3">
              <label className="block text-xs sm:text-sm font-medium text-foreground/90">
                {step3.plCalorieKnowledgeLabel || "Do you know how to calculate your calories?"}{" "}
                <span className="text-brand font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: "yes", label: step3.yes || "Yes" },
                  { val: "no", label: step3.no || "No" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => updateData({ plCalorieKnowledge: opt.val })}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                      data.plCalorieKnowledge === opt.val
                        ? "border-brand bg-brand/15 text-foreground"
                        : "border-white/10 bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.plCalorieKnowledge && (
                <p className="text-xs text-red-400 font-medium">{errors.plCalorieKnowledge}</p>
              )}
            </div>
          </div>

          {/* 10. Reason for Choosing Rdwan * */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-2">
            <label
              htmlFor="plWhyRdwan"
              className="block text-xs sm:text-sm font-medium text-foreground/90"
            >
              {step3.plWhyRdwanLabel || "What made you choose me as your coach?"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <textarea
              id="plWhyRdwan"
              name="plWhyRdwan"
              rows={3}
              value={data.plWhyRdwan || ""}
              onChange={(e) => updateData({ plWhyRdwan: e.target.value })}
              placeholder={step3.plWhyRdwanPlaceholder || "Share why you selected Coach Rdwan..."}
              aria-invalid={Boolean(errors.plWhyRdwan)}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.plWhyRdwan
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.plWhyRdwan && (
              <p className="text-xs text-red-400 font-medium">{errors.plWhyRdwan}</p>
            )}
          </div>

          {/* 12. Competition Experience (Optional) */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3">
            <label className="block text-xs sm:text-sm font-medium text-foreground/90">
              {step3.plCompetitionLabel || "Have you ever competed in championships?"}{" "}
              <span className="text-muted text-xs font-normal">
                {step3.optionalTag || "(Optional)"}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {[
                { val: "yes", label: step3.yes || "Yes" },
                { val: "no", label: step3.no || "No" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateData({ plCompetition: opt.val })}
                  className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                    data.plCompetition === opt.val
                      ? "border-brand bg-brand/15 text-foreground"
                      : "border-white/10 bg-background text-muted hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ==============================================================
           TRACK B: BODYBUILDING QUESTIONNAIRE
           ============================================================== */
        <div className="space-y-5">
          {/* 1. Desired Goal * */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3">
            <label className="block text-xs sm:text-sm font-medium text-foreground/90">
              {step3.bbGoalLabel || "Desired Goal?"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  val: "fat_loss",
                  label: step3.bbGoalFatLoss || "Fat Loss",
                  desc:
                    locale === "ar"
                      ? "خسارة دهون الجسم وتحسين اللياقة والتعريف العضلي"
                      : "Burn fat, lower body fat percentage, and improve muscle definition",
                },
                {
                  val: "muscle_building",
                  label: step3.bbGoalMuscle || "Building Muscle Mass",
                  desc:
                    locale === "ar"
                      ? "زيادة الحجم والكتلة العضلية والقوة العامة"
                      : "Hypertrophy, progressive overload, and lean muscle mass",
                },
              ].map((goal) => {
                const isSelected = data.bbGoal === goal.val;
                return (
                  <button
                    key={goal.val}
                    type="button"
                    onClick={() => updateData({ bbGoal: goal.val })}
                    className={`p-4 rounded-xl border-[1.5px] text-start transition-all cursor-pointer ${
                      isSelected
                        ? "border-brand bg-brand/15 text-foreground shadow-[0_0_15px_rgba(255,35,50,0.2)]"
                        : "border-white/10 bg-background text-muted hover:text-foreground hover:border-white/20"
                    }`}
                  >
                    <h5 className="font-display font-bold text-sm sm:text-base text-foreground">
                      {goal.label}
                    </h5>
                    <p className="text-xs text-muted mt-1 leading-relaxed font-sans">
                      {goal.desc}
                    </p>
                  </button>
                );
              })}
            </div>
            {errors.bbGoal && (
              <p className="text-xs text-red-400 font-medium">{errors.bbGoal}</p>
            )}
          </div>

          {/* 2. Preferred Training Days * */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3">
            <label className="block text-xs sm:text-sm font-medium text-foreground/90">
              {step3.bbDaysLabel || "How many days per week do you prefer to train?"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {trainingDays.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateData({ bbDays: num })}
                  className={`py-3 px-4 rounded-xl border font-display text-base font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    Number(data.bbDays) === num
                      ? "border-brand bg-brand/15 text-foreground shadow-[0_0_12px_rgba(255,35,50,0.2)]"
                      : "border-white/10 bg-background text-muted hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <span>{num}</span>
                  <span className="text-[10px] text-muted font-sans font-normal">
                    {locale === "ar" ? "أيام" : "Days"}
                  </span>
                </button>
              ))}
            </div>
            {errors.bbDays && (
              <p className="text-xs text-red-400 font-medium">{errors.bbDays}</p>
            )}
          </div>

          {/* 3. Daily Activity Level (Optional) */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3">
            <label className="block text-xs sm:text-sm font-medium text-foreground/90">
              {step3.bbActivityLabel || "Activity Level"}{" "}
              <span className="text-muted text-xs font-normal">
                {step3.optionalTag || "(Optional)"}
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { val: "sedentary", label: step3.bbActivitySedentary || "Sedentary" },
                { val: "moderate", label: step3.bbActivityModerate || "Moderately Active" },
                { val: "active", label: step3.bbActivityActive || "Active" },
              ].map((act) => (
                <button
                  key={act.val}
                  type="button"
                  onClick={() => updateData({ bbActivityLevel: act.val })}
                  className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                    data.bbActivityLevel === act.val
                      ? "border-brand bg-brand/15 text-foreground shadow-[0_0_12px_rgba(255,35,50,0.2)]"
                      : "border-white/10 bg-background text-muted hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Reason for Choosing Rdwan * */}
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-2">
            <label
              htmlFor="bbWhyRdwan"
              className="block text-xs sm:text-sm font-medium text-foreground/90"
            >
              {step3.bbWhyRdwanLabel || "What made you choose me as your coach?"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <textarea
              id="bbWhyRdwan"
              name="bbWhyRdwan"
              rows={3}
              value={data.bbWhyRdwan || ""}
              onChange={(e) => updateData({ bbWhyRdwan: e.target.value })}
              placeholder={step3.bbWhyRdwanPlaceholder || "Share why you selected Coach Rdwan..."}
              aria-invalid={Boolean(errors.bbWhyRdwan)}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.bbWhyRdwan
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.bbWhyRdwan && (
              <p className="text-xs text-red-400 font-medium">{errors.bbWhyRdwan}</p>
            )}
          </div>

          {/* 5. Previous Coaching * & 6. Calorie Knowledge * */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Coaching */}
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 space-y-3">
              <label className="block text-xs sm:text-sm font-medium text-foreground/90">
                {step3.bbPreviousCoachLabel || "Have you worked with a coach before?"}{" "}
                <span className="text-brand font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: "yes", label: step3.yes || "Yes" },
                  { val: "no", label: step3.no || "No" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => updateData({ bbPreviousCoach: opt.val })}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                      data.bbPreviousCoach === opt.val
                        ? "border-brand bg-brand/15 text-foreground"
                        : "border-white/10 bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.bbPreviousCoach && (
                <p className="text-xs text-red-400 font-medium">{errors.bbPreviousCoach}</p>
              )}
            </div>

            {/* Calorie Knowledge */}
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 space-y-3">
              <label className="block text-xs sm:text-sm font-medium text-foreground/90">
                {step3.bbCalorieKnowledgeLabel || "Do you know how to calculate your calories?"}{" "}
                <span className="text-brand font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: "yes", label: step3.yes || "Yes" },
                  { val: "no", label: step3.no || "No" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => updateData({ bbCalorieKnowledge: opt.val })}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                      data.bbCalorieKnowledge === opt.val
                        ? "border-brand bg-brand/15 text-foreground"
                        : "border-white/10 bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.bbCalorieKnowledge && (
                <p className="text-xs text-red-400 font-medium">{errors.bbCalorieKnowledge}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          SHARED ADDITIONAL FIELDS (Instagram & Additional Notes)
         ============================================================== */}
      <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-4">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-muted">
          {locale === "ar" ? "معلومات إضافية" : "Additional Details"}
        </h4>

        {/* Instagram Handle */}
        <div>
          <label
            htmlFor="instagram"
            className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
          >
            {step3.instagramLabel || "Instagram account (if available)"}{" "}
            <span className="text-muted text-xs font-normal">
              {step3.optionalTag || "(Optional)"}
            </span>
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            dir="ltr"
            value={data.instagram || ""}
            onChange={(e) => updateData({ instagram: e.target.value })}
            placeholder={step3.instagramPlaceholder || "@username"}
            className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-brand outline-none"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label
            htmlFor="additionalNotes"
            className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
          >
            {step3.additionalNotesLabel ||
              "Write any additional details that could help me understand your situation better..."}{" "}
            <span className="text-muted text-xs font-normal">
              {step3.optionalTag || "(Optional)"}
            </span>
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={3}
            value={data.additionalNotes || ""}
            onChange={(e) => updateData({ additionalNotes: e.target.value })}
            placeholder={step3.additionalNotesPlaceholder || "Any extra notes..."}
            className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border border-white/15 focus:border-brand focus:ring-brand outline-none"
          />
        </div>
      </div>
    </div>
  );
}
