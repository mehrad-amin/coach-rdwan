"use client";

import { useState, useEffect } from "react";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2FitnessProfile from "./Step2FitnessProfile";
import Step3TrainingLifestyle from "./Step3TrainingLifestyle";
import Step4ReviewSubmit from "./Step4ReviewSubmit";
import BookingSuccess from "./BookingSuccess";

const INITIAL_FORM_DATA = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  height: "",
  currentWeight: "",
  targetWeight: "",
  goal: "weight_loss",
  experience: "beginner",
  trainingLocation: "gym",
  daysPerWeek: 4,
  package: "hybrid",
  notes: "",
  consent: false,
};

const STEP_TITLES = [
  "Personal Info",
  "Fitness Profile",
  "Training & Lifestyle",
  "Review & Confirm",
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPrefilled, setHasPrefilled] = useState(false);

  // Safely prefill from scientific calculator sessionStorage on client mount
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        if (typeof window === "undefined") return;
        const raw = sessionStorage.getItem("pt_fitness_calculator_v1");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.inputs) return;

        setFormData((prev) => {
          const next = { ...prev };
          let applied = false;

          // Biological sex -> Gender (if not already entered)
          if (!next.gender && parsed.inputs.sex) {
            next.gender = parsed.inputs.sex === "female" ? "Female" : "Male";
            applied = true;
          }

          // Age (if not already entered)
          if (!next.age && parsed.inputs.age) {
            next.age = String(parsed.inputs.age);
            applied = true;
          }

          // Height (if not already entered)
          if (!next.height && parsed.inputs.height) {
            next.height = String(parsed.inputs.height);
            applied = true;
          }

          // Weight (if not already entered)
          if (!next.currentWeight && parsed.inputs.weight) {
            next.currentWeight = String(parsed.inputs.weight);
            applied = true;
          }

          // Goal mapping
          if (parsed.inputs.goalId) {
            if (parsed.inputs.goalId === "fat_loss") {
              next.goal = "weight_loss";
              applied = true;
            } else if (parsed.inputs.goalId === "muscle_building") {
              next.goal = "muscle_building";
              applied = true;
            } else if (parsed.inputs.goalId === "maintenance") {
              next.goal = "general_fitness";
              applied = true;
            }
          }

          // Coach notes prefill with scientific calculator targets
          if (!next.notes && parsed.results) {
            const { targetCalories, protein, fat, carbs, bmr, tdee, bmi, sourceTag, isCalibrated } = parsed.results;
            const tag = sourceTag || (isCalibrated ? "Calibrated Tracking" : "Scientific Baseline");
            next.notes = `[${tag}] Target: ${targetCalories.toLocaleString()} kcal/day | Protein: ${protein}g | Carbs: ${carbs}g | Fat: ${fat}g | BMR: ${bmr} kcal | TDEE: ${tdee} kcal | BMI: ${bmi}`;
            applied = true;
          }

          if (applied) {
            setHasPrefilled(true);
          }

          return next;
        });
      } catch {
        // Ignore JSON or storage exceptions
      }
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  const updateData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear field errors as user updates
    const fieldKeys = Object.keys(fields);
    if (fieldKeys.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        fieldKeys.forEach((key) => delete next[key]);
        return next;
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        newErrors.fullName = "Please enter your full name (minimum 2 characters).";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
      const phoneDigits = (formData.phone || "").replace(/\D/g, "");
      if (!formData.phone || phoneDigits.length < 8) {
        newErrors.phone = "Please enter a valid phone or WhatsApp number (min 8 digits).";
      }
      const ageNum = parseInt(formData.age, 10);
      if (!formData.age || isNaN(ageNum) || ageNum < 16 || ageNum > 85) {
        newErrors.age = "Please enter an age between 16 and 85.";
      }
      if (!formData.gender) {
        newErrors.gender = "Please select your gender.";
      }
    } else if (step === 2) {
      const heightNum = parseFloat(formData.height);
      if (!formData.height || isNaN(heightNum) || heightNum < 120 || heightNum > 230) {
        newErrors.height = "Please enter a realistic height between 120 and 230 cm.";
      }
      const weightNum = parseFloat(formData.currentWeight);
      if (!formData.currentWeight || isNaN(weightNum) || weightNum < 35 || weightNum > 250) {
        newErrors.currentWeight = "Please enter your current weight between 35 and 250 kg.";
      }
      if (formData.targetWeight) {
        const targetNum = parseFloat(formData.targetWeight);
        if (isNaN(targetNum) || targetNum < 35 || targetNum > 250) {
          newErrors.targetWeight = "Target weight must be between 35 and 250 kg.";
        }
      }
      if (!formData.goal) {
        newErrors.goal = "Please select your primary fitness goal.";
      }
      if (!formData.experience) {
        newErrors.experience = "Please select your training experience level.";
      }
    } else if (step === 3) {
      if (!formData.trainingLocation) {
        newErrors.trainingLocation = "Please select your preferred training location.";
      }
      if (!formData.daysPerWeek) {
        newErrors.daysPerWeek = "Please select your available training days per week.";
      }
      if (!formData.package) {
        newErrors.package = "Please select a coaching package.";
      }
    } else if (step === 4) {
      if (!formData.consent) {
        newErrors.consent = "Please agree to the consent statement to complete this demo application.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (step) => {
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    // Simulate frontend asynchronous processing
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(5); // Success state
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressPct = ((currentStep - 1) / 3) * 100;

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Red Ambient Glow behind Form Card */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[280px] w-[280px] sm:h-[480px] sm:w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,35,50,0.18)_0%,rgba(255,35,50,0.04)_50%,transparent_70%)] blur-[80px] z-0"
        aria-hidden="true"
      />

      {/* Main Glass Surface Card */}
      <div className="relative z-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#191919] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {currentStep <= 4 ? (
          <div>
            {/* Header & Step Counter */}
            <div className="mb-6 sm:mb-8 pb-5 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-brand">
                  Step {currentStep} of 4
                </span>
                <span className="text-xs font-sans text-muted">
                  {STEP_TITLES[currentStep - 1]}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-400 ease-out"
                  style={{ width: `${Math.max(progressPct, 10)}%` }}
                />
              </div>

              {/* Step Dots Indicators */}
              <div className="hidden sm:grid grid-cols-4 gap-2 mt-4">
                {STEP_TITLES.map((title, idx) => {
                  const stepNumber = idx + 1;
                  const isDone = currentStep > stepNumber;
                  const isCurrent = currentStep === stepNumber;

                  return (
                    <button
                      key={title}
                      type="button"
                      disabled={stepNumber > currentStep}
                      onClick={() => goToStep(stepNumber)}
                      className={`text-left text-xs font-sans transition-colors cursor-pointer ${
                        isCurrent
                          ? "text-foreground font-semibold"
                          : isDone
                          ? "text-brand hover:underline"
                          : "text-muted/60 cursor-not-allowed"
                      }`}
                    >
                      <span className="block font-display text-[11px] uppercase tracking-wider text-muted">
                        {stepNumber}. {title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prefilled Calculator Banner Notification */}
            {hasPrefilled && (
              <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-brand/30 bg-[color-mix(in_srgb,var(--brand-red)_10%,#191919)] p-3 sm:p-3.5 text-xs font-sans text-foreground">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-foreground">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>
                    <strong className="font-semibold text-brand">Scientific Baseline Applied:</strong> Prefilled with your fitness calculator parameters &amp; caloric target.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasPrefilled(false)}
                  aria-label="Dismiss notification"
                  className="shrink-0 text-muted hover:text-foreground text-xs underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Form Steps */}
            <form onSubmit={handleSubmit} noValidate>
              {currentStep === 1 && (
                <Step1PersonalInfo
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <Step2FitnessProfile
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {currentStep === 3 && (
                <Step3TrainingLifestyle
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {currentStep === 4 && (
                <Step4ReviewSubmit
                  data={formData}
                  updateData={updateData}
                  goToStep={goToStep}
                  errors={errors}
                  isSubmitting={isSubmitting}
                />
              )}

              {/* Navigation Controls */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-control border border-white/15 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground hover:border-white/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 rounded-control bg-brand px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground shadow-[0_4px_20px_rgba(255,35,50,0.35)] transition-all hover:bg-brand-hover hover:shadow-[0_6px_28px_rgba(255,35,50,0.5)] active:scale-95 cursor-pointer"
                  >
                    <span>Continue</span>
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
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consent}
                    className={`inline-flex items-center justify-center rounded-control bg-brand px-9 py-4 font-display text-base font-bold uppercase tracking-wider text-foreground shadow-[0_4px_24px_rgba(255,35,50,0.35)] transition-all ${
                      isSubmitting || !formData.consent
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-brand-hover hover:shadow-[0_6px_32px_rgba(255,35,50,0.5)] active:scale-95 cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <BookingSuccess data={formData} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
