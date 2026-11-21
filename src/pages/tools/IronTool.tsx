import { useMemo, useState } from 'react'
import { InsightList } from '@/components/InsightList'
import { Check, NumberField, SelectField } from '@/components/ui/Field'
import { tsat } from '@/lib/calc'
import { FERRITIN_CUTOFF, interpretIron, type IronAge } from '@/lib/interpret/iron'
import { num } from '@/lib/interpret/types'
import { Panel, ToolShell } from './ToolShell'

export function IronTool() {
  const [age, setAge] = useState<IronAge>('under5')
  const [v, setV] = useState({ ferritin: '', iron: '', tibc: '', tsat: '', mcv: '', rbc: '' })
  const [inflam, setInflam] = useState(false)
  const set = (k: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [k]: x }))
  const computedTsat = num(v.tsat) ?? (num(v.iron) !== undefined && num(v.tibc) ? tsat(num(v.iron)!, num(v.tibc)!) : undefined)
  const r = useMemo(() => interpretIron({ age, ferritin: num(v.ferritin), tsat: computedTsat, inflammation: inflam, mcv: num(v.mcv), rbc: num(v.rbc) }), [age, v, inflam, computedTsat])
  const [cut, cutI] = FERRITIN_CUTOFF[age]
  return (
    <ToolShell id="iron" onReset={() => setV({ ferritin: '', iron: '', tibc: '', tsat: '', mcv: '', rbc: '' })} learn={[{ label: 'Pediatric IDA (AAP 2026)', href: '/learn/anemia#ida-peds' }, { label: 'Thal trait vs IDA', href: '/learn/anemia#thal-vs-ida' }, { label: 'Iron physiology', href: '/learn/foundations#iron' }]}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Inputs">
          <SelectField<IronAge>
            label="Age group"
            value={age}
            onChange={setAge}
            options={[
              { value: 'under5', label: 'Under 5 years' },
              { value: 'child', label: '5–11 years' },
              { value: 'adolescent', label: '12–17 years' },
              { value: 'adult', label: 'Adult' },
            ]}
            hint={`Iron deficiency if ferritin < ${cut} (< ${cutI} with inflammation)`}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <NumberField label="Ferritin" unit="ng/mL" value={v.ferritin} onChange={set('ferritin')} />
            <NumberField label="TSAT" unit="%" value={v.tsat} onChange={set('tsat')} hint={computedTsat !== undefined && !v.tsat ? `Calculated: ${computedTsat}%` : 'Or enter iron + TIBC'} />
            <NumberField label="Serum iron" unit="µg/dL" value={v.iron} onChange={set('iron')} />
            <NumberField label="TIBC" unit="µg/dL" value={v.tibc} onChange={set('tibc')} />
            <NumberField label="MCV" unit="fL" value={v.mcv} onChange={set('mcv')} />
            <NumberField label="RBC" unit="×10¹²/L" value={v.rbc} onChange={set('rbc')} />
          </div>
          <div className="mt-3">
            <Check label="Inflammation present" hint="Raised CRP, active infection, IBD, CKD, obesity" checked={inflam} onChange={setInflam} />
          </div>
        </Panel>
        <InsightList insights={r.insights} />
      </div>
    </ToolShell>
  )
}
