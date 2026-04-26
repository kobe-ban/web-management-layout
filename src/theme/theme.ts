// ============================================================
// Theme Configuration - Centralized design tokens
// ============================================================

export const theme = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    sidebar: {
      bg: "#1e293b",
      bgHover: "#334155",
      bgActive: "#0f172a",
      text: "#cbd5e1",
      textActive: "#ffffff",
      border: "#334155",
    },
    header: {
      bg: "#ffffff",
      bgDark: "#1e293b",
      text: "#1e293b",
      textDark: "#f1f5f9",
      border: "#e2e8f0",
      borderDark: "#334155",
    },
    footer: {
      bg: "#f8fafc",
      bgDark: "#0f172a",
      text: "#64748b",
      textDark: "#94a3b8",
      border: "#e2e8f0",
      borderDark: "#1e293b",
    },
    main: {
      bg: "#f1f5f9",
      bgDark: "#0f172a",
    },
  },
  layout: {
    sidebarWidth: "260px",
    sidebarCollapsedWidth: "72px",
    headerHeight: "64px",
    footerHeight: "48px",
  },
  transition: {
    default: "all 0.2s ease-in-out",
    slow: "all 0.3s ease-in-out",
  },
} as const;

export type Theme = typeof theme;
