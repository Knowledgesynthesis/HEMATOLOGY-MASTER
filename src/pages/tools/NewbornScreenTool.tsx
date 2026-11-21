import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NBS_PATTERNS } from '@/lib/interpret/newbornScreen'
import { cn } from '@/lib/utils'
import { Panel, ToolShell } from './ToolShell'

const URG = { none: 'bg-emerald-500/15 text-emerald-500', routine: 'bg-sky-500/15 text-sky-500', prompt: 'bg-amber-500/15 text-amber-500', urgent: 'bg-red-500/15 text-red-500' }

export function NewbornScreenTool() {
  const [code, setCode] = useState('FS')
  const p = NBS_PATTERNS.find((x) => x.code === code)!
  return (
    <ToolShell id="newborn-screen" learn={[{ label: 'SCD genotypes & screening', href: '/learn/hemoglobinopathies#genetics-nbs' }, { label: 'HPLC interpretation', href: '/learn/hemoglobinopathies#hplc' }]}>
      <p className="mb-4 text-sm text-muted-foreground">Hemoglobins are reported in order of quantity. In a newborn, F comes first, so “FAS” means A &gt; S (trait) and “FSA” means S &gt; A (disease).</p>
      <div className="mb-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Screen result">
        {NBS_PATTERNS.map((x) => (
          <button
            key={x.code}
            role="radio"
            aria-checked={code === x.code}
            onClick={() => setCode(x.code)}
            className={cn('rounded-lg border px-3 py-2 font-mono text-sm font-semibold transition-colors', code === x.code ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent')}
          >
            {x.code}
          </button>
        ))}
      </div>
      <Panel>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-2xl font-bold">{p.code}</span>
          <span className="text-lg font-semibold">{p.meaning}</span>
          <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold uppercase', URG[p.urgency])}>{p.urgency === 'none' ? 'no action' : p.urgency}</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Possible genotypes</div>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {p.genotypes.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next steps</div>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {p.actions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
        {p.pitfalls && <p className="mt-4 rounded-lg bg-amber-500/10 p-3 text-sm">⚠ {p.pitfalls.join(' ')}</p>}
        {p.href && (
          <Link to={p.href} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Read more →
          </Link>
        )}
      </Panel>
    </ToolShell>
  )
}
