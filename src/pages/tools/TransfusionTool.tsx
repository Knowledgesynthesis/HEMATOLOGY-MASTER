import { useMemo, useState } from 'react'
import { Check, SelectField } from '@/components/ui/Field'
import { rankReactions, UNIVERSAL_STEPS, type ReactionInput } from '@/lib/interpret/transfusion'
import { Panel, ToolShell } from './ToolShell'

const INIT: ReactionInput = { onset: 'under6h', product: 'rbc', fever: false, highFever: false, hypotension: false, hypertension: false, hypoxemia: false, infiltrates: false, overload: false, bnpHigh: false, urticaria: false, anaphylaxis: false, flankPain: false, hemoglobinuria: false, datPositive: false, hbFallJaundice: false, pancytopeniaRash: false, severeThrombocytopenia: false }

const FLAGS: [keyof ReactionInput, string, string?][] = [
  ['fever', 'Fever', '≥ 38 °C and rise ≥ 1 °C'],
  ['highFever', 'High fever / rigors', '≥ 39 °C or rise ≥ 2 °C'],
  ['hypotension', 'Hypotension'],
  ['hypertension', 'Hypertension'],
  ['hypoxemia', 'Dyspnea / hypoxemia'],
  ['infiltrates', 'Bilateral infiltrates'],
  ['overload', 'Volume overload signs', 'JVD, edema, positive fluid balance'],
  ['bnpHigh', 'BNP / NT-proBNP raised'],
  ['urticaria', 'Urticaria / pruritus'],
  ['anaphylaxis', 'Angioedema / wheeze / stridor'],
  ['flankPain', 'Flank / back pain'],
  ['hemoglobinuria', 'Hemoglobinuria / dark urine'],
  ['datPositive', 'DAT positive'],
  ['hbFallJaundice', 'Falling Hb / jaundice'],
  ['pancytopeniaRash', 'Pancytopenia + rash / diarrhea / LFTs'],
  ['severeThrombocytopenia', 'New severe thrombocytopenia'],
]

export function TransfusionTool() {
  const [i, setI] = useState<ReactionInput>(INIT)
  const ranked = useMemo(() => rankReactions(i), [i])
  const any = FLAGS.some(([k]) => i[k])
  return (
    <ToolShell id="transfusion-reactions" onReset={() => setI(INIT)} learn={[{ label: 'Transfusion reactions', href: '/learn/transfusion#reactions' }]}>
      <Panel title="First, for any reaction" className="mb-5 border-red-500/40 bg-red-500/[0.05]">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {UNIVERSAL_STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Panel>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Panel title="Findings">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField
              label="Onset"
              value={i.onset}
              onChange={(onset) => setI((s) => ({ ...s, onset }))}
              options={[
                { value: 'minutes', label: 'Within minutes' },
                { value: 'under6h', label: 'During / < 6 h' },
                { value: '6to12h', label: '6–12 h' },
                { value: 'days', label: 'Days later (1–28 d)' },
              ]}
            />
            <SelectField label="Product" value={i.product} onChange={(product) => setI((s) => ({ ...s, product }))} options={[{ value: 'rbc', label: 'Red cells' }, { value: 'platelets', label: 'Platelets' }, { value: 'plasma', label: 'Plasma / cryo' }]} />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {FLAGS.map(([k, label, hint]) => (
              <Check key={k} label={label} hint={hint} checked={i[k] as boolean} onChange={(v) => setI((s) => ({ ...s, [k]: v }))} />
            ))}
          </div>
        </Panel>
        <Panel title="Most likely">
          {!any ? (
            <p className="text-sm text-muted-foreground">Select the findings present.</p>
          ) : ranked.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pattern fits well. Reassess timing and findings, and discuss with the blood bank.</p>
          ) : (
            <ol className="space-y-4">
              {ranked.slice(0, 4).map((r, k) => (
                <li key={r.id} className={k === 0 ? 'rounded-xl border border-primary/40 bg-primary/5 p-3' : 'px-3'}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{r.name}</span>
                    {k === 0 && <span className="rounded bg-primary/15 px-1.5 text-[11px] font-bold text-primary">TOP</span>}
                  </div>
                  {r.matched.length > 0 && <div className="mt-0.5 text-xs text-muted-foreground">Fits: {r.matched.join(' · ')}</div>}
                  <div className="mt-1 text-sm">{r.action}</div>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </ToolShell>
  )
}
