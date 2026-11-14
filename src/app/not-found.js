import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Coach John",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand selection:text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/85 backdrop-blur-md">
        <div className="section-shell">
          <div className="mx-auto flex h-20 w-full max-w-[var(--container-wide)] items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity"
            >
              <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-wider">
                Personal <span className="text-brand">Trainer</span>
              </span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground hover:border-white/30 transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative mx-auto w-24 h-24 rounded-full bg-brand/10 border-2 border-brand/30 flex items-center justify-center text-brand">
            <span className="font-display font-black text-3xl">404</span>
          </div>
          <div className="space-y-2">
            <h1 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-foreground tracking-tight">
              Page Not Found
            </h1>
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-control bg-brand px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground hover:bg-brand-hover shadow-[0_4px_20px_rgba(255,35,50,0.35)] transition-all cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-muted font-sans">
        <div className="section-shell">
          <p>© {new Date().getFullYear()} Personal Trainer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
