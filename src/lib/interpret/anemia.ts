import { absoluteRetic, mentzer, rpi } from '../calc'
import { normalHct, rbcRef, type Sex } from '../ranges'
import { ageGroup, type AgeGroup, type Insight } from './types'

export interface AnemiaInput {
  ageDays: number
  sex: Sex
  hb: number
  mcv?: number
  retic?: number
  hct?: number
  rbc?: number
}

export interface AnemiaStep {
  question: string
  answer: string
  detail: string
}

export interface AnemiaResult {
  anemic: boolean
  steps: AnemiaStep[]
  differential: string[]
  nextTests: string[]
  insights: Insight[]
  group: AgeGroup
}

export function anemiaWorkup(i: AnemiaInput): AnemiaResult {
  const g = ageGroup(i.ageDays)
  const ref = rbcRef(i.ageDays, i.sex)
  const anemic = i.hb < ref.hb.lln
  const steps: AnemiaStep[] = []
  const insights: Insight[] = []
  let differential: string[] = []
  let nextTests: string[] = []

  steps.push({
    question: 'Is there anemia for age and sex?',
    answer: anemic ? 'Yes' : 'No',
    detail: `Hb ${i.hb} g/dL vs lower limit ${ref.hb.lln} (${ref.label}).`,
  })

  if (!anemic) {
    if (i.ageDays >= 42 && i.ageDays < 100) insights.push({ title: 'Physiologic nadir', tone: 'info', points: ['Hb 9–11 g/dL at 6–12 weeks is expected in term infants.'] })
    return { anemic, steps, differential, nextTests, insights, group: g }
  }

  // Production
  let prod: 'low' | 'high' | 'unknown' = 'unknown'
  let prodDetail = 'Add a reticulocyte count.'
  if (i.retic !== undefined) {
    if (i.rbc !== undefined) {
      const arc = absoluteRetic(i.retic, i.rbc)
      prod = arc > 100 ? 'high' : 'low'
      prodDetail = `Absolute retic ${arc} × 10⁹/L (${arc > 100 ? '> 100: responding' : '≤ 100: inadequate'}).`
    } else if (i.hct !== undefined) {
      const r = rpi(i.retic, i.hct, normalHct(i.ageDays, i.sex))
      prod = r >= 2 ? 'high' : 'low'
      prodDetail = `RPI ${r} (${r >= 2 ? '≥ 2: responding' : '< 2: hypoproliferative'}).`
    } else {
      prod = i.retic > 2.5 ? 'high' : 'low'
      prodDetail = `Retic ${i.retic}% (uncorrected; add Hct or RBC count for RPI/absolute count).`
    }
  }
  steps.push({ question: 'Is the marrow responding?', answer: prod === 'high' ? 'Yes: loss or destruction' : prod === 'low' ? 'No: under-production' : 'Unknown', detail: prodDetail })

  // Size
  let size: 'micro' | 'normo' | 'macro' | 'unknown' = 'unknown'
  if (i.mcv !== undefined) size = i.mcv < ref.mcv.lln ? 'micro' : i.mcv > ref.mcv.uln ? 'macro' : 'normo'
  steps.push({
    question: 'What size are the cells (age-adjusted)?',
    answer: size === 'micro' ? 'Microcytic' : size === 'macro' ? 'Macrocytic' : size === 'normo' ? 'Normocytic' : 'Unknown',
    detail: i.mcv !== undefined ? `MCV ${i.mcv} fL vs ${ref.mcv.lln}–${ref.mcv.uln}.` : 'Add MCV.',
  })

  if (prod === 'high') {
    differential = g === 'neonate'
      ? ['Alloimmune hemolysis (ABO, Rh, Kell)', 'Hereditary spherocytosis', 'G6PD deficiency', 'Acute blood loss (fetomaternal, internal)', 'α-thalassemia (HbH)']
      : ['Hemolysis: immune (warm/cold/PCH), membrane (HS), enzyme (G6PD, PK), hemoglobinopathy, TMA', 'Acute blood loss', 'Recovery from deficiency or marrow suppression']
    nextTests = ['Smear', 'DAT', 'LDH, indirect bilirubin, haptoglobin (not in young infants)', 'Urinalysis for hemoglobinuria']
  } else if (size === 'micro') {
    if (g === 'neonate' || (g === 'infant' && i.ageDays < 180))
      differential = ['Chronic fetomaternal or twin–twin blood loss', 'α-thalassemia', 'Iron deficiency of prematurity/maternal IDA', 'Rare: IRIDA, sideroblastic (congenital)']
    else if (g === 'infant' || g === 'toddler') differential = ['Iron deficiency (milk, diet) — most likely', 'Thalassemia trait (α or β)', 'Lead exposure', 'Anemia of inflammation', 'Rare: sideroblastic, IRIDA']
    else if (g === 'adolescent') differential = [i.sex === 'female' ? 'Menstrual iron deficiency (screen for VWD if HMB)' : 'Iron deficiency (diet, GI loss, celiac, IBD, athletics)', 'Thalassemia trait', 'Anemia of inflammation']
    else if (g === 'adult') differential = ['Iron deficiency (GI loss until proven otherwise in men/postmenopausal women)', 'Anemia of inflammation', 'Thalassemia trait', 'Sideroblastic (congenital), copper deficiency']
    else differential = ['Iron deficiency', 'Thalassemia trait', 'Anemia of inflammation', 'Lead']
    nextTests = ['Ferritin (± CRP)', 'TSAT', 'Hb HPLC if ferritin normal']
    if (g === 'toddler' || g === 'infant') nextTests.push('Blood lead level')
    if (i.rbc !== undefined && i.mcv !== undefined) {
      const m = mentzer(i.mcv, i.rbc)
      insights.push({ title: `Mentzer index ${m}`, tone: 'info', points: [m < 13 ? '< 13 favors thalassemia trait (confirm with ferritin and HPLC).' : '> 13 favors iron deficiency.'] })
    }
  } else if (size === 'macro') {
    if (g === 'neonate') differential = ['Normal neonatal macrocytosis (use the age band)']
    else if (g === 'infant') differential = ['Diamond-Blackfan anemia (↑eADA, ↑HbF, anomalies)', 'B12 deficiency (maternal deficiency, breastfed)', 'Folate deficiency (goat milk)', 'Drugs', 'Fanconi anemia']
    else if (g === 'adult') differential = ['B12/folate deficiency', 'Alcohol, liver disease, hypothyroidism', 'Drugs (hydroxyurea, methotrexate, AZT)', 'MDS (older adults, other cytopenias)', 'Aplastic anemia']
    else differential = ['B12 (diet, nitrous oxide in teens), folate', 'Drugs (anticonvulsants, methotrexate, hydroxyurea)', 'Fanconi anemia / marrow failure', 'Liver disease, hypothyroidism']
    nextTests = ['Smear (hypersegmentation, macro-ovalocytes)', 'B12, folate, MMA/homocysteine', 'TSH, LFTs', 'Marrow if other cytopenias or unexplained']
  } else if (g === 'neonate') {
    differential = [
      'Blood loss: fetomaternal, twin–twin, placental, internal (subgaleal, liver/spleen)',
      'Hemolysis: alloimmune (ABO/Rh/Kell), HS, G6PD (check retic, DAT, bilirubin)',
      'Decreased production: parvovirus, congenital infection, Diamond-Blackfan',
    ]
    nextTests = ['Reticulocytes', 'DAT and blood groups (mother/infant)', 'Bilirubin', 'Kleihauer-Betke/flow on maternal blood', 'Head ultrasound if subgaleal suspected']
  } else {
    if (g === 'toddler') differential =['Transient erythroblastopenia of childhood (other lines normal)', 'Parvovirus (with underlying hemolysis)', 'Anemia of inflammation, CKD', 'Early iron deficiency', 'Marrow infiltration (ALL) if other lines low']
    else if (g === 'infant') differential = ['Diamond-Blackfan anemia', 'Parvovirus', 'Anemia of inflammation', 'Early iron deficiency']
    else differential = ['Anemia of inflammation', 'CKD (EPO deficiency)', 'Early iron deficiency or mixed deficiency', 'Marrow suppression/infiltration, aplastic anemia', 'Endocrine (hypothyroidism)']
    nextTests = ['Ferritin, CRP', 'Creatinine', 'Smear; parvovirus PCR if hemolytic background', 'Marrow if other lines low or persistent']
  }

  if (i.hb < 7) {
    insights.push({
      title: 'Severe anemia',
      tone: 'danger',
      points: ['Assess hemodynamics. Chronic, compensated anemia may not need transfusion; if it does, give small aliquots slowly.', 'Send pre-transfusion samples (hemolysis, HPLC, iron, B12) before transfusing.'],
    })
  }

  return { anemic, steps, differential, nextTests, insights, group: g }
}
