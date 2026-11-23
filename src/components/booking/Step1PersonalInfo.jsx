"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Step1PersonalInfo({ data, updateData, errors }) {
  const { t } = useLocale();
  const step1 = t?.booking?.step1 || {};

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          {step1.title || "Step 1: Basic Athlete Information"}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted font-sans leading-relaxed">
          {step1.subtitle ||
            "Enter your personal contact details and physical baseline so Coach Rdwan can evaluate your application."}
        </p>
      </div>

      {/* Contact Information Group */}
      <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-4">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
          {step1.contactHeading || "Contact Details"}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="fullName"
              className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
            >
              {step1.fullNameLabel || "Full Name"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName || ""}
              onChange={(e) => updateData({ fullName: e.target.value })}
              placeholder={step1.fullNamePlaceholder || "e.g. Alex Morgan"}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
            >
              {step1.phoneLabel || "WhatsApp Phone Number"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              dir="ltr"
              value={data.phone || ""}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder={step1.phonePlaceholder || "+966 50 000 0000"}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
            >
              {step1.emailLabel || "Email (Gmail preferred)"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              dir="ltr"
              value={data.email || ""}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder={step1.emailPlaceholder || "you@gmail.com"}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Physical Baseline Group */}
      <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-4">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand">
          {step1.physicalHeading || "Physical Baseline"}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
            >
              {step1.ageLabel || "Age"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="16"
              max="85"
              value={data.age || ""}
              onChange={(e) => updateData({ age: e.target.value })}
              placeholder={step1.agePlaceholder || "e.g. 24"}
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "age-error" : undefined}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.age
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.age && (
              <p id="age-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.age}
              </p>
            )}
          </div>

          {/* Height (cm) */}
          <div>
            <label
              htmlFor="height"
              className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
            >
              {step1.heightLabel || "Height (cm)"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <input
              type="number"
              id="height"
              name="height"
              min="120"
              max="230"
              value={data.height || ""}
              onChange={(e) => updateData({ height: e.target.value })}
              placeholder={step1.heightPlaceholder || "e.g. 178"}
              aria-invalid={Boolean(errors.height)}
              aria-describedby={errors.height ? "height-error" : undefined}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.height
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.height && (
              <p id="height-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.height}
              </p>
            )}
          </div>

          {/* Current Weight (kg) */}
          <div>
            <label
              htmlFor="currentWeight"
              className="block text-xs sm:text-sm font-medium text-foreground/90 mb-1.5"
            >
              {step1.weightLabel || "Current Weight (kg)"}{" "}
              <span className="text-brand font-bold">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              id="currentWeight"
              name="currentWeight"
              min="35"
              max="250"
              value={data.currentWeight || ""}
              onChange={(e) => updateData({ currentWeight: e.target.value })}
              placeholder={step1.weightPlaceholder || "e.g. 82.5"}
              aria-invalid={Boolean(errors.currentWeight)}
              aria-describedby={errors.currentWeight ? "currentWeight-error" : undefined}
              className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
                errors.currentWeight
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-brand focus:ring-brand"
              }`}
            />
            {errors.currentWeight && (
              <p id="currentWeight-error" className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.currentWeight}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
