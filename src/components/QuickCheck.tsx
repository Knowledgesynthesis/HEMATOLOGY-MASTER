import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Check } from '@/content/types'
import { cn, seededShuffle } from '@/lib/utils'
import { useProgress } from '@/store/progress'
import { Prose } from './Prose'

export function QuickCheck({
  check,
  onAnswer,
  label = 'Quick check',
  hideLabel,
  record = true,
}: {
  check: Check
  onAnswer?: (correct: boolean, index: number) => void
  label?: string
  hideLabel?: boolean
  record?: boolean
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const recordAnswer = useProgress((s) => s.recordAnswer)
  const options = useMemo(() => seededShuffle(check.options.map((o, i) => ({ ...o, i })), check.id), [check])
  const answered = picked !== null
  const correct = answered && check.options[picked].correct

  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
    const ok = check.options[i].correct
    if (record) recordAnswer(check.id, ok)
    onAnswer?.(ok, i)
  }

  return (
    <div className="my-5 rounded-xl border bg-card p-4 shadow-sm">
      {!hideLabel && (
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <HelpCircle className="h-4 w-4" aria-hidden /> {label}
        </div>
      )}
      <Prose html={check.stem} className="font-medium prose-p:my-1" />
      <div className="mt-3 grid gap-2" role="group" aria-label="Answer options">
        {options.map((o, idx) => {
          const isPicked = picked === o.i
          const show = answered && (o.correct || isPicked)
          return (
            <button
              key={o.i}
              onClick={() => choose(o.i)}
              disabled={answered}
              aria-pressed={isPicked}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors',
                !answered && 'hover:border-primary/50 hover:bg-accent/50',
                show && o.correct && 'border-emerald-500/70 bg-emerald-500/10',
                show && !o.correct && 'border-red-500/70 bg-red-500/10',
                answered && !show && 'opacity-60',
              )}
            >
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1" dangerouslySetInnerHTML={{ __html: o.html }} />
              {show && (o.correct ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" aria-label="Correct" /> : <XCircle className="h-5 w-5 shrink-0 text-red-500" aria-label="Incorrect" />)}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={cn('mt-3 rounded-lg border-l-4 p-3', correct ? 'border-emerald-500 bg-emerald-500/5' : 'border-amber-500 bg-amber-500/5')} aria-live="polite">
          <div className="mb-1 text-sm font-semibold">{correct ? 'Correct' : 'Not quite'}</div>
          <Prose html={check.explain} className="prose-p:my-1" />
        </div>
      )}
    </div>
  )
}
