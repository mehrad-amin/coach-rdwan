"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { PRICING_CONFIG, getExactPrice, isValidProgramId, isValidDurationId } from "@/data/pricing";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2ProgramSelection from "./Step2ProgramSelection";
import Step3ProgramQuestionnaire from "./Step3ProgramQuestionnaire";
import Step4ReviewSubmit from "./Step4ReviewSubmit";
import BookingSuccess from "./BookingSuccess";

const INITIAL_FORM_DATA = {
  // Step 1: Basic Athlete Information
  fullName: "",
  phone: "",
  email: "",
  age: "",
  height: "",
  currentWeight: "",

  // Step 2: Program & Subscription
  program: PRICING_CONFIG.defaultProgramId,
  duration: PRICING_CONFIG.defaultDurationId,
  student: "no",

  // Step 3: Track A - Powerlifting Questionnaire
  plSquatWeight: "",
  plSquatTechnique: "",
  plBenchWeight: "",
  plFingerPlacement: "",
  plDeadliftWeight: "",
  plDeadliftTechnique: "",
  plRpeKnowledge: "",
  plDays: 4,
  plPreviousCoach: "",
  plWhyRdwan: "",
  plCalorieKnowledge: "",
  plCompetition: "",

  // Step 3: Track B - Bodybuilding Questionnaire
  bbGoal: "muscle_building",
  bbDays: 4,
  bbActivityLevel: "",
  bbWhyRdwan: "",
  bbPreviousCoach: "",
  bbCalorieKnowledge: "",

  // Shared Additional Information
  instagram: "",
  additionalNotes: "",

  // Step 4: Consent
  consent: false,
};

export default function BookingForm() {
  const { t, locale } = useLocale();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionPayload, setSubmissionPayload] = useState(null);

  const stepTitles = t?.booking?.steps?.titles || [
    "Basic Athlete Info",
    "Program & Plan",
    "Specialized Questionnaire",
    "Review & Confirm",
  ];

  // Initialize selected program, duration, and student discount from URL query or sessionStorage
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        if (typeof window === "undefined") return;

        const urlParams = new URLSearchParams(window.location.search);
        const queryProgram = urlParams.get("program") || urlParams.get("plan");
        const queryDuration = urlParams.get("duration");
        const queryStudent = urlParams.get("student");

        const storedProgram = sessionStorage.getItem("pt_selected_program");
        const storedDuration = sessionStorage.getItem("pt_selected_duration");
        const storedStudent = sessionStorage.getItem("pt_is_student");

        setFormData((prev) => {
          const next = { ...prev };

          // Program
          if (queryProgram && isValidProgramId(queryProgram)) {
            next.program = queryProgram;
          } else if (storedProgram && isValidProgramId(storedProgram)) {
            next.program = storedProgram;
          }

          // Duration
          if (queryDuration && isValidDurationId(queryDuration)) {
            next.duration = queryDuration;
          } else if (storedDuration && isValidDurationId(storedDuration)) {
            next.duration = storedDuration;
          }

          // Student
          if (queryStudent === "yes" || queryStudent === "true") {
            next.student = "yes";
          } else if (storedStudent === "yes" || storedStudent === "true") {
            next.student = "yes";
          }

          return next;
        });
      } catch {
        // Ignore storage exceptions
      }
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  const updateData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    if (submitError) {
      setSubmitError(null);
    }

    // Clear related field errors as user updates
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
    const val = t?.booking?.validation || {};

    if (step === 1) {
      // 1. Full Name
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        newErrors.fullName =
          val.fullName || "Please enter your full name (minimum 2 characters).";
      }

      // 2. WhatsApp Phone Number
      const phoneDigits = (formData.phone || "").replace(/\D/g, "");
      if (!formData.phone || phoneDigits.length < 8) {
        newErrors.phone =
          val.phone || "Please enter a valid WhatsApp phone number (min 8 digits).";
      }

      // 3. Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email.trim())) {
        newErrors.email = val.email || "Please enter a valid email address.";
      }

      // 4. Age
      const ageNum = parseInt(formData.age, 10);
      if (!formData.age || isNaN(ageNum) || ageNum < 16 || ageNum > 85) {
        newErrors.age = val.age || "Please enter an age between 16 and 85.";
      }

      // 5. Height
      const heightNum = parseFloat(formData.height);
      if (!formData.height || isNaN(heightNum) || heightNum < 120 || heightNum > 230) {
        newErrors.height =
          val.height || "Please enter a realistic height between 120 and 230 cm.";
      }

      // 6. Current Weight
      const weightNum = parseFloat(formData.currentWeight);
      if (
        !formData.currentWeight ||
        isNaN(weightNum) ||
        weightNum < 35 ||
        weightNum > 250
      ) {
        newErrors.currentWeight =
          val.currentWeight || "Please enter your current weight between 35 and 250 kg.";
      }
    } else if (step === 2) {
      // Program, Duration, Student
      if (!formData.program || !isValidProgramId(formData.program)) {
        newErrors.program = val.program || "Please select a coaching program.";
      }
      if (!formData.duration || !isValidDurationId(formData.duration)) {
        newErrors.duration = val.duration || "Please select a subscription duration.";
      }
      if (!formData.student) {
        newErrors.student = val.student || "Please specify your student status.";
      }
    } else if (step === 3) {
      const isPowerlifting = (formData.program || "powerlifting") === "powerlifting";

      if (isPowerlifting) {
        // Track A Validation
        if (!formData.plRpeKnowledge) {
          newErrors.plRpeKnowledge =
            val.rpeKnowledge || "Please indicate whether you know the RPE scale.";
        }
        if (!formData.plDays) {
          newErrors.plDays =
            val.plDays || "Please choose your preferred training days (3, 4, or 5).";
        }
        if (!formData.plPreviousCoach) {
          newErrors.plPreviousCoach =
            val.plPreviousCoach ||
            "Please indicate whether you have worked with a coach before.";
        }
        if (!formData.plWhyRdwan || formData.plWhyRdwan.trim().length < 5) {
          newErrors.plWhyRdwan =
            val.plWhyRdwan || "Please tell us what made you choose Coach Rdwan.";
        }
        if (!formData.plCalorieKnowledge) {
          newErrors.plCalorieKnowledge =
            val.plCalorieKnowledge ||
            "Please indicate whether you know how to calculate calories.";
        }
      } else {
        // Track B Validation
        if (!formData.bbGoal) {
          newErrors.bbGoal =
            val.bbGoal || "Please select your desired goal.";
        }
        if (!formData.bbDays) {
          newErrors.bbDays =
            val.bbDays || "Please choose your preferred training days (3, 4, or 5).";
        }
        if (!formData.bbWhyRdwan || formData.bbWhyRdwan.trim().length < 5) {
          newErrors.bbWhyRdwan =
            val.bbWhyRdwan || "Please tell us what made you choose Coach Rdwan.";
        }
        if (!formData.bbPreviousCoach) {
          newErrors.bbPreviousCoach =
            val.bbPreviousCoach ||
            "Please indicate whether you have worked with a coach before.";
        }
        if (!formData.bbCalorieKnowledge) {
          newErrors.bbCalorieKnowledge =
            val.bbCalorieKnowledge ||
            "Please indicate whether you know how to calculate calories.";
        }
      }
    } else if (step === 4) {
      if (!formData.consent) {
        newErrors.consent =
          val.consent || "Please agree to the confirmation statement to submit.";
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
    setSubmitError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (step) => {
    setErrors({});
    setSubmitError(null);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const isPowerlifting = formData.program === "powerlifting";
    const isStudent = formData.student === "yes";
    const approvedPrice = getExactPrice(formData.program, formData.duration, isStudent);

    // Build clean submission payload containing ONLY active program questions
    const cleanPayload = {
      timestamp: new Date().toISOString(),
      athlete: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        age: parseInt(formData.age, 10),
        height: parseFloat(formData.height),
        currentWeight: parseFloat(formData.currentWeight),
      },
      subscription: {
        program: formData.program,
        duration: formData.duration,
        isStudent,
        priceAmount: approvedPrice,
        currency: PRICING_CONFIG.currencyCode,
      },
      questionnaire: isPowerlifting
        ? {
            squatWeight: formData.plSquatWeight || null,
            squatTechnique: formData.plSquatTechnique || null,
            benchWeight: formData.plBenchWeight || null,
            fingerPlacement: formData.plFingerPlacement || null,
            deadliftWeight: formData.plDeadliftWeight || null,
            deadliftTechnique: formData.plDeadliftTechnique || null,
            rpeKnowledge: formData.plRpeKnowledge,
            preferredDays: Number(formData.plDays),
            previousCoachExperience: formData.plPreviousCoach,
            reasonForChoosingCoach: formData.plWhyRdwan.trim(),
            knowsCalorieCalculation: formData.plCalorieKnowledge,
            championshipExperience: formData.plCompetition || null,
          }
        : {
            desiredGoal: formData.bbGoal,
            preferredDays: Number(formData.bbDays),
            activityLevel: formData.bbActivityLevel || null,
            reasonForChoosingCoach: formData.bbWhyRdwan.trim(),
            previousCoachExperience: formData.bbPreviousCoach,
            knowsCalorieCalculation: formData.bbCalorieKnowledge,
          },
      additional: {
        instagram: formData.instagram ? formData.instagram.trim() : null,
        notes: formData.additionalNotes ? formData.additionalNotes.trim() : null,
      },
    };

    try {
      const res = await fetch("/api/athlete-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json().catch(() => null);

      if (res.ok && result?.success) {
        setSubmissionPayload(cleanPayload);
        try {
          sessionStorage.removeItem("pt_selected_program");
          sessionStorage.removeItem("pt_selected_duration");
          sessionStorage.removeItem("pt_is_student");
          sessionStorage.removeItem("pt_selected_plan");
        } catch {}
        setIsSubmitting(false);
        setCurrentStep(5); // Success step
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsSubmitting(false);
        let errorMsg = result?.error;
        if (locale === "ar") {
          if (errorMsg === "Unauthorized request.") {
            errorMsg =
              "تعذر التحقق من الاتصال بالخادم. يرجى التواصل مباشرة عبر الواتساب لإكمال تسجيلك.";
          } else if (!errorMsg) {
            errorMsg =
              t?.booking?.nav?.submitError ||
              "حدث خطأ أثناء إرسال طلب التدريب. يرجى التحقق من اتصالك والمحاولة مجددًا، أو التواصل مباشرة عبر الواتساب.";
          }
        } else if (!errorMsg) {
          errorMsg =
            t?.booking?.nav?.submitError ||
            "Failed to submit application. Please try again or reach out on WhatsApp.";
        }
        setSubmitError(errorMsg);
      }
    } catch {
      setIsSubmitting(false);
      setSubmitError(
        t?.booking?.nav?.submitError ||
          "Connection error. Please check your internet connection and try again."
      );
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitError(null);
    setSubmissionPayload(null);
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
      <div className="relative z-10 rounded-2xl sm:rounded-3xl border-[1.5px] border-white/10 bg-[#191919] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {currentStep <= 4 ? (
          <div>
            {/* Header & Step Counter */}
            <div className="mb-6 sm:mb-8 pb-5 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-brand">
                  {t?.booking?.steps?.stepOf
                    ? t.booking.steps.stepOf(currentStep, 4)
                    : `Step ${currentStep} of 4`}
                </span>
                <span className="text-xs font-sans text-muted">
                  {stepTitles[currentStep - 1]}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-400 ease-out"
                  style={{ width: `${Math.max(progressPct, 12)}%` }}
                />
              </div>

              {/* Step Dots Indicators */}
              <div className="hidden sm:grid grid-cols-4 gap-2 mt-4">
                {stepTitles.map((title, idx) => {
                  const stepNumber = idx + 1;
                  const isDone = currentStep > stepNumber;
                  const isCurrent = currentStep === stepNumber;

                  return (
                    <button
                      key={title}
                      type="button"
                      disabled={stepNumber > currentStep}
                      onClick={() => goToStep(stepNumber)}
                      className={`text-start text-xs font-sans transition-colors cursor-pointer ${
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
                <Step2ProgramSelection
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {currentStep === 3 && (
                <Step3ProgramQuestionnaire
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

              {/* Submission Error Banner */}
              {submitError && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs sm:text-sm text-red-200 flex items-start gap-3 animate-in fade-in duration-200"
                >
                  <svg
                    className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-red-100">
                      {locale === "ar" ? "تعذر إرسال الطلب" : "Submission Failed"}
                    </p>
                    <p className="text-red-300 leading-relaxed">{submitError}</p>
                  </div>
                </div>
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
                      className="w-4 h-4 shrink-0 transition-transform rtl:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
                    </svg>
                    <span>{t?.booking?.nav?.back || "Back"}</span>
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
                    <span>{t?.booking?.nav?.continue || "Continue"}</span>
                    <svg
                      className="w-4 h-4 shrink-0 transition-transform rtl:rotate-180"
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
                        {t?.booking?.nav?.submitting || "Submitting..."}
                      </span>
                    ) : (
                      t?.booking?.nav?.submit || "Submit Application"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <BookingSuccess data={formData} payload={submissionPayload} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
