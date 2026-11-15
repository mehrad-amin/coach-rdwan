"use client";

import { useState, useId, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ACTIVITY_LEVELS,
  FITNESS_GOALS,
  calculateFitnessProfile,
} from "@/lib/fitness-calculations";

const STORAGE_KEY = "pt_fitness_calculator_v1";

export default function FitnessCalculator({ className = "" }) {
  const router = useRouter();

  // Core Physical Inputs
  const [inputs, setInputs] = useState({
    sex: "male",
    age: "30",
    height: "180",
    weight: "80",
    activityId: "moderate",
    goalId: "maintenance",
    goalTierId: "balanced",
  });

  // Advanced Optional Inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedInputs, setAdvancedInputs] = useState({
    bmrMethod: "mifflin", // "mifflin" | "katch_mcardle" | "measured"
    bodyFatPct: "",
    measuredRmr: "",
    enableCalibration: false,
    trackingDays: "21",
    avgDailyCalories: "2400",
    startWeightKg: "81.0",
    endWeightKg: "80.4",
    useCalibratedAsTarget: false,
  });

  const [errors, setErrors] = useState({});

  // Unique accessible IDs
  const ageId = useId();
  const heightId = useId();
  const weightId = useId();
  const bodyFatId = useId();
  const measuredRmrId = useId();
  const trackingDaysId = useId();
  const avgCaloriesId = useId();
  const startWeightId = useId();
  const endWeightId = useId();

  // Validation
  const validateField = (name, value) => {
    let err = "";
    if (name === "age") {
      const num = parseInt(value, 10);
      if (!value) err = "Age is required.";
      else if (isNaN(num) || num < 18) err = "Calculator is calibrated for adults aged 18+.";
      else if (num > 99) err = "Please enter an age between 18 and 99.";
    } else if (name === "height") {
      const num = parseFloat(value);
      if (!value) err = "Height is required.";
      else if (isNaN(num) || num < 120 || num > 230)
        err = "Height must be between 120 and 230 cm.";
    } else if (name === "weight") {
      const num = parseFloat(value);
      if (!value) err = "Weight is required.";
      else if (isNaN(num) || num < 35 || num > 250)
        err = "Weight must be between 35 and 250 kg.";
    } else if (name === "bodyFatPct" && value !== "") {
      const num = parseFloat(value);
      if (isNaN(num) || num < 4 || num > 55)
        err = "Body fat percentage must be between 4% and 55%.";
    } else if (name === "measuredRmr" && value !== "") {
      const num = parseFloat(value);
      if (isNaN(num) || num < 800 || num > 3500)
        err = "Measured RMR must be between 800 and 3,500 kcal/day.";
    }
    return err;
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleAdvancedChange = (field, value) => {
    setAdvancedInputs((prev) => ({ ...prev, [field]: value }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // Reset to initial empty state
  const handleReset = () => {
    setInputs({
      sex: "male",
      age: "",
      height: "",
      weight: "",
      activityId: "moderate",
      goalId: "maintenance",
      goalTierId: "balanced",
    });
    setAdvancedInputs({
      bmrMethod: "mifflin",
      bodyFatPct: "",
      measuredRmr: "",
      enableCalibration: false,
      trackingDays: "",
      avgDailyCalories: "",
      startWeightKg: "",
      endWeightKg: "",
      useCalibratedAsTarget: false,
    });
    setErrors({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage exception
    }
  };

  // Load realistic, internally consistent sample profile
  const handleLoadSample = () => {
    setInputs({
      sex: "male",
      age: "30",
      height: "180",
      weight: "80",
      activityId: "moderate",
      goalId: "maintenance",
      goalTierId: "balanced",
    });
    setAdvancedInputs({
      bmrMethod: "mifflin",
      bodyFatPct: "",
      measuredRmr: "",
      enableCalibration: false,
      trackingDays: "21",
      avgDailyCalories: "2400",
      startWeightKg: "81.0",
      endWeightKg: "80.4",
      useCalibratedAsTarget: false,
    });
    setErrors({});
  };

  // Calculate live fitness profile
  const profile = calculateFitnessProfile({
    sex: inputs.sex,
    age: inputs.age,
    height: inputs.height,
    weight: inputs.weight,
    activityId: inputs.activityId,
    goalId: inputs.goalId,
    goalTierId: inputs.goalTierId,
    bmrMethod: advancedInputs.bmrMethod,
    bodyFatPct: advancedInputs.bodyFatPct,
    measuredRmr: advancedInputs.measuredRmr,
    enableCalibration: advancedInputs.enableCalibration,
    trackingDays: advancedInputs.trackingDays,
    avgDailyCalories: advancedInputs.avgDailyCalories,
    startWeightKg: advancedInputs.startWeightKg,
    endWeightKg: advancedInputs.endWeightKg,
    useCalibratedAsTarget: advancedInputs.useCalibratedAsTarget,
  });

  // Automatically update sessionStorage when valid profile is calculated
  useEffect(() => {
    if (profile) {
      try {
        const payload = {
          version: 2,
          savedAt: new Date().toISOString(),
          inputs: profile.inputs,
          results: {
            bmi: profile.bmi.value,
            bmiCategory: profile.bmi.category,
            bmr: profile.bmr,
            bmrMethod: profile.bmrMethod,
            tdee: profile.tdee,
            targetCalories: profile.targetCalories,
            deltaCalories: profile.deltaCalories,
            protein: profile.macros.protein.grams,
            fat: profile.macros.fat.grams,
            carbs: profile.macros.carbs.grams,
            goalTitle: profile.goal.title,
            activityTitle: profile.activity.title,
            sourceTag: profile.sourceTag,
            isCalibrated: profile.isCalibratedActive,
          },
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // Ignore storage exceptions
      }
    }
  }, [profile]);

  const handleProceedToBooking = () => {
    router.push("/booking");
  };

  const selectedGoalObj = FITNESS_GOALS.find((g) => g.id === inputs.goalId) || FITNESS_GOALS[1];

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className={[
        "relative w-full bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-wide)]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-brand block mb-2">
              Scientific Baseline Assessment
            </span>
            <h2
              id="calculator-heading"
              className="section-heading text-2xl sm:text-3xl lg:text-[40px]"
            >
              Fitness &amp; Nutrition Calculator
            </h2>
            <p className="section-subtitle mt-3 text-sm sm:text-base leading-relaxed">
              Estimate your resting metabolic rate, daily expenditure, and macronutrient targets
              grounded in peer-validated clinical models.
            </p>
          </div>

          {/* Master 2-Column Calculator Shell */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ==============================================================
                LEFT COLUMN: ASSESSMENT PARAMETERS (7 cols)
               ============================================================== */}
            <div className="lg:col-span-7 bg-[#1c1c1c] border-[1.5px] border-white/10 rounded-card p-5 sm:p-7 space-y-6">
              {/* Header inside parameters */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-foreground">
                    Physical Parameters
                  </h3>
                  <p className="text-xs text-muted font-sans mt-0.5">
                    Required physical measurements for metabolic modeling
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-sans">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="text-brand hover:underline cursor-pointer font-medium"
                  >
                    Load Sample
                  </button>
                  <span className="text-white/20">•</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-muted hover:text-foreground cursor-pointer transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Group 1: Biological Sex */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2 font-display">
                  Biological Sex <span className="text-brand">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Biological Sex">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={inputs.sex === "male"}
                    onClick={() => handleInputChange("sex", "male")}
                    className={`py-3 px-4 rounded-control text-sm font-sans font-semibold transition-all border-[1.5px] text-center cursor-pointer ${
                      inputs.sex === "male"
                        ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#1c1c1c)] text-foreground"
                        : "border-white/10 bg-[#141414] text-muted hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={inputs.sex === "female"}
                    onClick={() => handleInputChange("sex", "female")}
                    className={`py-3 px-4 rounded-control text-sm font-sans font-semibold transition-all border-[1.5px] text-center cursor-pointer ${
                      inputs.sex === "female"
                        ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#1c1c1c)] text-foreground"
                        : "border-white/10 bg-[#141414] text-muted hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    Female
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-muted font-sans">
                  Calibrates the biological resting constant (+5 for male, -161 for female in Mifflin–St Jeor).
                </p>
              </div>

              {/* Group 2: Age, Height, Weight Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label htmlFor={ageId} className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 font-display">
                    Age (Years) <span className="text-brand">*</span>
                  </label>
                  <input
                    type="number"
                    id={ageId}
                    min="18"
                    max="99"
                    value={inputs.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="e.g. 30"
                    className={`w-full rounded-control bg-[#141414] px-3.5 py-2.5 text-foreground placeholder-white/20 border outline-none text-sm font-sans transition-colors ${
                      errors.age ? "border-brand focus:ring-1 focus:ring-brand" : "border-white/10 focus:border-brand"
                    }`}
                  />
                  {errors.age && <p className="mt-1 text-xs text-brand font-sans">{errors.age}</p>}
                </div>

                <div>
                  <label htmlFor={heightId} className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 font-display">
                    Height (cm) <span className="text-brand">*</span>
                  </label>
                  <input
                    type="number"
                    id={heightId}
                    min="120"
                    max="230"
                    value={inputs.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="e.g. 180"
                    className={`w-full rounded-control bg-[#141414] px-3.5 py-2.5 text-foreground placeholder-white/20 border outline-none text-sm font-sans transition-colors ${
                      errors.height ? "border-brand focus:ring-1 focus:ring-brand" : "border-white/10 focus:border-brand"
                    }`}
                  />
                  {errors.height && <p className="mt-1 text-xs text-brand font-sans">{errors.height}</p>}
                </div>

                <div>
                  <label htmlFor={weightId} className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 font-display">
                    Weight (kg) <span className="text-brand">*</span>
                  </label>
                  <input
                    type="number"
                    id={weightId}
                    min="35"
                    max="250"
                    step="0.5"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="e.g. 80"
                    className={`w-full rounded-control bg-[#141414] px-3.5 py-2.5 text-foreground placeholder-white/20 border outline-none text-sm font-sans transition-colors ${
                      errors.weight ? "border-brand focus:ring-1 focus:ring-brand" : "border-white/10 focus:border-brand"
                    }`}
                  />
                  {errors.weight && <p className="mt-1 text-xs text-brand font-sans">{errors.weight}</p>}
                </div>
              </div>

              {/* Group 3: Activity Level Multiplier */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted font-display">
                    Activity &amp; Lifestyle Multiplier <span className="text-brand">*</span>
                  </label>
                  <span className="text-[11px] text-muted font-sans">
                    Includes occupational baseline &amp; workouts
                  </span>
                </div>
                <div role="radiogroup" aria-label="Activity Level" className="space-y-2">
                  {ACTIVITY_LEVELS.map((act) => {
                    const selected = inputs.activityId === act.id;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => handleInputChange("activityId", act.id)}
                        className={`w-full text-left p-3 rounded-control border-[1.5px] transition-all flex items-start justify-between gap-3 cursor-pointer ${
                          selected
                            ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#1c1c1c)] text-foreground"
                            : "border-white/10 bg-[#141414] text-muted hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-semibold text-sm text-foreground">
                              {act.title}
                            </span>
                            <span className="text-[11px] text-muted font-sans font-normal">
                              ({act.frequency})
                            </span>
                          </div>
                          <p className="text-xs text-muted font-sans mt-0.5 line-clamp-1 sm:line-clamp-none">
                            {act.shortDesc}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 text-xs font-display font-bold px-2 py-0.5 rounded ${
                            selected
                              ? "bg-brand text-foreground"
                              : "bg-white/5 text-muted"
                          }`}
                        >
                          ×{act.multiplier.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-[11px] text-muted font-sans">
                  Note: Multipliers already account for typical exercise expenditure. Do not add separate workout burns to prevent double-counting.
                </p>
              </div>

              {/* Group 4: Primary Goal & Tier Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2 font-display">
                  Primary Transformation Goal <span className="text-brand">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {FITNESS_GOALS.map((g) => {
                    const selected = inputs.goalId === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          const defaultTier = g.tiers.find((t) => t.isDefault) || g.tiers[0];
                          setInputs((prev) => ({
                            ...prev,
                            goalId: g.id,
                            goalTierId: defaultTier.id,
                          }));
                        }}
                        className={`p-3 rounded-control border-[1.5px] text-left transition-all cursor-pointer ${
                          selected
                            ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#1c1c1c)] text-foreground"
                            : "border-white/10 bg-[#141414] text-muted hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        <span className="font-sans font-bold text-sm block text-foreground">
                          {g.title}
                        </span>
                        <span className="text-[11px] text-muted font-sans mt-0.5 block">
                          {g.tagline}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-tiers for selected goal (e.g. Mild / Moderate / Aggressive) */}
                {selectedGoalObj.tiers.length > 1 && (
                  <div className="mt-3 p-3 rounded-control bg-[#141414] border border-white/10 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider font-display font-semibold text-muted block">
                      Target Intensity Tier
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedGoalObj.tiers.map((tier) => {
                        const isTierActive = inputs.goalTierId === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => handleInputChange("goalTierId", tier.id)}
                            className={`px-2 py-1.5 rounded text-xs font-sans text-center transition-colors cursor-pointer border-[1.5px] ${
                              isTierActive
                                ? "border-brand bg-brand text-foreground font-semibold"
                                : "border-white/10 bg-white/5 text-muted hover:text-foreground"
                            }`}
                          >
                            {tier.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Group 5: Advanced Body Composition & Personal Calibration (Optional Accordion) */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                  className="w-full flex items-center justify-between text-left py-2 text-xs font-display font-bold uppercase tracking-wider text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Advanced: Body Composition &amp; Calibration (Optional)</span>
                    {(advancedInputs.bodyFatPct || advancedInputs.enableCalibration) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-3 space-y-4 pt-2">
                    {/* Method Selector */}
                    <div>
                      <span className="block text-xs font-semibold text-muted font-display uppercase tracking-wider mb-1.5">
                        Resting Metabolic Rate Model
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => handleAdvancedChange("bmrMethod", "mifflin")}
                          className={`p-2 rounded text-xs font-sans border-[1.5px] text-left cursor-pointer ${
                            advancedInputs.bmrMethod === "mifflin"
                              ? "border-selected-brand bg-brand/10 text-foreground font-semibold"
                              : "border-white/10 bg-[#141414] text-muted hover:text-foreground"
                          }`}
                        >
                          <span className="block text-foreground">Mifflin–St Jeor</span>
                          <span className="text-[10px] text-muted">Standard Population</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdvancedChange("bmrMethod", "katch_mcardle")}
                          className={`p-2 rounded text-xs font-sans border-[1.5px] text-left cursor-pointer ${
                            advancedInputs.bmrMethod === "katch_mcardle"
                              ? "border-selected-brand bg-brand/10 text-foreground font-semibold"
                              : "border-white/10 bg-[#141414] text-muted hover:text-foreground"
                          }`}
                        >
                          <span className="block text-foreground">Katch–McArdle</span>
                          <span className="text-[10px] text-muted">Fat-Free Mass based</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdvancedChange("bmrMethod", "measured")}
                          className={`p-2 rounded text-xs font-sans border-[1.5px] text-left cursor-pointer ${
                            advancedInputs.bmrMethod === "measured"
                              ? "border-selected-brand bg-brand/10 text-foreground font-semibold"
                              : "border-white/10 bg-[#141414] text-muted hover:text-foreground"
                          }`}
                        >
                          <span className="block text-foreground">Measured RMR</span>
                          <span className="text-[10px] text-muted">Clinical Calorimetry</span>
                        </button>
                      </div>
                    </div>

                    {/* Conditional Input based on Method */}
                    {advancedInputs.bmrMethod === "katch_mcardle" && (
                      <div className="p-3 bg-[#141414] border-[1.5px] border-white/10 rounded-control">
                        <label htmlFor={bodyFatId} className="block text-xs font-medium text-foreground mb-1 font-sans">
                          Body Fat Percentage (%)
                        </label>
                        <input
                          type="number"
                          id={bodyFatId}
                          min="4"
                          max="55"
                          step="0.5"
                          value={advancedInputs.bodyFatPct}
                          onChange={(e) => handleAdvancedChange("bodyFatPct", e.target.value)}
                          placeholder="e.g. 15"
                          className="w-full rounded bg-[#101010] px-3 py-2 text-foreground text-xs border border-white/10 outline-none focus:border-brand"
                        />
                        {errors.bodyFatPct && <p className="mt-1 text-xs text-brand font-sans">{errors.bodyFatPct}</p>}
                        <p className="mt-1 text-[11px] text-muted font-sans">
                          Uses Fat-Free Mass (FFM) to model metabolic rate. Recommended for muscular or athletic builds with DEXA/caliper data.
                        </p>
                      </div>
                    )}

                    {advancedInputs.bmrMethod === "measured" && (
                      <div className="p-3 bg-[#141414] border border-white/10 rounded-control">
                        <label htmlFor={measuredRmrId} className="block text-xs font-medium text-foreground mb-1 font-sans">
                          Laboratory Measured RMR (kcal/day)
                        </label>
                        <input
                          type="number"
                          id={measuredRmrId}
                          min="800"
                          max="3500"
                          value={advancedInputs.measuredRmr}
                          onChange={(e) => handleAdvancedChange("measuredRmr", e.target.value)}
                          placeholder="e.g. 1750"
                          className="w-full rounded bg-[#101010] px-3 py-2 text-foreground text-xs border border-white/10 outline-none focus:border-brand"
                        />
                        {errors.measuredRmr && <p className="mt-1 text-xs text-brand font-sans">{errors.measuredRmr}</p>}
                        <p className="mt-1 text-[11px] text-muted font-sans">
                          Direct resting metabolic rate obtained from indirect calorimetry (metabolic cart testing).
                        </p>
                      </div>
                    )}

                    {/* Personal 14–28 Day Tracking Calibration */}
                    <div className="p-3.5 bg-[#141414] border-[1.5px] border-white/10 rounded-control space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-sans font-semibold text-xs text-foreground block">
                            Real-World Weight &amp; Intake Calibration
                          </span>
                          <span className="text-[11px] text-muted font-sans">
                            Calibrate true maintenance from 14–28 days of tracked intake
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          id="enableCalibrationCheck"
                          checked={advancedInputs.enableCalibration}
                          onChange={(e) => handleAdvancedChange("enableCalibration", e.target.checked)}
                          className="w-4 h-4 rounded border-white/20 text-brand focus:ring-brand cursor-pointer"
                        />
                      </div>

                      {advancedInputs.enableCalibration && (
                        <div className="pt-2 border-t border-white/10 space-y-3">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div>
                              <label htmlFor={trackingDaysId} className="block text-[11px] text-muted font-sans mb-1">
                                Days Tracked
                              </label>
                              <input
                                type="number"
                                id={trackingDaysId}
                                min="14"
                                max="90"
                                value={advancedInputs.trackingDays}
                                onChange={(e) => handleAdvancedChange("trackingDays", e.target.value)}
                                placeholder="e.g. 21"
                                className="w-full rounded bg-[#101010] px-2.5 py-1.5 text-xs text-foreground border border-white/10 outline-none focus:border-brand"
                              />
                            </div>
                            <div>
                              <label htmlFor={avgCaloriesId} className="block text-[11px] text-muted font-sans mb-1">
                                Avg Calories
                              </label>
                              <input
                                type="number"
                                id={avgCaloriesId}
                                min="800"
                                max="6000"
                                value={advancedInputs.avgDailyCalories}
                                onChange={(e) => handleAdvancedChange("avgDailyCalories", e.target.value)}
                                placeholder="e.g. 2400"
                                className="w-full rounded bg-[#101010] px-2.5 py-1.5 text-xs text-foreground border border-white/10 outline-none focus:border-brand"
                              />
                            </div>
                            <div>
                              <label htmlFor={startWeightId} className="block text-[11px] text-muted font-sans mb-1">
                                Start Wt (kg)
                              </label>
                              <input
                                type="number"
                                id={startWeightId}
                                step="0.1"
                                value={advancedInputs.startWeightKg}
                                onChange={(e) => handleAdvancedChange("startWeightKg", e.target.value)}
                                placeholder="e.g. 81.0"
                                className="w-full rounded bg-[#101010] px-2.5 py-1.5 text-xs text-foreground border border-white/10 outline-none focus:border-brand"
                              />
                            </div>
                            <div>
                              <label htmlFor={endWeightId} className="block text-[11px] text-muted font-sans mb-1">
                                End Wt (kg)
                              </label>
                              <input
                                type="number"
                                id={endWeightId}
                                step="0.1"
                                value={advancedInputs.endWeightKg}
                                onChange={(e) => handleAdvancedChange("endWeightKg", e.target.value)}
                                placeholder="e.g. 80.4"
                                className="w-full rounded bg-[#101010] px-2.5 py-1.5 text-xs text-foreground border border-white/10 outline-none focus:border-brand"
                              />
                            </div>
                          </div>

                          {profile?.calibrationResult && (
                            <div className="p-2.5 rounded bg-black/40 border border-white/10 text-xs font-sans space-y-1.5">
                              {profile.calibrationResult.isReady ? (
                                <>
                                  <div className="flex items-center justify-between text-foreground">
                                    <span className="font-semibold">Calibrated Maintenance:</span>
                                    <span className="font-display font-bold text-brand">
                                      {profile.calibrationResult.calibratedTdee.toLocaleString()} kcal/day
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted">
                                    Observed trend: {profile.calibrationResult.deltaWeightKg > 0 ? "+" : ""}
                                    {profile.calibrationResult.deltaWeightKg} kg over {profile.calibrationResult.trackingDays} days ({profile.calibrationResult.weeklyRateKg > 0 ? "+" : ""}
                                    {profile.calibrationResult.weeklyRateKg} kg/week).
                                  </p>
                                  <div className="pt-1 flex items-center justify-between border-t border-white/10">
                                    <span className="text-[11px] text-muted">
                                      vs Theoretical Estimate ({profile.theoreticalTdee} kcal):
                                    </span>
                                    <span className="text-[11px] font-semibold text-foreground">
                                      {profile.calibrationResult.varianceFromTheoretical > 0 ? "+" : ""}
                                      {profile.calibrationResult.varianceFromTheoretical} kcal ({profile.calibrationResult.variancePct}%)
                                    </span>
                                  </div>
                                  <label className="flex items-center gap-2 pt-1.5 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={advancedInputs.useCalibratedAsTarget}
                                      onChange={(e) => handleAdvancedChange("useCalibratedAsTarget", e.target.checked)}
                                      className="w-3.5 h-3.5 text-brand rounded border-white/20 focus:ring-brand"
                                    />
                                    <span className="text-xs text-foreground font-medium">
                                      Apply calibrated maintenance as my active target
                                    </span>
                                  </label>
                                </>
                              ) : (
                                <p className="text-[11px] text-amber-400">
                                  {profile.calibrationResult.message}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ==============================================================
                RIGHT COLUMN: CALCULATED RESULTS (5 cols, sticky desktop)
               ============================================================== */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              {profile ? (
                <div className="bg-[#1c1c1c] border-[1.5px] border-white/10 rounded-card p-5 sm:p-7 space-y-5">
                  {/* Results Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-foreground">
                        Calculated Targets
                      </h3>
                      <p className="text-xs text-muted font-sans">
                        Dynamic baseline derived from your parameters
                      </p>
                    </div>
                    <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted">
                      {profile.sourceTag}
                    </span>
                  </div>

                  {/* Primary Target Calorie Block */}
                  <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-4 text-center">
                    <span className="block text-xs uppercase font-display font-semibold tracking-wider text-muted mb-1">
                      Daily Caloric Target
                    </span>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="font-display font-bold text-3xl sm:text-4xl text-foreground">
                        {profile.targetCalories.toLocaleString()}
                      </span>
                      <span className="font-sans text-xs sm:text-sm text-muted">
                        kcal / day
                      </span>
                    </div>

                    <div className="mt-2.5 inline-block text-xs font-sans font-medium px-2.5 py-0.5 rounded bg-[color-mix(in_srgb,var(--brand-red)_12%,#141414)] text-brand border-[1.5px] border-brand/40">
                      {profile.goal.title} ({profile.goalTier.label})
                      {profile.deltaCalories !== 0 && (
                        <span> • {profile.deltaCalories > 0 ? "+" : ""}{profile.deltaCalories} kcal</span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-muted font-sans leading-relaxed">
                      {profile.goalTier.shortDesc}
                    </p>
                  </div>

                  {/* Secondary Metrics Row: BMR, TDEE, BMI */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-2.5">
                      <span className="block text-[11px] font-display uppercase tracking-wider text-muted">
                        BMR
                      </span>
                      <span className="font-display font-bold text-base text-foreground mt-0.5 block">
                        {profile.bmr.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted font-sans block">kcal at rest</span>
                    </div>

                    <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-2.5">
                      <span className="block text-[11px] font-display uppercase tracking-wider text-muted">
                        TDEE
                      </span>
                      <span className="font-display font-bold text-base text-foreground mt-0.5 block">
                        {profile.tdee.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted font-sans block">maintenance</span>
                    </div>

                    <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-2.5">
                      <span className="block text-[11px] font-display uppercase tracking-wider text-muted">
                        BMI
                      </span>
                      <span className="font-display font-bold text-base text-foreground mt-0.5 block">
                        {profile.bmi.formatted}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-sans block truncate">
                        {profile.bmi.category}
                      </span>
                    </div>
                  </div>

                  {/* Macronutrient Distribution */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display font-semibold uppercase tracking-wider text-muted">
                        Macronutrient Distribution
                      </span>
                      <span className="text-[11px] font-sans text-muted">
                        ~{profile.macros.totalMacroCalories.toLocaleString()} kcal sum
                      </span>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div
                      className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex"
                      role="progressbar"
                      aria-label="Macronutrient distribution ratio"
                    >
                      <div
                        style={{ width: `${profile.macros.protein.pct}%` }}
                        className="bg-brand transition-all duration-300"
                        title={`Protein: ${profile.macros.protein.pct}%`}
                      />
                      <div
                        style={{ width: `${profile.macros.carbs.pct}%` }}
                        className="bg-white/80 transition-all duration-300"
                        title={`Carbohydrates: ${profile.macros.carbs.pct}%`}
                      />
                      <div
                        style={{ width: `${profile.macros.fat.pct}%` }}
                        className="bg-amber-400 transition-all duration-300"
                        title={`Fat: ${profile.macros.fat.pct}%`}
                      />
                    </div>

                    {/* Macro Breakdown 3-Card Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-2.5 text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                          <span>Protein</span>
                        </div>
                        <span className="font-display font-bold text-base text-foreground mt-1 block">
                          {profile.macros.protein.grams}g
                        </span>
                        <span className="text-[10px] text-muted font-sans block">
                          {profile.macros.protein.pct}% • {profile.macros.protein.perKg}g/kg
                        </span>
                      </div>

                      <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-2.5 text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>Carbs</span>
                        </div>
                        <span className="font-display font-bold text-base text-foreground mt-1 block">
                          {profile.macros.carbs.grams}g
                        </span>
                        <span className="text-[10px] text-muted font-sans block">
                          {profile.macros.carbs.pct}% • Energy
                        </span>
                      </div>

                      <div className="bg-[#141414] border-[1.5px] border-white/10 rounded-control p-2.5 text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Fat</span>
                        </div>
                        <span className="font-display font-bold text-base text-foreground mt-1 block">
                          {profile.macros.fat.grams}g
                        </span>
                        <span className="text-[10px] text-muted font-sans block">
                          {profile.macros.fat.pct}% • Hormonal
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Coach Statement */}
                  <p className="text-[11px] text-muted font-sans leading-relaxed border-t border-white/10 pt-3">
                    Metabolic equations provide an evidence-based starting point. During your initial consultation,
                    Coach John reviews your training history, biofeedback, and lifestyle to calibrate a personalized protocol.
                  </p>

                  {/* CTA Action */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleProceedToBooking}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-control bg-brand px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground hover:bg-brand-hover active:scale-[0.99] transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,35,50,0.25)]"
                    >
                      <span>Apply With This Plan</span>
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </button>
                    <p className="text-center text-[11px] text-muted font-sans">
                      Pre-fills Coach John&apos;s coaching application with your baseline parameters.
                    </p>
                  </div>
                </div>
              ) : (
                /* Empty / Incomplete Inputs State */
                <div className="bg-[#1c1c1c] border border-white/10 rounded-card p-8 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-control bg-white/5 border border-white/10 flex items-center justify-center text-muted">
                    <svg
                      className="w-6 h-6 text-brand"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-foreground">
                      Complete Your Parameters
                    </h4>
                    <p className="text-xs text-muted font-sans mt-1 max-w-xs mx-auto leading-relaxed">
                      Enter your age (18+), height, and current weight on the left to reveal your calculated
                      metabolic baseline and macronutrient distribution.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-brand hover:underline cursor-pointer pt-1"
                  >
                    <span>Load 30-year-old active sample</span>
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ==============================================================
              FULL-WIDTH BOTTOM NOTICE: SCIENTIFIC & HEALTH TRANSPARENCY
             ============================================================== */}
          <div className="mt-8 sm:mt-10 rounded-card border border-white/10 bg-[#191919] p-5 sm:p-6 text-muted font-sans flex flex-col sm:flex-row items-start gap-4">
            <div className="w-8 h-8 rounded-control bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="space-y-1 text-xs leading-relaxed">
              <span className="font-display font-bold uppercase tracking-wider text-foreground text-xs block">
                Scientific Screening &amp; Health Transparency
              </span>
              <p>
                Calculations provide evidence-based estimates for screening and educational purposes, not clinical medical advice or dietary prescriptions. Calibration applies strictly to healthy adults aged 18+. Individuals who are pregnant or nursing, or who have chronic metabolic, hormonal, or cardiovascular conditions, should consult a qualified physician or registered dietitian before modifying dietary intake or training frequency.
              </p>
              <p className="text-white/60">
                Coach John personally evaluates your health history, recovery markers, and biomechanics during your one-on-one onboarding consultation to customize every training and nutrition protocol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
