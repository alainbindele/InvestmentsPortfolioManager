# Navy Glass Redesign — Design

Date: 2026-11-22
Status: approved by the owner in conversation

## Intent

Restyle the whole Portfolio Balancer UI so it feels tech, professional and modern, and so
users trust the numbers it shows. Look: dark navy base, glassmorphism, corporate colors.
Purely visual: same features, same texts, same behavior.

## Goals

- Dark navy theme with frosted-glass surfaces across every screen (Portfolio, Strategies,
  AI Assistant, educational section, disclaimer, cookie banner, dropdowns, modals).
- One source of truth for colors: CSS variables + semantic Tailwind colors, and one chart
  palette file used by all Recharts charts.
- Financial numbers easy to scan: tabular figures, clear gain/loss colors.

## Non-goals

- No changes to logic, calculations, storage, translations or copy.
- No light/dark toggle (dark only).
- No new UI libraries.

## Anti-goals (failure even if it "works")

- Text on glass below WCAG AA contrast.
- Dropdowns (currency, language) hidden under glass panels.
- Janky scrolling on phones because of blur everywhere.

## Approaches considered

1. **Theme layer + glass classes + component pass (chosen).** CSS variables and semantic
   Tailwind colors, shared glass classes, then each component converted from hardcoded
   gray/white/blue utilities to the semantic tokens. Predictable contrast, maintainable.
2. Remap Tailwind's gray/white palette to dark values in the config. Fast, but `bg-white`
   would mean dark, light gradients (`from-blue-50`) stay light, contrast becomes
   unpredictable; it ends in per-file patching anyway. Rejected.
3. Adopt a component library (shadcn, MUI). Rewrites markup, risks behavior changes, heavy
   for a restyle. Rejected.

## Decisions

Recommendations came from the ui-ux-pro-max design search ("Personal Finance Tracker —
trust blue + profit green on dark", Glassmorphism, IBM Plex Sans "financial, trustworthy").

- **Background:** gradient `#070B16` → `#0B1220`, 2–3 soft blurred glow orbs (blue, cyan,
  indigo at low opacity) and a faint grid. Static under `prefers-reduced-motion`.
- **Glass surfaces:** white at 4–6% opacity, `backdrop-filter: blur(16px)`, 1px border
  `rgba(255,255,255,0.08)`, top-edge highlight, radius 16px. Header/nav: stronger blur.
  Modals: darker glass over a dimmed, blurred backdrop.
- **Colors:**
  - text `#E6EDF7`, muted `#94A3B8`, subtle `#64748B`
  - brand blue `#3B82F6` (buttons: gradient to `#2563EB`, soft glow)
  - accent cyan `#22D3EE`
  - gain `#34D399`, loss/destructive `#FB7185`, warning `#FBBF24`
- **Typography:** IBM Plex Sans, self-hosted via `@fontsource` (no Google Fonts request,
  the app already has a cookie banner). `tabular-nums` on amounts and percentages.
- **Components:** pill tabs, KPI tiles with icon, table with hover and sticky header, dark
  inputs with cyan focus ring, primary gradient / secondary glass buttons, glass badges.
  Emoji used as icons (👈, 🔒) replaced with Lucide icons.
- **Charts:** 8 asset-type colors tuned for dark backgrounds in one file, glass tooltips,
  faint grid lines, muted axis labels.
- **Guardrails:** blur only on panels/header, not per row; visible focus states;
  `prefers-reduced-motion` respected; dropdown z-index rechecked; layout checked at 375px.

## Left to the builder

Exact spacing, per-component layout tweaks, hover/transition details, chart color order —
within the decisions above.
