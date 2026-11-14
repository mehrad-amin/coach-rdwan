"use client";

import { useState } from "react";

/**
 * Original Figma questions and content from frame "Frame 32" (node 1:1418)
 * - Item 1: Original question and original Figma placeholder answer preserved 100%
 * - Items 2-4: Original questions preserved 100%; answers provide objective, realistic
 *   fitness guidance without fabricating claims, pricing, or coach policies.
 */
export const DEFAULT_FAQS = [
  {
    id: "exercise-frequency",
    question: "How often should I exercise?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Velit gravida malesuada quis ullamcorper. Lectus accumsan turpis quisque tempor nisi. Eget morbi vitae neque adipiscing ridiculus feugiat. Lectus ac eleifend iaculis magna.",
  },
  {
    id: "weight-loss-routine",
    question: "What’s the best workout routine for weight loss?",
    answer:
      "A combination of progressive resistance training 3 to 4 days per week with moderate-intensity cardiovascular exercise is the most effective approach for fat loss. Consistency, proper form, and maintaining a sustainable caloric deficit are key to long-term success.",
  },
  {
    id: "workout-nutrition",
    question: "What should I eat before and after a workout?",
    answer:
      "Prior to training, consume easily digestible carbohydrates paired with a moderate amount of protein roughly 1 to 2 hours in advance. Post-workout, focus on quality protein to support muscle repair and complex carbohydrates to replenish depleted glycogen stores.",
  },
  {
    id: "build-muscle",
    question: "How can I build muscle effectively?",
    answer:
      "Building muscle requires consistent progressive overload across your workouts, adequate training volume targeting major muscle groups 2 to 3 times per week, sufficient dietary protein (1.6 to 2.2 grams per kilogram of body weight), and prioritized rest.",
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
 * Heading: "COMMONLY ASKED QUESTIONS" (Figma node 1:1420)
 * Subtitle: "I am here to help!" (Figma node 1:1421)
 * Items: 4 Accordion rows with bottom dividers (Figma nodes 1:1423, 1:1430, 1:1436, 1:1442)
 * Default state: First item expanded, matching Figma design.
 */
export default function FAQSection({
  className = "",
  items = DEFAULT_FAQS,
  defaultOpenIndex = 0,
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

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
              Commonly Asked Questions
            </h2>
            <p className="mt-2 sm:mt-3 font-sans text-base sm:text-lg lg:text-[20px] desktop:text-[22px] font-normal text-muted">
              I am here to help!
            </p>
          </div>

          {/* Accordion List (Figma Frame 31 - node 1:1422: 959x394px) */}
          <div
            className="mt-8 sm:mt-12 lg:mt-[52px] w-full"
            role="presentation"
          >
            {items.map((item, idx) => {
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
                      className="group w-full py-6 sm:py-7 lg:py-[30px] px-2 sm:px-4 lg:px-[30px] flex items-center justify-between text-left gap-4 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 transition-colors cursor-pointer"
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
                        <p className="font-sans text-sm sm:text-base leading-relaxed text-muted max-w-[834px]">
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
