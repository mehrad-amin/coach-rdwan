/**
 * Client Results / Transformations Configuration Architecture
 *
 * NOTE: The coach has not yet provided real transformation photographs.
 * This structure is prepared and ready for real photos when they arrive.
 * Fake transformations, stock images, or AI-generated before/after photos must NEVER be displayed.
 */

export const TRANSFORMATIONS_CONFIG = {
  // Master visibility switch - kept strictly FALSE until real client photos arrive
  isEnabled: false,
  categories: [
    { id: "all", label: { ar: "الكل", en: "All" } },
    { id: "powerlifting", label: { ar: "باورليفتينق", en: "Powerlifting" } },
    { id: "bodybuilding", label: { ar: "بوديبلدينق", en: "Bodybuilding" } },
  ],
  // Template entries ready to receive real coach data and verified images
  items: [
    /* Real client transformation photographs will be populated here:
    {
      id: "client-1",
      category: "powerlifting",
      athleteName: "...",
      durationMonths: 6,
      beforeImage: "/images/transformations/client-1-before.jpg",
      afterImage: "/images/transformations/client-1-after.jpg",
      caption: {
        ar: "...",
        en: "...",
      },
      stats: {
        squatGain: "+40kg",
        benchGain: "+25kg",
        deadliftGain: "+50kg",
      },
    }
    */
  ],
};
