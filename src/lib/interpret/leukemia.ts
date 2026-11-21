import type { Insight } from './types'

export interface RedFlagInput {
  adult: boolean
  anemia: boolean
  neutropenia: boolean
  thrombocytopenia: boolean
  highWbc: boolean // > 50
  blasts: boolean
  bonePain: boolean
  organomegaly: boolean
  lymphadenopathy: boolean
  supraclavicular: boolean
  mediastinalMass: boolean
  highLdhUrate: boolean
  bSymptoms: boolean
  coagulopathy: boolean
  cmlPattern: boolean // basophilia, myelocyte bulge, splenomegaly
  matureLymphocytosis: boolean
  monocytosis: boolean
  isolatedLowPltWell: boolean
}

export interface RedFlagResult {
  level: 'emergent' | 'high' | 'moderate' | 'low'
  insights: Insight[]
}

export function assessRedFlags(i: RedFlagInput): RedFlagResult {
  const insights: Insight[] = []
  const cytopenias = [i.anemia, i.neutropenia, i.thrombocytopenia].filter(Boolean).length
  const tissue = [i.bonePain, i.organomegaly, i.lymphadenopathy, i.highLdhUrate, i.bSymptoms].filter(Boolean).length

  let level: RedFlagResult['level'] = 'low'
  const raise = (l: RedFlagResult['level']) => {
    const order = ['low', 'moderate', 'high', 'emergent']
    if (order.indexOf(l) > order.indexOf(level)) level = l
  }

  if (i.mediastinalMass) {
    raise('emergent')
    insights.push({
      title: 'Anterior mediastinal mass',
      tone: 'danger',
      points: [
        'Airway and cardiovascular collapse risk with sedation or general anesthesia.',
        'Diagnose by the least invasive route (blood flow cytometry, pleural fluid, peripheral node under local).',
        'T-ALL/lymphoblastic lymphoma, Hodgkin, PMBCL, germ cell tumor.',
      ],
      links: [{ label: 'Oncologic emergencies', href: '/learn/leukemia#emergencies' }],
    })
  }
  if (i.coagulopathy && (i.blasts || cytopenias >= 1)) {
    raise('emergent')
    insights.push({
      title: 'Possible APL / DIC',
      tone: 'danger',
      points: ['Start ATRA on suspicion. Keep fibrinogen > 100–150 mg/dL and platelets > 30–50 × 10⁹/L.', 'Avoid LPs and central lines until the coagulopathy is controlled.'],
      links: [{ label: 'APL', href: '/learn/leukemia#apl' }],
    })
  }
  if (i.blasts) {
    raise(i.highWbc ? 'emergent' : 'high')
    insights.push({
      title: 'Circulating blasts',
      tone: 'danger',
      points: [
        'Same-day hematology/oncology referral. Peripheral flow cytometry, marrow, cytogenetics/molecular.',
        'Tumor lysis labs (K, phosphate, Ca, uric acid, creatinine, LDH) and coagulation with fibrinogen.',
        i.highWbc ? 'Hyperleukocytosis: hydrate, avoid rapid RBC transfusion, cytoreduce.' : 'Hydration and allopurinol; rasburicase if high risk (check G6PD).',
      ],
    })
  }
  if (cytopenias >= 2 || (cytopenias >= 1 && tissue >= 1)) {
    raise('high')
    insights.push({
      title: i.adult ? 'Marrow process likely' : 'Leukemia must be excluded',
      tone: 'danger',
      points: [
        `${cytopenias} cytopenia${cytopenias === 1 ? '' : 's'}${tissue ? ` + ${tissue} tissue/systemic sign${tissue > 1 ? 's' : ''}` : ''}.`,
        i.adult ? 'Smear review; marrow examination. Consider MDS, AML, lymphoma, myeloma, aplastic anemia, B12.' : 'Smear review by hematopathology, peripheral flow cytometry, marrow. No corticosteroids before diagnosis.',
        i.adult ? '' : 'ALL mimics JIA (night bone pain, high LDH) and ITP (but ITP has no other cytopenias).',
      ].filter(Boolean),
      links: [{ label: i.adult ? 'Adult AML/MDS' : 'Pediatric ALL', href: i.adult ? '/learn/leukemia#aml-adult' : '/learn/leukemia#all-peds' }],
    })
  }
  if (i.supraclavicular || (i.lymphadenopathy && i.bSymptoms)) {
    raise('high')
    insights.push({
      title: 'Lymphoma red flags',
      tone: 'warn',
      points: ['Supraclavicular node or nodes with B symptoms → CBC, LDH, uric acid, chest X-ray, then excisional biopsy.', 'Avoid empiric steroids before tissue diagnosis.'],
      links: [{ label: 'When to biopsy', href: '/learn/lymphoma#lad-peds' }],
    })
  }
  if (i.cmlPattern) {
    raise('high')
    insights.push({ title: 'CML pattern', tone: 'warn', points: ['Leukocytosis with myelocyte bulge, basophilia ± splenomegaly → BCR::ABL1 by PCR/FISH.'], links: [{ label: 'CML', href: '/learn/leukemia#cml' }] })
  }
  if (i.monocytosis && !i.adult) {
    raise('high')
    insights.push({ title: 'JMML possible', tone: 'warn', points: ['Child < 6 years with monocytosis ≥ 1 × 10⁹/L and splenomegaly: ↑HbF, RAS-pathway testing; exclude BCR::ABL1.'], links: [{ label: 'JMML', href: '/learn/leukemia#mds-jmml' }] })
  }
  if (i.matureLymphocytosis) {
    if (i.adult) {
      raise('moderate')
      insights.push({ title: 'Possible CLL / MBL', tone: 'info', points: ['Peripheral flow cytometry. ≥ 5 × 10⁹/L clonal B cells = CLL; < 5 without nodes = MBL. Treat only active disease.'], links: [{ label: 'CLL', href: '/learn/leukemia#cll' }] })
    } else {
      insights.push({ title: 'Mature lymphocytosis in a child', tone: 'info', points: ['Usually reactive (EBV, CMV, pertussis). Lymphocyte predominance is normal from ~1 week to ~4–6 years.'] })
    }
  }
  if (i.highWbc && !i.blasts && !i.cmlPattern) {
    raise('moderate')
    insights.push({ title: 'Marked leukocytosis without blasts', tone: 'info', points: ['Leukemoid reaction (severe infection, C. difficile, systemic JIA, burns) vs early leukemia/CML. Smear review and repeat; BCR::ABL1 if basophilia.'] })
  }
  if (i.isolatedLowPltWell && cytopenias <= 1 && tissue === 0 && !i.blasts) {
    insights.push({ title: 'Isolated thrombocytopenia, well', tone: 'ok', points: ['Fits ITP if the smear shows only large platelets and the exam is normal. Marrow is not needed in typical cases.'], links: [{ label: 'Pediatric ITP', href: '/learn/platelets#itp-peds' }] })
  }
  if (level === 'low' && tissue >= 1) {
    raise('moderate')
    insights.push({ title: 'Follow closely', tone: 'info', points: ['Systemic or tissue signs without cytopenias: repeat CBC with smear in 1–2 weeks, or sooner if worsening. Image as indicated.'] })
  }
  if (insights.length === 0) insights.push({ title: 'No red flags selected', tone: 'ok', points: ['Select the features present to see the pattern analysis.'] })

  return { level, insights }
}
