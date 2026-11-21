import { BookOpen, Brain, Home, Library, Menu, Moon, Search, Settings, Sparkles, Stethoscope, Sun, Table2, Wrench, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MODULES } from '@/content/modules'
import { TOOLS } from '@/tools/meta'
import { cn } from '@/lib/utils'
import { usePrefs, type Focus } from '@/store/prefs'
import { Segmented } from './ui/Field'
import { SearchPalette } from './SearchPalette'

export const CONTENT_REVIEWED = 'November 2026'

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
      <defs>
        <radialGradient id="lg" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#lg)" />
      <ellipse cx="16" cy="16" rx="6.5" ry="5.5" fill="#fda4af" opacity="0.55" />
    </svg>
  )
}

export function FocusToggle({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { focus, setFocus } = usePrefs()
  return (
    <Segmented<Focus>
      label="Content focus"
      size={size}
      value={focus}
      onChange={setFocus}
      options={[
        { value: 'all', label: 'All', title: 'Show pediatric and adult content' },
        { value: 'peds', label: <span className="text-peds">Peds</span>, title: 'Pediatric and shared content' },
        { value: 'adult', label: <span className="text-adult">Adult</span>, title: 'Adult and shared content' },
      ]}
    />
  )
}

function ThemeButton() {
  const { theme, setTheme } = usePrefs()
  const dark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

const navCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors',
    isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
  )

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-6 text-sm" aria-label="Main">
      <div className="space-y-0.5">
        <NavLink to="/" end className={navCls} onClick={onNavigate}>
          <Home className="h-4 w-4" /> Home
        </NavLink>
        <NavLink to="/practice" className={navCls} onClick={onNavigate}>
          <Brain className="h-4 w-4" /> Practice questions
        </NavLink>
        <NavLink to="/cases" className={navCls} onClick={onNavigate}>
          <Stethoscope className="h-4 w-4" /> Clinical cases
        </NavLink>
      </div>
      <div>
        <div className="mb-1 px-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">Learn</div>
        <div className="space-y-0.5">
          {MODULES.map((m) => (
            <NavLink key={m.id} to={`/learn/${m.id}`} className={navCls} onClick={onNavigate}>
              <m.icon className={cn('h-4 w-4 shrink-0', m.accent)} />
              <span className="truncate">{m.short}</span>
              {m.lean === 'peds' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-peds" title="Pediatric-weighted" />}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 px-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">Tools</div>
        <div className="space-y-0.5">
          {TOOLS.map((t) => (
            <NavLink key={t.id} to={`/tools/${t.id}`} className={navCls} onClick={onNavigate}>
              <t.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{t.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 px-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">Reference</div>
        <div className="space-y-0.5">
          <NavLink to="/normal-values" className={navCls} onClick={onNavigate}>
            <Table2 className="h-4 w-4" /> Normal values
          </NavLink>
          <NavLink to="/whats-new" className={navCls} onClick={onNavigate}>
            <Sparkles className="h-4 w-4" /> What’s new
          </NavLink>
          <NavLink to="/references" className={navCls} onClick={onNavigate}>
            <Library className="h-4 w-4" /> References
          </NavLink>
          <NavLink to="/settings" className={navCls} onClick={onNavigate}>
            <Settings className="h-4 w-4" /> Settings
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const loc = useLocation()

  useEffect(() => setDrawer(false), [loc.pathname])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-2 px-3 sm:px-4">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent lg:hidden" onClick={() => setDrawer(true)} aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
            <Logo />
            <span className="hidden sm:inline">Hematology Master</span>
            <span className="sm:hidden">HemeMaster</span>
          </Link>
          <button
            onClick={() => setSearch(true)}
            className="ml-auto hidden h-9 w-72 items-center gap-2 rounded-lg border bg-muted/40 px-3 text-sm text-muted-foreground hover:bg-accent md:flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" /> Search everything…
            <kbd className="ml-auto rounded border bg-background px-1.5 text-[10px] font-medium">⌘K</kbd>
          </button>
          <button onClick={() => setSearch(true)} className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent md:hidden" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <div className="hidden sm:block">
            <FocusToggle size="sm" />
          </div>
          <ThemeButton />
        </div>
        <div className="flex justify-center border-t px-3 py-1.5 sm:hidden">
          <FocusToggle size="sm" />
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r px-3 py-5 lg:block">
          <NavContent />
        </aside>
        <main id="main" className="min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
          {children}
          <footer className="mt-16 border-t pt-5 text-xs text-muted-foreground">
            For clinicians and trainees. Verify doses and thresholds against local protocols. Content reviewed {CONTENT_REVIEWED}.
          </footer>
        </main>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal aria-label="Navigation">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[82%] max-w-xs overflow-y-auto border-r bg-background p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold">
                <Logo /> Hematology Master
              </span>
              <button onClick={() => setDrawer(false)} className="rounded-md p-1.5 hover:bg-accent" aria-label="Close navigation">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavContent onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Quick">
        {[
          { to: '/', icon: Home, label: 'Home', end: true },
          { to: '/learn', icon: BookOpen, label: 'Learn' },
          { to: '/tools', icon: Wrench, label: 'Tools' },
          { to: '/practice', icon: Brain, label: 'Practice' },
          { to: '/cases', icon: Stethoscope, label: 'Cases' },
        ].map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) => cn('flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}
          >
            <t.icon className="h-5 w-5" />
            {t.label}
          </NavLink>
        ))}
      </nav>

      <SearchPalette open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
