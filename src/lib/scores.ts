/** Validated clinical scores. Each returns the total plus a risk band. */

export interface FourTsInput {
  /** 2: fall > 50% and nadir ≥ 20; 1: fall 30–50% or nadir 10–19; 0: fall < 30% or nadir < 10 */
  thrombocytopenia: 0 | 1 | 2
  /** 2: onset day 5–10 or ≤ 1 day with heparin in past 30 days; 1: consistent but unclear, > day 10, or ≤ 1 day with heparin 30–100 days ago; 0: < 4 days without recent heparin */
  timing: 0 | 1 | 2
  /** 2: new thrombosis, skin necrosis, acute systemic reaction after UFH bolus; 1: progressive/recurrent/suspected thrombosis or non-necrotizing skin lesions; 0: none */
  thrombosis: 0 | 1 | 2
  /** 2: no other cause apparent; 1: possible other cause; 0: definite other cause */
  otherCauses: 0 | 1 | 2
}

export function fourTs(i: FourTsInput) {
  const total = i.thrombocytopenia + i.timing + i.thrombosis + i.otherCauses
  const band = total <= 3 ? 'low' : total <= 5 ? 'intermediate' : 'high'
  return { total, band } as const
}

export interface PlasmicInput {
  plateletsUnder30: boolean
  hemolysis: boolean // retic > 2.5%, undetectable haptoglobin, or indirect bilirubin > 2 mg/dL
  noActiveCancer: boolean
  noTransplant: boolean
  mcvUnder90: boolean
  inrUnder1_5: boolean
  creatinineUnder2: boolean
}

export function plasmic(i: PlasmicInput) {
  const total = Object.values(i).filter(Boolean).length
  const band = total <= 4 ? 'low' : total === 5 ? 'intermediate' : 'high'
  return { total, band } as const
}

export interface DicInput {
  /** ×10⁹/L */
  platelets: number
  /** 0: no increase, 2: moderate, 3: strong increase in D-dimer/FDP */
  fibrinMarker: 0 | 2 | 3
  /** PT prolongation in seconds above the upper limit of normal */
  ptProlongationSec: number
  /** g/L */
  fibrinogenGL: number
}

export function istDic(i: DicInput) {
  const plt = i.platelets > 100 ? 0 : i.platelets >= 50 ? 1 : 2
  const pt = i.ptProlongationSec < 3 ? 0 : i.ptProlongationSec <= 6 ? 1 : 2
  const fib = i.fibrinogenGL > 1.0 ? 0 : 1
  const total = plt + i.fibrinMarker + pt + fib
  return { total, overt: total >= 5, parts: { plt, fibrin: i.fibrinMarker, pt, fib } }
}

export interface HlhInput {
  ageDays: number
  feverAtLeast38_5: boolean
  splenomegaly: boolean
  /** g/dL */
  hb?: number
  /** ×10⁹/L */
  platelets?: number
  /** ×10⁹/L */
  anc?: number
  /** mg/dL fasting */
  triglycerides?: number
  /** mg/dL */
  fibrinogen?: number
  hemophagocytosis: boolean
  lowNkActivity: boolean
  /** µg/L */
  ferritin?: number
  /** U/mL */
  sCD25?: number
  molecularDiagnosis: boolean
}

export function hlh2004(i: HlhInput) {
  const hbCut = i.ageDays < 28 ? 10 : 9
  const cytoLines = [
    i.hb !== undefined && i.hb < hbCut,
    i.platelets !== undefined && i.platelets < 100,
    i.anc !== undefined && i.anc < 1.0,
  ].filter(Boolean).length
  const criteria = {
    fever: i.feverAtLeast38_5,
    splenomegaly: i.splenomegaly,
    cytopenias: cytoLines >= 2,
    lipidsOrFibrinogen: (i.triglycerides !== undefined && i.triglycerides >= 265) || (i.fibrinogen !== undefined && i.fibrinogen <= 150),
    hemophagocytosis: i.hemophagocytosis,
    lowNk: i.lowNkActivity,
    ferritin: i.ferritin !== undefined && i.ferritin >= 500,
    sCD25: i.sCD25 !== undefined && i.sCD25 >= 2400,
  }
  const met = Object.values(criteria).filter(Boolean).length
  return { met, criteria, fulfilled: i.molecularDiagnosis || met >= 5, cytoLines }
}
