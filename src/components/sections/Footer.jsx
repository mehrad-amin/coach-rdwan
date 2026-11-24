"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { CONTACT_CONFIG } from "@/data/contact";

/**
 * Footer Section — Faithful Figma Recreation (Frame "FooterSection" - node 1:1448)
 * Personalized for Coach Rdwan with bilingual localization, verified coach contact information,
 * and a subtle developer credit for Coach Rise.
 * 
 * Exact Figma specifications:
 * - Frame 1:1448: 1440 x 447px on desktop
 * - Content Frame 1:1449: 1184 x 224px (matching --container-wide: 1184px) at y=96px
 * - Left column (node 1:1453 - 377px): Coach Brand, Short Bio & Social Media Icons
 * - Menu column (node 1:1459): Quick navigation to all sections
 * - Contact column (node 1:1465): Verified coach contact links (Phone, WhatsApp, Instagram)
 * - Divider line (node 1:1470): 1184 x 1px at y=352px
 * - Bottom bar: Dynamic copyright notice & Developer credit (Coach Rise)
 */
export default function Footer({ className = "" }) {
  const { t } = useLocale();
  const footer = t?.footer || {};
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#home", label: footer.links?.home || "Home" },
    { href: "#about", label: footer.links?.about || "About Coach" },
    { href: "#qualifications", label: footer.links?.achievements || "Achievements" },
    { href: "#services", label: footer.links?.programs || "Training Programs" },
    { href: "#testimonials", label: footer.links?.testimonials || "Testimonials" },
    { href: "#faq", label: footer.links?.faq || "FAQ" },
  ];

  const brandName = footer.brandName || "Rdwan";
  const bio =
    footer.bio ||
    "Strength and fitness coach specializing in powerlifting, bodybuilding, and athletic performance development.";

  const copyrightText = footer.copyright
    ? footer.copyright(currentYear)
    : `© ${currentYear} ${brandName}. All rights reserved.`;

  return (
    <footer
      id="footer"
      role="contentinfo"
      aria-label={t?.navbar?.brandName ? `${t.navbar.brandName} Footer` : "Site Footer"}
      className={[
        "relative w-full bg-background border-t border-white/5",
        "pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 lg:pb-14",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell">
        <div className="mx-auto w-full max-w-[var(--container-wide)]">
          {/* Main Footer Content Grid */}
          <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-10 lg:gap-16">
            
            {/* Left Column: Brand, Short Bio & Social Media Icons (Figma node 1:1453 - 377px) */}
            <div className="w-full lg:max-w-[377px] space-y-5 sm:space-y-6">
              {/* Brand Logo / Title (Figma node 1:1451) */}
              <Link
                href="#home"
                className="font-sans text-[1.125rem] sm:text-[1.25rem] font-bold leading-tight tracking-[0.01em] text-foreground inline-block transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                {brandName}
              </Link>

              {/* Bio Paragraph (Figma node 1:1454) */}
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-[377px]">
                {bio}
              </p>

              {/* Social Media Links (Figma node 1:1455 - 24x24px with 16px gap) */}
              <div className="flex items-center gap-4 pt-1" aria-label="Social media">
                {/* Instagram (node 1:1456: instagram-fill) */}
                <a
                  href={CONTACT_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${footer.contact?.instagramLabel || "Instagram"}: ${CONTACT_CONFIG.instagramHandle}`}
                  className="text-foreground/75 hover:text-brand transition-colors p-1.5 -m-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href={CONTACT_CONFIG.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${footer.contact?.xLabel || "X"}: ${CONTACT_CONFIG.xHandle}`}
                  className="text-foreground/75 hover:text-brand transition-colors p-1.5 -m-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Columns: Menu & Contact Links (Figma node 1:1458 - 707px total width) */}
            <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              
              {/* Menu Navigation Column (Figma node 1:1459) */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-foreground tracking-wide">
                  {footer.menuTitle || "Quick Navigation"}
                </h3>
                <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-sans" role="list">
                  {navLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-muted hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information Column (Figma node 1:1465) */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-foreground tracking-wide">
                  {footer.contactTitle || "Contact"}
                </h3>
                <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-sans text-muted" role="list">
                  {/* Instagram */}
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-muted/60 text-xs shrink-0 select-none">
                      {footer.contact?.instagramLabel || "Instagram"}:
                    </span>
                    <a
                      href={CONTACT_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground hover:text-brand transition-colors select-all focus-visible:outline-none focus-visible:text-brand focus-visible:underline"
                      dir="ltr"
                    >
                      {CONTACT_CONFIG.instagramHandle}
                    </a>
                  </li>

                  {/* X (Twitter) */}
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-muted/60 text-xs shrink-0 select-none">
                      {footer.contact?.xLabel || "X"}:
                    </span>
                    <a
                      href={CONTACT_CONFIG.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground hover:text-brand transition-colors select-all focus-visible:outline-none focus-visible:text-brand focus-visible:underline"
                      dir="ltr"
                    >
                      {CONTACT_CONFIG.xHandle}
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Horizontal Divider Line (Figma node 1:1470 - 1184 x 1px) */}
          <div
            className="w-full h-px bg-white/20 mt-12 sm:mt-16 lg:mt-20 mb-8 sm:mb-9"
            role="separator"
            aria-hidden="true"
          />

          {/* Bottom Copyright & Coach Rise Developer Credit Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <p className="font-sans text-xs sm:text-sm text-muted tracking-normal">
              {copyrightText}
            </p>
            <p className="font-sans text-xs text-muted/70 tracking-normal" dir="ltr">
              Developed by{" "}
              <a
                href="https://www.instagram.com/coach-rise/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-brand transition-colors font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
              >
                Coach Rise
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
