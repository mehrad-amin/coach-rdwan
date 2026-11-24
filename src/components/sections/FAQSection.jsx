"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * 9 verified coaching FAQs personalized for Coach Rdwan.
 * Defaults to English; localized via useLocale() and i18n dictionaries.
 */
export const DEFAULT_FAQS = [
  {
    id: "remote-custom-coaching",
    question: "Can I get a fully personalized training program without having to train in person at the gym with you?",
    answer:
      "Yes, the coaching is conducted entirely remotely, but that does not mean you will receive a generic plan. I will design a program tailored to your fitness level, goals, capabilities, and daily routine, while continuously tracking your progress and adjusting the program based on your body's response.",
  },
  {
    id: "beginners-welcome",
    question: "Can I start training with you even if I'm a beginner with no prior experience?",
    answer:
      "Definitely. Prior experience is not required. We will start from your current level and build a solid training foundation, with focused attention on learning proper technique and gradual weight progression to ensure steady improvement.",
  },
  {
    id: "training-achievements",
    question: "What can I achieve through training with you?",
    answer:
      "Whether your goal is to build strength, gain muscle mass, improve body composition, or prepare for competitions, I will work with you to establish a clear, tailored plan for your objective and track your progress consistently to achieve the best possible result.",
  },
  {
    id: "powerlifting-bodybuilding",
    question: "Do you offer specialized programs in powerlifting and bodybuilding?",
    answer:
      "Yes, I provide specialized training programs in both disciplines, taking into account the unique requirements of each sport. Whether your goal is to increase your numbers in the squat, bench press, and deadlift, or build muscle mass and enhance muscular symmetry, the program will be built around your specific needs and goals.",
  },
  {
    id: "nutrition-macronutrients",
    question: "Will I receive nutritional guidance and a calculation of my caloric and macronutrient needs?",
    answer:
      "Yes, I will help you determine your caloric and macronutrient requirements (protein, carbohydrates, and fats) aligned with your training goals, guiding you toward a sustainable nutrition approach that supports your performance and recovery.",
  },
  {
    id: "technique-video-review",
    question: "How is my performance reviewed and exercise technique verified?",
    answer:
      "One of my top priorities is ensuring that you don't just perform the exercises, but execute them in the way that is right for you. Your submitted video clips will be reviewed, and you will receive clear feedback and corrections to help improve your technique and understand your mistakes.",
  },
  {
    id: "coach-communication-support",
    question: "Can I contact you if I face an issue or need adjustments to my program?",
    answer:
      "Definitely. Coaching is not just about sending a schedule and waiting for results. It is important to me to remain accessible to help you understand your program and answer your questions at all times.",
  },
  {
    id: "student-discount",
    question: "Are there special rates or discounts for students?",
    answer:
      "Yes, I appreciate the importance of making quality coaching accessible to everyone, which is why special rates and a -20% discount are available for students.",
  },
  {
    id: "schedule-flexibility",
    question: "What if I struggle to adhere to the program due to work pressure or tight schedules?",
    answer:
      "I understand that life doesn't always follow a fixed schedule. That's why I make sure your program is realistic and feasible according to your circumstances and commitments. If your schedule changes or you face difficulty staying consistent, we can discuss appropriate adjustments so you maintain your progress without losing momentum.",
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
