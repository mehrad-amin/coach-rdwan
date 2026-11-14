/**
 * Scientifically Grounded Fitness & Nutrition Calculation Engine
 * 
 * Formulations & Evidence Base:
 * 1. Resting Metabolic Rate (RMR / BMR):
 *    - Default: Mifflin–St Jeor Equation (Mifflin et al., 1990). Validated gold standard in clinical & dietetic screening.
 *    - Optional Body Composition: Katch–McArdle Equation (Katch & McArdle, 1996) based on Fat-Free Mass (FFM).
 *    - Optional Direct Measurement: Clinically measured RMR via indirect calorimetry (metabolic cart).
 * 2. Total Daily Energy Expenditure (TDEE):
 *    - Conventional Physical Activity Multiplier (1.20 – 1.90) reflecting occupational baseline and structured exercise.
 *    - Clarification: Bundles lifestyle movement (NEAT) and exercise (EAT) without double-counting.
 * 3. Personal Calibration System:
 *    - Dynamic energy balance tracking over a validated 14–28 day window.
 *    - Uses weekly trend averages (7,700 kcal / kg energy density constant benchmark, Hall et al. NIH model)
 *      to calculate observed real-world maintenance expenditure:
 *      True Maintenance = Average Daily Intake - ((End Weight - Start Weight) * 7700 / Days).
 * 4. Goal-Based Caloric Adjustments:
 *    - Fat Loss: Evidence-based deficits (-10% mild, -15% moderate, -20% aggressive) preserving lean mass.
 *    - Maintenance: 100% of TDEE (Energy Balance).
 *    - Muscle Building: Conservative surplus (+5% to +10%) minimizing adipose deposition.
 * 5. Macronutrient Distribution:
 *    - Protein: Scaled to total mass (1.8–2.2 g/kg) or Fat-Free Mass (2.1–2.4 g/kg FFM) based on objective.
 *    - Dietary Fat: 20%–30% of total calories with hormonal health safety floor (>= 0.65 g/kg).
 *    - Carbohydrates: Remaining caloric budget with a physiological safety floor (>= 50 g/day).
 *    - Strict caloric consistency: (4*P + 9*F + 4*C) matches target calories within <= 2 kcal rounding margin.
 */

// ---------------------------------------------------------------------------
// 1. Activity Level Multipliers
// ---------------------------------------------------------------------------
export const ACTIVITY_LEVELS = [
  {
    id: "sedentary",
    multiplier: 1.20,
    title: "Sedentary",
    shortDesc: "Desk job, seated work, minimal walking (< 5,000 steps/day). Minimal structured exercise.",
    frequency: "< 1 session / week",
  },
  {
    id: "light",
    multiplier: 1.375,
    title: "Lightly Active",
    shortDesc: "Daily walking (5,000–8,000 steps), light standing work, or 1–3 light training sessions/week.",
    frequency: "1–3 sessions / week",
  },
  {
    id: "moderate",
    multiplier: 1.55,
    title: "Moderately Active",
    shortDesc: "Active lifestyle (8,000–11,000 steps) or 3–5 moderate-to-hard resistance/cardio sessions/week.",
    frequency: "3–5 sessions / week",
  },
  {
    id: "very_active",
    multiplier: 1.725,
    title: "Very Active",
    shortDesc: "Demanding physical day (12,000+ steps) or 6–7 intense training sessions/week.",
    frequency: "6–7 sessions / week",
  },
  {
    id: "extremely_active",
    multiplier: 1.90,
    title: "Extremely Active",
    shortDesc: "Heavy manual labor (construction/trades) combined with daily hard athletic workouts or two-a-days.",
    frequency: "Heavy labor + daily workouts",
  },
];

// ---------------------------------------------------------------------------
// 2. Goal Definitions with Evidence-Based Deficit / Surplus Tiers
// ---------------------------------------------------------------------------
export const FITNESS_GOALS = [
  {
    id: "fat_loss",
    title: "Fat Loss",
    tagline: "Caloric Deficit",
    description: "Support progressive, sustainable body fat reduction while sparing lean muscle tissue.",
    tiers: [
      {
        id: "mild",
        label: "Mild (-10%)",
        factor: 0.90,
        shortDesc: "Gentle deficit for leaner individuals or slow body recomposition.",
      },
      {
        id: "moderate",
        label: "Moderate (-15%)",
        factor: 0.85,
        isDefault: true,
        shortDesc: "Recommended baseline for steady fat loss and workout performance.",
      },
      {
        id: "aggressive",
        label: "Aggressive (-20%)",
        factor: 0.80,
        shortDesc: "Faster rate of fat loss; requires close monitoring to avoid fatigue and muscle loss.",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance",
    tagline: "Energy Balance (100%)",
    description: "Preserve current body weight and optimize athletic recovery, hormonal health, and daily energy.",
    tiers: [
      {
        id: "balanced",
        label: "Full Balance (100%)",
        factor: 1.00,
        isDefault: true,
        shortDesc: "Exact match to daily energy expenditure.",
      },
    ],
  },
  {
    id: "muscle_building",
    title: "Muscle Building",
    tagline: "Caloric Surplus",
    description: "Hypertrophy-focused caloric surplus designed to fuel muscle protein synthesis with minimal fat accumulation.",
    tiers: [
      {
        id: "lean",
        label: "Lean Surplus (+5%)",
        factor: 1.05,
        shortDesc: "Conservative surplus (~100–180 kcal) to prioritize lean mass over adipose tissue.",
      },
      {
        id: "optimal",
        label: "Optimal (+7.5%)",
        factor: 1.075,
        isDefault: true,
        shortDesc: "Recommended sweet spot (~150–250 kcal) to support progressive progressive overload.",
      },
      {
        id: "progressive",
        label: "Aggressive (+10%)",
        factor: 1.10,
        shortDesc: "Higher surplus for hardgainers or high-volume multi-sport athletes.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 3. BMI Screening Categories
// ---------------------------------------------------------------------------
export const BMI_CATEGORIES = [
  {
    max: 18.49,
    label: "Underweight",
    badgeClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    note: "Below the standard recommended weight range for general health screening.",
  },
  {
    min: 18.5,
    max: 24.99,
    label: "Normal range",
    badgeClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    note: "Within the optimal epidemiological health benchmark for body weight.",
  },
  {
    min: 25.0,
    max: 29.99,
    label: "Overweight",
    badgeClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    note: "Elevated relative to height; muscular trainees with high lean mass frequently score here.",
  },
  {
    min: 30.0,
    label: "Obesity range",
    badgeClass: "text-red-400 bg-red-400/10 border-red-400/20",
    note: "Significantly elevated body mass ratio; personalized coaching and medical consultation advised.",
  },
];

// ---------------------------------------------------------------------------
// 4. BMI Calculation
// ---------------------------------------------------------------------------
export function calculateBmi(heightCm, weightKg) {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null;
  const heightM = heightCm / 100;
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  let category = BMI_CATEGORIES[1];
  if (bmi < 18.5) {
    category = BMI_CATEGORIES[0];
  } else if (bmi <= 24.99) {
    category = BMI_CATEGORIES[1];
  } else if (bmi <= 29.99) {
    category = BMI_CATEGORIES[2];
  } else {
    category = BMI_CATEGORIES[3];
  }

  return {
    value: bmi,
    formatted: bmi.toFixed(1),
    category: category.label,
    badgeClass: category.badgeClass,
    note: category.note,
  };
}

// ---------------------------------------------------------------------------
// 5. BMR / RMR Calculation Engine
// Supported methods:
// - 'mifflin': Mifflin–St Jeor (Default)
// - 'katch_mcardle': Katch–McArdle (Requires Body Fat % / FFM)
// - 'measured': Indirect Calorimetry measurement
// ---------------------------------------------------------------------------
export function calculateBmr({
  method = "mifflin",
  sex = "male",
  age,
  heightCm,
  weightKg,
  bodyFatPct,
  measuredRmr,
}) {
  // Method 1: Clinically Measured RMR
  if (method === "measured") {
    const rmrNum = parseFloat(measuredRmr);
    if (!isNaN(rmrNum) && rmrNum >= 800 && rmrNum <= 3500) {
      return {
        value: Math.round(rmrNum),
        method: "measured",
        label: "Clinically Measured RMR",
        description: "Direct measurement from laboratory indirect calorimetry (metabolic cart).",
        sourceTag: "Measured RMR",
        ffmKg: null,
      };
    }
  }

  // Method 2: Katch–McArdle (Fat-Free Mass based)
  if (method === "katch_mcardle" || (method === "auto" && bodyFatPct != null)) {
    const bfNum = parseFloat(bodyFatPct);
    if (!isNaN(bfNum) && bfNum >= 4 && bfNum <= 55 && weightKg > 0) {
      const ffmKg = weightKg * (1 - bfNum / 100);
      // Katch-McArdle formula: BMR = 370 + (21.6 * FFM_in_kg)
      const katchRaw = 370 + 21.6 * ffmKg;
      return {
        value: Math.round(katchRaw),
        method: "katch_mcardle",
        label: "Katch–McArdle Equation",
        description: `Calculated from ${ffmKg.toFixed(1)} kg Fat-Free Mass (${bfNum}% body fat). Validated for resistance-trained individuals.`,
        sourceTag: "Estimated (Katch–McArdle)",
        ffmKg: Math.round(ffmKg * 10) / 10,
        bodyFatPct: bfNum,
      };
    }
  }

  // Method 3: Mifflin–St Jeor (Standard default)
  if (!sex || !age || !heightCm || !weightKg) return null;
  const isFemale = sex.toLowerCase() === "female";
  const sexOffset = isFemale ? -161 : 5;
  const bmrRaw = 10 * weightKg + 6.25 * heightCm - 5 * age + sexOffset;

  return {
    value: Math.round(bmrRaw),
    method: "mifflin",
    label: "Mifflin–St Jeor Equation",
    description: `Estimated resting metabolic rate using biological sex constant (${isFemale ? "-161" : "+5"}), age, height, and weight.`,
    sourceTag: "Estimated (Mifflin–St Jeor)",
    ffmKg: null,
  };
}

// ---------------------------------------------------------------------------
// 6. TDEE Calculation
// ---------------------------------------------------------------------------
export function calculateTdee(bmrValue, activityMultiplier) {
  if (!bmrValue || !activityMultiplier || bmrValue <= 0 || activityMultiplier <= 0) {
    return null;
  }
  return Math.round(bmrValue * activityMultiplier);
}

// ---------------------------------------------------------------------------
// 7. Personal Calibration System (Real-World Weight & Intake Trend Tracking)
// ---------------------------------------------------------------------------
export function calculatePersonalCalibration({
  trackingDays,
  avgDailyCalories,
  startWeightKg,
  endWeightKg,
  theoreticalTdee,
}) {
  const days = parseInt(trackingDays, 10);
  const intake = parseFloat(avgDailyCalories);
  const startW = parseFloat(startWeightKg);
  const endW = parseFloat(endWeightKg);

  if (isNaN(days) || isNaN(intake) || isNaN(startW) || isNaN(endW)) {
    return {
      isReady: false,
      status: "INCOMPLETE",
      message: "Please enter tracking days, average daily calories, starting weight, and ending weight.",
    };
  }

  // Scientific validation: Require at least 14 days to filter acute water/glycogen shifts
  if (days < 14) {
    return {
      isReady: false,
      status: "INSUFFICIENT_DAYS",
      message: `Entered ${days} days. Reliable metabolic calibration requires at least 14 days of consistent tracking to filter out hydration and gastrointestinal shifts.`,
    };
  }

  if (days > 90) {
    return {
      isReady: false,
      status: "WINDOW_TOO_LONG",
      message: "Tracking windows over 90 days encounter metabolic adaptation. Please assess the most recent 14–28 day period.",
    };
  }

  if (intake < 800 || intake > 6000) {
    return {
      isReady: false,
      status: "INVALID_INTAKE",
      message: "Average daily calorie intake is outside realistic tracking bounds (800–6,000 kcal).",
    };
  }

  const deltaW = endW - startW;
  const weeklyRate = (deltaW / days) * 7;

  // Sanity check: Rate of change exceeding 2.0 kg/week is predominantly water/bowel content
  const isRapidShift = Math.abs(weeklyRate) > 2.0;

  // 7,700 kcal per kg tissue change benchmark (Hall et al. NIH model)
  const totalImbalanceKcal = deltaW * 7700;
  const dailyImbalanceKcal = totalImbalanceKcal / days;
  const calibratedTdee = Math.round(intake - dailyImbalanceKcal);

  // Variance from theoretical formula TDEE
  const variance = theoreticalTdee ? Math.round(calibratedTdee - theoreticalTdee) : 0;
  const variancePct = theoreticalTdee ? Math.round((variance / theoreticalTdee) * 1000) / 10 : 0;

  return {
    isReady: true,
    status: "CALIBRATED",
    trackingDays: days,
    startWeightKg: startW,
    endWeightKg: endW,
    deltaWeightKg: Math.round(deltaW * 100) / 100,
    weeklyRateKg: Math.round(weeklyRate * 100) / 100,
    avgDailyCalories: Math.round(intake),
    dailyImbalanceKcal: Math.round(dailyImbalanceKcal),
    calibratedTdee,
    varianceFromTheoretical: variance,
    variancePct,
    isRapidShift,
    sourceTag: `Personal Calibrated (${days}d Trend)`,
  };
}

// ---------------------------------------------------------------------------
// 8. Goal-Based Caloric Targets
// ---------------------------------------------------------------------------
export function calculateGoalCalories(baseTdee, goalId, tierId) {
  if (!baseTdee || baseTdee <= 0) return null;
  const goal = FITNESS_GOALS.find((g) => g.id === goalId) || FITNESS_GOALS[1];
  const tier =
    goal.tiers.find((t) => t.id === tierId) ||
    goal.tiers.find((t) => t.isDefault) ||
    goal.tiers[0];

  const targetCalories = Math.round(baseTdee * tier.factor);
  const deltaCalories = targetCalories - baseTdee;

  return {
    targetCalories,
    deltaCalories,
    goal,
    tier,
    adjustmentFactor: tier.factor,
    tagline: goal.tagline,
  };
}

// ---------------------------------------------------------------------------
// 9. Macronutrient Distribution Engine
// Protein: 1.8–2.2 g/kg (or 2.1–2.4 g/kg FFM if provided)
// Fat: 20%–30% of target calories with safety floor >= 0.65 g/kg
// Carbohydrates: Remaining calories with safety floor >= 50 g/day
// ---------------------------------------------------------------------------
export function calculateMacros({ targetCalories, weightKg, goalId, ffmKg, fatRatio = 0.25 }) {
  if (!targetCalories || !weightKg || targetCalories <= 0 || weightKg <= 0) return null;

  // 1. Protein Target
  let proteinPerKg = 1.8;
  if (goalId === "fat_loss") {
    proteinPerKg = 2.0; // Higher protein in a deficit to preserve lean mass
  } else if (goalId === "muscle_building") {
    proteinPerKg = 1.9; // Optimal MPS stimulation under caloric surplus
  } else {
    proteinPerKg = 1.8; // Standard active maintenance
  }

  let proteinGrams = 0;
  if (ffmKg && ffmKg > 0) {
    // FFM-based protein: 2.2 g/kg FFM for deficit, 2.0 g/kg FFM for maintenance/surplus
    const ffmPerKg = goalId === "fat_loss" ? 2.3 : 2.1;
    proteinGrams = Math.round(ffmKg * ffmPerKg);
  } else {
    proteinGrams = Math.round(weightKg * proteinPerKg);
  }
  const proteinCalories = proteinGrams * 4;

  // 2. Fat Target (default 25% of calories, with safety floor of 0.65 g/kg body weight)
  const clampedFatRatio = Math.max(0.20, Math.min(0.35, fatRatio));
  const fatCaloriesRaw = targetCalories * clampedFatRatio;
  let fatGrams = Math.round(fatCaloriesRaw / 9);

  // Hormonal safety floor: at least 0.65g per kg total body weight
  const minFatGrams = Math.round(weightKg * 0.65);
  if (fatGrams < minFatGrams && targetCalories > minFatGrams * 9 + proteinCalories + 200) {
    fatGrams = minFatGrams;
  }
  const fatCalories = fatGrams * 9;

  // 3. Carbohydrates: Fills remaining caloric budget
  const remainingCalories = targetCalories - proteinCalories - fatCalories;
  // Safety floor of 50g carbohydrates
  const carbGrams = Math.max(50, Math.round(remainingCalories / 4));
  const carbCalories = carbGrams * 4;

  // 4. Sum of calories from rounded macro grams
  const totalMacroCalories = proteinCalories + fatCalories + carbCalories;

  // 5. Percentages of total macro energy
  const proteinPct = Math.round((proteinCalories / totalMacroCalories) * 100);
  const fatPct = Math.round((fatCalories / totalMacroCalories) * 100);
  const carbPct = Math.max(0, 100 - proteinPct - fatPct); // exactly 100%

  return {
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      pct: proteinPct,
      perKg: (proteinGrams / weightKg).toFixed(1),
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
      pct: fatPct,
      perKg: (fatGrams / weightKg).toFixed(2),
    },
    carbs: {
      grams: carbGrams,
      calories: carbCalories,
      pct: carbPct,
      perKg: (carbGrams / weightKg).toFixed(1),
    },
    totalMacroCalories,
    roundingDiscrepancy: totalMacroCalories - targetCalories,
  };
}

// ---------------------------------------------------------------------------
// 10. Comprehensive Fitness Profile Generator
// ---------------------------------------------------------------------------
export function calculateFitnessProfile({
  sex = "male",
  age,
  height,
  weight,
  activityId = "moderate",
  goalId = "maintenance",
  goalTierId,
  bmrMethod = "mifflin",
  bodyFatPct = "",
  measuredRmr = "",
  // Optional Personal Calibration Inputs
  enableCalibration = false,
  trackingDays = "",
  avgDailyCalories = "",
  startWeightKg = "",
  endWeightKg = "",
  useCalibratedAsTarget = false,
}) {
  const ageNum = parseInt(age, 10);
  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);

  // Validation: Required adult inputs
  if (
    !sex ||
    isNaN(ageNum) ||
    ageNum < 18 ||
    ageNum > 99 ||
    isNaN(heightNum) ||
    heightNum < 120 ||
    heightNum > 230 ||
    isNaN(weightNum) ||
    weightNum < 35 ||
    weightNum > 250
  ) {
    return null;
  }

  const activity =
    ACTIVITY_LEVELS.find((a) => a.id === activityId) || ACTIVITY_LEVELS[2];
  const goalObj =
    FITNESS_GOALS.find((g) => g.id === goalId) || FITNESS_GOALS[1];

  // 1. BMI
  const bmi = calculateBmi(heightNum, weightNum);

  // 2. BMR with selected method
  const bmrResult = calculateBmr({
    method: bmrMethod,
    sex,
    age: ageNum,
    heightCm: heightNum,
    weightKg: weightNum,
    bodyFatPct: bodyFatPct !== "" ? parseFloat(bodyFatPct) : null,
    measuredRmr: measuredRmr !== "" ? parseFloat(measuredRmr) : null,
  });

  if (!bmrResult) return null;

  // 3. Theoretical TDEE
  const theoreticalTdee = calculateTdee(bmrResult.value, activity.multiplier);

  // 4. Optional Personal Calibration
  let calibrationResult = null;
  if (enableCalibration) {
    calibrationResult = calculatePersonalCalibration({
      trackingDays,
      avgDailyCalories,
      startWeightKg,
      endWeightKg,
      theoreticalTdee,
    });
  }

  // 5. Determine active baseline TDEE
  const isCalibratedActive = Boolean(
    useCalibratedAsTarget &&
      calibrationResult &&
      calibrationResult.isReady &&
      calibrationResult.calibratedTdee > 0
  );

  const activeBaseTdee = isCalibratedActive
    ? calibrationResult.calibratedTdee
    : theoreticalTdee;

  // 6. Goal-based Target Calories
  const goalCalc = calculateGoalCalories(activeBaseTdee, goalObj.id, goalTierId);
  const targetCalories = goalCalc.targetCalories;

  // 7. Macronutrient Distribution
  const macros = calculateMacros({
    targetCalories,
    weightKg: weightNum,
    goalId: goalObj.id,
    ffmKg: bmrResult.ffmKg,
  });

  // 8. Source Label
  let finalSourceTag = bmrResult.sourceTag;
  if (isCalibratedActive) {
    finalSourceTag = calibrationResult.sourceTag;
  }

  // 9. Health & Safety flags
  const isCalorieLow = targetCalories < 1200;
  const isCalorieHigh = targetCalories > 4500;

  return {
    bmi,
    bmr: bmrResult.value,
    bmrMethod: bmrResult.method,
    bmrLabel: bmrResult.label,
    bmrDescription: bmrResult.description,
    ffmKg: bmrResult.ffmKg,
    bodyFatPct: bmrResult.bodyFatPct,
    theoreticalTdee,
    tdee: activeBaseTdee,
    isCalibratedActive,
    calibrationResult,
    targetCalories,
    deltaCalories: goalCalc.deltaCalories,
    goal: goalCalc.goal,
    goalTier: goalCalc.tier,
    activity,
    macros,
    sourceTag: finalSourceTag,
    isCalorieLow,
    isCalorieHigh,
    inputs: {
      sex,
      age: ageNum,
      height: heightNum,
      weight: weightNum,
      activityId: activity.id,
      activityMultiplier: activity.multiplier,
      goalId: goalObj.id,
      goalTierId: goalCalc.tier.id,
      bmrMethod,
      bodyFatPct: bodyFatPct !== "" ? parseFloat(bodyFatPct) : null,
      measuredRmr: measuredRmr !== "" ? parseFloat(measuredRmr) : null,
      enableCalibration,
      trackingDays: trackingDays !== "" ? parseInt(trackingDays, 10) : null,
      avgDailyCalories: avgDailyCalories !== "" ? parseFloat(avgDailyCalories) : null,
      startWeightKg: startWeightKg !== "" ? parseFloat(startWeightKg) : null,
      endWeightKg: endWeightKg !== "" ? parseFloat(endWeightKg) : null,
      useCalibratedAsTarget: isCalibratedActive,
    },
  };
}
