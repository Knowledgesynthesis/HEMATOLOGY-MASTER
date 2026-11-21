import { absoluteRetic, mentzer, rpi } from '../calc'
import { neutropeniaThreshold, normalHct, PLATELET_RANGE, rbcRef, wbcRef, type Sex } from '../ranges'
import { ageGroup, type Insight, isPeds, type Tone } from './types'

export interface CbcInput {
  ageDays: number
  sex: Sex
  hb?: number
  hct?: number
  mcv?: number
  rdw?: number
  rbc?: number
  wbc?: number
  anc?: number
  alc?: number
  platelets?: number
  retic?: number
  blasts?: boolean
}

export type Status = 'low' | 'normal' | 'high'

export interface Row {
  key: string
  label: string
  value: number
  unit: string
  ref: string
  status: Status
  tone: Tone
  note?: string
}

export interface CbcResult {
  band: string
  rows: Row[]
  computed: { label: string; value: string; note: string }[]
  insights: Insight[]
  lowLines: number
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))

export function interpretCbc(i: CbcInput): CbcResult {
  const g = ageGroup(i.ageDays)
  const rbc = rbcRef(i.ageDays, i.sex)
  const w = wbcRef(i.ageDays)
  const rows: Row[] = []
  const insights: Insight[] = []
  const computed: CbcResult['computed'] = []

  // ── Hemoglobin ───────────────────────────────────────────────────────────
  let anemic = false
  if (i.hb !== undefined) {
    const status: Status = i.hb < rbc.hb.lln ? 'low' : i.hb > rbc.hb.uln ? 'high' : 'normal'
    anemic = status === 'low'
    const severe = i.hb < 7
    rows.push({
      key: 'hb',
      label: 'Hemoglobin',
      value: i.hb,
      unit: 'g/dL',
      ref: `≥ ${rbc.hb.lln} (mean ${rbc.hb.mean})`,
      status,
      tone: status === 'normal' ? 'ok' : severe ? 'danger' : 'warn',
      note: status === 'low' ? (severe ? 'Severe anemia' : 'Anemia for age') : status === 'high' ? 'Above age range' : undefined,
    })
  }

  // ── Hematocrit (neonatal polycythemia) ───────────────────────────────────
  if (i.hct !== undefined) {
    const poly = g === 'neonate' ? i.hct > 65 : i.hct > rbc.hct.uln
    rows.push({
      key: 'hct',
      label: 'Hematocrit',
      value: i.hct,
      unit: '%',
      ref: g === 'neonate' ? `${rbc.hct.lln}–65 (venous)` : `${rbc.hct.lln}–${rbc.hct.uln}`,
      status: i.hct < rbc.hct.lln ? 'low' : poly ? 'high' : 'normal',
      tone: poly ? 'warn' : i.hct < rbc.hct.lln ? 'warn' : 'ok',
    })
    if (g === 'neonate' && i.hct > 65) {
      insights.push({
        title: 'Neonatal polycythemia',
        tone: 'warn',
        points: [
          'Confirm with a venous sample (capillary reads higher).',
          'Check glucose and bilirubin; look for IDM, SGA, twin–twin, trisomy 21.',
          'Partial exchange is reserved for symptomatic infants; evidence of long-term benefit is weak.',
        ],
        links: [
          { label: 'Polycythemia', href: '/learn/neonatal#polycythemia' },
          { label: 'Partial exchange calculator', href: '/tools/calculators' },
        ],
      })
    }
  }

  // ── MCV ──────────────────────────────────────────────────────────────────
  let size: 'micro' | 'normo' | 'macro' | undefined
  if (i.mcv !== undefined) {
    size = i.mcv < rbc.mcv.lln ? 'micro' : i.mcv > rbc.mcv.uln ? 'macro' : 'normo'
    rows.push({
      key: 'mcv',
      label: 'MCV',
      value: i.mcv,
      unit: 'fL',
      ref: `${rbc.mcv.lln}–${rbc.mcv.uln}`,
      status: size === 'micro' ? 'low' : size === 'macro' ? 'high' : 'normal',
      tone: size === 'normo' ? 'ok' : 'warn',
      note: size === 'micro' ? 'Microcytic for age' : size === 'macro' ? 'Macrocytic for age' : undefined,
    })
  }
  if (i.rdw !== undefined) {
    rows.push({ key: 'rdw', label: 'RDW', value: i.rdw, unit: '%', ref: '11.5–14.5', status: i.rdw > 14.5 ? 'high' : 'normal', tone: i.rdw > 14.5 ? 'info' : 'ok' })
  }

  // ── Reticulocytes ────────────────────────────────────────────────────────
  let production: 'low' | 'adequate' | undefined
  if (i.retic !== undefined) {
    rows.push({
      key: 'retic',
      label: 'Reticulocytes',
      value: i.retic,
      unit: '%',
      ref: g === 'neonate' && i.ageDays < 4 ? '3–7 (first days)' : '0.5–2.5',
      status: i.retic > 2.5 ? 'high' : i.retic < 0.5 ? 'low' : 'normal',
      tone: 'info',
    })
    if (i.rbc !== undefined) {
      const arc = absoluteRetic(i.retic, i.rbc)
      computed.push({ label: 'Absolute retic', value: `${arc} × 10⁹/L`, note: arc > 100 ? 'Marrow responding (> 100)' : 'Not elevated (≤ 100)' })
      if (anemic) production = arc > 100 ? 'adequate' : 'low'
    }
    if (i.hct !== undefined) {
      const r = rpi(i.retic, i.hct, normalHct(i.ageDays, i.sex))
      computed.push({ label: 'Reticulocyte production index', value: String(r), note: r < 2 ? 'Hypoproliferative (< 2)' : r > 3 ? 'Appropriate response (> 3)' : 'Borderline (2–3)' })
      if (anemic && production === undefined) production = r >= 2 ? 'adequate' : 'low'
    }
    if (anemic && production === undefined) production = i.retic > 2.5 ? 'adequate' : 'low'
  }

  if (i.mcv !== undefined && i.rbc !== undefined && size === 'micro') {
    const m = mentzer(i.mcv, i.rbc)
    computed.push({ label: 'Mentzer index', value: String(m), note: m < 13 ? '< 13: favors thalassemia trait' : '> 13: favors iron deficiency' })
  }

  // ── WBC / ANC / ALC ──────────────────────────────────────────────────────
  if (i.wbc !== undefined) {
    const status: Status = i.wbc < w.wbc[0] ? 'low' : i.wbc > w.wbc[1] ? 'high' : 'normal'
    rows.push({
      key: 'wbc',
      label: 'WBC',
      value: i.wbc,
      unit: '× 10⁹/L',
      ref: `${w.wbc[0]}–${w.wbc[1]}`,
      status,
      tone: i.wbc > 100 ? 'danger' : status === 'normal' ? 'ok' : 'warn',
      note: i.wbc > 100 ? 'Hyperleukocytosis' : i.wbc > 50 ? 'Marked leukocytosis' : undefined,
    })
  }
  let neutropenic = false
  if (i.anc !== undefined) {
    const t = neutropeniaThreshold(i.ageDays)
    neutropenic = i.anc < t
    const sev = i.anc < 0.5 ? 'Severe' : i.anc < 1.0 ? 'Moderate' : 'Mild'
    rows.push({
      key: 'anc',
      label: 'ANC',
      value: i.anc,
      unit: '× 10⁹/L',
      ref: `≥ ${t}`,
      status: neutropenic ? 'low' : i.anc > w.anc[1] ? 'high' : 'normal',
      tone: i.anc < 0.5 ? 'danger' : neutropenic ? 'warn' : 'ok',
      note: neutropenic ? `${sev} neutropenia` : i.anc > w.anc[1] ? 'Neutrophilia' : undefined,
    })
  }
  if (i.alc !== undefined) {
    rows.push({
      key: 'alc',
      label: 'Lymphocytes',
      value: i.alc,
      unit: '× 10⁹/L',
      ref: `${w.alc[0]}–${w.alc[1]}`,
      status: i.alc < w.alc[0] ? 'low' : i.alc > w.alc[1] ? 'high' : 'normal',
      tone: i.alc > w.alc[1] || i.alc < w.alc[0] ? 'warn' : 'ok',
    })
  }

  // ── Platelets ────────────────────────────────────────────────────────────
  let thrombocytopenic = false
  if (i.platelets !== undefined) {
    const p = i.platelets
    thrombocytopenic = p < PLATELET_RANGE[0]
    rows.push({
      key: 'plt',
      label: 'Platelets',
      value: p,
      unit: '× 10⁹/L',
      ref: `${PLATELET_RANGE[0]}–${PLATELET_RANGE[1]}`,
      status: thrombocytopenic ? 'low' : p > PLATELET_RANGE[1] ? 'high' : 'normal',
      tone: p < 20 ? 'danger' : thrombocytopenic || p > 1000 ? 'warn' : p > PLATELET_RANGE[1] ? 'info' : 'ok',
      note: p < 10 ? 'Severe thrombocytopenia' : p < 50 ? 'Moderate–severe' : p > 1000 ? 'Extreme thrombocytosis' : undefined,
    })
  }

  // ── Multilineage / malignancy red flags ──────────────────────────────────
  const lowLines = [anemic, neutropenic || (i.anc === undefined && i.wbc !== undefined && i.wbc < w.wbc[0]), thrombocytopenic].filter(Boolean).length
  if (i.blasts) {
    insights.push({
      title: 'Blasts reported: urgent evaluation',
      tone: 'danger',
      points: [
        'Same-day hematology/oncology. Peripheral flow cytometry, smear review.',
        'Tumor lysis labs (K, phosphate, Ca, uric acid, creatinine, LDH), coagulation with fibrinogen (APL/DIC).',
        isPeds(g) ? 'Chest X-ray before any sedation (mediastinal mass).' : 'If promyelocytes with coagulopathy → start ATRA on suspicion.',
        'No corticosteroids before diagnosis.',
      ],
      links: [{ label: 'Leukemia red flags', href: '/tools/leukemia-red-flags' }],
    })
  }
  if (lowLines >= 2) {
    insights.push({
      title: lowLines === 3 ? 'Pancytopenia' : 'Bicytopenia',
      tone: 'danger',
      points: [
        'Think marrow: leukemia/infiltration, aplastic anemia, B12/folate deficiency, HLH, drugs, hypersplenism, sepsis/DIC.',
        'Smear review now; marrow examination if unexplained.',
        isPeds(g) ? 'In children with bone pain, organomegaly or high LDH: ALL until proven otherwise.' : 'Consider MDS in older adults with macrocytosis.',
      ],
      links: [
        { label: 'Aplastic anemia', href: '/learn/marrow#aplastic-anemia' },
        { label: 'Pediatric ALL', href: '/learn/leukemia#all-peds' },
      ],
    })
  }
  if (i.wbc !== undefined && i.wbc > 100) {
    insights.push({
      title: 'Hyperleukocytosis',
      tone: 'danger',
      points: ['Risk of leukostasis and tumor lysis.', 'Avoid rapid RBC transfusion (raises viscosity); hydrate; start cytoreduction.'],
      links: [{ label: 'Oncologic emergencies', href: '/learn/leukemia#emergencies' }],
    })
  } else if (i.wbc !== undefined && i.wbc > 50 && !i.blasts) {
    insights.push({
      title: 'Marked leukocytosis (> 50)',
      tone: 'warn',
      points: [
        'Leukemoid reaction (severe infection, C. difficile, systemic JIA) vs leukemia.',
        'Basophilia, myelocyte bulge or splenomegaly → BCR::ABL1.',
        g === 'neonate' ? 'Neonate with trisomy 21 → transient abnormal myelopoiesis.' : 'Pertussis in young infants causes marked lymphocytosis.',
      ],
    })
  }

  // ── Anemia pattern ───────────────────────────────────────────────────────
  if (anemic) {
    const pts: string[] = []
    const links = [{ label: 'Anemia work-up', href: '/tools/anemia' }]
    if (size === 'micro') {
      if (g === 'neonate' || g === 'infant')
        pts.push('Microcytosis under 6–9 months is unusual for dietary iron deficiency: think chronic blood loss (fetomaternal), α-thalassemia, prematurity-related iron deficiency.')
      else if (g === 'toddler') pts.push('Most likely iron deficiency (milk intake, diet). Also lead, thalassemia trait, inflammation.')
      else if (g === 'adolescent' && i.sex === 'female') pts.push('Most likely menstrual iron deficiency. Screen for VWD if heavy menstrual bleeding.')
      else if (g === 'adult') pts.push('Iron deficiency (find the source: GI in men/postmenopausal women), inflammation, thalassemia trait.')
      else pts.push('Iron deficiency, thalassemia trait, inflammation, lead.')
      pts.push('Next: ferritin (± CRP), then Hb HPLC if ferritin is normal.')
      links.push({ label: 'Iron studies', href: '/tools/iron' })
    } else if (size === 'macro') {
      if (g === 'neonate') pts.push('Macrocytosis is normal in neonates. Interpret against the age band.')
      else if (g === 'infant') pts.push('Infant macrocytic anemia: Diamond-Blackfan (↑eADA, ↑HbF), B12 deficiency (maternal), drugs.')
      else pts.push('B12/folate (MMA, homocysteine), drugs, liver, hypothyroidism, reticulocytosis, marrow failure (Fanconi), MDS in older adults.')
    } else if (size === 'normo') {
      if (production === 'adequate') pts.push('Normocytic with a good retic response: hemolysis or acute blood loss. Check hemolysis markers, DAT, smear.')
      else if (production === 'low') {
        if (g === 'toddler') pts.push('Normocytic hypoproliferative in a toddler: TEC (if other lines normal), parvovirus, inflammation; infiltration if other lines are low.')
        else pts.push('Normocytic hypoproliferative: inflammation, CKD, early iron deficiency, marrow suppression or infiltration.')
      } else pts.push('Add a reticulocyte count to split production from destruction.')
      if (production === 'adequate') links.push({ label: 'Hemolysis work-up', href: '/tools/hemolysis' })
    }
    insights.push({ title: `Anemia${size ? ` — ${size === 'micro' ? 'microcytic' : size === 'macro' ? 'macrocytic' : 'normocytic'}` : ''}`, tone: 'warn', points: pts, links })
  } else if (i.hb !== undefined && i.ageDays >= 42 && i.ageDays < 100) {
    insights.push({
      title: 'Physiologic nadir window',
      tone: 'info',
      points: ['Hb of 9–11 g/dL is expected at 6–12 weeks in term infants (earlier and lower in preterm infants).'],
      links: [{ label: 'Neonatal anemia', href: '/learn/neonatal#neonatal-anemia' }],
    })
  }
  if (i.hb !== undefined && i.hb > rbc.hb.uln && g !== 'neonate') {
    insights.push({
      title: 'Erythrocytosis',
      tone: 'warn',
      points: isPeds(g)
        ? ['In children almost always secondary: cyanotic heart disease, hypoxia, dehydration, EPO-secreting tumor, high-affinity Hb (low P50).']
        : ['Check EPO and JAK2 V617F (exon 12 if negative). Low EPO + JAK2 → PV. Normal/high EPO → secondary (smoking, OSA, testosterone, renal lesions).'],
    })
  }

  // ── Platelet patterns ────────────────────────────────────────────────────
  if (thrombocytopenic && lowLines < 2 && !i.blasts) {
    const pts =
      g === 'neonate'
        ? ['Well term baby with severe thrombocytopenia → FNAIT (head ultrasound, platelets, IVIG). Sick baby → sepsis/NEC/DIC.']
        : isPeds(g)
          ? ['Isolated, well child, normal smear (large platelets) → ITP likely. Any other abnormality → smear review and marrow.']
          : ['Exclude pseudothrombocytopenia (citrate tube). ITP vs drugs (heparin → 4Ts), HIV/HCV, liver disease/hypersplenism, TTP if hemolysis.']
    insights.push({
      title: 'Isolated thrombocytopenia',
      tone: i.platelets! < 20 ? 'danger' : 'warn',
      points: pts,
      links: [
        { label: g === 'neonate' ? 'Neonatal thrombocytopenia' : isPeds(g) ? 'Pediatric ITP' : 'Adult ITP', href: g === 'neonate' ? '/learn/neonatal#neonatal-thrombocytopenia' : isPeds(g) ? '/learn/platelets#itp-peds' : '/learn/platelets#itp-adult' },
      ],
    })
  }
  if (i.platelets !== undefined && i.platelets > PLATELET_RANGE[1]) {
    insights.push({
      title: 'Thrombocytosis',
      tone: 'info',
      points: isPeds(g)
        ? ['> 95% reactive in children (infection, iron deficiency, inflammation, Kawasaki). No aspirin needed. Treat the cause and recheck.']
        : ['Check CRP, ferritin and smear. If persistent and unexplained: JAK2, CALR, MPL, BCR::ABL1. > 1,000: check VWF activity before aspirin.'],
    })
  }

  // ── Neutropenia / lymphocyte notes ───────────────────────────────────────
  if (neutropenic && lowLines < 2) {
    insights.push({
      title: 'Isolated neutropenia',
      tone: i.anc! < 0.5 ? 'danger' : 'warn',
      points: [
        i.anc! < 0.5 ? 'If febrile: emergency (blood cultures, antipseudomonal β-lactam within 60 min).' : 'Infection risk depends on cause and marrow reserve.',
        isPeds(g)
          ? 'Common: post-viral (recheck in 2–4 weeks), autoimmune neutropenia of infancy, Duffy-null–associated count. Persistent < 0.5 with infections → SCN/cyclic work-up.'
          : 'Drugs, viral, Duffy-null–associated count, B12/copper deficiency, autoimmune, LGL, marrow disease.',
      ],
      links: [{ label: 'Neutropenia approach', href: '/learn/marrow#neutropenia' }],
    })
  }
  if (i.alc !== undefined && i.alc > w.alc[1]) {
    insights.push({
      title: 'Lymphocytosis',
      tone: 'info',
      points:
        g === 'adult'
          ? ['Persistent > 5 × 10⁹/L clonal B cells = CLL (flow cytometry). Otherwise viral, pertussis, smoking, post-splenectomy.']
          : ['Reactive (EBV, CMV, pertussis) is typical. Infant pertussis with WBC > 30 is high-risk.'],
    })
  }

  return { band: rbc.label, rows, computed, insights, lowLines }
}

export const fmtValue = fmt
