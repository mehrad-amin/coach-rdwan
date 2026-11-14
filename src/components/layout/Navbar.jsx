"use client";

import { useEffect, useRef } from "react";
import CtaButton from "@/components/ui/CtaButton";
import { HERO_CONTENT, NAV_ITEMS } from "@/data/hero";

export default function Navbar() {
  const headerRef = useRef(null);
  const innerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const menu = menuRef.current;
    if (!header || !inner || !menu) return;

    let rafId = 0;

    const syncLayout = () => {
      const supportsPopover =
        typeof HTMLElement !== "undefined" &&
        Object.hasOwn(HTMLElement.prototype, "popover");

      const wasOpen =
        supportsPopover && menu.matches(":popover-open");

      header.classList.add("is-measuring");
      header.classList.remove("is-collapsed");
      header.classList.add("is-wide");
      menu.removeAttribute("popover");

      const wide = inner.scrollWidth <= inner.clientWidth + 1;

      if (wide) {
        header.classList.add("is-wide");
        header.classList.remove("is-collapsed");
        menu.removeAttribute("popover");
      } else {
        header.classList.remove("is-wide");
        header.classList.add("is-collapsed");
        menu.setAttribute("popover", "auto");
        if (wasOpen && typeof menu.showPopover === "function") {
          try {
            menu.showPopover();
          } catch {
            // Ignore if already open or unattached
          }
        }
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        header.classList.remove("is-measuring");
      });
    };

    syncLayout();

    let lastWidth = header.getBoundingClientRect().width;
    const observer = new ResizeObserver((entries) => {
      const headerEntry = entries.find((entry) => entry.target === header);
      const nextWidth = headerEntry?.contentRect?.width ?? header.getBoundingClientRect().width;
      const isCollapsedNow = header.classList.contains("is-collapsed");

      if (!isCollapsedNow || nextWidth > lastWidth) {
        syncLayout();
      }
      lastWidth = nextWidth;
    });

    observer.observe(header);
    observer.observe(menu);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = () => {
    const menu = menuRef.current;
    const header = headerRef.current;
    if (
      menu &&
      header &&
      header.classList.contains("is-collapsed") &&
      typeof menu.hidePopover === "function" &&
      menu.matches(":popover-open")
    ) {
      menu.hidePopover();
    }
  };

  return (
    <header ref={headerRef} className="site-header px-5 sm:px-8 xl:px-0">
      <a href="#hero-heading" className="skip-link">
        Skip to main content
      </a>

      <div ref={innerRef} className="header-inner">
        <a
          href="#home"
          className="font-sans text-[1rem] font-bold leading-[1.5] tracking-[0.01em] text-foreground transition-opacity hover:opacity-85"
        >
          {HERO_CONTENT.brandName}
        </a>

        <nav aria-label="Primary">
          <button
            type="button"
            className="menu-button"
            popoverTarget="primary-menu"
            popoverTargetAction="toggle"
            aria-controls="primary-menu"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M2.25 4.5H15.75M2.25 9H15.75M2.25 13.5H15.75"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            <span>Menu</span>
          </button>

          <ul id="primary-menu" ref={menuRef} popover="auto" className="site-menu">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  onClick={handleLinkClick}
                  className="block py-1 font-sans text-[1rem] font-normal leading-[1.5] tracking-[0.01em] text-foreground opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100 aria-[current=page]:font-bold aria-[current=page]:text-brand aria-[current=page]:opacity-100 aria-[current=page]:hover:opacity-90 lg:py-0"
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <CtaButton
                href={HERO_CONTENT.ctaHref}
                onClick={handleLinkClick}
                size="compact"
                className="w-full lg:w-auto"
              >
                {HERO_CONTENT.ctaLabel}
              </CtaButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
