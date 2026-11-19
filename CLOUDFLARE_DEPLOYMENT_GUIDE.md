# Cloudflare Deployment Guide — Rdwan Fitness Website

This guide provides complete, step-by-step instructions for deploying the **Rdwan Fitness Website** to **Cloudflare** using your GitHub repository as the continuous deployment source.

---

## Overview & Architecture

- **Project**: Rdwan Fitness Website (`rdwan-fitness-website`)
- **Framework**: Next.js 16.4.6 (App Router, Turbopack)
- **UI & Styling**: React 19.3.0, Tailwind CSS v4, Lucide React
- **Architecture**: Next.js running on **Cloudflare Workers** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (Official Next.js Cloudflare adapter)
- **Bilingual Support**: Dynamic server-side cookies detection (`ar` Arabic RTL default / `en` English LTR)

---

## Part 1: What Has Already Been Prepared

The repository is **100% configured and pre-tested** for Cloudflare Workers deployment:

1. **Adapter Installed**:
   - `@opennextjs/cloudflare` (^1.20.17) installed as devDependency.
   - `wrangler` (^4.165.0) installed for Cloudflare build, preview, and deployment tooling.

2. **Configuration Files Created**:
   - `wrangler.jsonc`: Cloudflare Workers configuration file specifying:
     - `name`: `"rdwan-fitness-website"`
     - `main`: `".open-next/worker.js"`
     - `compatibility_flags`: `["nodejs_compat"]` (Required for Node.js APIs like crypto, async_hooks, buffer, and Next.js dynamic cookies/headers)
     - `compatibility_date`: `"2024-12-30"` (or later)
     - `assets`: `{ "directory": ".open-next/assets", "binding": "ASSETS" }` (Static edge assets)
   - `open-next.config.ts`: OpenNext configuration defining the Cloudflare adapter build target.

3. **Next.js Image Optimization**:
   - In `next.config.mjs`, `images: { unoptimized: true }` is enabled.
   - All static images in `/public` are served directly via Cloudflare's high-speed global edge network without requiring an external Node.js image optimization server or paid Cloudflare Image Resizing API.

4. **NPM Build Scripts** (`package.json`):
   - `npm run build:cf` &rarr; `opennextjs-cloudflare build` (Generates `.open-next/worker.js` and `.open-next/assets`)
   - `npm run preview:cf` &rarr; `opennextjs-cloudflare preview` (Local Cloudflare Workers preview via Wrangler)
   - `npm run deploy:cf` &rarr; `opennextjs-cloudflare deploy` (Direct CLI deployment)
   - Standard Next.js scripts (`dev`, `build`, `start`, `lint`) remain 100% intact.

5. **Artifact Exclusions** (`.gitignore`):
   - `.open-next/` and `.wrangler/` are excluded from Git to keep the repository clean.

6. **Environment Configuration** (`.env.example`):
   - Template provided for optional environment variables (e.g., `NEXT_PUBLIC_SITE_URL`).

---

## Part 2: Step-by-Step Cloudflare Dashboard Deployment

Follow these steps to deploy from your Cloudflare Dashboard:

### Step 1: Push Your Code to GitHub
Ensure all local changes are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "chore: prepare for Cloudflare Workers deployment via OpenNext"
git push origin main
```

### Step 2: Log In to Cloudflare Dashboard
1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com) and log in to your account.
2. In the left-hand navigation sidebar, click on **Compute (Workers)** &rarr; **Workers & Pages**.

### Step 3: Create Application
1. Click the blue **Create** button (or **Create application**).
2. Select the **Pages** tab (or **Workers** tab depending on whether using Cloudflare Pages Git integration or Workers Git integration).
   > **Recommended (Workers Git integration / Pages with Workers)**:
   > - Click **Connect to Git**.
   > - Select your GitHub account and authorize Cloudflare if you haven't already.
   > - Select the `rdwan-fitness-website` repository and click **Begin setup**.

### Step 4: Configure Build Settings
Fill in the build configuration fields:

| Setting | Value | Notes |
| :--- | :--- | :--- |
| **Project Name** | `rdwan-fitness-website` | Can be customized to your preferred subdomain |
| **Production Branch** | `main` | Or your default production branch |
| **Framework Preset** | `None` (or `Next.js`) | Choose `None` so Cloudflare uses our custom build command |
| **Root Directory** | `/` (leave empty or default) | The root of the repository |
| **Build Command** | `npm run build:cf` | Alternatively: `npx @opennextjs/cloudflare build` |
| **Build Output Directory** | `.open-next/assets` (or leave empty) | Cloudflare serves static assets from here; Worker code is bundled into `.open-next/worker.js` |

### Step 5: Environment Variables & Compatibility Flags
1. **Compatibility Flags**:
   - Ensure `nodejs_compat` is enabled.
   - If using Workers deployment, `wrangler.jsonc` automatically provides:
     ```json
     "compatibility_flags": ["nodejs_compat"],
     "compatibility_date": "2024-12-30"
     ```
   - In Cloudflare Pages Settings &rarr; **Functions** &rarr; **Compatibility flags**, add `nodejs_compat` for both Production and Preview if prompted.

2. **Environment Variables** (Optional):
   - In **Settings** &rarr; **Environment Variables**, you may add:
     - `NEXT_PUBLIC_SITE_URL`: `https://rdwan-fitness-website.pages.dev` (or your custom domain)
     - `NODE_VERSION`: `20` (or `22`)

### Step 6: Deploy
1. Click **Save and Deploy**.
2. Cloudflare will clone your repository, run `npm install`, execute `npm run build:cf`, package the worker, and deploy it to Cloudflare's global edge network.
3. Once completed, Cloudflare provides your live public deployment URL (e.g., `https://rdwan-fitness-website.pages.dev` or `https://rdwan-fitness-website.workers.dev`).

---

## Part 3: Post-Deployment Functional Testing Checklist

Verify all 16 items on the live Cloudflare production URL:

- [ ] **1. HTTP 200 & SSL**: Homepage loads immediately with valid HTTPS.
- [ ] **2. Arabic RTL (Default)**: First visit defaults to Arabic (`dir="rtl"`, `lang="ar"`).
- [ ] **3. English LTR**: Language switcher toggles to English seamlessly (`dir="ltr"`, `lang="en"`).
- [ ] **4. Language Cookie Persistence**: Refreshing the page remembers the chosen language.
- [ ] **5. Hero Section**: Coach name (رضوان / Rdwan), headline, statistics, and CTA buttons render with correct fonts.
- [ ] **6. About Section**: Story, biography, and coach portrait load cleanly.
- [ ] **7. Qualifications Section**: Accreditation badges, Saudi flag, certifications, and decorative backdrop display crisply.
- [ ] **8. Pricing Plans**:
  - Displays Saudi Riyal (`SAR` / `ر.س`) with monthly billing cycle.
  - "Most Popular" badge on 3-month plan.
  - Desktop 3-column grid and mobile carousel function smoothly.
- [ ] **9. Interactive Calorie & Macro Calculator**:
  - Step 1 (Stats: Gender, Age, Weight, Height) calculates accurately.
  - Step 2 (Activity Level) adjusts TDEE properly.
  - Step 3 (Fitness Goal: Cut, Maintain, Bulk) updates target calories and P/C/F macros.
  - Quick action buttons ("Choose a Plan", "Book Free Consultation") link with pre-filled context.
- [ ] **10. Testimonials Section**:
  - Carousel switches slides without layout shift.
  - Red quote marks render without broken image icons.
- [ ] **11. FAQ Accordion**:
  - Expand and collapse animations work without stuttering.
  - All questions and answers display in Arabic and English.
- [ ] **12. Final CTA Section**:
  - High-impact red CTA button opens the booking modal or navigates to `/booking`.
- [ ] **13. Multi-Step Registration / Booking**:
  - Plan pre-selection from Pricing or Calculator carries over into the form.
  - Step 1 (Personal Info), Step 2 (Fitness Assessment), Step 3 (Plan Confirmation) validate properly.
  - Currency displays `SAR` / `ر.س` (NO demo USD values).
- [ ] **14. Footer**:
  - Coach branding, bio, social icons, quick links, and developer credit ("Coach Rise") render correctly.
- [ ] **15. Assets & Fonts**:
  - Zero 404 errors for images, SVG icons, fonts, or scripts in browser console network tab.
- [ ] **16. Responsive Layout**:
  - Perfect presentation on Mobile (375px/390px), Tablet (768px), and Desktop (1440px).

---

## Part 4: Targeted Troubleshooting for Cloudflare Edge Cases

### 1. Error: `Cannot find module 'node:async_hooks'` or `crypto`
- **Cause**: Missing Node.js compatibility flag.
- **Resolution**:
  - Verify `wrangler.jsonc` contains `"compatibility_flags": ["nodejs_compat"]`.
  - In Cloudflare Dashboard, verify **Settings** &rarr; **Runtime** has `nodejs_compat` enabled.

### 2. Static Images Return 404 or Fail to Render
- **Cause**: Next.js image optimization attempting on-demand SSR resizing without an image loader.
- **Resolution**:
  - In `next.config.mjs`, ensure `images: { unoptimized: true }` is present.
  - Static images in `public/` are served directly via Cloudflare Assets binding.

### 3. Build Fails with `out of memory` or Node Version Mismatch
- **Cause**: Cloudflare default build environment using an outdated Node.js runtime.
- **Resolution**:
  - In Cloudflare Dashboard &rarr; **Settings** &rarr; **Environment Variables**, add:
    - Variable Name: `NODE_VERSION`
    - Value: `20` or `22`

### 4. Custom Domain Configuration
- To connect a custom domain (e.g., `rdwanfitness.com`):
  1. In Cloudflare Dashboard, navigate to your project under **Workers & Pages**.
  2. Select the **Custom domains** tab.
  3. Click **Set up a custom domain** and enter your domain name.
  4. Cloudflare will automatically provision an SSL/TLS certificate and configure DNS routing.
