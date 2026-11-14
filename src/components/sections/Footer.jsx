import Link from "next/link";

/**
 * Footer Section — Faithful Figma Recreation (Frame "FooterSection" - node 1:1448)
 * 
 * Exact Figma specifications:
 * - Frame 1:1448: 1440 x 447px on desktop
 * - Content Frame 1:1449: 1184 x 224px (matching --container-wide: 1184px) at y=96px
 * - Brand text: "Personal Trainer" (node 1:1451)
 * - Bio paragraph: 377 x 84px (node 1:1454)
 * - Social icons: instagram-fill (1:1456) & facebook-fill (1:1457), 24x24px, 16px gap
 * - Menu column (node 1:1459): "Menu", "Home", "Services", "About Us", "Contact"
 * - Contact column (node 1:1465): "Contact", "Lorem Ipsum 22,LP19204", "+(123) 231123321", "johntrainig@mail.com"
 * - Divider line (node 1:1470): 1184 x 1px at y=352px
 * - Copyright text (node 1:1472): "© 2024. All rights reserved." centered at y=385px
 */
export default function Footer({ className = "" }) {
  return (
    <footer
      id="footer"
      role="contentinfo"
      aria-label="Site Footer"
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
                Personal Trainer
              </Link>

              {/* Bio Paragraph (Figma node 1:1454) */}
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-[377px]">
                Lorem ipsum dolor sit amet consectetur. Ut a mattis eget augue vivamus parturient eu aliquet. In laoreet risus ut nulla interdum urna sollicitudin. Nisl viverra in id ultricies.
              </p>

              {/* Social Media Links (Figma node 1:1455 - 24x24px with 16px gap) */}
              <div className="flex items-center gap-4 pt-1" aria-label="Social media links">
                {/* Instagram (node 1:1456: instagram-fill) */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Personal Trainer on Instagram"
                  className="text-foreground hover:text-brand focus-visible:text-brand transition-colors p-1.5 -m-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </a>

                {/* Facebook (node 1:1457: facebook-fill) */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Personal Trainer on Facebook"
                  className="text-foreground hover:text-brand focus-visible:text-brand transition-colors p-1.5 -m-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.87-.14C11.84 2 10 3.71 10 6.8v2.7H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Columns: Menu & Contact Links (Figma node 1:1458 - 707px total width) */}
            <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              
              {/* Menu Navigation Column (Figma node 1:1459) */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-foreground tracking-wide">
                  Menu
                </h3>
                <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-sans" role="list">
                  <li>
                    <Link
                      href="#home"
                      className="text-muted hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="text-muted hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-muted hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#cta"
                      className="text-muted hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Information Column (Figma node 1:1465) */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-foreground tracking-wide">
                  Contact
                </h3>
                <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-sans text-muted" role="list">
                  <li className="leading-snug">
                    <span>Lorem Ipsum 22,LP19204</span>
                  </li>
                  <li>
                    <a
                      href="tel:+123231123321"
                      className="hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      +(123) 231123321
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:johntrainig@mail.com"
                      className="hover:text-foreground focus-visible:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:underline break-all"
                    >
                      johntrainig@mail.com
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

          {/* Centered Copyright Notice (Figma node 1:1471 & 1:1472) */}
          <div className="text-center">
            <p className="font-sans text-xs sm:text-sm text-muted tracking-normal">
              © 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
