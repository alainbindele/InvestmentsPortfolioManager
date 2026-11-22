# Navy Glass Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle every screen of Portfolio Balancer to a dark navy glassmorphism theme without changing behavior.

**Architecture:** A theme layer (CSS variables + semantic Tailwind colors + shared glass classes in `index.css`) plus one chart palette module; a deterministic class codemod converts the ~660 hardcoded light utilities to semantic tokens; hand polish on header, nav, KPI tiles, tables, popovers, modals and charts.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind 3, Recharts 3, lucide-react, @fontsource/ibm-plex-sans.

**Spec:** `docs/superpowers/specs/2026-11-22-navy-glass-redesign-design.md`

## Global Constraints

- No changes to logic, calculations, storage, translations or copy.
- Dark only; no theme toggle. No new UI libraries (font package only).
- Colors: text `#E6EDF7`, muted `#94A3B8`, subtle `#64748B`; brand `#3B82F6`→`#2563EB`; accent `#22D3EE`; gain `#34D399`; loss `#FB7185`; warning `#FBBF24`; background `#070B16`→`#0B1220`.
- Glass: white 4–6% fill, blur 16px, 1px border `rgba(255,255,255,0.08)`, radius 16px.
- Text contrast WCAG AA; visible focus; `prefers-reduced-motion` respected.

## Review Focus

- Currency/language dropdowns and reset confirm must open above glass panels (header uses `backdrop-filter`, which would trap `position: fixed` children) → blur lives on a `::before` pseudo-element of the header.
- StrategyCard color picker must not be hidden under the next card (cards with blur create stacking contexts) → wrapper raises `z-index` on `focus-within`/hover.
- Native `<select>` option lists must stay readable on dark (`color-scheme: dark`, option background navy).
- Mobile 375px: no horizontal page scroll, header controls fit, tables scroll inside their card.
- Charts readable on navy: axis/grid/tooltip colors from the chart theme, no white tooltip boxes.

---

### Task 1: Theme foundation

**Files:**
- Modify: `tailwind.config.js`, `src/index.css`, `src/main.tsx`, `index.html` (theme-color), `src/types/portfolio.ts` (ASSET_COLORS values), `package.json`
- Create: `src/theme/chartTheme.ts`

**Interfaces — Produces:**
- Tailwind colors: `navy-{950,900,850,800,700}`, `ink` (`DEFAULT`, `soft`, `muted`, `subtle`, `faint`), `line` (`DEFAULT`, `strong`), `primary|success|warning|error` full 50–950 scales, `accent` (cyan).
- CSS classes: `.app-bg`, `.card`, `.glass-bar`, `.glass-popover`, `.glass-modal`, `.metric-card`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.input-field`, `.select-field`, `.tab-pill(.active)`, `.badge` + `.badge-{primary,success,warning,error,neutral}`, `.data-table`, `.icon-tile` + `.icon-tile-{primary,success,warning,error,accent}`, `.num` (tabular figures), `.section-title`.
- `src/theme/chartTheme.ts`: `CHART` (`grid`, `axis`, `tick`, `track`, `trackFill`, `tooltipBg`, `cursor`), `SERIES_COLORS: string[]`, `COLOR_PICKER_PALETTE: string[]`, `ASSET_TYPE_COLORS: Record<AssetType,string>`.

- [ ] Install `@fontsource/ibm-plex-sans`, import weights 400/500/600/700 in `src/main.tsx`.
- [ ] Write tokens/classes above; asset colors are the 400 shades (stocks `#60A5FA`, bonds `#34D399`, etf `#A78BFA`, crypto `#FBBF24`, real_estate `#FB7185`, cash `#94A3B8`, commodities `#FB923C`, other `#22D3EE`).
- [ ] Verify: `npm run build` → exit 0.

### Task 2: Class codemod

**Files:** Modify: `src/App.tsx`, `src/components/*.tsx`. Script kept in the session scratchpad (not committed).

- [ ] Map light utilities to tokens (e.g. `text-gray-900`→`text-ink`, `text-gray-600`→`text-ink-muted`, `border-gray-200`→`border-line`, `bg-gray-100`→`bg-white/[0.06]`, `bg-blue-100`→`bg-primary-500/15`, `text-success-600`→`text-success-400`, `bg-red-50`→`bg-error-500/10`), exact-token matches only, variants (`hover:`) mapped explicitly.
- [ ] Verify: `grep -rE "\b(text|bg|border)-(gray|blue|red|green|yellow)-|\bbg-white\b" src/App.tsx src/components` → only intentional leftovers (popover/modal containers handled in Task 4).

### Task 3: App shell polish (`src/App.tsx`)

- [ ] Background layer (`.app-bg` with orbs + grid), header `.glass-bar` with gradient logo tile, pill tab nav, FIRE banner as slim glass strip, KPI tiles with `icon-tile`, asset table `.data-table`, empty states, educational section; emoji icons (👈, 🔒) → Lucide.
- [ ] Verify: `npm run build` → exit 0; app renders in browser.

### Task 4: Components polish

- [ ] Popovers (CurrencySelector, LanguageSelector, ResetButton confirm, StrategyCard color picker, Sharpe tooltip) → `.glass-popover`.
- [ ] DisclaimerModal, CookieConsent, StrategyCard delete overlay → `.glass-modal`/navy surfaces.
- [ ] StrategyComparison best-performer cards → tinted glass; tables → `.data-table`.
- [ ] Charts (PortfolioChart, ProjectionChart, StrategyComparison, StrategyCard, AllocationEditor, AssetLockManager) read colors from `chartTheme.ts` / `ASSET_COLORS`; range slider track uses `CHART.track`.
- [ ] Emoji used as icons (📈, 🔒, ⚠️, 💡, ✓) → Lucide icons.
- [ ] Verify: `npm run build` → exit 0.

### Task 5: Verification

- [ ] Browser, desktop: Portfolio (with sample assets), Strategies, AI tabs; dropdowns open above panels; disclaimer and cookie banner.
- [ ] Browser, 375px: no horizontal scroll, header fits.
- [ ] Console: no errors.
