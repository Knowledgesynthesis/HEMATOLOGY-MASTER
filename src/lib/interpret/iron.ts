import { mentzer } from '../calc'
import type { Insight } from './types'

export type IronAge = 'under5' | 'child' | 'adolescent' | 'adult'

export interface IronInput {
  age: IronAge
  ferritin?: number
  tsat?: number
  inflammation?: boolean
  hb?: number
  mcv?: number
  rbc?: number
  anemic?: boolean
  microcytic?: boolean
}

/** Ferritin thresholds (ng/mL ≈ µg/L): [no inflammation, with inflammation]. */
export const FERRITIN_CUTOFF: Record<IronAge, [number, number]> = {
  under5: [20, 30], // AAP 2026 (children) / WHO 2020 with inflammation
  child: [20, 70], // AAP 2026 / WHO 2020 (≥ 5 y) with inflammation
  adolescent: [30, 70],
  adult: [30, 100], // with inflammation, ferritin < 100 plus TSAT < 20% suggests ID
}

export type IronPattern = 'absolute-id' | 'id-with-inflammation' | 'inflammation' | 'overload' | 'normal' | 'indeterminate'

export interface IronResult {
  pattern: IronPattern
  title: string
  tone: Insight['tone']
  insights: Insight[]
  mentzer?: number
}

export function interpretIron(i: IronInput): IronResult {
  const [cut, cutInfl] = FERRITIN_CUTOFF[i.age]
  const insights: Insight[] = []
  let pattern: IronPattern = 'indeterminate'
  const lowTsat = i.tsat !== undefined && i.tsat < 20
  const m = i.mcv !== undefined && i.rbc !== undefined ? mentzer(i.mcv, i.rbc) : undefined

  if (i.ferritin === undefined) {
    return {
      pattern,
      title: 'Ferritin needed',
      tone: 'info',
      insights: [{ title: 'Enter a ferritin', tone: 'info', points: ['Ferritin is the key test for iron stores (AAP 2026 pairs it with the CBC).'] }],
      mentzer: m,
    }
  }

  if ((i.tsat !== undefined && i.tsat > 45 && i.ferritin > 300) || i.ferritin > 1000) {
    pattern = 'overload'
  } else if (i.ferritin < cut) {
    pattern = 'absolute-id'
  } else if (i.inflammation && i.ferritin < cutInfl && (i.tsat === undefined || lowTsat)) {
    pattern = 'id-with-inflammation'
  } else if (i.inflammation && lowTsat) {
    pattern = 'inflammation'
  } else if (!lowTsat || i.tsat === undefined) {
    pattern = 'normal'
  } else {
    pattern = 'indeterminate'
  }

  const peds = i.age !== 'adult'
  switch (pattern) {
    case 'absolute-id':
      insights.push({
        title: 'Iron deficiency',
        tone: 'warn',
        points: [
          `Ferritin ${i.ferritin} is below ${cut} ng/mL for this age group${peds ? ' (AAP 2026)' : ''}.`,
          peds
            ? i.age === 'adolescent'
              ? 'Treat: 65 mg elemental iron once daily. Assess menstrual losses (screen for VWD if heavy menstrual bleeding) and diet.'
              : 'Treat: 3 mg/kg/day elemental iron once daily, away from milk. Limit cow’s milk to ≤ 16–24 oz/day. Screen for lead in young children.'
            : 'Find the source: bidirectional endoscopy for men and postmenopausal women (AGA), menstrual history, celiac and H. pylori testing. Oral iron daily or on alternate days.',
          'Expect Hb ↑ ≥ 1–2 g/dL by 4 weeks; continue ~3 months to replete stores.',
        ],
        links: [{ label: peds ? 'Pediatric IDA (AAP 2026)' : 'Adult IDA', href: peds ? '/learn/anemia#ida-peds' : '/learn/anemia#ida-adult' }],
      })
      break
    case 'id-with-inflammation':
      insights.push({
        title: 'Iron deficiency with inflammation',
        tone: 'warn',
        points: [
          `With inflammation, ferritin < ${cutInfl}${i.tsat !== undefined ? ` and TSAT ${i.tsat}%` : ''} still indicates iron deficiency (ferritin is an acute-phase reactant).`,
          'Oral iron is often poorly absorbed with active inflammation (↑hepcidin). Consider IV iron, especially in IBD or CKD.',
          'sTfR or CHr/Ret-He help when unclear.',
        ],
        links: [{ label: 'Inflammation & CKD', href: '/learn/anemia#inflammation' }],
      })
      break
    case 'inflammation':
      insights.push({
        title: 'Anemia of inflammation pattern',
        tone: 'info',
        points: ['Low TSAT with adequate ferritin and inflammation: iron is sequestered by hepcidin.', 'Treat the underlying disease. IV iron/ESA in selected settings (CKD).'],
        links: [{ label: 'Inflammation & CKD', href: '/learn/anemia#inflammation' }],
      })
      break
    case 'overload':
      insights.push({
        title: 'Iron overload pattern',
        tone: 'warn',
        points: [
          'Consider transfusional overload, ineffective erythropoiesis (thalassemia/NTDT, sideroblastic, PK deficiency), hereditary hemochromatosis (HFE; adults).',
          'Ferritin also rises with inflammation, liver injury and malignancy. Confirm with liver iron by MRI (R2/R2*).',
          peds && i.ferritin > 10000 ? 'Ferritin > 10,000 in a febrile child: evaluate for HLH urgently.' : 'If TSAT > 45% persistently: HFE genotyping (adults).',
        ],
        links: [{ label: 'β-thalassemia & chelation', href: '/learn/hemoglobinopathies#beta-thal' }],
      })
      break
    case 'normal':
      insights.push({
        title: 'Iron stores adequate',
        tone: 'ok',
        points: ['Iron deficiency is unlikely to explain anemia or microcytosis.'],
      })
      break
    default:
      insights.push({ title: 'Indeterminate', tone: 'info', points: ['Low TSAT with normal ferritin and no inflammation: repeat fasting; consider early iron deficiency, recent infection, or add CRP/sTfR.'] })
  }

  if ((i.microcytic || (i.mcv !== undefined && i.mcv < 80)) && (pattern === 'normal' || pattern === 'overload' || pattern === 'inflammation')) {
    insights.push({
      title: 'Microcytosis without iron deficiency',
      tone: 'info',
      points: [
        m !== undefined ? `Mentzer index ${m} (${m < 13 ? '< 13 favors thalassemia trait' : '> 13 is less typical of trait'}).` : 'Add an RBC count to compute the Mentzer index.',
        'Order Hb HPLC/electrophoresis: HbA₂ > 3.5% → β-thal trait. Normal HPLC → consider α-thal trait (DNA testing if counseling needed).',
        'Also consider lead (children), sideroblastic anemia, anemia of inflammation.',
      ],
      links: [{ label: 'Thal trait vs IDA', href: '/learn/anemia#thal-vs-ida' }],
    })
  }

  const head = insights[0]
  return { pattern, title: head.title, tone: head.tone, insights, mentzer: m }
}
