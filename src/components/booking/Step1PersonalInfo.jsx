"use client";

export default function Step1PersonalInfo({ data, updateData, errors }) {
  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other / Prefer not to say" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground">
          Step 1: Personal Information
        </h3>
        <p className="mt-1 text-sm text-muted font-sans">
          Tell us a little bit about yourself so Coach John can contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-foreground/90 mb-1.5"
          >
            Full Name <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName || ""}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder="e.g. Alex Morgan"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
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

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground/90 mb-1.5"
          >
            Email Address <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email || ""}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
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

        {/* Phone / WhatsApp */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground/90 mb-1.5"
          >
            WhatsApp / Phone <span className="text-brand">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone || ""}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
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

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-foreground/90 mb-1.5"
          >
            Age (Years) <span className="text-brand">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="16"
            max="85"
            value={data.age || ""}
            onChange={(e) => updateData({ age: e.target.value })}
            placeholder="e.g. 28"
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? "age-error" : undefined}
            className={`w-full rounded-xl bg-[#141414] px-4 py-3 text-foreground placeholder-white/30 border transition-colors outline-none focus:ring-1 ${
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

        {/* Gender Selection */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground/90 mb-2">
            Gender <span className="text-brand">*</span>
          </label>
          <div
            role="radiogroup"
            aria-label="Gender selection"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {genders.map((g) => {
              const selected = data.gender === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => updateData({ gender: g.value })}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl border-[1.5px] text-sm font-medium transition-all cursor-pointer ${
                    selected
                      ? "border-selected-brand bg-[color-mix(in_srgb,var(--brand-red)_10%,#191919)] text-foreground font-semibold shadow-[0_0_15px_rgba(255,35,50,0.15)]"
                      : "border-white/15 bg-[#141414] text-muted hover:border-white/30 hover:text-foreground"
                  }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
          {errors.gender && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">
              {errors.gender}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
