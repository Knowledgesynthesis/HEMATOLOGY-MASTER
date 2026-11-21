import { describe, expect, it } from 'vitest'
import * as C from './calc'
import { ageToDays, neutropeniaThreshold, rbcRef, wbcRef } from './ranges'
import { fourTs, hlh2004, istDic, plasmic } from './scores'
import { interpretCbc } from './interpret/cbc'
import { interpretIron } from './interpret/iron'
import { interpretHemolysis, type HemolysisInput } from './interpret/hemolysis'
import { interpretCoag, type CoagInput } from './interpret/coag'
import { rankReactions, type ReactionInput } from './interpret/transfusion'
import { assessRedFlags, type RedFlagInput } from './interpret/leukemia'
import { anemiaWorkup } from './interpret/anemia'
import { NBS_PATTERNS } from './interpret/newbornScreen'
import { num } from './interpret/types'

const d = (v: number, u: 'days' | 'weeks' | 'months' | 'years') => ageToDays(v, u)

describe('reference ranges', () => {
  it('uses age-appropriate bands', () => {
    expect(rbcRef(d(2, 'days'), 'male').hb.lln).toBe(14.5)
    expect(rbcRef(d(2, 'months'), 'male').hb.lln).toBe(9.0)
    expect(rbcRef(d(18, 'months'), 'female').mcv.lln).toBe(70)
    expect(rbcRef(d(15, 'years'), 'male').hb.lln).toBe(13.0)
    expect(rbcRef(d(15, 'years'), 'female').hb.lln).toBe(12.0)
    expect(rbcRef(d(30, 'years'), 'male').hb.lln).toBe(13.5)
    expect(rbcRef(d(30, 'years'), 'male').mcv.uln).toBe(100)
  })
  it('handles band boundaries without gaps', () => {
    for (let days = 0; days < 30 * 365; days += 7) {
      expect(() => rbcRef(days, 'female')).not.toThrow()
      expect(wbcRef(days).wbc[0]).toBeGreaterThan(0)
    }
  })
  it('neutropenia thresholds by age', () => {
    expect(neutropeniaThreshold(d(8, 'months'))).toBe(1.0)
    expect(neutropeniaThreshold(d(3, 'years'))).toBe(1.5)
  })
})

describe('calculators', () => {
  it('reticulocyte math matches the teaching example', () => {
    expect(C.absoluteRetic(4, 2.5)).toBe(100)
    expect(C.rpi(6, 20, 45)).toBeCloseTo(1.33, 1)
    expect(C.maturationFactor(45)).toBe(1)
    expect(C.maturationFactor(19)).toBe(2.5)
  })
  it('Mentzer, ANC, TSAT', () => {
    expect(C.mentzer(63, 5.9)).toBe(10.7)
    expect(C.anc(4.2, 15, 5)).toBe(0.84)
    expect(C.tsat(30, 450)).toBe(7)
  })
  it('transfusion volumes', () => {
    expect(C.rbcVolume(20, 6, 9)).toBe(240)
    expect(C.rbcVolume(20, 9, 6)).toBe(0)
    expect(C.cryoUnits(20)).toEqual([2, 4])
    expect(C.cryoUnits(80)).toEqual([8, 10])
    expect(C.partialExchange(3, 70, 55, 85)).toBe(55)
    expect(C.partialExchange(3, 60)).toBe(Math.round((3 * 85 * 5) / 60))
    expect(C.partialExchange(3, 50)).toBe(0)
    expect(C.doubleVolumeExchange(3, false)).toBe(510)
  })
  it('factor and drug dosing', () => {
    expect(C.fviiiUnits(10, 50)).toBe(250)
    expect(C.fixUnits(10, 50)).toBe(500)
    expect(C.enoxaparinTreatment(4, 1).mgPerKg).toBe(1.5)
    expect(C.enoxaparinTreatment(12, 18).dose).toBe(12)
    expect(C.hydroxyureaStart(10, false).dose).toBe(200)
    expect(C.oralIron(12).mgElemental).toBe(36)
    expect(C.oralIron(12).dropsMl).toBe(2.4)
    expect(C.ganzoni(70, 8, 13).deficit).toBe(Math.round(70 * 5 * 2.4 + 500))
    expect(C.ganzoni(20, 7, 12).stores).toBe(300)
  })
})

describe('scores', () => {
  it('4Ts high-probability case from the platelets module', () => {
    expect(fourTs({ thrombocytopenia: 2, timing: 2, thrombosis: 2, otherCauses: 2 })).toEqual({ total: 8, band: 'high' })
    expect(fourTs({ thrombocytopenia: 1, timing: 1, thrombosis: 0, otherCauses: 1 }).band).toBe('low')
    expect(fourTs({ thrombocytopenia: 2, timing: 1, thrombosis: 0, otherCauses: 1 }).band).toBe('intermediate')
  })
  it('PLASMIC case scores 6 (MCV 91)', () => {
    const r = plasmic({ plateletsUnder30: true, hemolysis: true, noActiveCancer: true, noTransplant: true, mcvUnder90: false, inrUnder1_5: true, creatinineUnder2: true })
    expect(r).toEqual({ total: 6, band: 'high' })
  })
  it('ISTH DIC', () => {
    expect(istDic({ platelets: 40, fibrinMarker: 3, ptProlongationSec: 7, fibrinogenGL: 0.8 })).toMatchObject({ total: 8, overt: true })
    expect(istDic({ platelets: 120, fibrinMarker: 2, ptProlongationSec: 2, fibrinogenGL: 2 }).overt).toBe(false)
  })
  it('HLH-2004 case meets 5 criteria', () => {
    const r = hlh2004({ ageDays: d(14, 'months'), feverAtLeast38_5: true, splenomegaly: true, hb: 7.8, platelets: 42, anc: 0.6, triglycerides: 310, fibrinogen: 110, hemophagocytosis: false, lowNkActivity: false, ferritin: 18400, molecularDiagnosis: false })
    expect(r.met).toBe(5)
    expect(r.fulfilled).toBe(true)
  })
  it('HLH uses the neonatal Hb cut-off', () => {
    const r = hlh2004({ ageDays: 10, feverAtLeast38_5: false, splenomegaly: false, hb: 9.5, platelets: 90, hemophagocytosis: false, lowNkActivity: false, molecularDiagnosis: false })
    expect(r.cytoLines).toBe(2)
  })
})

describe('CBC interpreter', () => {
  it('does not call blank fields normal', () => {
    const r = interpretCbc({ ageDays: d(30, 'years'), sex: 'female' })
    expect(r.rows).toHaveLength(0)
  })
  it('a normal toddler is not anemic by adult cut-offs', () => {
    const r = interpretCbc({ ageDays: d(2, 'years') - 30, sex: 'female', hb: 11.8, mcv: 74 })
    expect(r.rows.find((x) => x.key === 'hb')?.status).toBe('normal')
    expect(r.rows.find((x) => x.key === 'mcv')?.status).toBe('normal')
  })
  it('milk-associated IDA toddler', () => {
    const r = interpretCbc({ ageDays: d(20, 'months'), sex: 'male', hb: 6.9, mcv: 59, rbc: 3.6, platelets: 520, retic: 1 })
    expect(r.rows.find((x) => x.key === 'hb')?.tone).toBe('danger')
    expect(r.computed.find((c) => c.label === 'Mentzer index')?.value).toBe('16.4')
    expect(r.insights.some((i) => i.title.startsWith('Anemia — microcytic'))).toBe(true)
    expect(r.insights.some((i) => i.title === 'Thrombocytosis')).toBe(true)
    expect(r.lowLines).toBe(1)
  })
  it('flags bicytopenia with bone-pain-type picture as marrow process', () => {
    const r = interpretCbc({ ageDays: d(3, 'years'), sex: 'male', hb: 9.1, wbc: 4.2, anc: 0.8, platelets: 88 })
    expect(r.lowLines).toBe(3)
    expect(r.insights[0].title).toBe('Pancytopenia')
  })
  it('isolated thrombocytopenia in a child points to ITP', () => {
    const r = interpretCbc({ ageDays: d(4, 'years'), sex: 'female', hb: 12.1, wbc: 7.8, anc: 3.5, platelets: 8 })
    const t = r.insights.find((i) => i.title === 'Isolated thrombocytopenia')
    expect(t?.tone).toBe('danger')
    expect(t?.points[0]).toMatch(/ITP/)
  })
  it('neonatal polycythemia', () => {
    const r = interpretCbc({ ageDays: 1, sex: 'male', hct: 70 })
    expect(r.insights.some((i) => i.title === 'Neonatal polycythemia')).toBe(true)
  })
  it('hyperleukocytosis is an emergency', () => {
    const r = interpretCbc({ ageDays: d(9, 'years'), sex: 'male', wbc: 180, blasts: true })
    expect(r.insights.some((i) => i.title === 'Hyperleukocytosis' && i.tone === 'danger')).toBe(true)
  })
})

describe('anemia work-up', () => {
  it('TEC pattern in a toddler', () => {
    const r = anemiaWorkup({ ageDays: d(3, 'years'), sex: 'female', hb: 7.9, mcv: 82, retic: 0.1, rbc: 2.8 })
    expect(r.steps[1].answer).toMatch(/under-production/)
    expect(r.differential[0]).toMatch(/Transient erythroblastopenia/)
  })
  it('hemolysis path when retic is high', () => {
    const r = anemiaWorkup({ ageDays: d(7, 'years'), sex: 'male', hb: 9.8, mcv: 84, retic: 8, rbc: 3.2 })
    expect(r.steps[1].answer).toMatch(/destruction/)
    expect(r.nextTests).toContain('DAT')
  })
  it('MCV 110 is normocytic for a 2-day-old; neonatal differential is used', () => {
    const r = anemiaWorkup({ ageDays: 2, sex: 'male', hb: 13.0, mcv: 110 })
    expect(r.steps[2].answer).toBe('Normocytic')
    expect(r.differential[0]).toMatch(/Blood loss/)
    expect(r.nextTests).toContain('Kleihauer-Betke/flow on maternal blood')
  })
})

describe('iron interpreter', () => {
  it('absolute ID in a toddler with AAP 2026 threshold', () => {
    expect(interpretIron({ age: 'under5', ferritin: 15 }).pattern).toBe('absolute-id')
    expect(interpretIron({ age: 'adolescent', ferritin: 25 }).pattern).toBe('absolute-id')
    expect(interpretIron({ age: 'child', ferritin: 25 }).pattern).toBe('normal')
  })
  it('combined deficiency in IBD', () => {
    expect(interpretIron({ age: 'adolescent', ferritin: 65, tsat: 8, inflammation: true }).pattern).toBe('id-with-inflammation')
  })
  it('thal trait suspicion with normal iron', () => {
    const r = interpretIron({ age: 'adult', ferritin: 85, tsat: 30, mcv: 63, rbc: 5.9 })
    expect(r.pattern).toBe('normal')
    expect(r.mentzer).toBe(10.7)
    expect(r.insights.some((i) => i.title === 'Microcytosis without iron deficiency')).toBe(true)
  })
  it('overload', () => {
    expect(interpretIron({ age: 'adult', ferritin: 1800, tsat: 80 }).pattern).toBe('overload')
  })
})

const hemoBase: HemolysisInput = { ageGroup: 'child', retic: 'unknown', ldh: 'unknown', haptoglobin: 'unknown', indirectBili: 'unknown', hemoglobinuria: false, dat: 'not-done', smear: 'none', lowPlatelets: false, aki: false, recentTransfusion: false, trigger: 'none' }

describe('hemolysis interpreter', () => {
  it('G6PD after fava beans', () => {
    const r = interpretHemolysis({ ...hemoBase, retic: 'high', ldh: 'high', hemoglobinuria: true, dat: 'negative', smear: 'bite', trigger: 'oxidant' })
    expect(r.likelihood).toBe('likely')
    expect(r.site).toBe('intravascular')
    expect(r.candidates[0].name).toMatch(/G6PD/)
  })
  it('PCH in a young child', () => {
    const r = interpretHemolysis({ ...hemoBase, retic: 'high', hemoglobinuria: true, dat: 'c3', trigger: 'infection' })
    expect(r.candidates[0].name).toMatch(/cold hemoglobinuria/)
  })
  it('STEC-HUS', () => {
    const r = interpretHemolysis({ ...hemoBase, ldh: 'high', smear: 'schistocytes', dat: 'negative', lowPlatelets: true, aki: true, trigger: 'diarrhea' })
    expect(r.insights[0].title).toBe('Thrombotic microangiopathy')
    expect(r.candidates[0].name).toMatch(/HUS/)
  })
  it('neonatal haptoglobin is not counted', () => {
    const r = interpretHemolysis({ ...hemoBase, ageGroup: 'young-infant', haptoglobin: 'low' })
    expect(r.score).toBe(0)
    expect(r.insights[0].title).toMatch(/not interpretable/)
  })
})

const coagBase: CoagInput = { pt: 'normal', aptt: 'normal', fibrinogen: 'normal', platelets: 'normal', tt: 'normal', mixing: 'not-done', bleeding: 'none', ctx: {} }

describe('coagulation interpreter', () => {
  it('FXII deficiency for a long aPTT that corrects with no bleeding', () => {
    const r = interpretCoag({ ...coagBase, aptt: 'prolonged', mixing: 'corrects' })
    expect(r.differential[0].name).toMatch(/Contact factor/)
  })
  it('hemophilia when bleeding', () => {
    const r = interpretCoag({ ...coagBase, aptt: 'prolonged', mixing: 'corrects', bleeding: 'deep' })
    expect(r.differential[0].name).toMatch(/Hemophilia/)
  })
  it('acquired hemophilia on incubated mixing', () => {
    const r = interpretCoag({ ...coagBase, aptt: 'prolonged', mixing: 'late-prolong', bleeding: 'deep' })
    expect(r.differential[0].name).toMatch(/Acquired FVIII inhibitor/)
  })
  it('VKDB in a neonate', () => {
    const r = interpretCoag({ ...coagBase, pt: 'prolonged', aptt: 'prolonged', bleeding: 'deep', ctx: { neonate: true, vitkRisk: true } })
    expect(r.differential.some((x) => /Vitamin K deficiency/.test(x.name))).toBe(true)
    expect(r.differential.some((x) => x.name === 'DIC')).toBe(false)
  })
  it('DIC when consumptive', () => {
    const r = interpretCoag({ ...coagBase, pt: 'prolonged', aptt: 'prolonged', platelets: 'low', fibrinogen: 'low', ctx: { sick: true } })
    expect(r.differential[0].name).toBe('DIC')
  })
  it('normal screens with mucocutaneous bleeding → VWD/platelet/FXIII', () => {
    const r = interpretCoag({ ...coagBase, bleeding: 'mucocutaneous' })
    expect(r.differential.map((x) => x.name).join(' ')).toMatch(/von Willebrand.*Platelet function.*Factor XIII/)
  })
  it('emicizumab warning', () => {
    const r = interpretCoag({ ...coagBase, ctx: { emicizumab: true } })
    expect(r.insights.some((i) => i.title === 'Emicizumab interferes')).toBe(true)
  })
})

const rx: ReactionInput = { onset: 'under6h', product: 'rbc', fever: false, highFever: false, hypotension: false, hypertension: false, hypoxemia: false, infiltrates: false, overload: false, bnpHigh: false, urticaria: false, anaphylaxis: false, flankPain: false, hemoglobinuria: false, datPositive: false, hbFallJaundice: false, pancytopeniaRash: false, severeThrombocytopenia: false }

describe('transfusion reaction ranking', () => {
  it('TRALI vs TACO', () => {
    expect(rankReactions({ ...rx, product: 'platelets', onset: 'minutes', hypoxemia: true, infiltrates: true, hypotension: true, fever: true })[0].id).toBe('trali')
    expect(rankReactions({ ...rx, hypoxemia: true, hypertension: true, overload: true, bnpHigh: true, infiltrates: true })[0].id).toBe('taco')
  })
  it('mild allergic', () => {
    expect(rankReactions({ ...rx, urticaria: true })[0].id).toBe('allergic')
  })
  it('anaphylaxis', () => {
    expect(rankReactions({ ...rx, onset: 'minutes', product: 'plasma', anaphylaxis: true, hypotension: true })[0].id).toBe('anaphylaxis')
  })
  it('acute hemolytic', () => {
    expect(rankReactions({ ...rx, onset: 'minutes', fever: true, flankPain: true, hemoglobinuria: true, hypotension: true })[0].id).toBe('ahtr')
  })
  it('septic platelets', () => {
    expect(rankReactions({ ...rx, product: 'platelets', fever: true, highFever: true, hypotension: true })[0].id).toBe('septic')
  })
  it('delayed hemolytic', () => {
    expect(rankReactions({ ...rx, onset: 'days', hbFallJaundice: true, datPositive: true })[0].id).toBe('dhtr')
  })
  it('FNHTR for isolated fever', () => {
    expect(rankReactions({ ...rx, fever: true })[0].id).toBe('fnhtr')
  })
})

const rf: RedFlagInput = { adult: false, anemia: false, neutropenia: false, thrombocytopenia: false, highWbc: false, blasts: false, bonePain: false, organomegaly: false, lymphadenopathy: false, supraclavicular: false, mediastinalMass: false, highLdhUrate: false, bSymptoms: false, coagulopathy: false, cmlPattern: false, matureLymphocytosis: false, monocytosis: false, isolatedLowPltWell: false }

describe('leukemia red flags', () => {
  it('ALL mimic of JIA', () => {
    expect(assessRedFlags({ ...rf, anemia: true, thrombocytopenia: true, bonePain: true, highLdhUrate: true }).level).toBe('high')
  })
  it('mediastinal mass is emergent', () => {
    expect(assessRedFlags({ ...rf, mediastinalMass: true }).level).toBe('emergent')
  })
  it('typical ITP is low', () => {
    const r = assessRedFlags({ ...rf, thrombocytopenia: true, isolatedLowPltWell: true })
    expect(r.level).toBe('low')
    expect(r.insights[0].title).toMatch(/Isolated thrombocytopenia/)
  })
})

describe('newborn screen', () => {
  it('has unique codes and urgent SCD patterns', () => {
    const codes = NBS_PATTERNS.map((p) => p.code)
    expect(new Set(codes).size).toBe(codes.length)
    for (const c of ['FS', 'FSA', 'FSC']) expect(NBS_PATTERNS.find((p) => p.code === c)?.urgency).toBe('urgent')
    expect(NBS_PATTERNS.find((p) => p.code === 'FAS')?.urgency).toBe('routine')
  })
})

describe('num()', () => {
  it('parses safely', () => {
    expect(num('')).toBeUndefined()
    expect(num('  ')).toBeUndefined()
    expect(num('abc')).toBeUndefined()
    expect(num('7.5')).toBe(7.5)
    expect(num('0')).toBe(0)
  })
})
