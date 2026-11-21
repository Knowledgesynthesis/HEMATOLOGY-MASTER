import { AlertTriangle, Brain, Lightbulb, Siren, Sparkles, Workflow } from 'lucide-react'
import type { CalloutKind } from '@/content/types'
import { cn } from '@/lib/utils'
import { Prose } from './Prose'

const CFG: Record<CalloutKind, { label: string; icon: typeof Lightbulb; cls: string; iconCls: string }> = {
  pearl: { label: 'Clinical pearl', icon: Lightbulb, cls: 'border-amber-500/40 bg-amber-500/[0.07]', iconCls: 'text-amber-500' },
  pitfall: { label: 'Pitfall', icon: AlertTriangle, cls: 'border-orange-500/40 bg-orange-500/[0.07]', iconCls: 'text-orange-500' },
  redflag: { label: 'Red flag', icon: Siren, cls: 'border-red-500/50 bg-red-500/[0.08]', iconCls: 'text-red-500' },
  update: { label: 'What’s new', icon: Sparkles, cls: 'border-sky-500/40 bg-sky-500/[0.07]', iconCls: 'text-sky-500' },
  algo: { label: 'Approach', icon: Workflow, cls: 'border-indigo-500/40 bg-indigo-500/[0.06]', iconCls: 'text-indigo-500' },
  mnemonic: { label: 'Mnemonic', icon: Brain, cls: 'border-emerald-500/40 bg-emerald-500/[0.07]', iconCls: 'text-emerald-500' },
}

export function Callout({ variant, title, html, year }: { variant: CalloutKind; title?: string; html: string; year?: string }) {
  const c = CFG[variant]
  const Icon = c.icon
  return (
    <aside className={cn('my-4 rounded-xl border p-4', c.cls)} aria-label={c.label}>
      <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
        <Icon className={cn('h-4 w-4 shrink-0', c.iconCls)} aria-hidden />
        <span className={cn('text-xs font-bold uppercase tracking-wider', c.iconCls)}>{c.label}</span>
        {year && <span className="rounded bg-sky-500/15 px-1.5 py-px text-[11px] font-bold text-sky-500">{year}</span>}
        {title && <span className="text-foreground">{title}</span>}
      </div>
      <Prose html={html} className="prose-p:my-1 prose-ul:my-1" />
    </aside>
  )
}
