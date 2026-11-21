import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, NumberField, Segmented } from '@/components/ui/Field'
import { num } from '@/lib/interpret/types'
import { fourTs, hlh2004, istDic, plasmic, type FourTsInput, type PlasmicInput } from '@/lib/scores'
import { cn } from '@/lib/utils'
import { Panel, ToolShell } from './ToolShell'

type Tab = '4ts' | 'plasmic' | 'dic' | 'hlh'

function Pick<T extends number>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { v: T; text: string }[] }) {
  return (
    <fieldset className="space-y-1.5">
      <legend className="text-sm font-semibold">{label}</legend>
      {options.map((o) => (
        <label key={o.v} className={cn('flex cursor-pointer items-start gap-3 rounded-lg border p-2.5 text-sm', value === o.v && 'border-primary/60 bg-primary/5')}>
          <input type="radio" className="mt-0.5 accent-[hsl(var(--primary))]" checked={value === o.v} onChange={() => onChange(o.v)} />
          <span className="flex-1">{o.text}</span>
          <span className="font-mono text-xs text-muted-foreground">+{o.v}</span>
        </label>
      ))}
    </fieldset>
  )
}

function Result({ total, max, band, tone, children }: { total: number; max: number; band: string; tone: 'ok' | 'warn' | 'danger'; children?: React.ReactNode }) {
  return (
    <div className={cn('sticky top-20 rounded-2xl border p-5', tone === 'danger' ? 'border-red-500/50 bg-red-500/[0.07]' : tone === 'warn' ? 'border-amber-500/50 bg-amber-500/[0.07]' : 'border-emerald-500/50 bg-emerald-500/[0.07]')}>
      <div className="text-4xl font-bold tabular-nums">
        {total}
        <span className="text-lg text-muted-foreground">/{max}</span>
      </div>
      <div className="mt-1 font-semibold">{band}</div>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

function FourTs() {
  const [s, setS] = useState<FourTsInput>({ thrombocytopenia: 0, timing: 0, thrombosis: 0, otherCauses: 0 })
  const r = fourTs(s)
  const u = <K extends keyof FourTsInput>(k: K) => (v: FourTsInput[K]) => setS((x) => ({ ...x, [k]: v }))
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <div className="space-y-4">
          <Pick label="Thrombocytopenia" value={s.thrombocytopenia} onChange={u('thrombocytopenia')} options={[{ v: 2, text: 'Fall > 50% and nadir ≥ 20 × 10⁹/L' }, { v: 1, text: 'Fall 30–50% or nadir 10–19' }, { v: 0, text: 'Fall < 30% or nadir < 10' }]} />
          <Pick label="Timing of fall" value={s.timing} onChange={u('timing')} options={[{ v: 2, text: 'Clear onset day 5–10, or ≤ 1 day with heparin in past 30 days' }, { v: 1, text: 'Consistent with day 5–10 but unclear; after day 10; or ≤ 1 day with heparin 30–100 days ago' }, { v: 0, text: 'Fall < 4 days without recent heparin' }]} />
          <Pick label="Thrombosis or sequelae" value={s.thrombosis} onChange={u('thrombosis')} options={[{ v: 2, text: 'New thrombosis, skin necrosis, or acute systemic reaction after UFH bolus' }, { v: 1, text: 'Progressive/recurrent/suspected thrombosis, non-necrotizing skin lesions' }, { v: 0, text: 'None' }]} />
          <Pick label="Other causes of thrombocytopenia" value={s.otherCauses} onChange={u('otherCauses')} options={[{ v: 2, text: 'None apparent' }, { v: 1, text: 'Possible' }, { v: 0, text: 'Definite' }]} />
        </div>
      </Panel>
      <Result total={r.total} max={8} band={`${r.band[0].toUpperCase() + r.band.slice(1)} probability`} tone={r.band === 'low' ? 'ok' : r.band === 'intermediate' ? 'warn' : 'danger'}>
        {r.band === 'low'
          ? 'HIT very unlikely (NPV > 99%). Don’t test; continue heparin and look for another cause.'
          : 'Stop all heparin, start a non-heparin anticoagulant, send PF4 immunoassay (then SRA if positive), image for DVT. No warfarin until platelets ≥ 150.'}{' '}
        <Link to="/learn/platelets#hit" className="text-primary hover:underline">
          HIT →
        </Link>
      </Result>
    </div>
  )
}

function Plasmic() {
  const [s, setS] = useState<PlasmicInput>({ plateletsUnder30: false, hemolysis: false, noActiveCancer: false, noTransplant: false, mcvUnder90: false, inrUnder1_5: false, creatinineUnder2: false })
  const r = plasmic(s)
  const items: [keyof PlasmicInput, string, string?][] = [
    ['plateletsUnder30', 'Platelets < 30 × 10⁹/L'],
    ['hemolysis', 'Hemolysis', 'Retic > 2.5%, undetectable haptoglobin, or indirect bilirubin > 2 mg/dL'],
    ['noActiveCancer', 'No active cancer'],
    ['noTransplant', 'No solid-organ or stem-cell transplant'],
    ['mcvUnder90', 'MCV < 90 fL'],
    ['inrUnder1_5', 'INR < 1.5'],
    ['creatinineUnder2', 'Creatinine < 2.0 mg/dL'],
  ]
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <p className="mb-3 text-sm text-muted-foreground">Adults with suspected TMA. Validated in adults, not children.</p>
        <div className="grid gap-2">
          {items.map(([k, l, h]) => (
            <Check key={k} label={l} hint={h} checked={s[k]} onChange={(v) => setS((x) => ({ ...x, [k]: v }))} />
          ))}
        </div>
      </Panel>
      <Result total={r.total} max={7} band={`${r.band[0].toUpperCase() + r.band.slice(1)} risk of severe ADAMTS13 deficiency`} tone={r.band === 'low' ? 'ok' : r.band === 'intermediate' ? 'warn' : 'danger'}>
        {r.band === 'high' ? 'Draw ADAMTS13, then start plasma exchange + steroids ± caplacizumab now.' : r.band === 'intermediate' ? 'Intermediate: ADAMTS13 urgently; low threshold to treat.' : 'iTTP less likely; pursue other TMAs (HUS, DIC, drugs, malignancy).'}{' '}
        <Link to="/learn/hemolysis#ttp" className="text-primary hover:underline">
          TTP →
        </Link>
      </Result>
    </div>
  )
}

function Dic() {
  const [v, setV] = useState({ plt: '', pt: '', fib: '' })
  const [fm, setFm] = useState<0 | 2 | 3>(0)
  const plt = num(v.plt), pt = num(v.pt), fib = num(v.fib)
  const ready = plt !== undefined && pt !== undefined && fib !== undefined
  const r = ready ? istDic({ platelets: plt!, fibrinMarker: fm, ptProlongationSec: pt!, fibrinogenGL: fib! }) : null
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <p className="mb-3 text-sm text-muted-foreground">Use only when an underlying disorder known to cause DIC is present.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <NumberField label="Platelets" unit="×10⁹/L" value={v.plt} onChange={(x) => setV((s) => ({ ...s, plt: x }))} />
          <NumberField label="PT prolongation" unit="seconds above ULN" value={v.pt} onChange={(x) => setV((s) => ({ ...s, pt: x }))} />
          <NumberField label="Fibrinogen" unit="g/L" value={v.fib} onChange={(x) => setV((s) => ({ ...s, fib: x }))} hint="1 g/L = 100 mg/dL" />
        </div>
        <div className="mt-4">
          <div className="mb-1.5 text-sm font-semibold">D-dimer / FDP</div>
          <Segmented label="Fibrin marker" value={String(fm) as '0' | '2' | '3'} onChange={(x) => setFm(Number(x) as 0 | 2 | 3)} options={[{ value: '0', label: 'No increase' }, { value: '2', label: 'Moderate' }, { value: '3', label: 'Strong' }]} />
        </div>
      </Panel>
      {r ? (
        <Result total={r.total} max={8} band={r.overt ? 'Overt DIC (≥ 5)' : 'Not overt DIC; repeat in 1–2 days'} tone={r.overt ? 'danger' : 'warn'}>
          Platelets {r.parts.plt} · fibrin marker {r.parts.fibrin} · PT {r.parts.pt} · fibrinogen {r.parts.fib}.{' '}
          <Link to="/learn/platelets#dic" className="text-primary hover:underline">
            DIC →
          </Link>
        </Result>
      ) : (
        <Panel>
          <p className="text-sm text-muted-foreground">Enter platelets, PT prolongation and fibrinogen.</p>
        </Panel>
      )}
    </div>
  )
}

function Hlh() {
  const [b, setB] = useState({ fever: false, spleen: false, hemo: false, nk: false, molecular: false, infant: false })
  const [v, setV] = useState({ hb: '', plt: '', anc: '', tg: '', fib: '', ferritin: '', cd25: '' })
  const r = hlh2004({ ageDays: b.infant ? 10 : 400, feverAtLeast38_5: b.fever, splenomegaly: b.spleen, hb: num(v.hb), platelets: num(v.plt), anc: num(v.anc), triglycerides: num(v.tg), fibrinogen: num(v.fib), hemophagocytosis: b.hemo, lowNkActivity: b.nk, ferritin: num(v.ferritin), sCD25: num(v.cd25), molecularDiagnosis: b.molecular })
  const crit: [keyof typeof r.criteria, string][] = [
    ['fever', 'Fever ≥ 38.5 °C'],
    ['splenomegaly', 'Splenomegaly'],
    ['cytopenias', `Cytopenias ≥ 2 lines (${r.cytoLines} now)`],
    ['lipidsOrFibrinogen', 'TG ≥ 265 and/or fibrinogen ≤ 150'],
    ['hemophagocytosis', 'Hemophagocytosis'],
    ['lowNk', 'Low/absent NK activity'],
    ['ferritin', 'Ferritin ≥ 500 µg/L'],
    ['sCD25', 'sCD25 ≥ 2,400 U/mL'],
  ]
  const setN = (k: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [k]: x }))
  const setC = (k: keyof typeof b) => (x: boolean) => setB((s) => ({ ...s, [k]: x }))
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-2">
          <Check label="Fever ≥ 38.5 °C" checked={b.fever} onChange={setC('fever')} />
          <Check label="Splenomegaly" checked={b.spleen} onChange={setC('spleen')} />
          <Check label="Hemophagocytosis (marrow/spleen/node/liver)" checked={b.hemo} onChange={setC('hemo')} />
          <Check label="Low or absent NK-cell activity" checked={b.nk} onChange={setC('nk')} />
          <Check label="Infant < 4 weeks" hint="Hb cut-off 10 g/dL" checked={b.infant} onChange={setC('infant')} />
          <Check label="Molecular diagnosis (e.g., PRF1, UNC13D)" checked={b.molecular} onChange={setC('molecular')} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <NumberField label="Hb" unit="g/dL" value={v.hb} onChange={setN('hb')} />
          <NumberField label="Platelets" unit="×10⁹/L" value={v.plt} onChange={setN('plt')} />
          <NumberField label="ANC" unit="×10⁹/L" value={v.anc} onChange={setN('anc')} />
          <NumberField label="Ferritin" unit="µg/L" value={v.ferritin} onChange={setN('ferritin')} />
          <NumberField label="Triglycerides" unit="mg/dL" value={v.tg} onChange={setN('tg')} />
          <NumberField label="Fibrinogen" unit="mg/dL" value={v.fib} onChange={setN('fib')} />
          <NumberField label="sCD25" unit="U/mL" value={v.cd25} onChange={setN('cd25')} />
        </div>
      </Panel>
      <Result total={r.met} max={8} band={r.fulfilled ? 'HLH-2004 criteria fulfilled' : 'Criteria not fulfilled'} tone={r.fulfilled ? 'danger' : r.met >= 3 ? 'warn' : 'ok'}>
        <ul className="mt-1 space-y-0.5">
          {crit.map(([k, l]) => (
            <li key={k} className={r.criteria[k] ? 'text-foreground' : 'opacity-60'}>
              {r.criteria[k] ? '✓' : '·'} {l}
            </li>
          ))}
        </ul>
        <p className="mt-2">In secondary HLH, ≥ 4 criteria (or HScore ≥ 169) performed best in a 2025 validation. </p>
        <Link to="/learn/marrow#hlh" className="text-primary hover:underline">
          HLH →
        </Link>
      </Result>
    </div>
  )
}

export function ScoresTool() {
  const [tab, setTab] = useState<Tab>('4ts')
  return (
    <ToolShell id="scores">
      <div className="mb-5 overflow-x-auto">
        <Segmented<Tab> label="Score" value={tab} onChange={setTab} options={[{ value: '4ts', label: '4Ts (HIT)' }, { value: 'plasmic', label: 'PLASMIC (TTP)' }, { value: 'dic', label: 'ISTH DIC' }, { value: 'hlh', label: 'HLH-2004' }]} />
      </div>
      {tab === '4ts' && <FourTs />}
      {tab === 'plasmic' && <Plasmic />}
      {tab === 'dic' && <Dic />}
      {tab === 'hlh' && <Hlh />}
    </ToolShell>
  )
}
