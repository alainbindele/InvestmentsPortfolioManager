/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Dark navy surfaces
        navy: {
          950: '#070B16',
          900: '#0B1220',
          850: '#0F172A',
          800: '#131C31',
          700: '#1A2540',
          600: '#24304F',
        },
        // Text on dark
        ink: {
          DEFAULT: '#E6EDF7',
          soft: '#CBD5E1',
          muted: '#94A3B8',
          subtle: '#7C8BA1',
          faint: '#64748B',
        },
        // Hairlines on glass
        line: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
        },
        // Brand blue
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Tech accent
        accent: {
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Gains
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Losses / destructive
        error: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 32px -8px rgba(2, 6, 23, 0.6)',
        'glass-lg': '0 1px 0 0 rgba(255,255,255,0.08) inset, 0 24px 64px -16px rgba(2, 6, 23, 0.8)',
        glow: '0 0 0 1px rgba(59,130,246,0.35), 0 8px 24px -6px rgba(59,130,246,0.55)',
        'glow-accent': '0 0 24px -4px rgba(34,211,238,0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'orb-drift': 'orbDrift 28s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        orbDrift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': { transform: 'translate3d(4%, 3%, 0) scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
