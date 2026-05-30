import React from "react";
import { GraduationCap, ShieldCheck, Home } from "lucide-react";

const ExamLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-text selection:bg-secondary/30">
      {/* --- Sticky Exam Header --- */}
      <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-surface/90 shadow-sm backdrop-blur-md dark:border-white/10">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand & Context */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg font-bold tracking-tight text-text leading-tight">
                Mentor Plus
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted leading-none">
                Examination Portal
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Secure Environment Indicator */}
            <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-400 sm:text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Secure Session</span>
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-black/10 dark:bg-white/10 sm:block"></div>

            {/* Main Website Link - Using <a> instead of <Link> to trigger beforeunload warning */}
            <a
              href="/"
              className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-black/5 hover:text-text dark:hover:bg-white/5"
            >
              <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Main Website</span>
            </a>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="relative flex w-full flex-1 flex-col overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-secondary)_0%,_transparent_30%)] opacity-5 dark:opacity-10" />

        {/* Children Container */}
        <div className="relative z-10 flex w-full flex-1 flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ExamLayout;
