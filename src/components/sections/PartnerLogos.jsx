import fs from "node:fs";
import path from "node:path";

const SVG_SOURCE_PATH = path.join(
  process.cwd(),
  "public",
  "icons",
  "partners",
  "partner-logos.svg"
);

// Unclipped 8-logo track coordinates inside partner-logos.svg:
// Logo 1 starts at x=-26.9364, Logo 8 ends at x=1469.25 (span=1496.1864).
// Adding 24px transparent margin on each side produces exact 48px spacing at the seam.
const MARQUEE_VIEWBOX = "-50.9364 40 1544.1864 120";

function loadPartnerTrackMarkup() {
  const rawSvg = fs.readFileSync(SVG_SOURCE_PATH, "utf8");

  const outerGroupMatch = rawSvg.match(
    /<g\s+clip-path="url\(#clip0_1_1521\)">([\s\S]*?)<\/g>\s*<defs>/
  );
  const defsMatch = rawSvg.match(/<defs>([\s\S]*?)<\/defs>/);

  if (!outerGroupMatch || !defsMatch) {
    throw new Error("Invalid partner-logos.svg structure");
  }

  const innerVectors = outerGroupMatch[1]
    .replace(/<rect\s+width="1440"\s+height="200"\s+fill="#1F1F1F"\s*\/>\s*/, "")
    .trim();

  const innerDefs = defsMatch[1]
    .replace(/<clipPath\s+id="clip0_1_1521">[\s\S]*?<\/clipPath>\s*/, "")
    .trim();

  return `${innerVectors}\n<defs>\n${innerDefs}\n</defs>`;
}

const BASE_TRACK_MARKUP = loadPartnerTrackMarkup();

function renderScopedTrackMarkup(instanceId) {
  return BASE_TRACK_MARKUP.replaceAll("_1_1521", `_1_1521_${instanceId}`);
}

const SVG_CLASSES =
  "partner-marquee-svg block aspect-[1544.1864/120] h-[72px] w-auto shrink-0 select-none sm:h-[88px] lg:h-[108px] desktop:h-[120px]";

function PartnerLogoSequence({ instanceId, isClone = false }) {
  return (
    <svg
      width="1544.1864"
      height="120"
      viewBox={MARQUEE_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={isClone ? undefined : "img"}
      aria-label={isClone ? undefined : "Partner brand logos including eight featured partners"}
      aria-hidden={isClone ? "true" : undefined}
      focusable="false"
      className={isClone ? `${SVG_CLASSES} partner-marquee-clone` : SVG_CLASSES}
      dangerouslySetInnerHTML={{ __html: renderScopedTrackMarkup(instanceId) }}
    />
  );
}

export default function PartnerLogos({ className = "" }) {
  const sectionClasses = [
    "w-full overflow-hidden bg-surface py-3.5 sm:py-6 lg:py-8 desktop:py-10",
    "mb-12 sm:mb-16 lg:mb-24 desktop:mb-[var(--section-gap-sm)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id="partners" aria-label="Partner brands" className={sectionClasses}>
      <div className="partner-marquee-track">
        <div className="partner-marquee-group">
          <PartnerLogoSequence instanceId={0} />
          <PartnerLogoSequence instanceId={1} isClone />
        </div>
        <div className="partner-marquee-group partner-marquee-clone" aria-hidden="true">
          <PartnerLogoSequence instanceId={2} isClone />
          <PartnerLogoSequence instanceId={3} isClone />
        </div>
      </div>
    </section>
  );
}
