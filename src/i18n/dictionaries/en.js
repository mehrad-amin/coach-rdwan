import { BRAND_NAMES } from "@/i18n/config";

const en = {
  locale: "en",
  dir: "ltr",
  metadata: {
    titleDefault: `${BRAND_NAMES.en} | Online Powerlifting & Fitness Coaching`,
    titleTemplate: `%s | ${BRAND_NAMES.en}`,
    description:
      "Personalized online coaching with Rdwan in powerlifting, bodybuilding, strength development, fat loss, and lifestyle fitness — backed by 10+ years of training and competitive experience.",
    ogLocale: "en_US",
    siteName: `${BRAND_NAMES.en} Coaching`,
  },
  navbar: {
    brandName: BRAND_NAMES.en,
    brandAriaLabel: `${BRAND_NAMES.en} — Back to top`,
    skipToContent: "Skip to main content",
    primaryNavLabel: "Primary navigation",
    menuButton: "Menu",
    languageSwitcherLabel: "Switch language",
    ctaLabel: "Get Started",
    links: {
      home: "Home",
      about: "About",
      achievements: "Achievements",
      programs: "Programs",
      testimonials: "Testimonials",
      faq: "FAQ",
    },
  },
  hero: {
    headline: "Get Stronger. Build Your Best Body.",
    lead: "Personalized online coaching in powerlifting, muscle building, and fat loss. Backed by over 10 years of athletic experience, I'll help you reach your goals with a structured training plan and ongoing support.",
    ctaLabel: "START YOUR JOURNEY",
    watermarkText: BRAND_NAMES.en,
    portraitAlt: "Coach Rdwan adjusting his wrist wraps before lifting",
  },
  experienceMarquee: {
    sectionLabel: "Experience and Coaching Expertise",
    items: [
      {
        id: "sports-experience",
        before: "",
        accent: "10+",
        after: "YEARS OF SPORTS EXPERIENCE",
      },
      {
        id: "bodybuilding-training",
        before: "",
        accent: "8+",
        after: "YEARS OF BODYBUILDING TRAINING",
      },
      {
        id: "powerlifting-specialty",
        before: "",
        accent: "4+",
        after: "YEARS SPECIALIZING IN POWERLIFTING",
      },
      {
        id: "lifestyle-coached",
        before: "",
        accent: "50+",
        after: "PEOPLE COACHED IN LIFESTYLE FITNESS",
      },
    ],
  },
  about: {
    eyebrow: "MEET YOUR COACH",
    heading: "Experience, Dedication, and a Passion for Progress",
    imageAlt: "Coach Rdwan performing a competition squat on a powerlifting platform with spotters",
    paragraphs: [
      "I'm Rdwan. My journey in sports and bodybuilding began over 8 years ago, followed by more than 4 years specializing in powerlifting, with over 10 years of overall sports experience.",
      "I've competed in numerous local and international powerlifting events, earning placements in Bahrain, Saudi Arabia, Kuwait, and Qatar.",
      "I've also trained under leading coaches in Saudi Arabia and experienced coaches from abroad. Through my coaching, I've prepared athletes for local and international competitions, with some achieving first-place finishes and gold medals, including an Overall (Champion of Champions) gold medal.",
      "In lifestyle fitness, I've coached more than 50 people, helping them work toward their goals through fat loss and muscle development.",
      "My goal is to share my practical and scientific experience and help you reach your goals through structured training and consistent guidance.",
    ],
    statsLabel: "Coach experience and metrics",
    stats: [
      {
        id: "lifestyle-clients",
        value: "50+",
        label: "People Coached in Lifestyle Fitness",
      },
      {
        id: "sports-experience",
        value: "10+",
        label: "Years of Sports Experience",
      },
      {
        id: "bodybuilding-training",
        value: "8+",
        label: "Years of Bodybuilding Training",
      },
      {
        id: "powerlifting-specialty",
        value: "4+",
        label: "Years Specializing in Powerlifting",
      },
    ],
  },
  qualifications: {
    eyebrow: "QUALIFICATIONS & ACHIEVEMENTS",
    heading: "A Competitive Journey Built on Dedication",
    description:
      "I've competed in local and international powerlifting events, earning placements across the 66 kg and 74 kg weight categories.",
    achievementsLabel: "Rdwan's personal powerlifting competition achievements",
    achievements: [
      {
        id: "bahrain-2022",
        result: "3rd Place",
        location: "Bahrain",
        year: "2022",
        category: "66 kg",
      },
      {
        id: "saudi-2024",
        result: "2nd Place",
        location: "Saudi Arabia",
        year: "2024",
        category: "66 kg",
      },
      {
        id: "kuwait-2024",
        result: "4th Place",
        location: "Kuwait",
        year: "2024",
        category: "66 kg",
      },
      {
        id: "qatar-2026",
        result: "4th Place",
        location: "Qatar",
        year: "2026",
        category: "74 kg",
      },
    ],
    coachingLabel: "Athlete Preparation",
    coachingNote:
      "Beyond my own competitive achievements, I've prepared athletes for local and international competitions, with some earning first-place finishes and gold medals, including an Overall (Champion of Champions) gold medal.",
    imageAlt:
      "Coach Rdwan wearing headphones in focused pre-competition preparation",
  },
  pricing: {
    heading: "Training Programs",
    subtitle: "Choose the coaching program tailored to your athletic ambitions",
    studentDiscount: "20% Student Discount",
    studentPriceApplied: "20% Student Discount Applied",
    currency: "SAR",
    period: "Subscription",
    durationAriaLabel: "Select subscription duration",
    durationLabels: {
      "1_month": "1 Month",
      "3_months": "3 Months",
    },
    desktopListLabel: "Coaching programs and approved pricing plans",
    carouselLabel: "Training programs carousel",
    prevLabel: "Previous program",
    nextLabel: "Next program",
    paginationLabel: "Select program slide",
    slideOfLabel: (index, total, name) => `${index} of ${total}: ${name}`,
    ctaAriaLabel: (cta, name, price, currency, duration) =>
      `${cta} with ${name} at ${price} ${currency} (${duration})`,
    programs: {
      powerlifting: {
        name: "Powerlifting",
        badge: "Most Popular",
        description:
          "Maximal strength development, technical mastery on the big three lifts, and competition preparation.",
        features: [
          "Competition Preparation",
          "Nutrition Tracking & Weight Cutting",
          "Continuous Technique Adjustment",
          "24-Hour Inquiry Response",
        ],
        cta: "Start Now",
      },
      bodybuilding: {
        name: "Bodybuilding",
        badge: null,
        description:
          "Targeted hypertrophy, muscle definition, physique balance, and fat loss support.",
        features: [
          "Macros & Calorie Calculation",
          "Goal-Based Customized Plan",
          "Video Form Review & Correction",
          "Support for Muscle Building, Fat Loss & Strength",
        ],
        cta: "Start Now",
      },
    },
  },
  clientResults: {
    heading: "Client Results",
    subtitle: "Progress built through consistency and commitment.",
    allTab: "All",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  athleteResults: {
    eyebrow: "ATHLETE ACHIEVEMENTS & PODIUMS",
    heading: "RESULTS THAT SPEAK",
    subtitle: "Real competition achievements, podium finishes, and progress built through structured coaching.",
    carouselLabel: "Coach Rdwan athlete competition achievements gallery",
    slidesLabel: "Athlete competition slides",
    prevLabel: "Previous achievement",
    nextLabel: "Next achievement",
    slideCounter: "of",
    weightClassLabel: "Weight Class:",
    yearLabel: "Year:",
    officialEvent: "Official Competition & Championship",
    coachingNote: "Competition peaking, tailored periodization, and direct platform coaching.",
    items: [
      {
        id: "result-1",
        placementBadge: "3rd Place",
        championship: "Overpower Championship",
        achievement: "3rd Place — Overpower Championship",
        year: "2024",
        weightClass: null,
        extra: null,
        alt: "Coach Rdwan athlete holding 3rd place medal at the Overpower Championship 2024",
      },
      {
        id: "result-2",
        placementBadge: "3rd Place",
        championship: "National Ranking",
        achievement: "3rd Place — National Ranking",
        category: "Category 66 kg",
        weightClass: "66 kg",
        year: "2026",
        extra: null,
        alt: "Coach Rdwan athlete securing 3rd place national ranking in 66 kg category 2026",
      },
      {
        id: "result-3",
        placementBadge: "1st Place",
        championship: "Qatar Championship",
        achievement: "1st Place — Qatar Championship",
        year: "2026",
        weightClass: null,
        extra: "Overall SJR",
        alt: "Coach Rdwan with the athlete winning 1st place and Overall SJR at the Qatar Championship 2026",
      },
      {
        id: "result-4",
        placementBadge: "1st Place",
        championship: "Bahrain",
        achievement: "1st Place — Bahrain",
        year: "2023",
        weightClass: null,
        extra: null,
        alt: "Coach Rdwan and athlete celebrating 1st place in Bahrain 2023",
      },
      {
        id: "result-5",
        placementBadge: "1st Place",
        championship: "National Ranking",
        achievement: "1st Place — National Ranking",
        weightClass: "83 kg",
        year: "2026",
        extra: "Nutrition Supervision",
        alt: "1st place podium finish at Kingdom Nationals 2026 in 83 kg category with nutrition supervision",
      },
      {
        id: "result-6",
        placementBadge: "1st Place",
        championship: "National Ranking",
        achievement: "1st Place — National Ranking",
        weightClass: "105 kg",
        year: "2026",
        extra: null,
        alt: "Coach Rdwan athlete celebrating 1st place national ranking in 105 kg category 2026",
      },
      {
        id: "result-7",
        placementBadge: "2nd Place",
        championship: "Eastern Province Championship",
        achievement: "2nd Place — Eastern Province Championship",
        year: "2024",
        weightClass: null,
        extra: null,
        alt: "Podium ceremony for 2nd place finish at Eastern Province Championship 2024",
      },
    ],
  },
  testimonials: {
    heading: "Client Testimonials",
    carouselLabel: "Feedback and impressions on training with Coach Rdwan",
    slidesLabel: "Feedback slides",
    prevLabel: "Previous review",
    nextLabel: "Next review",
    slideOfLabel: (index, total, label) => `${index} of ${total}: ${label}`,
    items: [
      {
        id: "powerlifting",
        quote:
          "Training with Rdwan highlights the difference between random workouts and truly structured coaching. His technical precision and powerlifting depth bring immense clarity and confidence to strength progression.",
        label: "Powerlifting Expertise",
      },
      {
        id: "personalized-programming",
        quote:
          "What sets Rdwan apart is how meticulously he tailors the program to individual baselines and targets. Workouts are structured, the roadmap is clear, and every block serves a deliberate purpose.",
        label: "Tailored Programming",
      },
      {
        id: "technique-guidance",
        quote:
          "His focus on technical execution and detailed video analysis is phenomenal. He spots subtle biomechanical details that dramatically improve safety, efficiency, and lifting confidence.",
        label: "Technique Guidance",
      },
      {
        id: "ongoing-support",
        quote:
          "Rdwan combines elite competitive experience with dedicated mentorship. His steady accountability and prompt feedback make the training experience motivating, structured, and consistent.",
        label: "Consistent Support",
      },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    subtitle: "I'm here to help!",
    items: [
      {
        id: "online-coaching",
        question: "Is coaching with Rdwan completely online?",
        answer:
          "Yes, all coaching is conducted online. You receive a personalized training plan tailored to your goals and baseline, with ongoing guidance and communication to ensure steady progress.",
      },
      {
        id: "beginners",
        question: "Can beginners join the coaching program?",
        answer:
          "Absolutely. Programs are designed around your current experience level, whether you're completely new to lifting or returning after a break, ensuring safe and progressive development.",
      },
      {
        id: "training-goals",
        question: "What goals can I achieve through coaching?",
        answer:
          "You can work toward building maximal strength, gaining lean muscle, cutting body fat, or improving overall athletic conditioning with a program customized to your lifestyle.",
      },
      {
        id: "powerlifting",
        question: "Do you offer specialized powerlifting coaching?",
        answer:
          "Yes. Specialized powerlifting programming is available, focusing on strength development, technique mastery on the squat, bench press, and deadlift, and optional meet preparation.",
      },
      {
        id: "calories-nutrition",
        question: "Does coaching include calorie and nutrition guidance?",
        answer:
          "Yes. Your daily caloric targets and macronutrient distributions are calculated and adjusted to support your primary objective, whether building muscle, losing fat, or peaking performance.",
      },
      {
        id: "exercise-technique",
        question: "How is exercise technique reviewed and corrected?",
        answer:
          "You submit training videos of your key working sets. Coach Rdwan provides detailed feedback, cues, and adjustments to improve biomechanics, efficiency, and lifting safety.",
      },
      {
        id: "support-communication",
        question: "How do I communicate with Coach Rdwan during training?",
        answer:
          "Direct communication is handled via WhatsApp for ongoing support, check-ins, answering questions, and resolving any training challenges as they arise.",
      },
      {
        id: "student-discount",
        question: "Is there a student discount available?",
        answer:
          "Yes, a 20% student discount is available across coaching programs upon verification of student status.",
      },
    ],
  },
  cta: {
    heading: "READY TO START YOUR TRAINING JOURNEY?",
    description:
      "Whether your goal is to build strength, gain muscle, or lose fat, I'm here to help you with a personalized training plan and ongoing guidance to reach your goals.",
    buttonLabel: "START YOUR JOURNEY",
    imageAlt: `Coach ${BRAND_NAMES.en} ready to begin your coaching journey`,
  },
  booking: {
    metadata: {
      title: `Apply for Coaching | ${BRAND_NAMES.en}`,
      description:
        `Apply for specialized Powerlifting or Bodybuilding coaching with Coach ${BRAND_NAMES.en}.`,
    },
    header: {
      backToHome: "Back to Home",
    },
    intro: {
      badge: "Coaching Application",
      title: "Let's Build Your Training Plan",
      description:
        `Complete this structured questionnaire so Coach ${BRAND_NAMES.en} can evaluate your physical baseline and build your custom coaching program.`,
    },
    steps: {
      stepOf: (current, total) => `Step ${current} of ${total}`,
      titles: [
        "Basic Athlete Info",
        "Program & Plan",
        "Specialized Questionnaire",
        "Review & Confirm",
      ],
    },
    nav: {
      back: "Back",
      continue: "Continue",
      submit: "Submit Application",
      submitting: "Submitting...",
      submitError:
        "An error occurred while submitting your application. Please check your connection and try again, or reach out directly on WhatsApp.",
    },
    step1: {
      title: "Step 1: Basic Athlete Information",
      subtitle: `Enter your contact details and physical baseline so Coach ${BRAND_NAMES.en} can review your application.`,
      contactHeading: "Contact Details",
      physicalHeading: "Physical Baseline",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Alex Morgan",
      phoneLabel: "WhatsApp Phone Number",
      phonePlaceholder: "+966 50 000 0000",
      emailLabel: "Email (Gmail preferred)",
      emailPlaceholder: "you@gmail.com",
      ageLabel: "Age",
      agePlaceholder: "e.g. 24",
      heightLabel: "Height (cm)",
      heightPlaceholder: "e.g. 178",
      weightLabel: "Current Weight (kg)",
      weightPlaceholder: "e.g. 82.5",
    },
    step2: {
      title: "Step 2: Program & Subscription",
      subtitle: "Choose your specialized program, subscription duration, and student discount status.",
      programLabel: "Selected Program",
      durationLabel: "Subscription Duration",
      studentLabel: "Are you a student?",
      studentYes: "Yes",
      studentNo: "No",
      studentDiscountTag: "20% Student Discount Active",
      summaryHeading: "Approved Plan Summary",
      priceLabel: "Approved Price:",
    },
    step3: {
      title: "Step 3: Program Questionnaire",
      subtitlePowerlifting:
        "Technical powerlifting questions to assess your barbell lifts, technique, and strength baseline.",
      subtitleBodybuilding:
        "Custom questions to establish your physique goals, routine, and training split.",
      // Powerlifting questions
      plSquatWeightLabel: "Highest weight lifted in Squat?",
      plSquatWeightPlaceholder: "Weight in kg (optional)",
      plSquatTechniqueLabel: "Squat Technique",
      plBenchWeightLabel: "Highest weight lifted in Bench Press?",
      plBenchWeightPlaceholder: "Weight in kg (optional)",
      plFingerPlacementLabel: "Which finger on the ring?",
      plFingerPlacementPlaceholder: "e.g. Pinky / Ring / Index finger",
      plDeadliftWeightLabel: "Highest weight lifted in Deadlift?",
      plDeadliftWeightPlaceholder: "Weight in kg (optional)",
      plDeadliftTechniqueLabel: "Deadlift Technique",
      plRpeKnowledgeLabel: "Do you know the RPE scale?",
      plRpeYes: "Yes, I know it",
      plRpeNo: "No, I don't",
      plDaysLabel: "How many days per week do you prefer to train?",
      plPreviousCoachLabel: "Have you worked with a coach before?",
      plWhyRdwanLabel: "What made you choose me as your coach?",
      plWhyRdwanPlaceholder: "Share why you selected Coach Rdwan and what you aim to achieve...",
      plCalorieKnowledgeLabel: "Do you know how to calculate your calories?",
      plCompetitionLabel: "Have you ever competed in championships?",
      // Bodybuilding questions
      bbGoalLabel: "Desired Goal?",
      bbGoalFatLoss: "Fat Loss",
      bbGoalMuscle: "Building Muscle Mass",
      bbDaysLabel: "How many days per week do you prefer to train?",
      bbActivityLabel: "Activity Level",
      bbActivitySedentary: "Sedentary",
      bbActivityModerate: "Moderately Active",
      bbActivityActive: "Active",
      bbWhyRdwanLabel: "What made you choose me as your coach?",
      bbWhyRdwanPlaceholder: "Share why you selected Coach Rdwan and what physique target you have...",
      bbPreviousCoachLabel: "Have you worked with a coach before?",
      bbCalorieKnowledgeLabel: "Do you know how to calculate your calories?",
      // Shared / Additional questions
      instagramLabel: "Instagram account (if available)",
      instagramPlaceholder: "@username (optional)",
      additionalNotesLabel: "Write any additional details that could help me understand your situation better...",
      additionalNotesPlaceholder: "Any extra context about your schedule, recovery, or injuries (optional)...",
      yes: "Yes",
      no: "No",
      optionalTag: "(Optional)",
    },
    step4: {
      title: "Step 4: Review & Confirm",
      subtitle: "Verify your application details before submitting to Coach Rdwan.",
      edit: "Edit",
      sections: {
        personal: "Basic Athlete Information",
        subscription: "Program & Subscription",
        questionnaire: "Specialized Questionnaire Answers",
        additional: "Additional Notes",
      },
      fields: {
        fullName: "Full Name:",
        phone: "WhatsApp:",
        email: "Email:",
        age: "Age:",
        height: "Height:",
        currentWeight: "Current Weight:",
        program: "Selected Program:",
        duration: "Duration:",
        studentStatus: "Student:",
        price: "Approved Price:",
      },
      consentText:
        "I confirm that all entered information is accurate and I am ready to begin coaching with Coach Rdwan.",
      demoNoticeTag: "Application Notice:",
      demoNoticeText:
        "Your coaching application will be formatted and prepared directly for review by Coach Rdwan.",
    },
    success: {
      title: "Application Submitted Successfully!",
      message: (name) =>
        `Thank you, ${name || "Athlete"}! Your application has been received and Coach Rdwan will follow up with you on WhatsApp shortly.`,
      summaryTitle: "Application Summary",
      programLabel: "Program:",
      durationLabel: "Duration:",
      priceLabel: "Total Price:",
      contactLabel: "Contact Info:",
      returnHome: "Return to Home",
      submitAnother: "Submit Another Application",
    },
    validation: {
      fullName: "Please enter your full name (minimum 2 characters).",
      phone: "Please enter a valid WhatsApp phone number (min 8 digits).",
      email: "Please enter a valid email address.",
      age: "Please enter a valid age between 16 and 85.",
      height: "Please enter a valid height between 120 and 230 cm.",
      currentWeight: "Please enter your current weight between 35 and 250 kg.",
      program: "Please select a coaching program.",
      duration: "Please select a subscription duration.",
      student: "Please specify your student status.",
      // Powerlifting validation
      rpeKnowledge: "Please indicate whether you know the RPE scale.",
      plDays: "Please choose your preferred training days (3, 4, or 5).",
      plPreviousCoach: "Please indicate whether you have worked with a coach before.",
      plWhyRdwan: "Please tell us what made you choose Coach Rdwan.",
      plCalorieKnowledge: "Please indicate whether you know how to calculate calories.",
      // Bodybuilding validation
      bbGoal: "Please select your desired goal (Fat Loss or Building Muscle Mass).",
      bbDays: "Please choose your preferred training days (3, 4, or 5).",
      bbWhyRdwan: "Please tell us what made you choose Coach Rdwan.",
      bbPreviousCoach: "Please indicate whether you have worked with a coach before.",
      bbCalorieKnowledge: "Please indicate whether you know how to calculate calories.",
      consent: "Please agree to the confirmation statement to submit.",
    },
    footer: {
      copyright: (year) =>
        `© ${year} ${BRAND_NAMES.en}. All rights reserved.`,
    },
  },
  footer: {
    brandName: BRAND_NAMES.en,
    bio: "Strength and fitness coach specializing in powerlifting, bodybuilding, and athletic performance development.",
    menuTitle: "Quick Navigation",
    contactTitle: "Contact Information",
    links: {
      home: "Home",
      about: "About Coach",
      achievements: "Achievements",
      programs: "Training Programs",
      testimonials: "Testimonials",
      faq: "FAQ",
    },
    contact: {
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      instagramLabel: "Instagram",
    },
    copyright: (year) => `© ${year} ${BRAND_NAMES.en}. All rights reserved.`,
    developerCredit: {
      developedBy: "Developed by",
      developerName: "Coach Rise",
      developerUrl: "https://www.instagram.com/coach-rise/",
    },
  },
};

export default en;
