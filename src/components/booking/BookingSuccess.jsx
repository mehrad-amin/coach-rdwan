"use client";

import Link from "next/link";

export default function BookingSuccess({ data, onReset }) {
  const packageNames = {
    personal_training: "Personal Training ($200/mo)",
    nutrition: "Diet & Nutrition ($150/mo)",
    hybrid: "Training + Diet Package ($300/mo)",
  };

  const goalLabels = {
    weight_loss: "Weight Loss",
    muscle_building: "Muscle Building",
    body_recomp: "Body Recomposition",
    general_fitness: "General Fitness",
  };

  return (
    <div className="py-6 sm:py-10 text-center space-y-8">
      {/* Animated Success Badge */}
      <div className="relative mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-brand/10 border-2 border-brand text-brand shadow-[0_0_30px_rgba(255,35,50,0.35)] animate-in zoom-in-75 duration-300">
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Main Success Heading */}
      <div className="space-y-2">
        <h3 className="font-display font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground">
          Application Completed!
        </h3>
        <p className="font-sans text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-foreground">{data.fullName || "Athlete"}</span>!
          Your coaching request has been simulated and successfully processed.
        </p>
      </div>

      {/* Summary Box */}
      <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 text-left space-y-3.5">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-muted border-b border-white/10 pb-2">
          Application Summary
        </h4>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted">Selected Package:</span>
            <span className="font-bold text-brand text-right">
              {packageNames[data.package] || "Training + Diet ($300/mo)"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted">Primary Goal:</span>
            <span className="font-medium text-foreground text-right">
              {goalLabels[data.goal] || "Fitness Transformation"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted">Weekly Schedule:</span>
            <span className="font-medium text-foreground text-right">
              {data.daysPerWeek ? `${data.daysPerWeek} Days/Week` : "Flexible"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted">Contact Info:</span>
            <span className="font-medium text-foreground text-right truncate max-w-[200px]">
              {data.email}
            </span>
          </div>
        </div>
      </div>

      {/* Honest Demo Disclaimer */}
      <div className="max-w-md mx-auto rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
        <p className="inline-flex items-center justify-center gap-1.5 text-xs text-muted font-sans leading-relaxed">
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
            <span className="font-medium text-foreground/80">Demo notice:</span> This was an interactive portfolio demonstration. No personal information has been transmitted to external servers, databases, or third-party APIs.
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-control bg-brand px-8 py-4 font-display text-base font-bold uppercase tracking-wider text-foreground shadow-[0_4px_24px_rgba(255,35,50,0.35)] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_6px_32px_rgba(255,35,50,0.5)] active:scale-95 cursor-pointer"
        >
          Return to Homepage
        </Link>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-control border border-white/15 px-6 py-4 font-display text-base font-bold uppercase tracking-wider text-muted hover:text-foreground hover:border-white/30 transition-all cursor-pointer"
          >
            Submit Another Demo
          </button>
        )}
      </div>
    </div>
  );
}
