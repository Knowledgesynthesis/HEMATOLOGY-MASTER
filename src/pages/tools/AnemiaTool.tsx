import { useMemo, useState } from 'react'
import { InsightList } from '@/components/InsightList'
import { NumberField } from '@/components/ui/Field'
import { anemiaWorkup } from '@/lib/interpret/anemia'
import { num } from '@/lib/interpret/types'
import { AgeSexInput, ageDaysOf, type AgeSexState } from './AgeSex'
import { Panel, ToolShell } from './ToolShell'

const PRESETS = [
  { label: 'TEC toddler', as: { age: '3', unit: 'years', sex: 'female' }, v: { hb: '7.9', mcv: '82', retic: '0.1', rbc: '2.8', hct: '' } },
  { label: 'HS school-ager', as: { age: '7', unit: 'years', sex: 'male' }, v: { hb: '9.8', mcv: '84', retic: '8', rbc: '3.2', hct: '' } },
  { label: 'β-thal trait adult', as: { age: '25', unit: 'years', sex: 'female' }, v: { hb: '11.6', mcv: '63', retic: '1.2', rbc: '5.9', hct: '' } },
  { label: 'Infant B12', as: { age: '9', unit: 'months', sex: 'male' }, v: { hb: '7.9', mcv: '108', retic: '0.5', rbc: '2.2', hct: '' } },
] as const

export function AnemiaTool() {
  const [as, setAs] = useState<AgeSexState>({ age: '3', unit: 'years', sex: 'female' })
  const [v, setV] = useState({ hb: '', mcv: '', retic: '', hct: '', rbc: '' })
  const ageDays = ageDaysOf(as)
  const hb = num(v.hb)
  const r = useMemo(
    () => (ageDays !== undefined && hb !== undefined ? anemiaWorkup({ ageDays, sex: as.sex, hb, mcv: num(v.mcv), retic: num(v.retic), hct: num(v.hct), rbc: num(v.rbc) }) : null),
    [ageDays, as.sex, hb, v],
  )
  const set = (k: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [k]: x }))
  return (
    <ToolShell id="anemia" onReset={() => setV({ hb: '', mcv: '', retic: '', hct: '', rbc: '' })} learn={[{ label: 'Approach to anemia', href: '/learn/anemia#approach' }, { label: 'Reticulocytes', href: '/learn/foundations#retic' }]}>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="self-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Try:</span>
        {PRESETS.map((p) => (
          <button key={p.label} className="rounded-full border px-3 py-1 text-xs hover:bg-accent" onClick={() => { setAs({ ...p.as }); setV({ ...p.v }) }}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Inputs">
          <AgeSexInput value={as} onChange={setAs} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <NumberField label="Hb" unit="g/dL" value={v.hb} onChange={set('hb')} />
            <NumberField label="MCV" unit="fL" value={v.mcv} onChange={set('mcv')} />
            <NumberField label="Retic" unit="%" value={v.retic} onChange={set('retic')} />
            <NumberField label="RBC" unit="×10¹²/L" value={v.rbc} onChange={set('rbc')} hint="For absolute retic & Mentzer" />
            <NumberField label="Hct" unit="%" value={v.hct} onChange={set('hct')} hint="For RPI if no RBC count" />
          </div>
        </Panel>
        <div className="space-y-4">
          {!r ? (
            <Panel>
              <p className="text-sm text-muted-foreground">Enter age and Hb to begin.</p>
            </Panel>
          ) : (
            <>
              <Panel title="Pathway">
                <ol className="space-y-3">
                  {r.steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                      <div>
                        <div className="text-sm text-muted-foreground">{s.question}</div>
                        <div className="font-semibold">{s.answer}</div>
                        <div className="text-xs text-muted-foreground">{s.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Panel>
              {r.anemic && r.differential.length > 0 && (
                <Panel title="Differential (most likely first)">
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {r.differential.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next tests</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {r.nextTests.map((t) => (
                      <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </Panel>
              )}
              {r.insights.length > 0 && <InsightList insights={r.insights} />}
            </>
          )}
        </div>
      </div>
    </ToolShell>
  )
}
