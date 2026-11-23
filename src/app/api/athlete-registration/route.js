import { NextResponse } from "next/server";
import { getExactPrice, isValidProgramId, isValidDurationId } from "@/data/pricing";

/**
 * Formula injection prevention helper.
 * If user-submitted text starts with spreadsheet formula symbols (=, +, -, @),
 * we neutralize it with a leading apostrophe unless it is a valid international phone number.
 */
function sanitizeSpreadsheetCell(value) {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  if (!str) return "";

  // Check if starts with potential formula trigger
  if (/^[=+\-@]/.test(str)) {
    // Preserve valid international phone numbers like +966566134464
    if (/^\+[\d\s\-()]+$/.test(str)) {
      return str;
    }
    // Prevent formula interpretation in Google Sheets
    return `'${str}`;
  }

  return str;
}

export async function POST(request) {
  try {
    const scriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbxeKBnyvfa_plBXVly2dDzDFaA2qrambB3qyKTxHslAmD2andJDZ2myCSkR6Oh5aRnk/exec";
    const apiSecret = process.env.GOOGLE_SCRIPT_SECRET;

    if (!apiSecret) {
      console.error("[athlete-registration] GOOGLE_SCRIPT_SECRET is not configured on the server.");
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error: Registration secret is missing. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 1. Basic Athlete Information Validation
    const fullName = sanitizeSpreadsheetCell(body.fullName);
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const phone = sanitizeSpreadsheetCell(body.phone);
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone || phoneDigits.length < 8) {
      return NextResponse.json(
        { success: false, error: "A valid phone / WhatsApp number is required (min 8 digits)." },
        { status: 400 }
      );
    }

    const email = sanitizeSpreadsheetCell(body.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const age = parseInt(body.age, 10);
    if (isNaN(age) || age < 16 || age > 85) {
      return NextResponse.json(
        { success: false, error: "Age must be between 16 and 85." },
        { status: 400 }
      );
    }

    const height = parseFloat(body.height);
    if (isNaN(height) || height < 120 || height > 230) {
      return NextResponse.json(
        { success: false, error: "Height must be between 120 and 230 cm." },
        { status: 400 }
      );
    }

    const weight = parseFloat(body.currentWeight);
    if (isNaN(weight) || weight < 35 || weight > 250) {
      return NextResponse.json(
        { success: false, error: "Weight must be between 35 and 250 kg." },
        { status: 400 }
      );
    }

    // 2. Program & Subscription Validation
    const program = body.program || "";
    if (!isValidProgramId(program)) {
      return NextResponse.json(
        { success: false, error: "Invalid coaching program selected." },
        { status: 400 }
      );
    }

    const duration = body.duration || "";
    if (!isValidDurationId(duration)) {
      return NextResponse.json(
        { success: false, error: "Invalid subscription duration selected." },
        { status: 400 }
      );
    }

    const isStudent = body.student === "yes";
    const isPowerlifting = program === "powerlifting";

    // Recompute approved price server-side — NEVER trust client-submitted prices
    const approvedPrice = getExactPrice(program, duration, isStudent);

    // 3. Program-Specific Validation
    if (isPowerlifting) {
      if (!body.plRpeKnowledge) {
        return NextResponse.json(
          { success: false, error: "Please indicate whether you know the RPE scale." },
          { status: 400 }
        );
      }
      if (!body.plDays) {
        return NextResponse.json(
          { success: false, error: "Please choose your preferred training days." },
          { status: 400 }
        );
      }
      if (!body.plPreviousCoach) {
        return NextResponse.json(
          { success: false, error: "Please indicate whether you have worked with a coach before." },
          { status: 400 }
        );
      }
      if (!body.plWhyRdwan || body.plWhyRdwan.trim().length < 5) {
        return NextResponse.json(
          { success: false, error: "Please tell us what made you choose Coach Rdwan." },
          { status: 400 }
        );
      }
      if (!body.plCalorieKnowledge) {
        return NextResponse.json(
          { success: false, error: "Please indicate whether you know how to calculate calories." },
          { status: 400 }
        );
      }
    } else {
      if (!body.bbGoal) {
        return NextResponse.json(
          { success: false, error: "Please select your desired fitness goal." },
          { status: 400 }
        );
      }
      if (!body.bbDays) {
        return NextResponse.json(
          { success: false, error: "Please choose your preferred training days." },
          { status: 400 }
        );
      }
      if (!body.bbWhyRdwan || body.bbWhyRdwan.trim().length < 5) {
        return NextResponse.json(
          { success: false, error: "Please tell us what made you choose Coach Rdwan." },
          { status: 400 }
        );
      }
      if (!body.bbPreviousCoach) {
        return NextResponse.json(
          { success: false, error: "Please indicate whether you have worked with a coach before." },
          { status: 400 }
        );
      }
      if (!body.bbCalorieKnowledge) {
        return NextResponse.json(
          { success: false, error: "Please indicate whether you know how to calculate calories." },
          { status: 400 }
        );
      }
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: "Confirmation statement agreement is required." },
        { status: 400 }
      );
    }

    // 4. Map to exact Google Apps Script Schema
    // Inactive fields for the selected program strictly remain empty strings
    const athlete = {
      name: fullName,
      phone: phone,
      email: email,
      age: String(age),
      height: String(height),
      weight: String(weight),
      program: program,
      duration: duration,
      student: isStudent ? "yes" : "no",
      price: String(approvedPrice),
      goal: isPowerlifting ? "" : sanitizeSpreadsheetCell(body.bbGoal || ""),
      trainingDays: isPowerlifting
        ? String(body.plDays || "")
        : String(body.bbDays || ""),
      activityLevel: isPowerlifting
        ? ""
        : sanitizeSpreadsheetCell(body.bbActivityLevel || ""),
      previousCoaching: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plPreviousCoach || "")
        : sanitizeSpreadsheetCell(body.bbPreviousCoach || ""),
      reason: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plWhyRdwan || "")
        : sanitizeSpreadsheetCell(body.bbWhyRdwan || ""),
      calorieKnowledge: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plCalorieKnowledge || "")
        : sanitizeSpreadsheetCell(body.bbCalorieKnowledge || ""),
      instagram: sanitizeSpreadsheetCell(body.instagram || ""),
      squat: isPowerlifting ? sanitizeSpreadsheetCell(body.plSquatWeight || "") : "",
      squatTechnique: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plSquatTechnique || "")
        : "",
      bench: isPowerlifting ? sanitizeSpreadsheetCell(body.plBenchWeight || "") : "",
      benchGrip: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plFingerPlacement || "")
        : "",
      deadlift: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plDeadliftWeight || "")
        : "",
      deadliftTechnique: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plDeadliftTechnique || "")
        : "",
      rpe: isPowerlifting ? sanitizeSpreadsheetCell(body.plRpeKnowledge || "") : "",
      competition: isPowerlifting
        ? sanitizeSpreadsheetCell(body.plCompetition || "")
        : "",
      notes: sanitizeSpreadsheetCell(body.additionalNotes || ""),
    };

    const scriptPayload = {
      apiSecret,
      athlete,
    };

    // 5. Secure Server-to-Server forward to Google Apps Script
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let scriptRes;
    try {
      scriptRes = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(scriptPayload),
        redirect: "follow",
        signal: controller.signal,
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error("[athlete-registration] Network or timeout error calling Google Script:", fetchErr.name);
      return NextResponse.json(
        {
          success: false,
          error: "Connection timeout or network failure reaching the registration backend. Please try again or contact via WhatsApp.",
        },
        { status: 504 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    const responseText = await scriptRes.text();
    let scriptData;
    try {
      scriptData = JSON.parse(responseText);
    } catch {
      console.error("[athlete-registration] Non-JSON response from Google Script:", responseText.slice(0, 100));
      return NextResponse.json(
        {
          success: false,
          error: "Unexpected response from registration service. Please reach out via WhatsApp.",
        },
        { status: 502 }
      );
    }

    if (scriptData.success) {
      console.log("[athlete-registration] Google Apps Script success response:", JSON.stringify(scriptData));
      return NextResponse.json({
        success: true,
        message: "Athlete registration successfully saved.",
        ...scriptData,
      });
    }

    // Backend reported failure (e.g. invalid secret or spreadsheet issue)
    console.error("[athlete-registration] Google Apps Script rejected request:", scriptData.message || "Unknown error");
    return NextResponse.json(
      {
        success: false,
        error: scriptData.message || "Unable to save registration. Please contact Coach Rdwan on WhatsApp.",
      },
      { status: scriptRes.status === 401 || scriptData.message?.includes("Unauthorized") ? 401 : 400 }
    );
  } catch (err) {
    console.error("[athlete-registration] Unexpected internal server error:", err.message);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
