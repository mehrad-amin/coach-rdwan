const SIZE_CLASSES = {
  compact:
    "min-h-[2.75rem] px-4 py-[9px] text-[1rem] leading-[1.5] tracking-[0.01em]",
  large:
    "min-h-[4.625rem] min-w-[13.375rem] px-10 py-5 text-[1.25rem] leading-[1.2] active:scale-[0.99] sm:text-[1.5rem]",
};

export default function CtaButton({
  href,
  size = "compact",
  className = "",
  children,
  ...props
}) {
  const baseClass =
    "cta-button inline-flex items-center justify-center rounded-control border border-transparent bg-brand font-sans font-bold text-foreground transition-colors hover:bg-brand-hover";
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.compact;
  const classes = className
    ? `${baseClass} ${sizeClass} ${className}`
    : `${baseClass} ${sizeClass}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
