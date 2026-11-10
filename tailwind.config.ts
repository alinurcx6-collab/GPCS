import type { Config } from 'tailwindcss'

// Colours are CSS variables (RGB triplets) so every utility, including
// opacity modifiers like `border-line/10`, works in both themes.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        faint: token('faint'),
        line: token('line'),
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 6.5vw, 5.75rem)', { lineHeight: '1.02', letterSpacing: '-0.045em', fontWeight: '500' }],
        headline: ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.035em', fontWeight: '500' }],
        title: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: '500' }],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fade: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pop: {
          '0%': { opacity: '0', transform: 'translateY(6px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) both',
        fade: 'fade 0.4s ease-out both',
        pop: 'pop 0.25s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
