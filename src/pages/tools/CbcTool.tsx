import { useMemo, useState } from 'react'
import { InsightList, TONE } from '@/components/InsightList'
import { Check, NumberField } from '@/components/ui/Field'
import { interpretCbc } from '@/lib/interpret/cbc'
import { num } from '@/lib/interpret/types'
import { cn } from '@/lib/utils'
import { AgeSexInput, ageDaysOf, defaultAgeSex, type AgeSexState } from './AgeSex'
import { Panel, ToolShell } from './ToolShell'

type V = Record<'hb' | 'hct' | 'mcv' | 'rdw' | 'rbc' | 'wbc' | 'anc' | 'alc' | 'platelets' | 'retic', string>
const EMPTY: V = { hb: '', hct: '', mcv: '', rdw: '', rbc: '', wbc: '', anc: '', alc: '', platelets: '', retic: '' }

const PRESETS: { label: string; as: AgeSexState; v: Partial<V>; blasts?: boolean }[] = [
  { label: 'Milk-drinking toddler', as: { age: '20', unit: 'months', sex: 'male' }, v: { hb: '6.9', mcv: '59', rdw: '19', rbc: '3.6', platelets: '520', retic: '1.0', wbc: '9.1' } },
  { label: 'Child with petechiae', as: { age: '4', unit: 'years', sex: 'female' }, v: { hb: '12.1', mcv: '80', wbc: '7.8', anc: '3.5', platelets: '8' } },
  { label: 'Limp + night pain', as: { age: '3', unit: 'years', sex: 'male' }, v: { hb: '9.1', mcv: '82', wbc: '4.2', anc: '0.8', platelets: '88', retic: '0.4' } },
  { label: 'Polycythemic newborn', as: { age: '1', unit: 'days', sex: 'male' }, v: { hb: '23.5', hct: '70', mcv: '108', platelets: '140' } },
  { label: '2-month-old (nadir)', as: { age: '9', unit: 'weeks', sex: 'female' }, v: { hb: '9.6', mcv: '92', retic: '1.5', platelets: '320' } },
  { label: 'Adult macrocytosis', as: { age: '72', unit: 'years', sex: 'male' }, v: { hb: '9.8', mcv: '108', wbc: '3.1', anc: '1.2', platelets: '96' } },
]

export function CbcTool() {
  const [as, setAs] = useState<AgeSexState>({ ...defaultAgeSex, age: '3', unit: 'years' })
  const [v, setV] = useState<V>(EMPTY)
  const [blasts, setBlasts] = useState(false)
  const ageDays = ageDaysOf(as)
  const set = (k: keyof V) => (x: string) => setV((s) => ({ ...s, [k]: x }))

  const result = useMemo(() => {
    if (ageDays === undefined) return null
    return interpretCbc({ ageDays, sex: as.sex, hb: num(v.hb), hct: num(v.hct), mcv: num(v.mcv), rdw: num(v.rdw), rbc: num(v.rbc), wbc: num(v.wbc), anc: num(v.anc), alc: num(v.alc), platelets: num(v.platelets), retic: num(v.retic), blasts })
  }, [ageDays, as.sex, v, blasts])

  return (
    <ToolShell
      id="cbc"
      onReset={() => {
        setV(EMPTY)
        setBlasts(false)
      }}
      learn={[
        { label: 'Reading the CBC', href: '/learn/foundations#cbc' },
        { label: 'Normal values', href: '/normal-values' },
      ]}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="self-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Try:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className="rounded-full border px-3 py-1 text-xs hover:bg-accent"
            onClick={() => {
              setAs(p.as)
              setV({ ...EMPTY, ...p.v })
              setBlasts(!!p.blasts)
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Panel title="Patient & values">
          <AgeSexInput value={as} onChange={setAs} />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <NumberField label="Hb" unit="g/dL" value={v.hb} onChange={set('hb')} />
            <NumberField label="Hct" unit="%" value={v.hct} onChange={set('hct')} />
            <NumberField label="MCV" unit="fL" value={v.mcv} onChange={set('mcv')} />
            <NumberField label="RDW" unit="%" value={v.rdw} onChange={set('rdw')} />
            <NumberField label="RBC" unit="×10¹²/L" value={v.rbc} onChange={set('rbc')} />
            <NumberField label="Retic" unit="%" value={v.retic} onChange={set('retic')} />
            <NumberField label="WBC" unit="×10⁹/L" value={v.wbc} onChange={set('wbc')} />
            <NumberField label="ANC" unit="×10⁹/L" value={v.anc} onChange={set('anc')} />
            <NumberField label="Lymphocytes" unit="×10⁹/L" value={v.alc} onChange={set('alc')} />
            <NumberField label="Platelets" unit="×10⁹/L" value={v.platelets} onChange={set('platelets')} />
          </div>
          <div className="mt-3">
            <Check label="Blasts reported on smear" checked={blasts} onChange={setBlasts} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Leave a field blank if it wasn’t measured; blank fields are never assumed normal.</p>
        </Panel>
        <div className="space-y-4">
          {!result ? (
            <Panel>
              <p className="text-sm text-muted-foreground">Enter an age to apply the correct reference band.</p>
            </Panel>
          ) : (
            <>
              <Panel title={`Reference band: ${result.band}`}>
                {result.rows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Enter values to see flags.</p>
                ) : (
                  <div className="divide-y">
                    {result.rows.map((r) => (
                      <div key={r.key} className="flex items-center gap-3 py-2 text-sm">
                        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', r.tone === 'ok' ? 'bg-emerald-500' : r.tone === 'info' ? 'bg-sky-500' : r.tone === 'warn' ? 'bg-amber-500' : 'bg-red-500')} />
                        <span className="w-28 shrink-0 font-medium">{r.label}</span>
                        <span className="tabular-nums">
                          {r.value} <span className="text-xs text-muted-foreground">{r.unit}</span>
                        </span>
                        <span className="ml-auto text-right text-xs text-muted-foreground">
                          {r.note && <span className={cn('mr-2 font-semibold', TONE[r.tone].text)}>{r.note}</span>}
                          ref {r.ref}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {result.computed.length > 0 && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {result.computed.map((c) => (
                      <div key={c.label} className="rounded-lg bg-muted/50 p-2.5 text-sm">
                        <div className="text-xs text-muted-foreground">{c.label}</div>
                        <div className="font-semibold tabular-nums">{c.value}</div>
                        <div className="text-xs text-muted-foreground">{c.note}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
              {result.insights.length > 0 && <InsightList insights={result.insights} />}
            </>
          )}
        </div>
      </div>
    </ToolShell>
  )
}
