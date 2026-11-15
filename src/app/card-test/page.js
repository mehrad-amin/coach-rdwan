"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

function subscribeWindow(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getWindowSnapshot() {
  return JSON.stringify({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    dpr: window.devicePixelRatio || 1,
    isSamsung: navigator.userAgent.includes("SamsungBrowser"),
    isChrome: navigator.userAgent.includes("Chrome"),
  });
}

function getServerSnapshot() {
  return JSON.stringify({
    viewportWidth: 360,
    viewportHeight: 800,
    dpr: 2,
    isSamsung: false,
    isChrome: true,
  });
}

export default function CardDiagnosticTestPage() {
  const windowData = useSyncExternalStore(
    subscribeWindow,
    getWindowSnapshot,
    getServerSnapshot
  );
  const info = JSON.parse(windowData);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-foreground p-4 sm:p-8 font-sans pb-24">
      {/* Header & Device Metadata */}
      <header className="max-w-4xl mx-auto mb-10 pb-6 border-b border-white/10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-wider font-semibold text-brand hover:underline"
          >
            &larr; Back to Main Site
          </Link>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20 font-mono">
            ISOLATED DIAGNOSTIC ROUTE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-foreground">
          Card Rendering Diagnostic Lab
        </h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          This isolated diagnostic page isolates individual CSS rendering properties (borders,
          backgrounds, shadows, opacity, radii, overflow, and subpixel transforms) without
          modifying any production website components. Record this page on the physical Samsung
          Galaxy A21s using the native screen recorder to pinpoint which exact property combination
          triggers video recording artifacts.
        </p>

        {/* Live Device Info Bar */}
        <div className="mt-4 p-3 rounded-xl bg-[#141414] border border-white/10 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 text-muted">
          <div>
            <span className="text-foreground font-semibold">Viewport:</span>{" "}
            {info.viewportWidth} &times; {info.viewportHeight}px
          </div>
          <div>
            <span className="text-foreground font-semibold">DPR:</span> {info.dpr}
          </div>
          <div>
            <span className="text-foreground font-semibold">Physical:</span>{" "}
            {Math.round(info.viewportWidth * info.dpr)} &times;{" "}
            {Math.round(info.viewportHeight * info.dpr)}px
          </div>
          <div>
            <span className="text-foreground font-semibold">Engine:</span>{" "}
            {info.isSamsung ? "Samsung Internet" : info.isChrome ? "Chrome Mobile" : "WebView/Other"}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {/* =========================================================================
            SECTION 1: CORE TEST VARIANTS (TESTS A THROUGH H)
           ========================================================================= */}
        <section>
          <div className="mb-4">
            <span className="text-xs font-display font-bold text-brand uppercase tracking-wider">
              Group 1
            </span>
            <h2 className="text-xl font-display font-bold text-foreground">
              Core Card Rendering Variants (Tests A &ndash; H)
            </h2>
            <p className="text-xs text-muted mt-1">
              Standard 320px &times; 130px cards systematically toggling background, border,
              shadow, and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Test A: Plain Solid Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST A &mdash; Plain Solid Card
              </span>
              <p className="text-[11px] text-muted mb-3">
                Opaque dark bg (#1c1c1c), solid 1px red border (#ff2332), rounded-xl, no shadow,
                no transparency.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test A Sample</div>
                <div className="text-xs text-muted mt-1">Solid #1c1c1c + 1px #ff2332</div>
              </div>
            </div>

            {/* Test B: Background Without Border */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST B &mdash; Background Without Border
              </span>
              <p className="text-[11px] text-muted mb-3">
                Same solid dark bg (#1c1c1c), rounded-xl, NO border, no shadow.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "none",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test B Sample</div>
                <div className="text-xs text-muted mt-1">Solid #1c1c1c + No Border</div>
              </div>
            </div>

            {/* Test C: Border Without Background */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST C &mdash; Border Without Background
              </span>
              <p className="text-[11px] text-muted mb-3">
                Transparent background, solid 1px red border (#ff2332), rounded-xl, no shadow.
              </p>
              <div
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #ff2332",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test C Sample</div>
                <div className="text-xs text-muted mt-1">Transparent BG + 1px #ff2332</div>
              </div>
            </div>

            {/* Test D: Border and Background */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST D &mdash; Border and Background
              </span>
              <p className="text-[11px] text-muted mb-3">
                Baseline card with solid #1c1c1c + 1px solid #ff2332 + rounded-xl (comparative control).
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test D Sample</div>
                <div className="text-xs text-muted mt-1">Solid #1c1c1c + 1px #ff2332</div>
              </div>
            </div>

            {/* Test E: Border, Background and Shadow */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST E &mdash; Border, Background &amp; Glow Shadow
              </span>
              <p className="text-[11px] text-muted mb-3">
                Same as Test D + existing website red glow: box-shadow 0 0 15px rgba(255,35,50,0.15).
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "0.75rem",
                  boxShadow: "0 0 15px rgba(255, 35, 50, 0.15)",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test E Sample</div>
                <div className="text-xs text-muted mt-1">Solid BG + 1px Border + Red Glow</div>
              </div>
            </div>

            {/* Test F: Semi-transparent Background */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST F &mdash; Semi-transparent Background &amp; Shadow
              </span>
              <p className="text-[11px] text-muted mb-3">
                Existing website selected-state background: color-mix 10% red over #1c1c1c + red glow.
              </p>
              <div
                style={{
                  backgroundColor: "color-mix(in srgb, #ff2332 10%, #1c1c1c)",
                  border: "1px solid #ff2332",
                  borderRadius: "0.75rem",
                  boxShadow: "0 0 15px rgba(255, 35, 50, 0.15)",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test F Sample</div>
                <div className="text-xs text-muted mt-1">color-mix 10% red + 1px Border + Glow</div>
              </div>
            </div>

            {/* Test G: Original Featured Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST G &mdash; Original Featured Card
              </span>
              <p className="text-[11px] text-muted mb-3">
                Existing .surface-card-featured token: #1f1f1f surface, 1px brand-red border, shadow-card.
              </p>
              <div
                style={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #ff2332",
                  borderRadius: "0.625rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test G Sample</div>
                <div className="text-xs text-muted mt-1">surface-card-featured (1px border)</div>
              </div>
            </div>

            {/* Test H: Original Standard Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                TEST H &mdash; Original Standard Card
              </span>
              <p className="text-[11px] text-muted mb-3">
                Existing .surface-card-bordered token: #1f1f1f surface, 1px rgba(255,255,255,0.25) border.
              </p>
              <div
                style={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  borderRadius: "0.625rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                  padding: "1rem",
                  minHeight: "100px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Test H Sample</div>
                <div className="text-xs text-muted mt-1">surface-card-bordered (Neutral 1px border)</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: ADDITIONAL RENDERING EXPERIMENTS
           ========================================================================= */}
        <section>
          <div className="mb-4">
            <span className="text-xs font-display font-bold text-brand uppercase tracking-wider">
              Group 2
            </span>
            <h2 className="text-xl font-display font-bold text-foreground">
              Single-Variable Rendering Experiments
            </h2>
            <p className="text-xs text-muted mt-1">
              Changing exactly one CSS property at a time to isolate the trigger mechanism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Experiment 1: Border Radius vs Square Corners */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 1A &mdash; Square Corners (radius: 0)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Tests if GPU antialiasing on corner curves causes the border desaturation.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "0px",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">100% Square Corner (0px)</div>
                <div className="text-xs text-muted mt-1">Straight 90&deg; edges, zero curvature</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 1B &mdash; Rounded Corners (radius: 12px)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Exact matching card with standard border-radius: 12px for direct comparison.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "12px",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">Rounded Corners (12px)</div>
                <div className="text-xs text-muted mt-1">Standard circular arc curvature</div>
              </div>
            </div>

            {/* Experiment 2: Overflow Hidden vs Visible Overflow */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 2A &mdash; Overflow Visible
              </span>
              <p className="text-[11px] text-muted mb-3">
                Normal box clipping. Border is rendered on element outer perimeter without stencil mask.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "12px",
                  overflow: "visible",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">overflow: visible</div>
                <div className="text-xs text-muted mt-1">Standard outer border stroke</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 2B &mdash; Overflow Hidden (Clips Children)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Forces a hardware clip path / stencil mask in Chromium compositor on Android.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "12px",
                  overflow: "hidden",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">overflow: hidden</div>
                <div className="text-xs text-muted mt-1">Hardware stencil clipping layer active</div>
              </div>
            </div>

            {/* Experiment 3: Hardware Compositing Transform */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 3A &mdash; Static Positioning (No Transform)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Normal CPU/GPU flow without forcing an independent compositor tile.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "12px",
                  transform: "none",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">transform: none</div>
                <div className="text-xs text-muted mt-1">Normal document compositor plane</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 3B &mdash; GPU Layer Isolation (translateZ: 0)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Forces Chrome to promote this card to its own dedicated GPU hardware overlay tile.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "12px",
                  transform: "translateZ(0)",
                  willChange: "transform",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">transform: translateZ(0)</div>
                <div className="text-xs text-muted mt-1">Dedicated GPU compositing layer</div>
              </div>
            </div>

            {/* Experiment 4: CSS Border vs Inset Box-Shadow */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 4A &mdash; Standard CSS Border (1px solid)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Drawn using native CSS border stroke rendering pipeline.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "12px",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">border: 1px solid #ff2332</div>
                <div className="text-xs text-muted mt-1">Native CSS border pipeline</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 4B &mdash; Inset Box-Shadow (No Border)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Simulates border via inset shadow: box-shadow: inset 0 0 0 1px #ff2332.
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "none",
                  boxShadow: "inset 0 0 0 1px #ff2332",
                  borderRadius: "12px",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">box-shadow: inset 0 0 0 1px</div>
                <div className="text-xs text-muted mt-1">Shadow rasterizer replaces border stroke</div>
              </div>
            </div>

            {/* Experiment 5: CSS Border vs CSS Outline */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 5A &mdash; CSS Outline (-1px offset)
              </span>
              <p className="text-[11px] text-muted mb-3">
                Uses outline: 1px solid #ff2332 + outline-offset: -1px (independent outline shader).
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "none",
                  outline: "1px solid #ff2332",
                  outlineOffset: "-1px",
                  borderRadius: "12px",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">outline: 1px solid #ff2332</div>
                <div className="text-xs text-muted mt-1">Browser outline rasterization path</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">
                EXP 5B &mdash; Dual-Stroke Edge Reinforcement
              </span>
              <p className="text-[11px] text-muted mb-3">
                1px border + inset 0 0 0 0.5px shadow (reinforces outer and inner subpixel edge).
              </p>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  boxShadow: "inset 0 0 0 0.5px #ff2332",
                  borderRadius: "12px",
                  padding: "1rem",
                  minHeight: "90px",
                }}
              >
                <div className="font-semibold text-sm text-foreground">1px Border + 0.5px Inset Glow</div>
                <div className="text-xs text-muted mt-1">Prevents subpixel hairline erosion</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: BORDER WIDTH LADDER (1px to 3px)
           ========================================================================= */}
        <section>
          <div className="mb-4">
            <span className="text-xs font-display font-bold text-brand uppercase tracking-wider">
              Group 3
            </span>
            <h2 className="text-xl font-display font-bold text-foreground">
              Border Width Ladder Comparison (1px &ndash; 3px)
            </h2>
            <p className="text-xs text-muted mt-1">
              Direct ladder to identify at which exact physical pixel thickness the YUV 4:2:0
              hardware encoder stops quantizing the border to gray.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">1.0px Width</span>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1px solid #ff2332",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-bold text-foreground">1.0px Border</div>
                <div className="text-[10px] text-muted mt-1">2 physical px (DPR 2)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">1.5px Width</span>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "1.5px solid #ff2332",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-bold text-foreground">1.5px Border</div>
                <div className="text-[10px] text-muted mt-1">3 physical px (DPR 2)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">2.0px Width</span>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "2px solid #ff2332",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-bold text-foreground">2.0px Border</div>
                <div className="text-[10px] text-muted mt-1">4 physical px (DPR 2)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-brand block mb-1">3.0px Width</span>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  border: "3px solid #ff2332",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-bold text-foreground">3.0px Border</div>
                <div className="text-[10px] text-muted mt-1">6 physical px (DPR 2)</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: NEUTRAL GRAY & UNSELECTED BORDER ANALYSIS
           ========================================================================= */}
        <section>
          <div className="mb-4">
            <span className="text-xs font-display font-bold text-brand uppercase tracking-wider">
              Group 4
            </span>
            <h2 className="text-xl font-display font-bold text-foreground">
              Neutral Gray &amp; Unselected Border Analysis
            </h2>
            <p className="text-xs text-muted mt-1">
              Investigating why unselected cards across Booking Steps 1&ndash;4, Testimonials,
              and Calculator also exhibit border splitting or fading.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-foreground block mb-1">
                border-white/10 (1px)
              </span>
              <p className="text-[10px] text-muted mb-2">Calculator &amp; Booking unselected</p>
              <div
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-semibold text-foreground">white/10 Border</div>
                <div className="text-[10px] text-muted mt-1">rgba(255,255,255,0.10)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-foreground block mb-1">
                border-white/20 (1px)
              </span>
              <p className="text-[10px] text-muted mb-2">Qualifications &amp; About cards</p>
              <div
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid rgba(255, 255, 255, 0.20)",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-semibold text-foreground">white/20 Border</div>
                <div className="text-[10px] text-muted mt-1">rgba(255,255,255,0.20)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-foreground block mb-1">
                border-white/30 (1px)
              </span>
              <p className="text-[10px] text-muted mb-2">Hover &amp; Focus states</p>
              <div
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid rgba(255, 255, 255, 0.30)",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-semibold text-foreground">white/30 Border</div>
                <div className="text-[10px] text-muted mt-1">rgba(255,255,255,0.30)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-[#141414]">
              <span className="text-xs font-mono font-bold text-foreground block mb-1">
                Opaque Solid Gray (1px)
              </span>
              <p className="text-[10px] text-muted mb-2">Solid #333333 (No alpha)</p>
              <div
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid #333333",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  minHeight: "80px",
                }}
              >
                <div className="text-xs font-semibold text-foreground">Solid #333333</div>
                <div className="text-[10px] text-muted mt-1">Zero alpha channel</div>
              </div>
            </div>
          </div>
        </section>

        {/* Physical Device Recording Instructions */}
        <section className="p-5 rounded-2xl bg-[#141414] border border-brand/30 text-xs space-y-3 font-sans">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-foreground font-bold">
              !
            </span>
            <h3 className="font-display font-bold text-sm uppercase text-brand tracking-wide">
              Physical Device Recording Protocol (Samsung Galaxy A21s)
            </h3>
          </div>
          <ol className="list-decimal pl-5 space-y-2 text-muted leading-relaxed">
            <li>
              <strong className="text-foreground">Open this URL directly:</strong> Navigate to{" "}
              <code className="px-1.5 py-0.5 rounded bg-black/40 text-brand font-mono">/card-test</code>{" "}
              on the Samsung Galaxy A21s in Chrome or Samsung Internet.
            </li>
            <li>
              <strong className="text-foreground">Record stationary frames:</strong> Start the native
              screen recorder. Pause for 2 seconds on Group 1 (Tests A&ndash;D), then scroll down and
              pause for 2 seconds on Group 2 and Group 3.
            </li>
            <li>
              <strong className="text-foreground">Key Diagnostic Comparison Points:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>
                  <strong className="text-foreground">Test A vs Test B vs Test C:</strong> Does the
                  border disappear when background is solid (A) vs when background is transparent (C)?
                </li>
                <li>
                  <strong className="text-foreground">EXP 1A vs EXP 1B:</strong> Does the square card
                  (1A) retain solid borders on all 4 sides while the rounded card (1B) exhibits gray
                  Top/Left edges?
                </li>
                <li>
                  <strong className="text-foreground">EXP 4A vs EXP 4B:</strong> Does inset box-shadow
                  (4B) prevent edge fading compared to standard border (4A)?
                </li>
                <li>
                  <strong className="text-foreground">Border Width Ladder:</strong> At which step
                  (1.0px, 1.5px, 2.0px, 3.0px) does the edge become 100% solid and uniform?
                </li>
              </ul>
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
