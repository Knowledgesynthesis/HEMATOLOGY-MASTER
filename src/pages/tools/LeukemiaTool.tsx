import { useMemo, useState } from 'react'
import { InsightList } from '@/components/InsightList'
import { Check, Segmented } from '@/components/ui/Field'
import { assessRedFlags, type RedFlagInput } from '@/lib/interpret/leukemia'
import { cn } from '@/lib/utils'
import { Panel, ToolShell } from './ToolShell'

const INIT: RedFlagInput = { adult: false, anemia: false, neutropenia: false, thrombocytopenia: false, highWbc: false, blasts: false, bonePain: false, organomegaly: false, lymphadenopathy: false, supraclavicular: false, mediastinalMass: false, highLdhUrate: false, bSymptoms: false, coagulopathy: false, cmlPattern: false, matureLymphocytosis: false, monocytosis: false, isolatedLowPltWell: false }

const GROUPS: { title: string; items: [keyof RedFlagInput, string, string?][] }[] = [
  { title: 'Blood count', items: [['anemia', 'Anemia'], ['neutropenia', 'Neutropenia'], ['thrombocytopenia', 'Thrombocytopenia'], ['highWbc', 'WBC > 50 × 10⁹/L'], ['blasts', 'Blasts on smear'], ['coagulopathy', 'Coagulopathy / low fibrinogen'], ['cmlPattern', 'Basophilia / myelocyte bulge'], ['matureLymphocytosis', 'Mature lymphocytosis'], ['monocytosis', 'Monocytosis ≥ 1 × 10⁹/L']] },
  { title: 'Clinical', items: [['bonePain', 'Bone pain / limp / night pain'], ['organomegaly', 'Hepatosplenomegaly'], ['lymphadenopathy', 'Lymphadenopathy'], ['supraclavicular', 'Supraclavicular node'], ['mediastinalMass', 'Mediastinal mass / orthopnea'], ['bSymptoms', 'Fever, sweats, weight loss'], ['highLdhUrate', 'High LDH or uric acid'], ['isolatedLowPltWell', 'Well child, only bruising/petechiae']] },
]

export function LeukemiaTool() {
  const [i, setI] = useState<RedFlagInput>(INIT)
  const r = useMemo(() => assessRedFlags(i), [i])
  const levelCls = { emergent: 'bg-red-500 text-white', high: 'bg-red-500/15 text-red-500', moderate: 'bg-amber-500/15 text-amber-500', low: 'bg-emerald-500/15 text-emerald-500' }[r.level]
  return (
    <ToolShell id="leukemia-red-flags" onReset={() => setI(INIT)} learn={[{ label: 'Pediatric ALL', href: '/learn/leukemia#all-peds' }, { label: 'Oncologic emergencies', href: '/learn/leukemia#emergencies' }, { label: 'When to biopsy a node', href: '/learn/lymphoma#lad-peds' }]}>
      <div className="mb-4">
        <Segmented label="Patient" value={i.adult ? 'adult' : 'child'} onChange={(v) => setI((s) => ({ ...s, adult: v === 'adult' }))} options={[{ value: 'child', label: 'Child / adolescent' }, { value: 'adult', label: 'Adult' }]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {GROUPS.map((g) => (
            <Panel key={g.title} title={g.title}>
              <div className="grid gap-2 sm:grid-cols-2">
                {g.items.map(([k, label]) => (
                  <Check key={k} label={label} checked={i[k] as boolean} onChange={(v) => setI((s) => ({ ...s, [k]: v }))} />
                ))}
              </div>
            </Panel>
          ))}
        </div>
        <div className="space-y-4">
          <Panel>
            <span className={cn('rounded-full px-3 py-1 text-sm font-bold uppercase tracking-wide', levelCls)}>{r.level} concern</span>
          </Panel>
          <InsightList insights={r.insights} />
        </div>
      </div>
    </ToolShell>
  )
}
