import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { safeStorage } from './storage'

export type Theme = 'dark' | 'light' | 'system'
export type Focus = 'all' | 'peds' | 'adult'

interface PrefsState {
  theme: Theme
  focus: Focus
  setTheme: (t: Theme) => void
  setFocus: (f: Focus) => void
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', !!dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      focus: 'all',
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
      setFocus: (focus) => set({ focus }),
    }),
    {
      name: 'hm-prefs',
      storage: safeStorage,
      onRehydrateStorage: () => (state) => applyTheme(state?.theme ?? 'dark'),
    },
  ),
)

/** Whether content tagged `pop` should show under the current focus. */
export function visibleFor(focus: Focus, pop: 'peds' | 'adult' | 'both') {
  return focus === 'all' || pop === 'both' || pop === focus
}
