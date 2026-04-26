"use client";

import { useTheme } from "@/theme/ThemeProvider";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-main dark:bg-main-dark">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area: offset by sidebar width */}
      <div
        className={`flex flex-1 flex-col p-2 transition-all duration-300 ${
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        <div className="relative flex h-full flex-col rounded-[28px] border border-white/45 bg-white/20 shadow-[0_24px_70px_rgba(15,23,42,0.15)] backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/30">
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto px-3 pb-3 pt-2 md:px-4 md:pb-4">
            <div className="min-h-full rounded-3xl border border-white/55 bg-white/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_48px_rgba(15,23,42,0.08)] dark:border-slate-700/70 dark:bg-slate-900/45 md:p-3.5">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
