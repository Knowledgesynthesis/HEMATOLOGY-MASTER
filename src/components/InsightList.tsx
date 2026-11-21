import { AlertTriangle, CheckCircle2, Info, Siren } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Insight, Tone } from '@/lib/interpret/types'
import { cn } from '@/lib/utils'

export const TONE: Record<Tone, { cls: string; icon: typeof Info; text: string }> = {
  ok: { cls: 'border-emerald-500/40 bg-emerald-500/[0.06]', icon: CheckCircle2, text: 'text-emerald-500' },
  info: { cls: 'border-sky-500/40 bg-sky-500/[0.06]', icon: Info, text: 'text-sky-500' },
  warn: { cls: 'border-amber-500/50 bg-amber-500/[0.07]', icon: AlertTriangle, text: 'text-amber-500' },
  danger: { cls: 'border-red-500/50 bg-red-500/[0.08]', icon: Siren, text: 'text-red-500' },
}

export function InsightList({ insights }: { insights: Insight[] }) {
  return (
    <div className="space-y-3" aria-live="polite">
      {insights.map((ins, i) => {
        const t = TONE[ins.tone]
        const Icon = t.icon
        return (
          <div key={i} className={cn('rounded-xl border p-4', t.cls)}>
            <div className="flex items-center gap-2 font-semibold">
              <Icon className={cn('h-4 w-4 shrink-0', t.text)} aria-hidden />
              {ins.title}
            </div>
            {ins.points.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
                {ins.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            )}
            {ins.links && ins.links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {ins.links.map((l) => (
                  <Link key={l.href + l.label} to={l.href} className="rounded-md border bg-background/60 px-2 py-1 text-xs font-medium hover:bg-accent">
                    {l.label} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
