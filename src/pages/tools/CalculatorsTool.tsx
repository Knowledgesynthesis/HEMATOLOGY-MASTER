import { useState, type ReactNode } from 'react'
import { Check, NumberField, SelectField } from '@/components/ui/Field'
import * as C from '@/lib/calc'
import { num } from '@/lib/interpret/types'
import { ToolShell } from './ToolShell'

function Calc({ title, children, result, formula }: { title: string; children: ReactNode; result: ReactNode; formula: string }) {
  return (
    <section className="flex flex-col rounded-2xl border bg-card p-4">
      <h2 className="mb-3 font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-3">{children}</div>
      <div className="mt-4 flex-1 rounded-xl bg-muted/50 p-3 text-sm" aria-live="polite">
        {result}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{formula}</p>
    </section>
  )
}

const Big = ({ children }: { children: ReactNode }) => <div className="text-2xl font-bold tabular-nums">{children}</div>
const Dash = () => <span className="text-muted-foreground">Enter values</span>

function useNums<K extends string>(init: Record<K, string>) {
  const [s, setS] = useState(init)
  const set = (k: K) => (v: string) => setS((x) => ({ ...x, [k]: v }))
  const n = Object.fromEntries(Object.entries(s).map(([k, v]) => [k, num(v as string)])) as Record<K, number | undefined>
  return { s, set, n }
}

function AncCalc() {
  const { s, set, n } = useNums({ wbc: '', seg: '', band: '' })
  const ok = n.wbc !== undefined && n.seg !== undefined
  const a = ok ? C.anc(n.wbc!, n.seg!, n.band ?? 0) : undefined
  return (
    <Calc title="Absolute neutrophil count" formula="ANC = WBC × (% segs + % bands) / 100" result={a !== undefined ? <><Big>{a} × 10⁹/L</Big><div className="text-muted-foreground">{a < 0.5 ? 'Severe neutropenia' : a < 1 ? 'Moderate' : a < 1.5 ? 'Mild (≥ 1 year)' : 'Not neutropenic (≥ 1 year)'}</div></> : <Dash />}>
      <NumberField label="WBC" unit="×10⁹/L" value={s.wbc} onChange={set('wbc')} />
      <NumberField label="Segs" unit="%" value={s.seg} onChange={set('seg')} />
      <NumberField label="Bands" unit="%" value={s.band} onChange={set('band')} />
    </Calc>
  )
}

function ReticCalc() {
  const { s, set, n } = useNums({ retic: '', hct: '', rbc: '', normal: '45' })
  const rpiV = n.retic !== undefined && n.hct !== undefined ? C.rpi(n.retic, n.hct, n.normal ?? 45) : undefined
  const arc = n.retic !== undefined && n.rbc !== undefined ? C.absoluteRetic(n.retic, n.rbc) : undefined
  return (
    <Calc
      title="Reticulocyte index"
      formula="Corrected = retic × Hct/normal Hct; RPI = corrected ÷ maturation (1.0/1.5/2.0/2.5 for Hct ≥40/30–39/20–29/<20); ARC = retic% × RBC"
      result={
        rpiV !== undefined || arc !== undefined ? (
          <div className="space-y-1">
            {rpiV !== undefined && <div><Big>RPI {rpiV}</Big><span className="text-muted-foreground">{rpiV < 2 ? 'Hypoproliferative' : rpiV > 3 ? 'Adequate response' : 'Borderline'}</span></div>}
            {arc !== undefined && <div>Absolute retic <b>{arc} × 10⁹/L</b> <span className="text-muted-foreground">{arc > 100 ? '(responding)' : '(not elevated)'}</span></div>}
          </div>
        ) : <Dash />
      }
    >
      <NumberField label="Retic" unit="%" value={s.retic} onChange={set('retic')} />
      <NumberField label="Hct" unit="%" value={s.hct} onChange={set('hct')} />
      <NumberField label="RBC" unit="×10¹²/L" value={s.rbc} onChange={set('rbc')} />
      <NumberField label="Normal Hct for age" unit="%" value={s.normal} onChange={set('normal')} hint="e.g. 36 at 1 y, 40 at 8 y" />
    </Calc>
  )
}

function MentzerCalc() {
  const { s, set, n } = useNums({ mcv: '', rbc: '' })
  const m = n.mcv !== undefined && n.rbc ? C.mentzer(n.mcv, n.rbc) : undefined
  return (
    <Calc title="Mentzer index" formula="MCV ÷ RBC. Screening clue only; confirm with ferritin and HPLC." result={m !== undefined ? <><Big>{m}</Big><div className="text-muted-foreground">{m < 13 ? '< 13 favors thalassemia trait' : '> 13 favors iron deficiency'}</div></> : <Dash />}>
      <NumberField label="MCV" unit="fL" value={s.mcv} onChange={set('mcv')} />
      <NumberField label="RBC" unit="×10¹²/L" value={s.rbc} onChange={set('rbc')} />
    </Calc>
  )
}

function RbcCalc() {
  const { s, set, n } = useNums({ wt: '', hb: '', target: '' })
  const [factor, setFactor] = useState('4')
  const ok = n.wt !== undefined && n.hb !== undefined && n.target !== undefined
  const vol = ok ? C.rbcVolume(n.wt!, n.hb!, n.target!, Number(factor)) : undefined
  return (
    <Calc
      title="Red cell transfusion volume"
      formula="Volume (mL) = ΔHb (g/dL) × weight (kg) × factor (3–5; 4 ≈ Hct 60% units). Adults: 1 unit ≈ +1 g/dL."
      result={vol !== undefined ? <><Big>{vol} mL</Big><div className="text-muted-foreground">{n.wt ? `${C.round(vol / n.wt!, 1)} mL/kg` : ''} · typical rate ~5 mL/kg/h; each unit within 4 h. Cap ~15–20 mL/kg per transfusion in children.</div></> : <Dash />}
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <NumberField label="Current Hb" unit="g/dL" value={s.hb} onChange={set('hb')} />
      <NumberField label="Target Hb" unit="g/dL" value={s.target} onChange={set('target')} />
      <SelectField label="Factor" value={factor} onChange={setFactor} options={[{ value: '3', label: '3' }, { value: '4', label: '4 (default)' }, { value: '5', label: '5' }]} />
    </Calc>
  )
}

function ProductCalc() {
  const { s, set, n } = useNums({ wt: '' })
  const w = n.wt
  return (
    <Calc
      title="Platelets, plasma, cryoprecipitate"
      formula="Platelets 10–15 mL/kg (≈ +50–100 × 10⁹/L); plasma 10–15 mL/kg (≈ +15–20% factors); cryo 1 unit per 5–10 kg (≈ +50–100 mg/dL fibrinogen)."
      result={
        w ? (
          <ul className="space-y-1">
            <li>Platelets: <b>{w >= 40 ? '1 adult dose (apheresis unit)' : `${C.mlPerKgRange(w, 10, 15).join('–')} mL`}</b></li>
            <li>Plasma: <b>{C.mlPerKgRange(w, 10, 15).join('–')} mL</b></li>
            <li>Cryoprecipitate: <b>{C.cryoUnits(w).join('–')} units</b></li>
          </ul>
        ) : <Dash />
      }
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
    </Calc>
  )
}

function ExchangeCalc() {
  const { s, set, n } = useNums({ wt: '', hct: '', target: '55' })
  const [preterm, setPreterm] = useState(false)
  const pe = n.wt !== undefined && n.hct !== undefined ? C.partialExchange(n.wt, n.hct, n.target ?? 55, preterm ? 100 : 85) : undefined
  const dve = n.wt !== undefined ? C.doubleVolumeExchange(n.wt, preterm) : undefined
  return (
    <Calc
      title="Neonatal exchange volumes"
      formula="Partial exchange = BV × (observed − target Hct) / observed Hct. Double-volume = 2 × BV. BV ≈ 85 mL/kg term, ~100 mL/kg preterm."
      result={
        dve !== undefined ? (
          <ul className="space-y-1">
            {pe !== undefined && <li>Partial exchange (polycythemia, NS): <b>{pe} mL</b></li>}
            <li>Double-volume exchange (bilirubin/HDFN): <b>{dve} mL</b></li>
          </ul>
        ) : <Dash />
      }
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <NumberField label="Observed Hct" unit="%" value={s.hct} onChange={set('hct')} />
      <NumberField label="Target Hct" unit="%" value={s.target} onChange={set('target')} />
      <div className="col-span-2">
        <Check label="Preterm" checked={preterm} onChange={setPreterm} />
      </div>
    </Calc>
  )
}

function OralIronCalc() {
  const { s, set, n } = useNums({ wt: '' })
  const [mgkg, setMgkg] = useState('3')
  const r = n.wt ? C.oralIron(n.wt, Number(mgkg)) : undefined
  return (
    <Calc
      title="Oral iron (pediatric)"
      formula="Treatment 3 mg/kg/day elemental iron once daily (AAP 2026). Prevention: 1 mg/kg/day breastfed term infants; 2–3 mg/kg/day preterm. Adolescents: 65 mg daily."
      result={
        r ? (
          <>
            <Big>{r.mgElemental} mg elemental/day</Big>
            <div className="text-muted-foreground">
              Ferrous sulfate drops (15 mg/mL): <b>{r.dropsMl} mL</b> · elixir (44 mg/5 mL): <b>{r.elixirMl} mL</b>
              {r.exceedsTablet && <div>Above one adult tablet (65 mg). Consider 65 mg once daily.</div>}
            </div>
          </>
        ) : <Dash />
      }
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <SelectField label="Dose" value={mgkg} onChange={setMgkg} options={[{ value: '1', label: '1 mg/kg (prevention)' }, { value: '2', label: '2 mg/kg (preterm)' }, { value: '3', label: '3 mg/kg (treatment)' }]} />
    </Calc>
  )
}

function GanzoniCalc() {
  const { s, set, n } = useNums({ wt: '', hb: '', target: '' })
  const ok = n.wt !== undefined && n.hb !== undefined && n.target !== undefined
  const r = ok ? C.ganzoni(n.wt!, n.hb!, n.target!) : undefined
  return (
    <Calc
      title="IV iron deficit (Ganzoni)"
      formula="Deficit (mg) = weight × (target − actual Hb) × 2.4 + stores (500 mg if ≥ 35 kg; 15 mg/kg if < 35 kg). Check product-specific maximum doses."
      result={r ? <><Big>{r.deficit} mg</Big><div className="text-muted-foreground">includes {r.stores} mg for stores</div></> : <Dash />}
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <NumberField label="Actual Hb" unit="g/dL" value={s.hb} onChange={set('hb')} />
      <NumberField label="Target Hb" unit="g/dL" value={s.target} onChange={set('target')} hint="Often 12–13 children, 13–15 adults" />
    </Calc>
  )
}

function FactorCalc() {
  const { s, set, n } = useNums({ wt: '', current: '0', target: '' })
  const [prod, setProd] = useState<'viii' | 'ix' | 'rix'>('viii')
  const rise = n.target !== undefined ? n.target - (n.current ?? 0) : undefined
  const ok = n.wt !== undefined && rise !== undefined && rise > 0
  const units = ok ? (prod === 'viii' ? C.fviiiUnits(n.wt!, rise!) : C.fixUnits(n.wt!, rise!, prod === 'rix' ? 0.75 : 1)) : undefined
  return (
    <Calc
      title="Factor VIII / IX dose"
      formula="FVIII: units = kg × rise (IU/dL) × 0.5. FIX: units = kg × rise ÷ recovery (≈1 plasma-derived; ~0.7–0.8 some recombinant in children). Targets: joint 40–60, life-threatening 80–100 IU/dL (WFH 2020)."
      result={units !== undefined ? <><Big>{units} IU</Big><div className="text-muted-foreground">Round to vial size. Extended half-life products dose differently.</div></> : <Dash />}
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <SelectField label="Product" value={prod} onChange={setProd} options={[{ value: 'viii', label: 'FVIII (standard)' }, { value: 'ix', label: 'FIX plasma-derived' }, { value: 'rix', label: 'FIX recombinant (child)' }]} />
      <NumberField label="Current level" unit="IU/dL" value={s.current} onChange={set('current')} />
      <NumberField label="Target level" unit="IU/dL" value={s.target} onChange={set('target')} />
    </Calc>
  )
}

function EnoxCalc() {
  const { s, set, n } = useNums({ wt: '', months: '' })
  const r = n.wt !== undefined && n.months !== undefined ? C.enoxaparinTreatment(n.wt, n.months) : undefined
  return (
    <Calc
      title="Enoxaparin (treatment, pediatric)"
      formula="< 2 months: 1.5 mg/kg q12h (neonates often need more); ≥ 2 months: 1 mg/kg q12h. Target anti-Xa 0.5–1.0 U/mL 4–6 h after dose."
      result={r ? <><Big>{r.dose} mg q12h</Big><div className="text-muted-foreground">{r.mgPerKg} mg/kg · check anti-Xa after the 2nd–3rd dose</div></> : <Dash />}
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <NumberField label="Age" unit="months" value={s.months} onChange={set('months')} />
    </Calc>
  )
}

function HuCalc() {
  const { s, set, n } = useNums({ wt: '' })
  const [adult, setAdult] = useState(false)
  const r = n.wt ? C.hydroxyureaStart(n.wt, adult) : undefined
  return (
    <Calc
      title="Hydroxyurea starting dose (SCD)"
      formula="NHLBI 2014: 20 mg/kg/day in children (15 in adults); escalate 5 mg/kg every 8 weeks to MTD (max 35) keeping ANC ≥ 2.0 (≥ 1.25 young children) and platelets ≥ 80."
      result={r ? <><Big>{r.dose} mg/day</Big><div className="text-muted-foreground">{r.mgPerKg} mg/kg/day · CBC every 4 weeks while escalating</div></> : <Dash />}
    >
      <NumberField label="Weight" unit="kg" value={s.wt} onChange={set('wt')} />
      <div className="self-end">
        <Check label="Adult" checked={adult} onChange={setAdult} />
      </div>
    </Calc>
  )
}

export function CalculatorsTool() {
  return (
    <ToolShell id="calculators" learn={[{ label: 'Pediatric dosing', href: '/learn/transfusion#peds-dosing' }, { label: 'Hemophilia', href: '/learn/bleeding#hemophilia' }, { label: 'Hydroxyurea', href: '/learn/hemoglobinopathies#hydroxyurea' }]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RbcCalc />
        <ProductCalc />
        <ExchangeCalc />
        <OralIronCalc />
        <GanzoniCalc />
        <FactorCalc />
        <EnoxCalc />
        <HuCalc />
        <AncCalc />
        <ReticCalc />
        <MentzerCalc />
      </div>
    </ToolShell>
  )
}
