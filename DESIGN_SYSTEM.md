# Design System Specification — Personal Gym Trainer Website

Centralized in [`src/app/globals.css`](file:///C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/src/app/globals.css) via CSS custom properties (`:root`), Tailwind CSS v4 `@theme inline` tokens, and `@layer components` primitives, plus [`CtaButton`](file:///C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/src/components/ui/CtaButton.jsx).

Every value below is tagged with its provenance:
- **Figma MCP**: Retrieved directly from Figma Dev Mode (`get_design_context`, `get_variable_defs`).
- **Figma XML / PNG**: Measured from the `1:32` node hierarchy XML (`get_metadata`) and lossless `website-full-4096.png` / `slice1`–`slice4` PNG exports.
- **Code Baseline**: Established and visually verified in the Hero & Navbar baseline implementation (`1440×962`).
- **Provisional**: Inferred from XML geometry or PNG sampling while Figma Starter MCP rate limit blocked full node CSS inspection on Sections 3–10, or responsive rules below the desktop-only `1440px` frame.

---

## 1. Colors

| Token | Value | Role | Status |
| --- | --- | --- | --- |
| `--background` (`bg-background`) | `#1a1a1a` | Primary page canvas background | Figma MCP (`1:54`) & PNG |
| `--surface` (`bg-surface`) | `#1f1f1f` | Elevated surfaces (LogoStrip, Stat cards, Badges, Pricing cards, Testimonial card) | Provisional (Figma PNG) |
| `--surface-popover` (`bg-surface-popover`) | `#202020` | Mobile/collapsed header popover menu background | Code Baseline |
| `--foreground` (`text-foreground`) | `#ffffff` | Primary text, active headings, icons | Figma MCP & PNG |
| `--brand-red` (`bg-brand` / `text-brand`) | `#ff2332` | Primary accent (CTAs, active nav, Stat KPIs, Qual codes, featured pricing border/price, `//` quotes, FAQ icons, active dot) | Figma MCP & PNG |
| `--brand-red-hover` (`hover:bg-brand-hover`) | `#e51c2a` | CTA button hover state | Code Baseline |
| `--muted` (`text-muted`) | `#909090` | Muted body/caption copy, author credit, inactive dots, footer links & copyright (`5.65:1` on `#1a1a1a`, `5.28:1` on `#1f1f1f`) | Provisional (Figma PNG) |
| `--nav-muted` | `rgba(255, 255, 255, 0.5)` | Desktop Navbar non-active link text | Figma MCP (`1:1473`) |
| `--hero-lead-muted` | `rgba(255, 255, 255, 0.55)` | Hero lead paragraph (`text-foreground/55` preserved in Hero baseline) | Code Baseline |
| `--logo-muted` | `#aeaeae` | Monochrome partner logos over `#1f1f1f` strip | Provisional (Figma PNG) |
| `--border-subtle` (`border-border-subtle`) | `rgba(255, 255, 255, 0.25)` | Side pricing card `1px` border | Provisional (Figma PNG) |
| `--divider-subtle` (`bg-divider-subtle`) | `rgba(255, 255, 255, 0.25)` | FAQ row `1px` separator lines | Provisional (Figma PNG) |
| `--divider-footer` (`bg-divider-footer`) | `rgba(255, 255, 255, 0.5)` | Footer bottom `1px` full-rail separator (`1184px`) | Provisional (Figma PNG) |
| `--border-popover` | `rgba(255, 255, 255, 0.12)` | Mobile nav popover border | Code Baseline |
| `--brand-glow` | `rgba(255, 35, 50, 0.15)` | Radial glow peak behind Testimonials (`537×537`) & Bottom CTA (`545×545`) | Provisional (Figma PNG) |

### Gradients & Overlays
- **Hero directional black vignette** (`.hero-photo-vignette`): 3 layered linear black-to-transparent stops (`50.052%` / `93.743%` / `84.388%`) — **Figma MCP** (`1:34`).
- **Bottom cutout fade** (`.hero-bottom-fade`, `.cutout-bottom-fade`): `linear-gradient(to bottom in oklab, rgba(26, 26, 26, 0), #1a1a1a)` — **Figma MCP** (`1:54`) & **Figma XML** (`1:1515`).
- **Diagonal light beams** (`DiagonalBeams`): Translucent white (`0.05..1.0`) and red (`0.1..0.2`) `-30deg` beams — **Figma MCP** (`1:40`).
- **Watermark gradient**: `linear-gradient(to top, #ffffff 25.833%, transparent 81.439%)` at `opacity: 0.3` — **Figma MCP** (`1:51`).
- **Ambient radial glow** (`.ambient-red-glow`): `radial-gradient(circle, rgba(255, 35, 50, 0.15) 0%, transparent 70%)` — **Provisional** (sampled `#3c1c1e` over `#1a1a1a`).

---

## 2. Typography

| Role | Font Family | Size | Weight | Line Height | Letter Spacing | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Watermark (`John DOE`) | `Oxanium` (`font-display`) | `clamp(4.5rem, 15.27vw, 13.75rem)` (`220px` desktop) | `800` | `1.2` | `-2.2px` (`-0.01em`) | Figma MCP (`1:51`) |
| Hero `<h1>` | `Oxanium` (`font-display`) | `clamp(2.125rem, 1rem + 4.44vw, 5rem)` (`80px` desktop) | `800` | `1.2` | `0.02em` | Code Baseline |
| Section `<h2>` (Sections 4–9) | `--font-section-display` (aliases `Oxanium` until confirmed) | Section-scaled (`48px–64px` desktop estimate from XML box `h=60..72`) | `800` | `~1.15` | Condensed tracking | **Provisional** (condensed bold display in PNG, font family unverified via MCP) |
| Navbar Brand / Active Link / Compact CTA | `Outfit` (`font-sans`) | `1rem` (`16px`) | `700` | `1.5` (`24px`) | `0.01em` (`0.16px`) | Figma MCP (`1:1473`) |
| Navbar Link | `Outfit` (`font-sans`) | `1rem` (`16px`) | `400` | `1.5` (`24px`) | `0.01em` (`0.16px`) | Figma MCP (`1:1473`) |
| Large CTA Button | `Outfit` (`font-sans`) | `1.25rem` (`20px`) / `1.5rem` (`24px` `sm+`) | `700` | `1.2` | `0` | Code Baseline & XML (`Button` `214×74`) |
| Hero Lead & Section Editorial Body | `Outfit` (`font-sans`) | `clamp(1rem, 0.85rem + 0.5vw, 1.375rem)` (`22px` desktop) | `400` | `1.545` (`34px` line pitch) | `0` | Code Baseline & XML (`h=136` 4-line, `h=170` 5-line) |
| Section Subtitle (`Pricing`, `FAQ`) | `Outfit` (`font-sans`) | `~1.125rem` (`18px` desktop) | `400` | `1.5` | `0` | Provisional (XML `h=28` & PNG) |
| Card Labels / Titles / FAQ Body / Footer Body | `Outfit` (`font-sans`) | `0.875rem–1rem` (`14px–16px`) | `400` / `700` | `1.5` (`20px–24px`) | `0` | Provisional (XML `h=20..36` & PNG) |

**Rules enforced in CSS**: Unitless `line-height` throughout, `font-size-adjust: from-font` on `body`, `text-wrap: balance` on `.section-heading`, `text-wrap: pretty` on `.section-body`, and zero fixed block heights on text containers (use `min-block-size` so WCAG `1.4.12` text-spacing zoom never clips).

---

## 3. Layout & Spacing

### Verified Figma Spacing Scale (`get_variable_defs`, frame `1:32`)
- `--gap-xs`: `0.25rem` (`4px`)
- `--gap-sm`: `0.5rem` (`8px`)
- `--gap-lg`: `1rem` (`16px`) — CTA/card internal spacing, Footer link/icon gaps
- `--gap-2lg`: `2rem` (`32px`) — Testimonial quote-to-author gap, Footer divider margins
- `--gap-5lg`: `6rem` (`96px`) — Footer top padding (`96px`), About column spacing neighborhood (`80px`)
- `--gap-6lg`: `8rem` (`128px`) — Footer horizontal margins (`1440 - 2×128 = 1184px`)

### Breakpoints & Containers
- **Canvas breakpoint**: `desktop: 90rem` (`1440px`) — **Figma Variable** (`breakpoints/desktop: 1440`).
- **Responsive breakpoints below desktop**: `sm` (`40rem` / `640px`), `lg` (`64rem` / `1024px`, inline Navbar activation), `xl` (`80rem` / `1280px`) — **Provisional** responsive adaptations (Figma contains only `1440×6495` desktop frame).
- **Horizontal page gutters** (`.section-shell`): `20px` (`1.25rem`) mobile -> `32px` (`2rem`) tablet (`sm:`) -> centered container rails at desktop (`1440px`).
- **XML-measured desktop content rails**:
  - Wide / Footer (`--container-wide`): `1184px` (`px=128px`)
  - About (`--container-about`): `1174px` (`544.81px` media + `80px` col gap + copy)
  - Testimonials (`--container-testimonials`): `1128px` (carousel slide `911px` + `32×64` arrows)
  - Qualifications (`--container-qual`): `1102px` (`544.81px` media + `80px` col gap + copy)
  - Navbar (`--container-nav`): `1080px` (`px=180px`, `gap: 30px`)
  - Bottom CTA (`--container-cta`): `1045px`
  - Pricing Grid (`--container-pricing`): `1032px` (`3 × 302px` cards + `63px` gaps)
  - FAQ Accordion (`--container-faq`): `959px` (`px=30px` rows)
- **Vertical section rhythm on desktop (`1:32` XML)**: LogoStrip bottom to About gap `118px` (`--section-gap-sm`); major section-to-section spacing `221px–271px` (clustered around `~224px` / `--section-gap-lg`).

---

## 4. Components & Interactive States

1. **Primary CTA (`CtaButton` — [`CtaButton.jsx`](file:///C:/Users/R.F/.gemini/antigravity/scratch/personal-trainer-landing/src/components/ui/CtaButton.jsx))**
   - `compact` (`Navbar`, `Pricing`): `min-h-[2.75rem]` (`44px`), `px-4 py-[9px]`, `1rem` bold, `rounded-control` (`12px`), `#ff2332` -> hover `#e51c2a` (`min-w-[7.5625rem]` `121px` recommended when used inside Pricing cards).
   - `large` (`Hero`, `Bottom CTA`): `min-h-[4.625rem]` (`74px`), `min-w-[13.375rem]` (`214px`), `px-10 py-5`, `1.25rem` / `sm:1.5rem` bold, `rounded-control` (`12px`), `active:scale-[0.99]`.
2. **Navigation Links (`.site-header`)**: Default `opacity: 0.5`, hover/focus-visible `opacity: 1`, active `[aria-current="page"]` `font-bold text-brand opacity-100` (with underline in `forced-colors: active`), auto-collapsing via `ResizeObserver` into native `popover` drawer below inline fit width.
3. **Surfaces & Cards (`.surface-card`, `.surface-card-bordered`, `.surface-card-featured`)**: `#1f1f1f` background, `--radius-card` (`~10px`), `--shadow-card` elevation, neutral `1px solid rgba(255,255,255,0.25)` border (side Pricing cards) or `1px solid #ff2332` highlight border (featured Pricing card).
4. **Dividers (`.divider-hairline`, `.divider-footer`)**: `1px` crisp separators (`rgba(255,255,255,0.25)` for FAQ rows, `rgba(255,255,255,0.5)` for Footer bottom bar), reinforced with `GrayText` borders in `forced-colors: active`.
5. **Focus, Motion & High Contrast**:
   - `:focus-visible` `2px solid var(--brand-red)` with `outline-offset: 3px` (`4.34:1` non-text contrast on `#1a1a1a`).
   - Reduced-motion guard on smooth scroll & popover transitions.
   - Explicit `@media (forced-colors: active)` outlines/borders on CTAs, active nav, cards, and dividers.
