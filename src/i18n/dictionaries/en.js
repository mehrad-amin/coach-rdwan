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
    subtitle: "Choose the plan that fits your goal and level",
    studentDiscount: "25% STUDENT DISCOUNT",
    currency: "SAR",
    period: "Per Month",
    desktopListLabel: "Training packages and pricing plans",
    carouselLabel: "Training packages carousel",
    prevLabel: "Previous package",
    nextLabel: "Next package",
    paginationLabel: "Select package slide",
    slideOfLabel: (index, total, name) => `${index} of ${total}: ${name}`,
    ctaAriaLabel: (cta, name, price, currency, period) =>
      `${cta} with ${name} at ${price} ${currency} ${period}`,
    plans: {
      "starter-coaching": {
        name: "Starter Coaching",
        description:
          "For anyone looking for a structured starting point and personalized training direction.",
        features: [
          "Personalized workout program",
          "Plan tailored to your goal and level",
          "Calorie and macronutrient guidance",
          "WhatsApp support for questions",
          "Guidance for building consistency",
        ],
        cta: "Get Started",
      },
      "performance-coaching": {
        name: "Performance Coaching",
        description:
          "For those wanting structured guidance, ongoing follow-up, and better training execution.",
        features: [
          "Everything included in Starter",
          "Custom workout and nutrition guidance",
          "Technique review via submitted videos",
          "Progress follow-up and plan adjustments",
          "Support for muscle gain, fat loss & strength",
        ],
        cta: "Get Started",
      },
      "elite-coaching": {
        name: "Elite Coaching",
        description:
          "For experienced lifters pursuing advanced strength goals or competition preparation.",
        features: [
          "Everything included in Performance",
          "Advanced Powerlifting-focused training",
          "Competition preparation guidance",
          "More specialized training adjustments",
          "Technique & performance development",
        ],
        cta: "Get Started",
      },
    },
  },
  calculator: {
    eyebrow: "Scientific Baseline Assessment",
    heading: "Fitness & Nutrition Calculator",
    subtitle:
      "Estimate your resting metabolic rate, daily expenditure, and macronutrient targets grounded in peer-validated clinical models.",
    paramsHeading: "Physical Parameters",
    paramsSubtitle: "Required physical measurements for metabolic modeling",
    loadSample: "Load Sample",
    reset: "Reset",
    sexLabel: "Biological Sex",
    sexAriaLabel: "Biological Sex",
    male: "Male",
    female: "Female",
    sexHelperPrefix: "Calibrates the biological resting constant (",
    sexHelperMaleConst: "+5",
    sexHelperMiddle: " for male, ",
    sexHelperFemaleConst: "-161",
    sexHelperSuffix: " for female in Mifflin–St Jeor).",
    ageLabel: "Age (Years)",
    agePlaceholder: "e.g. 30",
    heightLabel: "Height (cm)",
    heightPlaceholder: "e.g. 180",
    weightLabel: "Weight (kg)",
    weightPlaceholder: "e.g. 80",
    activityLabel: "Activity & Lifestyle Multiplier",
    activityAriaLabel: "Activity Level",
    activityHint: "Includes occupational baseline & workouts",
    activityNote:
      "Note: Multipliers already account for typical exercise expenditure. Do not add separate workout burns to prevent double-counting.",
    activityLevels: {
      sedentary: {
        title: "Sedentary",
        frequency: "< 1 session / week",
        shortDesc:
          "Desk job, seated work, minimal walking (< 5,000 steps/day). Minimal structured exercise.",
      },
      light: {
        title: "Lightly Active",
        frequency: "1–3 sessions / week",
        shortDesc:
          "Daily walking (5,000–8,000 steps), light standing work, or 1–3 light training sessions/week.",
      },
      moderate: {
        title: "Moderately Active",
        frequency: "3–5 sessions / week",
        shortDesc:
          "Active lifestyle (8,000–11,000 steps) or 3–5 moderate-to-hard resistance/cardio sessions/week.",
      },
      very_active: {
        title: "Very Active",
        frequency: "6–7 sessions / week",
        shortDesc:
          "Demanding physical day (12,000+ steps) or 6–7 intense training sessions/week.",
      },
      extremely_active: {
        title: "Extremely Active",
        frequency: "Heavy labor + daily workouts",
        shortDesc:
          "Heavy manual labor (construction/trades) combined with daily hard athletic workouts or two-a-days.",
      },
    },
    goalLabel: "Primary Transformation Goal",
    tierLabel: "Target Intensity Tier",
    goals: {
      fat_loss: {
        title: "Fat Loss",
        tagline: "Caloric Deficit",
        tiers: {
          mild: {
            label: "Mild (-10%)",
            shortDesc:
              "Gentle deficit for leaner individuals or slow body recomposition.",
          },
          moderate: {
            label: "Moderate (-15%)",
            shortDesc:
              "Recommended baseline for steady fat loss and workout performance.",
          },
          aggressive: {
            label: "Aggressive (-20%)",
            shortDesc:
              "Faster rate of fat loss; requires close monitoring to avoid fatigue and muscle loss.",
          },
        },
      },
      maintenance: {
        title: "Maintenance",
        tagline: "Energy Balance (100%)",
        tiers: {
          balanced: {
            label: "Full Balance (100%)",
            shortDesc: "Exact match to daily energy expenditure.",
          },
        },
      },
      muscle_building: {
        title: "Muscle Building",
        tagline: "Caloric Surplus",
        tiers: {
          lean: {
            label: "Lean Surplus (+5%)",
            shortDesc:
              "Conservative surplus (~100–180 kcal) to prioritize lean mass over adipose tissue.",
          },
          optimal: {
            label: "Optimal (+7.5%)",
            shortDesc:
              "Recommended sweet spot (~150–250 kcal) to support progressive overload.",
          },
          progressive: {
            label: "Aggressive (+10%)",
            shortDesc:
              "Higher surplus for hardgainers or high-volume multi-sport athletes.",
          },
        },
      },
    },
    advancedToggle: "Advanced: Body Composition & Calibration (Optional)",
    rmrModelLabel: "Resting Metabolic Rate Model",
    rmrMethods: {
      mifflin: {
        title: "Mifflin–St Jeor",
        subtitle: "Standard Population",
      },
      katch_mcardle: {
        title: "Katch–McArdle",
        subtitle: "Fat-Free Mass based",
      },
      measured: {
        title: "Measured RMR",
        subtitle: "Clinical Calorimetry",
      },
    },
    bodyFatLabel: "Body Fat Percentage (%)",
    bodyFatPlaceholder: "e.g. 15",
    bodyFatHelper:
      "Uses Fat-Free Mass (FFM) to model metabolic rate. Recommended for muscular or athletic builds with DEXA/caliper data.",
    measuredRmrLabel: "Laboratory Measured RMR (kcal/day)",
    measuredRmrPlaceholder: "e.g. 1750",
    measuredRmrHelper:
      "Direct resting metabolic rate obtained from indirect calorimetry (metabolic cart testing).",
    calibrationTitle: "Real-World Weight & Intake Calibration",
    calibrationSubtitle:
      "Calibrate true maintenance from 14–28 days of tracked intake",
    trackingDaysLabel: "Days Tracked",
    trackingDaysPlaceholder: "e.g. 21",
    avgCaloriesLabel: "Avg Calories",
    avgCaloriesPlaceholder: "e.g. 2400",
    startWeightLabel: "Start Wt (kg)",
    startWeightPlaceholder: "e.g. 81.0",
    endWeightLabel: "End Wt (kg)",
    endWeightPlaceholder: "e.g. 80.4",
    calibratedMaintenanceLabel: "Calibrated Maintenance:",
    kcalPerDayShort: "kcal/day",
    kcalUnit: "kcal",
    observedTrend: (deltaSigned, days, weeklySigned) =>
      `Observed trend: ${deltaSigned} kg over ${days} days (${weeklySigned} kg/week).`,
    vsTheoretical: (tdeeFormatted) =>
      `vs Theoretical Estimate (${tdeeFormatted} kcal):`,
    applyCalibratedLabel: "Apply calibrated maintenance as my active target",
    calibrationMessages: {
      INCOMPLETE:
        "Please enter tracking days, average daily calories, starting weight, and ending weight.",
      INSUFFICIENT_DAYS: (days) =>
        `Entered ${days} days. Reliable metabolic calibration requires at least 14 days of consistent tracking to filter out hydration and gastrointestinal shifts.`,
      WINDOW_TOO_LONG:
        "Tracking windows over 90 days encounter metabolic adaptation. Please assess the most recent 14–28 day period.",
      INVALID_INTAKE:
        "Average daily calorie intake is outside realistic tracking bounds (800–6,000 kcal).",
    },
    validation: {
      age_required: "Age is required.",
      age_under_18: "Calculator is calibrated for adults aged 18+.",
      age_over_99: "Please enter an age between 18 and 99.",
      height_required: "Height is required.",
      height_range: "Height must be between 120 and 230 cm.",
      weight_required: "Weight is required.",
      weight_range: "Weight must be between 35 and 250 kg.",
      body_fat_range: "Body fat percentage must be between 4% and 55%.",
      measured_rmr_range:
        "Measured RMR must be between 800 and 3,500 kcal/day.",
    },
    resultsHeading: "Calculated Targets",
    resultsSubtitle: "Dynamic baseline derived from your parameters",
    sourceTags: {
      mifflin: "Estimated (Mifflin–St Jeor)",
      katch_mcardle: "Estimated (Katch–McArdle)",
      measured: "Measured RMR",
      calibrated: (days) => `Personal Calibrated (${days}d Trend)`,
    },
    dailyTargetLabel: "Daily Caloric Target",
    kcalPerDay: "kcal / day",
    bmrLabel: "BMR",
    bmrSub: "kcal at rest",
    tdeeLabel: "TDEE",
    tdeeSub: "maintenance",
    bmiLabel: "BMI",
    bmiCategories: {
      Underweight: "Underweight",
      "Normal range": "Normal range",
      Overweight: "Overweight",
      "Obesity range": "Obesity range",
    },
    macrosHeading: "Macronutrient Distribution",
    macrosSum: (totalFormatted) => `~${totalFormatted} kcal sum`,
    macrosProgressAria: "Macronutrient distribution ratio",
    gramUnit: "g",
    perKgUnit: "g/kg",
    proteinLabel: "Protein",
    proteinTitle: (pct) => `Protein: ${pct}%`,
    carbsLabel: "Carbs",
    carbsSub: "Energy",
    carbsTitle: (pct) => `Carbohydrates: ${pct}%`,
    fatLabel: "Fat",
    fatSub: "Hormonal",
    fatTitle: (pct) => `Fat: ${pct}%`,
    coachStatement:
      "Metabolic equations provide an evidence-based starting point. Coach Rdwan reviews your training history, biofeedback, and lifestyle to tailor a personalized protocol.",
    applyCta: "Apply With This Plan",
    applyNote:
      "Pre-fills Coach Rdwan's coaching application with your baseline parameters.",
    emptyHeading: "Complete Your Parameters",
    emptyBody:
      "Enter your age (18+), height, and current weight on the left to reveal your calculated metabolic baseline and macronutrient distribution.",
    emptySampleCta: "Load 30-year-old active sample",
    noticeHeading: "Scientific Screening & Health Transparency",
    noticeBody1:
      "Calculations provide evidence-based estimates for screening and educational purposes, not clinical medical advice or dietary prescriptions. Calibration applies strictly to healthy adults aged 18+. Individuals who are pregnant or nursing, or who have chronic metabolic, hormonal, or cardiovascular conditions, should consult a qualified physician or registered dietitian before modifying dietary intake or training frequency.",
    noticeBody2:
      "Coach Rdwan evaluates your training history, goals, and lifestyle during onboarding to customize your training and nutrition approach.",
  },
  testimonials: {
    heading: "Hear It From Them",
    carouselLabel: "Coaching testimonials and perspectives",
    slidesLabel: "Testimonial slides",
    prevLabel: "Previous testimonial",
    nextLabel: "Next testimonial",
    slideOfLabel: (index, total, label) => `${index} of ${total}: ${label}`,
    items: [
      {
        id: "powerlifting",
        quote:
          "Training with Rdwan highlights the difference between random workouts and experience-driven coaching. His attention to detail and understanding of powerlifting make every step toward building strength more structured and purposeful.",
        label: "Powerlifting Expertise",
      },
      {
        id: "personalized-programming",
        quote:
          "What makes Rdwan's coaching stand out is his focus on creating training programs suited to each individual's level and goals. The workouts are structured, the plan is clear, and every part has a purpose.",
        label: "Personalized Training",
      },
      {
        id: "technique-guidance",
        quote:
          "Proper technique and detailed exercise feedback are among the strongest aspects of Rdwan's coaching approach. He focuses on the details that help improve movement quality and encourage more confident, informed training.",
        label: "Technique Guidance",
      },
      {
        id: "ongoing-support",
        quote:
          "Rdwan combines coaching experience with consistent guidance, focusing on giving each trainee a clear plan that supports commitment and consistency. His professional and supportive approach makes the training experience more structured and motivating.",
        label: "Ongoing Support",
      },
    ],
  },
  faq: {
    heading: "Commonly Asked Questions",
    subtitle: "I am here to help!",
    items: [
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
        `Apply for personalized fitness coaching, powerlifting training, and nutrition planning with Coach ${BRAND_NAMES.en}.`,
    },
    header: {
      backToHome: "Back to Home",
    },
    intro: {
      badge: "Coaching Application",
      title: "Let's Build Your Plan",
      description:
        `Complete this quick 4-step questionnaire so Coach ${BRAND_NAMES.en} can evaluate your baseline, identify your fitness ambitions, and tailor your coaching program.`,
    },
    steps: {
      stepOf: (current, total) => `Step ${current} of ${total}`,
      titles: [
        "Personal Info",
        "Fitness Profile",
        "Training & Lifestyle",
        "Review & Confirm",
      ],
    },
    prefillNotice: {
      tag: "Scientific Baseline Applied:",
      text: "Prefilled with your fitness calculator parameters & caloric target.",
      dismiss: "Dismiss",
    },
    nav: {
      back: "Back",
      continue: "Continue",
      submit: "Submit Application",
      submitting: "Processing...",
    },
    step1: {
      title: "Step 1: Personal Information",
      subtitle: `Tell us a little bit about yourself so Coach ${BRAND_NAMES.en} can contact you.`,
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Alex Morgan",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      phoneLabel: "WhatsApp / Phone",
      phonePlaceholder: "+966 50 000 0000",
      ageLabel: "Age (Years)",
      agePlaceholder: "e.g. 28",
      genderLabel: "Gender",
      genders: {
        male: "Male",
        female: "Female",
        other: "Other / Prefer not to say",
      },
    },
    step2: {
      title: "Step 2: Fitness Profile",
      subtitle: "Help us benchmark your physical baseline and clarify your transformation targets.",
      heightLabel: "Height (cm)",
      heightPlaceholder: "e.g. 178",
      currentWeightLabel: "Current Weight (kg)",
      currentWeightPlaceholder: "e.g. 82.5",
      targetWeightLabel: "Target Weight (kg)",
      targetWeightOptional: "(Optional)",
      targetWeightPlaceholder: "e.g. 75",
      goalLabel: "Primary Fitness Goal",
      experienceLabel: "Training Experience",
      goals: {
        weight_loss: {
          title: "Weight Loss",
          desc: "Burn fat, lean down, improve metabolic health & stamina",
        },
        muscle_building: {
          title: "Muscle Building",
          desc: "Hypertrophy, strength gain, progressive overload & mass",
        },
        body_recomp: {
          title: "Body Recomposition",
          desc: "Simultaneously lose body fat and build defined lean muscle",
        },
        general_fitness: {
          title: "General Fitness",
          desc: "Cardiovascular endurance, joint mobility & daily energy",
        },
      },
      experiences: {
        beginner: {
          title: "Beginner",
          subtitle: "< 6 months of training",
          desc: "New to structured workouts or returning after a long break",
        },
        intermediate: {
          title: "Intermediate",
          subtitle: "6 months – 2 years",
          desc: "Familiar with barbell/dumbbell basics and regular lifting",
        },
        advanced: {
          title: "Advanced",
          subtitle: "2+ years",
          desc: "Experienced with structured splits, periodization & technique",
        },
      },
    },
    step3: {
      title: "Step 3: Training & Lifestyle",
      subtitle: "Select your training logistics and chosen coaching package so we can design your schedule.",
      locationLabel: "Preferred Training Location",
      daysLabel: "Available Training Days Per Week",
      daysUnit: "Days",
      packageLabel: "Preferred Coaching Package",
      notesLabel: "Injuries, Physical Limitations or Coach Notes",
      notesOptional: "(Optional)",
      notesPlaceholder: "E.g. Past shoulder dislocation, lower back stiffness, asthma, dietary allergies...",
      locations: {
        gym: {
          title: "Gym Facility",
          desc: "Commercial or private fitness club with full equipment & free weights",
        },
        home: {
          title: "Home Gym",
          desc: "Workout from home with dumbbells, resistance bands, or bodyweight",
        },
        both: {
          title: "Both / Hybrid",
          desc: "Flexible split combining gym sessions with home functional workouts",
        },
      },
      studentDiscountNote:
        "Available on all coaching packages upon student ID verification.",
    },
    step4: {
      title: "Step 4: Review & Confirm",
      subtitle: "Review your information below before submitting your coaching application.",
      edit: "Edit",
      sections: {
        personal: "Personal Information",
        fitness: "Fitness Profile",
        training: "Training & Schedule",
        package: "Selected Package",
      },
      fields: {
        fullName: "Full Name:",
        email: "Email:",
        phone: "Phone:",
        ageGender: "Age / Gender:",
        years: "yrs",
        height: "Height:",
        currentWeight: "Current Weight:",
        targetWeight: "Target Weight:",
        goal: "Primary Goal:",
        experience: "Experience:",
        location: "Location:",
        frequency: "Frequency:",
        daysPerWeek: "days per week",
        notes: "Notes / Limitations:",
      },
      consentText:
        "I confirm that the information provided is accurate and agree to have it used for this demo booking experience.",
      demoNoticeTag: "Demo Notice:",
      demoNoticeText:
        "This is an interactive portfolio prototype. No personal data is stored in databases or transmitted to third-party services.",
    },
    success: {
      title: "Application Completed!",
      message: (name) =>
        `Thank you, ${name || "Athlete"}! Your coaching request has been simulated and successfully processed.`,
      summaryTitle: "Application Summary",
      packageLabel: "Selected Package:",
      goalLabel: "Primary Goal:",
      scheduleLabel: "Weekly Schedule:",
      contactLabel: "Contact Info:",
      daysWeekUnit: "Days/Week",
      flexible: "Flexible",
      demoNoticeTag: "Demo notice:",
      demoNoticeText:
        "This was an interactive portfolio demonstration. No personal information has been transmitted to external servers, databases, or third-party APIs.",
      returnHome: "Return to Homepage",
      submitAnother: "Submit Another Demo",
    },
    validation: {
      fullName: "Please enter your full name (minimum 2 characters).",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone or WhatsApp number (min 8 digits).",
      age: "Please enter an age between 16 and 85.",
      gender: "Please select your gender.",
      height: "Please enter a realistic height between 120 and 230 cm.",
      currentWeight: "Please enter your current weight between 35 and 250 kg.",
      targetWeight: "Target weight must be between 35 and 250 kg.",
      goal: "Please select your primary fitness goal.",
      experience: "Please select your training experience level.",
      trainingLocation: "Please select your preferred training location.",
      daysPerWeek: "Please select your available training days per week.",
      package: "Please select a coaching package.",
      consent: "Please agree to the consent statement to complete this demo application.",
    },
    footer: {
      copyright: (year) =>
        `© ${year} ${BRAND_NAMES.en}. All rights reserved. • Portfolio Demonstration Prototype`,
    },
  },
  footer: {
    brandName: "Rdwan",
    bio: "Strength and fitness coach specializing in powerlifting, bodybuilding, and athletic performance development.",
    menuTitle: "Quick Navigation",
    contactTitle: "Contact Information",
    links: {
      home: "Home",
      about: "About Coach",
      achievements: "Achievements",
      programs: "Training Programs",
      calculator: "Calorie Calculator",
      testimonials: "Testimonials",
      faq: "FAQ",
    },
    contact: {
      emailLabel: "Email",
      phoneLabel: "WhatsApp / Phone",
      instagramLabel: "Instagram",
      placeholderNotice: "Temporary placeholder pending coach confirmation",
    },
    copyright: (year) => `© ${year} Rdwan. All rights reserved.`,
    developerCredit: {
      developedBy: "Developed by",
      developerName: "Coach Rise",
      developerUrl: "https://www.instagram.com/coach-rise/",
    },
  },
};

export default en;
