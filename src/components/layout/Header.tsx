"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { menuConfig } from "@/config/menu";
import type { MenuItem } from "@/types/menu";
import { useTheme } from "@/theme/ThemeProvider";

function findLabelByPath(items: MenuItem[], pathname: string): string | null {
  for (const item of items) {
    if (item.href === pathname) {
      return item.label;
    }

    if (item.children?.length) {
      const childLabel = findLabelByPath(item.children, pathname);
      if (childLabel) {
        return childLabel;
      }
    }
  }

  return null;
}

export default function Header() {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { mode, toggleMode, toggleSidebar, sidebarCollapsed } = useTheme();
  const headerTitle =
    menuConfig.map((group) => findLabelByPath(group.items, pathname)).find(Boolean) || "Dashboard";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 h-header px-2 pt-2 md:px-3">
      <div className="relative flex h-full items-center justify-between overflow-visible rounded-[22px] border border-white/45 bg-white/80 px-2.5 shadow-[0_14px_35px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/72 md:px-3">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_100%_at_0%_0%,rgba(16,185,129,0.2),transparent_50%),radial-gradient(60%_80%_at_100%_0%,rgba(251,191,36,0.14),transparent_55%)]" />
      {/* Left section */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="rounded-2xl border border-slate-200/70 bg-white/70 p-2 text-header-text shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/80 dark:text-header-text-dark"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Breadcrumb / Title */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Overview</p>
          <h2 className="text-lg font-semibold tracking-tight text-header-text dark:text-header-text-dark">
            {headerTitle}
          </h2>
        </div>
      </div>

      {/* Right section */}
      <div className="relative z-10 flex items-center gap-2 md:gap-2.5">
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-72 rounded-xl border border-slate-200/70 bg-white/80 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-600 dark:bg-slate-800/80 dark:text-gray-200 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Notification bell */}
        <button className="relative rounded-2xl border border-slate-200/70 bg-white/70 p-2 text-header-text shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/80 dark:text-header-text-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-800"></span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleMode}
          className="rounded-2xl border border-slate-200/70 bg-white/70 p-2 text-header-text shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/80 dark:text-header-text-dark"
          aria-label="Toggle dark mode"
        >
          {mode === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* User avatar */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/75 px-1.5 py-1 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/85"
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white text-xs font-bold shadow-[0_0_0_3px_rgba(16,185,129,0.2)]">
              A
            </div>
            <span className="hidden text-sm font-medium text-header-text dark:text-header-text-dark md:block">
              Admin
            </span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 shadow-lg backdrop-blur dark:border-slate-600 dark:bg-slate-900/95">
              <Link
                href="/settings"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Settings
              </Link>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}
