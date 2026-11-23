"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { getProgramById, getExactPrice } from "@/data/pricing";

export default function BookingSuccess({ data, onReset }) {
  const { t, locale } = useLocale();
  const success = t?.booking?.success || {};
  const pricing = t?.pricing || {};

  const programId = data.program || "powerlifting";
  const durationId = data.duration || "1_month";
  const isStudent = data.student === "yes";
  const approvedPrice = getExactPrice(programId, durationId, isStudent);

  const programInfo = pricing.programs?.[programId] || {};
  const durationLabel = pricing.durationLabels?.[durationId] || durationId;

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
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Main Success Heading */}
      <div className="space-y-2 max-w-lg mx-auto">
        <h3 className="font-display font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground">
          {success.title || "Application Submitted Successfully!"}
        </h3>
        <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
          {success.message
            ? success.message(data.fullName)
            : `Thank you, ${data.fullName || "Athlete"}! Your coaching application has been received and Coach Rdwan will contact you via WhatsApp shortly.`}
        </p>
      </div>

      {/* Summary Box */}
      <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 text-start space-y-3.5">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-muted border-b border-white/10 pb-2">
          {success.summaryTitle || "Application Summary"}
        </h4>
        <dl className="space-y-2.5 text-xs sm:text-sm font-sans">
          <div className="flex justify-between items-center">
            <dt className="text-muted">{success.programLabel || "Program:"}</dt>
            <dd className="font-bold text-foreground">
              {programInfo.name || programId}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-muted">{success.durationLabel || "Duration:"}</dt>
            <dd className="font-medium text-foreground">{durationLabel}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-muted">{success.priceLabel || "Total Price:"}</dt>
            <dd className="font-extrabold text-brand" dir="ltr">
              {approvedPrice} {pricing.currency}
              {isStudent && (
                <span className="text-[11px] font-sans font-normal text-muted ms-1.5">
                  ({locale === "ar" ? "خصم طلاب" : "Student"})
                </span>
              )}
            </dd>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <dt className="text-muted">{success.contactLabel || "Contact Info:"}</dt>
            <dd className="font-medium text-foreground" dir="ltr">
              {data.phone}
            </dd>
          </div>
        </dl>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-control bg-brand px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground shadow-[0_4px_20px_rgba(255,35,50,0.35)] transition-all hover:bg-brand-hover active:scale-95 cursor-pointer"
        >
          {success.returnHome || "Return to Home"}
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-control border border-white/15 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground hover:border-white/30 transition-all cursor-pointer"
        >
          {success.submitAnother || "Submit Another Application"}
        </button>
      </div>
    </div>
  );
}
