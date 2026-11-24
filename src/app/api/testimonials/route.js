import { NextResponse } from "next/server";

/**
 * Formula injection prevention helper for Google Sheets cells.
 * If user-submitted text starts with spreadsheet formula symbols (=, +, -, @),
 * we neutralize it with a leading apostrophe.
 */
function sanitizeSpreadsheetCell(value) {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  if (!str) return "";

  if (/^[=+\-@]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

/**
 * Standard no-store headers to prevent cross-language or stale response caching.
 */
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

/**
 * GET /api/testimonials?lang=ar
 * GET /api/testimonials?lang=en
 *
 * Retrieves approved public reviews for the requested language only.
 *
 * Requirements:
 * - Rejects missing or invalid language values with HTTP 400.
 * - Accepts only 'ar' and 'en'.
 * - Forwards 'language' query param to Apps Script (action: 'getApprovedReviews').
 * - Independently filters returned data:
 *   1. status === "Approved" (case-insensitive)
 *   2. publicationConsent === true
 *   3. language === requestedLanguage
 * - Excludes records with missing/invalid language.
 * - Never exposes adminNotes or private fields.
 * - Returns the language field with each review.
 * - Prevents cross-language caching via no-store headers.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang");

    // 1. Strict Language Parameter Validation
    if (!lang || (lang !== "ar" && lang !== "en")) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing or invalid 'lang' parameter. Permitted values are 'ar' or 'en'.",
        },
        {
          status: 400,
          headers: NO_STORE_HEADERS,
        }
      );
    }

    const appsScriptUrl = process.env.TESTIMONIALS_APPS_SCRIPT_URL;

    // Gracefully handle unconfigured backend without simulating fake reviews
    if (!appsScriptUrl || !appsScriptUrl.trim()) {
      return NextResponse.json(
        {
          ok: true,
          reviews: [],
          configured: false,
          message: "Testimonials backend is not configured yet.",
        },
        {
          status: 200,
          headers: NO_STORE_HEADERS,
        }
      );
    }

    // Call external Google Apps Script endpoint
    const url = new URL(appsScriptUrl);
    url.searchParams.set("action", "getApprovedReviews");
    url.searchParams.set("language", lang);
    if (process.env.TESTIMONIALS_API_SECRET) {
      url.searchParams.set("apiSecret", process.env.TESTIMONIALS_API_SECRET);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[testimonials] External fetch failed with status ${res.status}`);
      return NextResponse.json(
        { ok: false, reviews: [], error: "Failed to fetch testimonials from backend." },
        {
          status: 502,
          headers: NO_STORE_HEADERS,
        }
      );
    }

    const data = await res.json();
    const rawList = Array.isArray(data) ? data : Array.isArray(data?.reviews) ? data.reviews : [];

    // Filter strictly for Approved & Consented AND matching requested language
    const sanitizedReviews = rawList
      .filter((item) => {
        const isApproved =
          String(item.status || item.Status || "").trim().toLowerCase() === "approved";
        const hasConsent =
          item.publicationConsent === true ||
          String(item.publicationConsent || item["Publication Consent"] || "").trim().toLowerCase() === "true";

        const itemLang = String(item.language || item.Language || item["Review Language"] || "")
          .trim()
          .toLowerCase();
        const isMatchingLang = itemLang === lang;

        return isApproved && hasConsent && isMatchingLang;
      })
      .map((item) => {
        const ratingNum = parseInt(item.rating || item.Rating || 5, 10);
        const validRating = !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 5;

        return {
          id: String(item.reviewId || item.id || item["Review ID"] || "").trim() || undefined,
          displayName: String(item.displayName || item.name || item["Display Name"] || "").trim(),
          rating: validRating,
          reviewText: String(item.reviewText || item.quote || item["Review Text"] || "").trim(),
          language: lang,
          submissionDate: item.submissionDate || item.date || item["Submission Date"] || undefined,
        };
      })
      .filter((item) => item.displayName && item.reviewText);

    return NextResponse.json(
      {
        ok: true,
        reviews: sanitizedReviews,
        configured: true,
      },
      {
        status: 200,
        headers: NO_STORE_HEADERS,
      }
    );
  } catch (error) {
    console.error("[testimonials] Error in GET /api/testimonials:", error);
    return NextResponse.json(
      { ok: false, reviews: [], error: "Internal server error." },
      {
        status: 500,
        headers: NO_STORE_HEADERS,
      }
    );
  }
}

/**
 * POST /api/testimonials
 * Validates and submits a new review with Status = "Pending" and active language.
 *
 * Requirements:
 * - Validate that language is strictly 'ar' or 'en'.
 * - Missing or invalid language returns HTTP 400.
 * - Do not default or infer language.
 * - Required fields: displayName (2-60 chars), rating (1-5), reviewText (10-600 chars), publicationConsent (true).
 * - Enforces status: "Pending" server-side.
 * - Forwards language in nested data object: { action: "submitReview", apiSecret, data: { ..., language } }.
 * - Prevents formula injection.
 */
export async function POST(request) {
  try {
    const appsScriptUrl = process.env.TESTIMONIALS_APPS_SCRIPT_URL;

    // Check configuration
    if (!appsScriptUrl || !appsScriptUrl.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: "Testimonials backend is not configured yet.",
          pendingConfig: true,
        },
        { status: 503 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 1. Validation: Language (strictly 'ar' or 'en')
    const rawLanguage = typeof body.language === "string" ? body.language.trim().toLowerCase() : "";
    if (!rawLanguage || (rawLanguage !== "ar" && rawLanguage !== "en")) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing or invalid 'language' field. Permitted values are 'ar' or 'en'.",
        },
        { status: 400 }
      );
    }
    const language = rawLanguage;

    // 2. Validation: Display Name (2-60 characters)
    const rawDisplayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
    if (!rawDisplayName || rawDisplayName.length < 2 || rawDisplayName.length > 60) {
      return NextResponse.json(
        { ok: false, error: "Display name must be between 2 and 60 characters." },
        { status: 400 }
      );
    }
    const displayName = sanitizeSpreadsheetCell(rawDisplayName);

    // 3. Validation: Rating (integer 1-5)
    const rating = parseInt(body.rating, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, error: "Rating must be an integer between 1 and 5." },
        { status: 400 }
      );
    }

    // 4. Validation: Review Text (10-600 characters)
    const rawReviewText = typeof body.reviewText === "string" ? body.reviewText.trim() : "";
    if (!rawReviewText || rawReviewText.length < 10 || rawReviewText.length > 600) {
      return NextResponse.json(
        { ok: false, error: "Review text must be between 10 and 600 characters." },
        { status: 400 }
      );
    }
    const reviewText = sanitizeSpreadsheetCell(rawReviewText);

    // 5. Validation: Publication Consent (strictly true)
    if (body.publicationConsent !== true) {
      return NextResponse.json(
        { ok: false, error: "Publication consent is required to submit a review." },
        { status: 400 }
      );
    }

    // Generate unique Review ID and timestamps
    const now = new Date();
    const isoDate = now.toISOString();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const reviewId = `REV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${randomSuffix}`;

    // Payload following exact 10-column Google Sheets schema:
    // A: Review ID
    // B: Submission Date
    // C: Display Name
    // D: Rating
    // E: Review Text
    // F: Publication Consent
    // G: Status ("Pending")
    // H: Admin Notes ("")
    // I: Last Updated
    // J: Review Language ('ar' or 'en')
    const reviewPayload = {
      action: "submitReview",
      apiSecret: process.env.TESTIMONIALS_API_SECRET || "",
      data: {
        reviewId,
        submissionDate: isoDate,
        displayName,
        rating,
        reviewText,
        publicationConsent: true,
        status: "Pending",
        adminNotes: "",
        lastUpdated: isoDate,
        language, // Column J: 'ar' or 'en'
      },
    };

    // Forward to Google Apps Script
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewPayload),
    });

    if (!response.ok) {
      console.error(`[testimonials] Submission failed with status ${response.status}`);
      return NextResponse.json(
        { ok: false, error: "Failed to submit review to backend spreadsheet." },
        { status: 502 }
      );
    }

    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      // Some Apps Script web apps return redirect text
    }

    if (responseData && responseData.success === false) {
      return NextResponse.json(
        { ok: false, error: responseData.error || "Backend rejected the submission." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Review submitted successfully and is pending review.",
        reviewId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[testimonials] Error in POST /api/testimonials:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
