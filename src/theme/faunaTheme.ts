import type { ThemeConfig } from 'antd';

export const faunaTheme: ThemeConfig = {
  token: {
    // ── Colour system ──────────────────────────────────
    colorPrimary: '#4A5D23',          // Forest Green – buttons, links, accent
    colorSuccess: '#4A5D23',
    colorWarning: '#D38345',          // Terracotta Orange
    colorError: '#C0392B',            // Danger Red
    colorInfo: '#5D4037',             // Fauna Brown

    colorBgBase: '#F5F1E3',           // Paper Beige – global background
    colorTextBase: '#5D4037',         // Fauna Brown – base text
    colorBgContainer: '#FFFFFF',      // white cards (current pattern)
    colorBorder: 'rgba(93, 64, 55, 0.14)',

    // ── Typography ─────────────────────────────────────
    fontFamily: "'Quicksand', system-ui, -apple-system, sans-serif",

    // ── Geometry ───────────────────────────────────────
    borderRadius: 12,
    wireframe: false,
  },

  components: {
    Button: {
      primaryShadow: '0 4px 14px rgba(74, 93, 35, 0.25)',
      borderRadius: 12,
      controlHeight: 44,
      fontWeight: 700,
    },
    Card: {
      borderRadiusLG: 18,
      boxShadow:
        '0 2px 8px rgba(93, 64, 55, 0.08), 0 8px 24px rgba(93, 64, 55, 0.06)',
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
    },
    Menu: {
      itemBorderRadius: 8,
    },
    Form: {
      labelFontSize: 13,
    },
  },
};
