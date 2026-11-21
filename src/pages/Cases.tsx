import { ArrowRight, CheckCircle2, RotateCcw, Stethoscope } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { PopBadge } from '@/components/PopBadge'
import { Button } from '@/components/ui/Button'
import { allCases } from '@/content/load'
import { MODULE_BY_ID } from '@/content/modules'
import { Prose } from '@/components/Prose'
import { Callout } from '@/components/Callout'
import { QuickCheck } from '@/components/QuickCheck'
import { cn } from '@/lib/utils'
import { usePrefs, visibleFor } from '@/store/prefs'
import { useProgress } from '@/store/progress'
import { NotFound } from './NotFound'

export function CasesIndex() {
  const focus = usePrefs((s) => s.focus)
  const done = useProgress((s) => s.cases)
  const cases = useMemo(() => allCases(), [])
  const groups = [
    { title: 'Pediatric cases', items: cases.filter((c) => c.pop === 'peds') },
    { title: 'Adult and shared cases', items: cases.filter((c) => c.pop !== 'peds') },
  ]
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Practice" title="Clinical cases">
        Each case unfolds in stages. Make the call, see what happened, then decide again. Every decision is explained and linked to the teaching.
      </PageHeader>
      <div className="space-y-10">
        {groups.map((g) => {
          const items = g.items.filter((c) => visibleFor(focus, c.pop))
          if (!items.length) return null
          return (
            <section key={g.title}>
              <h2 className="mb-3 text-lg font-semibold">{g.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((c) => {
                  const d = done[c.id]
                  return (
                    <Link key={c.id} to={`/cases/${c.id}`} className="flex flex-col rounded-2xl border bg-card p-5 hover:border-primary/50 hover:shadow-md">
                      <div className="flex items-center gap-2">
                        <PopBadge pop={c.pop} />
                        <span className="text-xs text-muted-foreground">{MODULE_BY_ID[c.moduleId]?.short}</span>
                        {d && (
                          <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                            <CheckCircle2 className="h-3.5 w-3.5" /> {d.score}/{d.total}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-semibold">{c.title}</h3>
                      <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.teaser}</p>
                      <div className="mt-3 text-xs text-muted-foreground">{c.stages.length} stages</div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export function CasePlayer() {
  const { caseId = '' } = useParams()
  const cases = useMemo(() => allCases(), [])
  const c = cases.find((x) => x.id === caseId)
  const recordCase = useProgress((s) => s.recordCase)
  const [stage, setStage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [finished, setFinished] = useState(false)
  const bottomRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    setStage(0)
    setAnswers({})
    setFinished(false)
    window.scrollTo(0, 0)
  }, [caseId])
  useEffect(() => {
    if (c) document.title = `${c.title} · Cases · Hematology Master`
  }, [c])

  if (!c) return <NotFound />

  const checksIn = (i: number) => c.stages[i].blocks.flatMap((b) => (b.kind === 'check' ? [b.check.id] : []))
  const totalChecks = c.stages.reduce((a, _s, i) => a + checksIn(i).length, 0)
  const stageReady = checksIn(stage).every((id) => id in answers)
  const score = Object.values(answers).filter(Boolean).length
  const idx = cases.findIndex((x) => x.id === c.id)
  const nextCase = cases[idx + 1]

  const advance = () => {
    if (stage < c.stages.length - 1) {
      setStage(stage + 1)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } else {
      setFinished(true)
      recordCase(c.id, score, totalChecks)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Stethoscope className="h-4 w-4" /> Case · {MODULE_BY_ID[c.moduleId]?.short}
          </span>
        }
        title={c.title}
      >
        <span className="flex flex-wrap items-center gap-2">
          <PopBadge pop={c.pop} /> {c.teaser}
        </span>
      </PageHeader>

      <ol className="space-y-6">
        {c.stages.slice(0, stage + 1).map((s, i) => (
          <li key={s.id} className={cn('rounded-2xl border bg-card p-5', i < stage && 'opacity-90')} ref={i === stage ? bottomRef : undefined}>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
              <h2 className="font-semibold">{s.title}</h2>
            </div>
            {s.blocks.map((b, j) =>
              b.kind === 'check' ? (
                <QuickCheck key={b.check.id} check={b.check} label="Decision" record={false} onAnswer={(ok) => setAnswers((a) => (b.check.id in a ? a : { ...a, [b.check.id]: ok }))} />
              ) : b.kind === 'callout' ? (
                <Callout key={j} variant={b.variant} title={b.title} html={b.html} year={b.year} />
              ) : (
                <Prose key={j} html={b.html} />
              ),
            )}
          </li>
        ))}
      </ol>

      {!finished ? (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Stage {stage + 1} of {c.stages.length}
          </span>
          <Button onClick={advance} disabled={!stageReady}>
            {stage < c.stages.length - 1 ? 'Continue' : 'Finish case'} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.06] p-5">
          <div className="text-lg font-semibold">
            Case complete: {score}/{totalChecks} decisions correct
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to={`/learn/${c.moduleId}`}>
              <Button variant="outline">Review {MODULE_BY_ID[c.moduleId]?.short}</Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                setStage(0)
                setAnswers({})
                setFinished(false)
                window.scrollTo(0, 0)
              }}
            >
              <RotateCcw className="h-4 w-4" /> Restart
            </Button>
            {nextCase && (
              <Link to={`/cases/${nextCase.id}`}>
                <Button>
                  Next case <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
