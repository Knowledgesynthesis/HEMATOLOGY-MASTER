import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InsightList } from '@/components/InsightList'
import { Check, SelectField } from '@/components/ui/Field'
import { interpretHemolysis, type HemolysisInput } from '@/lib/interpret/hemolysis'
import { cn } from '@/lib/utils'
import { Panel, ToolShell } from './ToolShell'

const INIT: HemolysisInput = { ageGroup: 'child', retic: 'unknown', ldh: 'unknown', haptoglobin: 'unknown', indirectBili: 'unknown', hemoglobinuria: false, dat: 'not-done', smear: 'none', lowPlatelets: false, aki: false, recentTransfusion: false, trigger: 'none' }

export function HemolysisTool() {
  const [i, setI] = useState<HemolysisInput>(INIT)
  const r = useMemo(() => interpretHemolysis(i), [i])
  const set = <K extends keyof HemolysisInput>(k: K) => (v: HemolysisInput[K]) => setI((s) => ({ ...s, [k]: v }))
  return (
    <ToolShell id="hemolysis" onReset={() => setI(INIT)} learn={[{ label: 'Hemolysis markers', href: '/learn/hemolysis#markers' }, { label: 'DAT-first approach', href: '/learn/hemolysis#approach' }]}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Findings">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField label="Age group" value={i.ageGroup} onChange={set('ageGroup')} options={[{ value: 'neonate', label: 'Neonate' }, { value: 'young-infant', label: 'Infant < 6 months' }, { value: 'child', label: 'Child' }, { value: 'adult', label: 'Adult' }]} />
            <SelectField label="Reticulocytes" value={i.retic} onChange={set('retic')} options={[{ value: 'unknown', label: 'Not known' }, { value: 'high', label: 'High' }, { value: 'normal', label: 'Normal' }, { value: 'low', label: 'Low' }]} />
            <SelectField label="LDH" value={i.ldh} onChange={set('ldh')} options={[{ value: 'unknown', label: 'Not known' }, { value: 'high', label: 'High' }, { value: 'normal', label: 'Normal' }]} />
            <SelectField label="Haptoglobin" value={i.haptoglobin} onChange={set('haptoglobin')} options={[{ value: 'unknown', label: 'Not known' }, { value: 'low', label: 'Low / undetectable' }, { value: 'normal', label: 'Normal' }]} />
            <SelectField label="Indirect bilirubin" value={i.indirectBili} onChange={set('indirectBili')} options={[{ value: 'unknown', label: 'Not known' }, { value: 'high', label: 'High' }, { value: 'normal', label: 'Normal' }]} />
            <SelectField label="DAT" value={i.dat} onChange={set('dat')} options={[{ value: 'not-done', label: 'Not done' }, { value: 'negative', label: 'Negative' }, { value: 'igg', label: 'IgG positive' }, { value: 'c3', label: 'C3 only' }, { value: 'igg-c3', label: 'IgG + C3' }]} />
            <SelectField
              label="Key smear finding"
              value={i.smear}
              onChange={set('smear')}
              options={[
                { value: 'none', label: 'None specific' },
                { value: 'spherocytes', label: 'Spherocytes' },
                { value: 'schistocytes', label: 'Schistocytes' },
                { value: 'bite', label: 'Bite / blister cells' },
                { value: 'sickle', label: 'Sickle cells' },
                { value: 'targets', label: 'Target cells' },
                { value: 'elliptocytes', label: 'Elliptocytes' },
                { value: 'acanthocytes', label: 'Acanthocytes' },
                { value: 'agglutination', label: 'Agglutination' },
              ]}
            />
            <SelectField label="Context" value={i.trigger} onChange={set('trigger')} options={[{ value: 'none', label: 'None' }, { value: 'infection', label: 'Recent infection' }, { value: 'oxidant', label: 'Oxidant drug / fava' }, { value: 'cold', label: 'Cold exposure' }, { value: 'diarrhea', label: 'Bloody diarrhea' }]} />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Check label="Hemoglobinuria" hint="Dipstick blood + without RBCs" checked={i.hemoglobinuria} onChange={set('hemoglobinuria')} />
            <Check label="Low platelets" checked={i.lowPlatelets} onChange={set('lowPlatelets')} />
            <Check label="Acute kidney injury" checked={i.aki} onChange={set('aki')} />
            <Check label="Transfused in past 4 weeks" checked={i.recentTransfusion} onChange={set('recentTransfusion')} />
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel>
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', r.likelihood === 'likely' ? 'bg-red-500/15 text-red-500' : r.likelihood === 'possible' ? 'bg-amber-500/15 text-amber-500' : 'bg-emerald-500/15 text-emerald-500')}>
                Hemolysis {r.likelihood}
              </span>
              <span className="text-sm text-muted-foreground">{r.score} supporting marker{r.score === 1 ? '' : 's'}</span>
              {r.site !== 'undetermined' && <span className="text-sm text-muted-foreground">· {r.site}</span>}
            </div>
          </Panel>
          {r.candidates.length > 0 && (
            <Panel title="Differential">
              <ol className="space-y-3">
                {r.candidates.map((c, k) => (
                  <li key={c.name} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{k + 1}</span>
                    <div className="text-sm">
                      <div className="font-semibold">{c.href ? <Link to={c.href} className="hover:underline">{c.name}</Link> : c.name}</div>
                      <div className="text-muted-foreground">{c.why}</div>
                      <div className="text-xs">Next: {c.next}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          )}
          <InsightList insights={r.insights} />
        </div>
      </div>
    </ToolShell>
  )
}
