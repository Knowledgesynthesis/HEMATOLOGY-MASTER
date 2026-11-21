import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FocusToggle } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { PopBadge } from '@/components/PopBadge'
import { Prose } from '@/components/Prose'
import { QuickCheck } from '@/components/QuickCheck'
import { Button } from '@/components/ui/Button'
import { Segmented } from '@/components/ui/Field'
import { allQuestions } from '@/content/load'
import { MODULE_BY_ID, MODULES } from '@/content/modules'
import type { Check } from '@/content/types'
import { cn, seededShuffle, shuffle } from '@/lib/utils'
import { usePrefs, visibleFor } from '@/store/prefs'
import { useProgress } from '@/store/progress'

type Mode = 'practice' | 'exam'
type Source = 'all' | 'unseen' | 'missed'

export function Practice() {
  const [params] = useSearchParams()
  const pre = params.get('module')
  const focus = usePrefs((s) => s.focus)
  const stats = useProgress((s) => s.questions)
  const recordAnswer = useProgress((s) => s.recordAnswer)
  const all = useMemo(() => allQuestions(), [])

  const [mods, setMods] = useState<string[]>(pre && MODULE_BY_ID[pre] ? [pre] : [])
  const [mode, setMode] = useState<Mode>('practice')
  const [source, setSource] = useState<Source>('all')
  const [count, setCount] = useState<'10' | '20' | '40' | 'all'>('20')
  const [queue, setQueue] = useState<Check[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)

  const pool = all.filter(
    (q) =>
      (mods.length === 0 || mods.includes(q.moduleId!)) &&
      visibleFor(focus, q.pop) &&
      (source === 'all' || (source === 'unseen' ? !stats[q.id] : stats[q.id] && !stats[q.id].last)),
  )

  const start = () => {
    const picked = shuffle(pool)
    setQueue(count === 'all' ? picked : picked.slice(0, Number(count)))
    setIdx(0)
    setAnswers({})
    setDone(false)
  }

  if (!queue) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader eyebrow="Practice" title="Question bank">
          {all.length} single-best-answer questions with explanations. Your last attempt on each is saved in this browser so you can drill the ones you missed.
        </PageHeader>
        <div className="space-y-6 rounded-2xl border bg-card p-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Modules</span>
              <button className="text-xs font-medium text-primary hover:underline" onClick={() => setMods([])}>
                All modules
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {MODULES.map((m) => {
                const on = mods.includes(m.id)
                const n = all.filter((q) => q.moduleId === m.id && visibleFor(focus, q.pop)).length
                return (
                  <button
                    key={m.id}
                    onClick={() => setMods((s) => (on ? s.filter((x) => x !== m.id) : [...s, m.id]))}
                    className={cn('rounded-full border px-3 py-1 text-sm transition-colors', on ? 'border-primary bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent')}
                    aria-pressed={on}
                  >
                    {m.short} <span className="text-xs opacity-70">{n}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">Population</div>
              <FocusToggle size="sm" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Mode</div>
              <Segmented<Mode> label="Mode" size="sm" value={mode} onChange={setMode} options={[{ value: 'practice', label: 'Instant feedback' }, { value: 'exam', label: 'Exam (review at end)' }]} />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Questions</div>
              <Segmented<Source> label="Source" size="sm" value={source} onChange={setSource} options={[{ value: 'all', label: 'All' }, { value: 'unseen', label: 'Unseen' }, { value: 'missed', label: 'Missed last time' }]} />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Length</div>
              <Segmented label="Length" size="sm" value={count} onChange={setCount} options={[{ value: '10', label: '10' }, { value: '20', label: '20' }, { value: '40', label: '40' }, { value: 'all', label: 'All' }]} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground">{pool.length} questions match</span>
            <Button onClick={start} disabled={pool.length === 0}>
              Start <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const q = queue[idx]
  const isLast = idx === queue.length - 1
  const answeredCurrent = answers[q?.id] !== undefined

  if (done) {
    const results = queue.map((qq) => ({ q: qq, picked: answers[qq.id], correct: answers[qq.id] !== undefined && qq.options[answers[qq.id]].correct }))
    const score = results.filter((r) => r.correct).length
    const byModule = MODULES.map((m) => {
      const rs = results.filter((r) => r.q.moduleId === m.id)
      return { m, n: rs.length, c: rs.filter((r) => r.correct).length }
    }).filter((x) => x.n > 0)
    const pct = Math.round((score / queue.length) * 100)
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader eyebrow="Results" title={`${score} / ${queue.length} correct (${pct}%)`}>
          {pct >= 85 ? 'Strong. Try “Missed last time” or another module.' : pct >= 60 ? 'Solid base. Review the explanations below, then retry the misses.' : 'Revisit the linked sections, then drill “Missed last time”.'}
        </PageHeader>
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="mb-3 font-semibold">By module</h2>
          <div className="space-y-2">
            {byModule.map(({ m, n, c }) => (
              <div key={m.id} className="flex items-center gap-3 text-sm">
                <span className="w-32 shrink-0 truncate">{m.short}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className={cn('h-full rounded-full', c / n >= 0.75 ? 'bg-emerald-500' : c / n >= 0.5 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${(c / n) * 100}%` }} />
                </div>
                <span className="w-12 text-right tabular-nums text-muted-foreground">
                  {c}/{n}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {results
            .filter((r) => !r.correct)
            .map(({ q: qq, picked }) => (
              <div key={qq.id} className="rounded-xl border bg-card p-4">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <XCircle className="h-4 w-4 text-red-500" /> {MODULE_BY_ID[qq.moduleId!]?.short} <PopBadge pop={qq.pop} />
                </div>
                <Prose html={qq.stem} className="font-medium" />
                {picked !== undefined && (
                  <p className="mt-2 text-sm text-red-500">
                    Your answer: <span dangerouslySetInnerHTML={{ __html: qq.options[picked].html }} />
                  </p>
                )}
                <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                  Correct: <span dangerouslySetInnerHTML={{ __html: qq.options.find((o) => o.correct)!.html }} />
                </p>
                <Prose html={qq.explain} className="mt-2 text-muted-foreground" />
                {qq.sectionId && (
                  <Link to={`/learn/${qq.moduleId}#${qq.sectionId}`} className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                    Review: {qq.sectionTitle ?? 'section'} →
                  </Link>
                )}
              </div>
            ))}
        </div>
        <div className="flex gap-3">
          <Button onClick={start}>
            <RotateCcw className="h-4 w-4" /> New set
          </Button>
          <Button variant="outline" onClick={() => setQueue(null)}>
            Change settings
          </Button>
        </div>
      </div>
    )
  }

  const next = () => {
    if (isLast) {
      if (mode === 'exam') queue.forEach((qq) => answers[qq.id] !== undefined && recordAnswer(qq.id, qq.options[answers[qq.id]].correct))
      setDone(true)
    } else setIdx(idx + 1)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-medium tabular-nums">
          {idx + 1} / {queue.length}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((idx + 1) / queue.length) * 100}%` }} />
        </div>
        <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setQueue(null)}>
          Quit
        </button>
      </div>
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        {MODULE_BY_ID[q.moduleId!]?.short} <PopBadge pop={q.pop} />
      </div>
      {mode === 'practice' ? (
        <QuickCheck key={q.id} check={q} hideLabel onAnswer={(_ok, i) => setAnswers((a) => ({ ...a, [q.id]: i }))} />
      ) : (
        <ExamQuestion key={q.id} q={q} picked={answers[q.id]} onPick={(i) => setAnswers((a) => ({ ...a, [q.id]: i }))} />
      )}
      <div className="flex justify-between">
        <Button variant="ghost" disabled={idx === 0 || mode === 'practice'} onClick={() => setIdx(idx - 1)}>
          Back
        </Button>
        <Button onClick={next} disabled={!answeredCurrent}>
          {isLast ? 'Finish' : 'Next'} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function ExamQuestion({ q, picked, onPick }: { q: Check; picked?: number; onPick: (i: number) => void }) {
  const options = useMemo(() => seededShuffle(q.options.map((o, i) => ({ ...o, i })), q.id), [q])
  return (
    <div className="my-4 rounded-xl border bg-card p-4">
      <Prose html={q.stem} className="font-medium" />
      <div className="mt-3 grid gap-2">
        {options.map((o, idx) => (
          <button
            key={o.i}
            onClick={() => onPick(o.i)}
            aria-pressed={picked === o.i}
            className={cn('flex items-start gap-3 rounded-lg border p-3 text-left text-sm', picked === o.i ? 'border-primary bg-primary/10' : 'hover:bg-accent/50')}
          >
            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">{String.fromCharCode(65 + idx)}</span>
            <span className="flex-1" dangerouslySetInnerHTML={{ __html: o.html }} />
            {picked === o.i && <CheckCircle2 className="h-5 w-5 text-primary" />}
          </button>
        ))}
      </div>
    </div>
  )
}
