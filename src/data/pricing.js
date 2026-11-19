/**
 * Centralized coaching plans and proposed Saudi-market pricing (SAR).
 *
 * NOTE: These pricing values (199 / 349 / 499 SAR/month) and tier structures
 * are proposed prototype values pending Coach Rdwan's final approval before launch.
 * Single source of truth for both Pricing Plans section and Registration Form.
 */
export const PRICING_CONFIG = {
  currencyCode: "SAR",
  studentDiscountPercent: 25,
  defaultActiveIndex: 1, // Center featured plan (Performance Coaching)
  plans: [
    {
      id: "starter-coaching",
      priceAmount: 199,
      featured: false,
      href: "/booking?plan=starter-coaching",
      badge: {
        en: "Essential Plan",
        ar: "الخطة الأساسية",
      },
    },
    {
      id: "performance-coaching",
      priceAmount: 349,
      featured: true,
      href: "/booking?plan=performance-coaching",
      badge: {
        en: "Most Popular",
        ar: "الأكثر طلبًا",
      },
    },
    {
      id: "elite-coaching",
      priceAmount: 499,
      featured: false,
      href: "/booking?plan=elite-coaching",
      badge: {
        en: "Elite Athlete",
        ar: "تدريب النخبة",
      },
    },
  ],
};

export function getPlanById(planId) {
  return (
    PRICING_CONFIG.plans.find((p) => p.id === planId) ||
    PRICING_CONFIG.plans[PRICING_CONFIG.defaultActiveIndex]
  );
}

export function calculateStudentDiscountPrice(priceAmount) {
  return Math.round(
    priceAmount * (1 - PRICING_CONFIG.studentDiscountPercent / 100)
  );
}
