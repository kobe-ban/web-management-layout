"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import { menuConfig } from "@/config/menu";
import type { MenuItem } from "@/types/menu";

function SidebarItem({ item, collapsed }: { item: MenuItem; collapsed: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
              ${isActive ? "bg-gradient-to-r from-emerald-400/20 to-amber-300/15 text-sidebar-text-active shadow-[0_0_0_1px_rgba(16,185,129,0.35)]" : "text-sidebar-text hover:bg-white/10 hover:text-sidebar-text-active"}
              ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-amber-300" />}
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
          {open && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1 border-l border-white/20 pl-3">
              {item.children!.map((child) => (
                <SidebarItem key={child.key} item={child} collapsed={false} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
            ${isActive ? "bg-gradient-to-r from-emerald-400/20 to-amber-300/15 text-sidebar-text-active shadow-[0_0_0_1px_rgba(16,185,129,0.35)]" : "text-sidebar-text hover:bg-white/10 hover:text-sidebar-text-active"}
            ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? item.label : undefined}
        >
          {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-amber-300" />}
          <span className="shrink-0">{item.icon}</span>
          {!collapsed && <span>{item.label}</span>}
        </Link>
      )}
    </li>
  );
}

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useTheme();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidebarCollapsedRef = useRef(sidebarCollapsed);

  useEffect(() => {
    sidebarCollapsedRef.current = sidebarCollapsed;
  }, [sidebarCollapsed]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleWheelOpen = () => {
    if (sidebarCollapsedRef.current) {
      toggleSidebar();
      sidebarCollapsedRef.current = false;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      if (!sidebarCollapsedRef.current) {
        toggleSidebar();
        sidebarCollapsedRef.current = true;
      }
    }, 1000);
  };

  return (
    <aside
      onWheel={handleWheelOpen}
      className={`fixed left-0 top-0 z-40 flex h-full flex-col overflow-hidden rounded-r-[30px] border-r border-sidebar-border/70 bg-sidebar shadow-[0_22px_55px_rgba(2,6,23,0.5)] transition-all duration-300
        ${sidebarCollapsed ? "w-sidebar-collapsed" : "w-sidebar"}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_20%_0%,rgba(16,185,129,0.3),transparent_55%),radial-gradient(120%_80%_at_100%_100%,rgba(251,191,36,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute right-[-72px] top-24 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl sidebar-ambient" />
      <div className="pointer-events-none absolute bottom-16 left-[-56px] h-32 w-32 rounded-full bg-amber-400/20 blur-3xl sidebar-ambient-delayed" />

      {/* Logo / Brand */}
      <div className="relative z-10 mx-1.5 mt-1.5 flex h-header items-center rounded-2xl border border-sidebar-border/80 px-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-[0_6px_24px_rgba(16,185,129,0.45)] font-bold text-sm">
            WM
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-base font-bold text-white tracking-tight truncate">Web Management</h1>
              <p className="text-[11px] text-emerald-100/80 tracking-wide uppercase truncate">Control Center</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-1.5 my-2 flex-1 overflow-y-auto rounded-2xl border border-white/5 bg-black/5 px-2.5 py-3">
        {menuConfig.map((group) => (
          <div key={group.title} className="mb-4">
            {!sidebarCollapsed && (
              <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100/55">
                {group.title}
              </h2>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem key={item.key} item={item} collapsed={sidebarCollapsed} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="relative z-10 border-t border-sidebar-border/70 p-2.5 backdrop-blur-sm">
        <div className={`flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 ${sidebarCollapsed ? "justify-center" : ""}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-bold">
            A
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-emerald-100/75 truncate">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
