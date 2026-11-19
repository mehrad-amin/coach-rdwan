"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * 8 verified coaching FAQs personalized for Coach Rdwan.
 * Defaults to English; localized via useLocale() and i18n dictionaries.
 */
export const DEFAULT_FAQS = [
  {
    id: "online-coaching",
    question: "Is coaching with Rdwan entirely online?",
    answer:
      "Yes. Coaching is delivered online, with a personalized training program based on your goals and experience, along with ongoing guidance to help you stay consistent and progress.",
  },
  {
    id: "beginners",
    question: "Can I join if I'm a complete beginner?",
    answer:
      "Absolutely. Your program is tailored to your current fitness level and experience, whether you're just starting out or have been training for years.",
  },
  {
    id: "training-goals",
    question: "What goals can I work toward with this coaching?",
    answer:
      "You can focus on building strength, gaining muscle, losing fat, or improving overall fitness, with a program tailored to your specific goals and needs.",
  },
  {
    id: "powerlifting",
    question: "Do you offer specialized powerlifting programs?",
    answer:
      "Yes. Specialized powerlifting programs are available to help develop strength and improve your squat, bench press, and deadlift performance based on your current level and training needs.",
  },
  {
    id: "calories-nutrition",
    question: "Does coaching include calorie and nutrition guidance?",
    answer:
      "Yes. Your calorie requirements and macronutrient targets are calculated according to your goals, whether you're aiming to build muscle, lose fat, or improve performance.",
  },
  {
    id: "exercise-technique",
    question: "How is my exercise technique reviewed and corrected?",
    answer:
      "You can submit videos of your exercises for review. Rdwan will provide feedback and guidance to help you improve your technique and train more safely and effectively.",
  },
  {
    id: "support-communication",
    question: "Can I contact Rdwan if I have questions or difficulties during training?",
    answer:
      "Yes. You can reach out via WhatsApp for coaching support, questions about your training program, and guidance when you encounter challenges along the way.",
  },
  {
    id: "student-discount",
    question: "Is there a discount available for students?",
    answer:
      "Yes. Students are eligible for a 25% discount on coaching services, subject to verification of student status.",
  },
];

/**
 * Expand/Collapse Icon (Figma component "ic:baseline-add" - node 1:1428)
 * - Collapsed: Material plus (+) icon in brand red (#ff2332)
 * - Expanded: Material minus (–) icon in brand red (#ff2332)
 * Smoothly transitions between plus and minus via CSS transform.
 */
function AccordionToggleIcon({ isOpen, className = "" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Horizontal Bar (always visible) */}
      <rect x="4" y="11" width="16" height="2" rx="0.5" fill="#ff2332" />
      {/* Vertical Bar (rotates & scales down when open) */}
      <rect
        x="11"
        y="4"
        width="2"
        height="16"
        rx="0.5"
        fill="#ff2332"
        className={`transition-all duration-300 origin-center ${
          isOpen ? "opacity-0 scale-y-0 rotate-90" : "opacity-100 scale-y-100 rotate-0"
        }`}
      />
    </svg>
  );
}

/**
 * FAQ Accordion Section (Figma Frame 32 - node 1:1418: 959x566px)
 * Heading: "COMMONLY ASKED QUESTIONS" / "الأسئلة الشائعة"
 * Subtitle: "I am here to help!" / "أنا هنا لمساعدتك!"
 * Items: 8 Accordion rows with bottom dividers
 * Default state: First item expanded, matching Figma design.
 */
export default function FAQSection({
  className = "",
  items,
  defaultOpenIndex = 0,
}) {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const faqItems = items || t?.faq?.items || DEFAULT_FAQS;
  const heading = t?.faq?.heading || "Commonly Asked Questions";
  const subtitle = t?.faq?.subtitle || "I am here to help!";

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={[
        "relative w-full bg-background",
        "mb-16 sm:mb-24 lg:mb-32 desktop:mb-[var(--section-gap-lg)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-faq)]">
          {/* Header Area (Figma Frame 27 - node 1:1419: 959x120px) */}
          <div className="text-center">
            <h2
              id="faq-heading"
              className="section-heading text-3xl sm:text-4xl lg:text-[40px] desktop:text-[48px] font-extrabold uppercase font-display tracking-tight text-foreground"
            >
              {heading}
            </h2>
            <p className="mt-2 sm:mt-3 font-sans text-base sm:text-lg lg:text-[20px] desktop:text-[22px] font-normal text-muted">
              {subtitle}
            </p>
          </div>

          {/* Accordion List (Figma Frame 31 - node 1:1422: 959x394px) */}
          <div
            className="mt-8 sm:mt-12 lg:mt-[52px] w-full"
            role="presentation"
          >
            {faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              const questionId = `faq-question-${item.id || idx}`;
              const answerId = `faq-answer-${item.id || idx}`;

              return (
                <div
                  key={item.id || idx}
                  className="border-b border-[#2C2C2C] transition-colors"
                >
                  <h3>
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(idx)}
                      className="group w-full py-6 sm:py-7 lg:py-[30px] px-2 sm:px-4 lg:px-[30px] flex items-center justify-between text-start gap-4 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 transition-colors cursor-pointer"
                    >
                      <span className="font-display font-bold text-lg sm:text-xl lg:text-[20px] tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
                        {item.question}
                      </span>
                      <span className="shrink-0 flex items-center justify-center w-6 h-6">
                        <AccordionToggleIcon
                          isOpen={isOpen}
                          className="w-6 h-6 shrink-0"
                        />
                      </span>
                    </button>
                  </h3>

                  {/* Animated Answer Panel */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-2 sm:px-4 lg:px-[30px] pb-6 sm:pb-7 lg:pb-[30px] -mt-1 sm:-mt-1.5 lg:-mt-2">
                        <p className="font-sans text-sm sm:text-base leading-relaxed text-muted max-w-[834px] text-start">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
