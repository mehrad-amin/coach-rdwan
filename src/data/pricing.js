/**
 * Centralized coaching programs and approved Saudi-market pricing (SAR) for Coach Rdwan.
 *
 * Single source of truth for:
 * - Pricing section
 * - Duration selector & student discount toggle
 * - Registration & booking form
 * - Application payload & confirmation
 */

export const PRICING_CONFIG = {
  currencyCode: "SAR",
  studentDiscountPercent: 20,
  defaultProgramId: "powerlifting",
  defaultDurationId: "1_month",
  durations: [
    {
      id: "1_month",
      months: 1,
    },
    {
      id: "3_months",
      months: 3,
    },
  ],
  programs: [
    {
      id: "powerlifting",
      featured: true,
      pricing: {
        "1_month": { regular: 349, student: 279 },
        "3_months": { regular: 940, student: 790 },
      },
    },
    {
      id: "bodybuilding",
      featured: false,
      pricing: {
        "1_month": { regular: 299, student: 239 },
        "3_months": { regular: 809, student: 649 },
      },
    },
  ],
};

/**
 * Get program configuration by ID
 */
export function getProgramById(programId) {
  return (
    PRICING_CONFIG.programs.find((p) => p.id === programId) ||
    PRICING_CONFIG.programs[0]
  );
}

/**
 * Get exact approved price based on program, duration, and student status.
 * Never uses generic math formulas; strictly returns the approved matrix.
 */
export function getExactPrice(programId, durationId = "1_month", isStudent = false) {
  const program = getProgramById(programId);
  const durationPricing = program.pricing[durationId] || program.pricing["1_month"];
  return isStudent ? durationPricing.student : durationPricing.regular;
}

/**
 * Helper to validate program IDs
 */
export function isValidProgramId(id) {
  return PRICING_CONFIG.programs.some((p) => p.id === id);
}

/**
 * Helper to validate duration IDs
 */
export function isValidDurationId(id) {
  return PRICING_CONFIG.durations.some((d) => d.id === id);
}
