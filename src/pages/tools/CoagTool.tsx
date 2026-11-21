import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InsightList } from '@/components/InsightList'
import { Check, SelectField } from '@/components/ui/Field'
import { interpretCoag, type CoagInput } from '@/lib/interpret/coag'
import { Panel, ToolShell } from './ToolShell'

const INIT: CoagInput = { pt: 'normal', aptt: 'prolonged', fibrinogen: 'normal', platelets: 'normal', tt: 'unknown', mixing: 'not-done', bleeding: 'none', ctx: {} }

export function CoagTool() {
  const [i, setI] = useState<CoagInput>(INIT)
  const r = useMemo(() => interpretCoag(i), [i])
  const set = <K extends keyof CoagInput>(k: K) => (v: CoagInput[K]) => setI((s) => ({ ...s, [k]: v }))
  const ctx = (k: keyof CoagInput['ctx']) => (v: boolean) => setI((s) => ({ ...s, ctx: { ...s.ctx, [k]: v } }))
  return (
    <ToolShell id="coagulation" onReset={() => setI(INIT)} learn={[{ label: 'PT/aPTT patterns', href: '/learn/bleeding#screening-labs' }, { label: 'Mixing studies', href: '/learn/bleeding#mixing' }, { label: 'Developmental hemostasis', href: '/learn/foundations#hemostasis' }]}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Results">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField label="PT / INR" value={i.pt} onChange={set('pt')} options={[{ value: 'normal', label: 'Normal' }, { value: 'prolonged', label: 'Prolonged' }]} />
            <SelectField label="aPTT" value={i.aptt} onChange={set('aptt')} options={[{ value: 'normal', label: 'Normal' }, { value: 'prolonged', label: 'Prolonged' }]} />
            <SelectField label="Fibrinogen" value={i.fibrinogen} onChange={set('fibrinogen')} options={[{ value: 'unknown', label: 'Not known' }, { value: 'normal', label: 'Normal' }, { value: 'low', label: 'Low' }]} />
            <SelectField label="Platelets" value={i.platelets} onChange={set('platelets')} options={[{ value: 'normal', label: 'Normal' }, { value: 'low', label: 'Low' }]} />
            <SelectField label="Thrombin time" value={i.tt} onChange={set('tt')} options={[{ value: 'unknown', label: 'Not done' }, { value: 'normal', label: 'Normal' }, { value: 'prolonged', label: 'Prolonged' }]} />
            <SelectField
              label="1:1 mixing study"
              value={i.mixing}
              onChange={set('mixing')}
              options={[
                { value: 'not-done', label: 'Not done' },
                { value: 'corrects', label: 'Corrects' },
                { value: 'no-correct', label: 'Does not correct' },
                { value: 'late-prolong', label: 'Corrects, prolongs after incubation' },
              ]}
            />
            <SelectField
              label="Bleeding history"
              value={i.bleeding}
              onChange={set('bleeding')}
              options={[
                { value: 'none', label: 'None' },
                { value: 'mucocutaneous', label: 'Mucocutaneous' },
                { value: 'deep', label: 'Deep tissue / joints / surgical' },
              ]}
            />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Check label="Neonate" checked={!!i.ctx.neonate} onChange={ctx('neonate')} />
            <Check label="Vitamin K risk" hint="No prophylaxis, cholestasis, malabsorption" checked={!!i.ctx.vitkRisk} onChange={ctx('vitkRisk')} />
            <Check label="Heparin / line sample" checked={!!i.ctx.heparin} onChange={ctx('heparin')} />
            <Check label="Warfarin" checked={!!i.ctx.warfarin} onChange={ctx('warfarin')} />
            <Check label="DOAC / argatroban" checked={!!i.ctx.doac} onChange={ctx('doac')} />
            <Check label="Emicizumab" checked={!!i.ctx.emicizumab} onChange={ctx('emicizumab')} />
            <Check label="Liver disease" checked={!!i.ctx.liver} onChange={ctx('liver')} />
            <Check label="Sepsis / critically ill" checked={!!i.ctx.sick} onChange={ctx('sick')} />
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title={r.pattern}>
            <ol className="space-y-3">
              {r.differential.map((d, k) => (
                <li key={d.name} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{k + 1}</span>
                  <div className="text-sm">
                    <div className="font-semibold">{d.href ? <Link to={d.href} className="hover:underline">{d.name}</Link> : d.name}</div>
                    <div className="text-muted-foreground">{d.why}</div>
                    <div className="text-xs">Next: {d.next}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>
          <InsightList insights={r.insights} />
        </div>
      </div>
    </ToolShell>
  )
}
