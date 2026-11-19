const BEAMS = [
  {
    id: "1:41",
    wrapperClass: "left-[582.54px] top-[70px] h-[958.074px] w-[625.941px]",
    barClass: "h-[1033.492px] w-[126.087px]",
    backgroundImage:
      "linear-gradient(179.3134413608388deg, rgba(255, 255, 255, 0) 0.83323%, rgba(255, 255, 255, 0.05) 99.927%)",
  },
  {
    id: "1:42",
    wrapperClass: "left-[433.54px] top-[70px] h-[958.074px] w-[625.941px]",
    barClass: "h-[1033.492px] w-[126.087px]",
    backgroundImage:
      "linear-gradient(180.32566305108344deg, rgba(255, 35, 50, 0) 35.535%, rgba(255, 35, 50, 0.1) 99.965%)",
  },
  {
    id: "1:43",
    wrapperClass: "left-[545px] top-[70.5px] h-[895.531px] w-[517.612px]",
    barClass: "h-[1033.492px] w-px",
    backgroundImage:
      "linear-gradient(179.5161220821409deg, rgba(255, 255, 255, 0) 18.519%, rgba(255, 255, 255, 0.4) 100%)",
  },
  {
    id: "1:44",
    wrapperClass: "left-[396px] top-[70.5px] h-[895.531px] w-[517.612px]",
    barClass: "h-[1033.492px] w-px",
    backgroundImage:
      "linear-gradient(180.2954005498819deg, rgba(255, 255, 255, 0) 58.373%, rgba(255, 255, 255, 0.7) 100%)",
  },
  {
    id: "1:45",
    wrapperClass: "left-[983px] top-[70.5px] h-[895.531px] w-[517.612px]",
    barClass: "h-[1033.492px] w-px",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))",
  },
  {
    id: "1:46",
    wrapperClass: "left-[876.67px] top-[70px] h-[957.419px] w-[624.806px]",
    barClass: "h-[1033.492px] w-[124.777px]",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.05))",
  },
  {
    id: "1:47",
    wrapperClass: "left-[838px] top-[70.5px] h-[895.531px] w-[517.612px]",
    barClass: "h-[1033.492px] w-px",
    backgroundImage:
      "linear-gradient(179.60289419304723deg, rgba(255, 255, 255, 0) 10.852%, rgba(255, 255, 255, 0.5) 100%)",
  },
  {
    id: "1:48",
    wrapperClass: "left-[730.54px] top-[70px] h-[958.074px] w-[625.941px]",
    barClass: "h-[1033.492px] w-[126.087px]",
    backgroundImage:
      "linear-gradient(179.7680702618658deg, rgba(255, 35, 50, 0) 1.3654%, rgba(255, 35, 50, 0.2) 99.975%)",
  },
  {
    id: "1:49",
    wrapperClass: "left-[693px] top-[70.5px] h-[895.531px] w-[517.612px]",
    barClass: "h-[1033.492px] w-px",
    backgroundImage:
      "linear-gradient(179.97823587888deg, rgba(255, 255, 255, 0) 5.4937%, rgb(255, 255, 255) 100%)",
  },
];

export default function DiagonalBeams() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden select-none rtl:-scale-x-100"
    >
      <div className="absolute top-0 right-[-190px] h-[962px] w-[1440px] origin-top-right scale-[0.95] sm:right-[-90px] sm:scale-[0.95] lg:right-0 lg:scale-[0.86] xl:scale-[0.9] desktop:left-0 desktop:right-auto desktop:scale-100">
        {BEAMS.map((beam) => (
          <div
            key={beam.id}
            className={`absolute flex items-center justify-center ${beam.wrapperClass}`}
          >
            <div className="-rotate-30 flex-none">
              <div
                className={`relative ${beam.barClass}`}
                style={{ backgroundImage: beam.backgroundImage }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
