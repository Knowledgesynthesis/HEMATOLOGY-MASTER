import { ArrowRight, Baby, Brain, Sparkles, Stethoscope } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FocusToggle } from '@/components/Layout'
import { PopBadge } from '@/components/PopBadge'
import { Prose } from '@/components/Prose'
import { allQuestions, allUpdates, moduleOutline } from '@/content/load'
import { MODULES, MODULE_BY_ID } from '@/content/modules'
import { TOOLS } from '@/tools/meta'
import { cn } from '@/lib/utils'
import { usePrefs, visibleFor } from '@/store/prefs'
import { sectionKey, useProgress } from '@/store/progress'

const PEDS_PATH: [string, string][] = [
  ['foundations', 'normal-values'],
  ['neonatal', 'hdfn'],
  ['neonatal', 'neonatal-thrombocytopenia'],
  ['neonatal', 'vkdb'],
  ['anemia', 'ida-peds'],
  ['hemoglobinopathies', 'fever'],
  ['hemoglobinopathies', 'stroke'],
  ['platelets', 'itp-peds'],
  ['leukemia', 'all-peds'],
  ['bleeding', 'abuse'],
  ['thrombosis', 'peds-vte-treat'],
  ['transfusion', 'peds-dosing'],
]

export function Home() {
  const focus = usePrefs((s) => s.focus)
  const learned = useProgress((s) => s.learned)
  const qstats = useProgress((s) => s.questions)
  const outlines = useMemo(() => Object.fromEntries(MODULES.map((m) => [m.id, moduleOutline(m.id)])), [])
  const updates = useMemo(() => allUpdates().sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)), [])
  const qTotal = useMemo(() => allQuestions().length, [])

  const totalSections = Object.values(outlines).reduce((a, o) => a + o.length, 0)
  const learnedCount = Object.keys(learned).length
  const answered = Object.values(qstats)
  const accuracy = answered.length ? Math.round((answered.filter((q) => q.last).length / answered.length) * 100) : null
  const titleOf = (m: string, s: string) => outlines[m]?.find((x) => x.id === s)?.title ?? s

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="relative max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-peds" /> Pediatric-first · adult-complete · cited to 2026 guidelines
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Hematology, from first principles to the bedside.</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {totalSections} sections across {MODULES.length} modules, each tagged <PopBadge pop="peds" /> <PopBadge pop="adult" /> or <PopBadge pop="both" />. Plus {qTotal} exam-style
            questions, stepwise cases and 11 age-aware clinical tools.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/learn/foundations" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground shadow hover:bg-primary/90">
              Start with Foundations <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/practice" className="inline-flex h-11 items-center gap-2 rounded-lg border bg-background/60 px-5 font-medium hover:bg-accent">
              <Brain className="h-4 w-4" /> Practice questions
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>Focus:</span> <FocusToggle size="sm" />
          </div>
        </div>
      </section>

      {(learnedCount > 0 || answered.length > 0) && (
        <section className="grid grid-cols-3 gap-3">
          {[
            { label: 'Sections learned', value: `${learnedCount}/${totalSections}` },
            { label: 'Questions answered', value: `${answered.length}/${qTotal}` },
            { label: 'Last-attempt accuracy', value: accuracy === null ? '—' : `${accuracy}%` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-4">
              <div className="text-xl font-bold sm:text-2xl">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </section>
      )}

      {focus !== 'adult' && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Baby className="h-5 w-5 text-peds" />
            <h2 className="text-xl font-bold tracking-tight">Pediatric fast track</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">The twelve sections that come up most on pediatric wards, nurseries and clinics.</p>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PEDS_PATH.map(([m, s], i) => {
              const done = !!learned[sectionKey(m, s)]
              return (
                <li key={m + s} className="min-w-0">
                  <Link to={`/learn/${m}#${s}`} className={cn('flex min-w-0 items-center gap-3 rounded-xl border p-3 hover:border-peds/60 hover:bg-peds/5', done && 'border-emerald-500/40')}>
                    <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold', done ? 'bg-emerald-500/15 text-emerald-500' : 'bg-peds/15 text-peds')}>{i + 1}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{titleOf(m, s)}</span>
                      <span className="block text-xs text-muted-foreground">{MODULE_BY_ID[m].short}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-bold tracking-tight">Learning modules</h2>
        <ModuleGrid />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Clinical tools</h2>
          <Link to="/tools" className="text-sm font-medium text-primary hover:underline">
            All tools →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.filter((t) => visibleFor(focus, t.pop)).slice(0, 6).map((t) => (
            <Link key={t.id} to={`/tools/${t.id}`} className="flex gap-3 rounded-xl border bg-card p-4 hover:border-primary/50">
              <t.icon className="h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block font-semibold">{t.title}</span>
                <span className="block text-sm text-muted-foreground">{t.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Link to="/cases" className="rounded-2xl border bg-card p-6 hover:border-primary/50">
          <Stethoscope className="h-6 w-6 text-primary" />
          <h3 className="mt-3 text-lg font-semibold">Clinical cases</h3>
          <p className="mt-1 text-sm text-muted-foreground">Stepwise vignettes: decide, see the result, decide again. Mostly pediatric, with key adult emergencies.</p>
        </Link>
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-500" />
            <h3 className="text-lg font-semibold">What’s new</h3>
            <Link to="/whats-new" className="ml-auto text-sm font-medium text-primary hover:underline">
              All {updates.length} →
            </Link>
          </div>
          <ul className="mt-3 space-y-3">
            {updates.slice(0, 4).map((u) => (
              <li key={u.moduleId + u.sectionId + u.title}>
                <Link to={`/learn/${u.moduleId}#${u.sectionId}`} className="block rounded-lg p-2 hover:bg-accent">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {u.year && <span className="rounded bg-sky-500/15 px-1.5 text-[11px] font-bold text-sky-500">{u.year}</span>}
                    {u.title}
                  </div>
                  <Prose html={u.html} className="line-clamp-2 text-xs prose-p:my-0 [&_*]:text-xs" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export function ModuleGrid() {
  const learned = useProgress((s) => s.learned)
  const focus = usePrefs((s) => s.focus)
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {MODULES.map((m, i) => {
        const outline = moduleOutline(m.id)
        const visible = outline.filter((s) => visibleFor(focus, s.pop))
        const done = outline.filter((s) => learned[sectionKey(m.id, s.id)]).length
        const pct = outline.length ? Math.round((done / outline.length) * 100) : 0
        const peds = outline.filter((s) => s.pop === 'peds').length
        const adult = outline.filter((s) => s.pop === 'adult').length
        return (
          <Link key={m.id} to={`/learn/${m.id}`} className="group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
            <div className="flex items-start justify-between">
              <m.icon className={cn('h-7 w-7', m.accent)} />
              <span className="text-xs font-semibold text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-3 font-semibold leading-snug">{m.title}</h3>
            <p className="mt-1 line-clamp-3 flex-1 text-sm text-muted-foreground">{m.blurb}</p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>{visible.length} sections</span>
              <span className="text-peds">● {peds}</span>
              <span className="text-adult">● {adult}</span>
              <span className="ml-auto">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
