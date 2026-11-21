import { ArrowLeft, ArrowRight, Brain, CheckCircle2, Circle, ListTree } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Blocks } from '@/components/Blocks'
import { FocusToggle } from '@/components/Layout'
import { PopBadge } from '@/components/PopBadge'
import { Button } from '@/components/ui/Button'
import { getModuleDoc } from '@/content/load'
import { MODULE_BY_ID, MODULES } from '@/content/modules'
import { REFS } from '@/content/refs'
import { cn } from '@/lib/utils'
import { usePrefs, visibleFor } from '@/store/prefs'
import { sectionKey, useProgress } from '@/store/progress'
import { NotFound } from './NotFound'

export function ModulePage() {
  const { moduleId = '' } = useParams()
  const meta = MODULE_BY_ID[moduleId]
  const doc = useMemo(() => (meta ? getModuleDoc(moduleId) : undefined), [meta, moduleId])
  const focus = usePrefs((s) => s.focus)
  const setFocus = usePrefs((s) => s.setFocus)
  const learned = useProgress((s) => s.learned)
  const toggleLearned = useProgress((s) => s.toggleLearned)
  const { hash } = useLocation()
  const [tocOpen, setTocOpen] = useState(false)

  const sections = doc?.sections ?? []
  const visible = sections.filter((s) => visibleFor(focus, s.pop))
  const hidden = sections.length - visible.length
  const done = sections.filter((s) => learned[sectionKey(moduleId, s.id)]).length
  const counts = { peds: 0, adult: 0, both: 0 }
  sections.forEach((s) => counts[s.pop]++)

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const target = sections.find((s) => s.id === id)
    if (target && !visibleFor(focus, target.pop)) setFocus('all')
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 30)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, moduleId])

  useEffect(() => {
    if (meta) document.title = `${meta.title} · Hematology Master`
  }, [meta])

  if (!meta || !doc) return <NotFound />
  const idx = MODULES.findIndex((m) => m.id === moduleId)
  const prev = MODULES[idx - 1]
  const next = MODULES[idx + 1]
  const pct = sections.length ? Math.round((done / sections.length) * 100) : 0

  const toc = (
    <ol className="space-y-0.5 text-sm">
      {visible.map((s) => {
        const isDone = !!learned[sectionKey(moduleId, s.id)]
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                setTocOpen(false)
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                history.replaceState(null, '', `#${s.id}`)
              }}
              className="flex items-start gap-2 rounded-md px-2 py-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {isDone ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> : <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', s.pop === 'peds' ? 'bg-peds' : s.pop === 'adult' ? 'bg-adult' : 'bg-muted-foreground/40')} />}
              <span className="leading-snug">{s.title}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <div className="mx-auto flex max-w-6xl gap-10">
      <article className="min-w-0 flex-1">
        <header className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <meta.icon className={cn('h-4 w-4', meta.accent)} /> Module {idx + 1} of {MODULES.length}
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{meta.title}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{meta.blurb}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Module progress">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">
                {done}/{sections.length} learned
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <PopBadge pop="peds" /> {counts.peds}
              <PopBadge pop="adult" /> {counts.adult}
              <PopBadge pop="both" /> {counts.both}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <FocusToggle size="sm" />
            <Link to={`/practice?module=${moduleId}`}>
              <Button size="sm" variant="outline">
                <Brain className="h-4 w-4" /> Practice this module
              </Button>
            </Link>
            <Button size="sm" variant="ghost" className="xl:hidden" onClick={() => setTocOpen((o) => !o)} aria-expanded={tocOpen}>
              <ListTree className="h-4 w-4" /> On this page
            </Button>
          </div>
          {tocOpen && <div className="mt-3 rounded-xl border bg-card p-2 xl:hidden">{toc}</div>}
        </header>

        {hidden > 0 && (
          <div className="mb-6 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            {hidden} {focus === 'peds' ? 'adult-only' : 'pediatric-only'} section{hidden > 1 ? 's' : ''} hidden by your focus.{' '}
            <button className="font-medium text-primary hover:underline" onClick={() => setFocus('all')}>
              Show all
            </button>
          </div>
        )}

        <div className="space-y-12">
          {visible.map((s) => {
            const key = sectionKey(moduleId, s.id)
            const isDone = !!learned[key]
            return (
              <section key={s.id} id={s.id} className="scroll-mt-20" aria-labelledby={`h-${s.id}`}>
                <div className="mb-3 flex flex-wrap items-center gap-2 border-b pb-2">
                  <h2 id={`h-${s.id}`} className="mr-auto text-xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  <PopBadge pop={s.pop} />
                </div>
                <Blocks blocks={s.blocks} />
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {s.refs.length > 0 && (
                    <div className="mr-auto flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wider">Evidence</span>
                      {s.refs.map((r) =>
                        REFS[r] ? (
                          <Link key={r} to={`/references#ref-${r}`} className="cite" title={REFS[r].cite}>
                            {REFS[r].label}
                          </Link>
                        ) : null,
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => toggleLearned(key)}
                    className={cn(
                      'ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      isDone ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground hover:bg-accent',
                    )}
                    aria-pressed={isDone}
                  >
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                    {isDone ? 'Learned' : 'Mark as learned'}
                  </button>
                </div>
              </section>
            )
          })}
        </div>

        <nav className="mt-14 grid gap-3 sm:grid-cols-2" aria-label="Module navigation">
          {prev ? (
            <Link to={`/learn/${prev.id}`} className="group rounded-xl border p-4 hover:border-primary/50 hover:bg-accent/40">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="h-3 w-3" /> Previous
              </div>
              <div className="font-semibold">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/learn/${next.id}`} className="group rounded-xl border p-4 text-right hover:border-primary/50 hover:bg-accent/40">
              <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next <ArrowRight className="h-3 w-3" />
              </div>
              <div className="font-semibold">{next.title}</div>
            </Link>
          )}
        </nav>
      </article>

      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto xl:block" aria-label="On this page">
        <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">On this page</div>
        {toc}
      </aside>
    </div>
  )
}
