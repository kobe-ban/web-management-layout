export default function Footer() {
  return (
    <footer className="relative mx-2 mb-2 flex h-footer items-center justify-between overflow-hidden rounded-[22px] border border-footer-border/70 bg-footer/85 px-3 shadow-[0_10px_28px_rgba(15,23,42,0.1)] backdrop-blur-sm dark:border-footer-border-dark/70 dark:bg-footer-dark/85 md:px-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      <div className="flex items-center gap-2.5 text-xs text-footer-text dark:text-footer-text-dark">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
        <p>
          &copy; {new Date().getFullYear()} Web Management. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <button className="text-footer-text transition-colors hover:text-primary-600 dark:text-footer-text-dark dark:hover:text-amber-300">
          API Status
        </button>
        <button className="text-footer-text transition-colors hover:text-primary-600 dark:text-footer-text-dark dark:hover:text-amber-300">
          Documentation
        </button>
        <p className="rounded-full border border-slate-300/60 px-2.5 py-1 text-footer-text dark:border-slate-600/70 dark:text-footer-text-dark">
          v1.0.0
        </p>
      </div>
    </footer>
  );
}
