export type Onset = 'minutes' | 'under6h' | '6to12h' | 'days'

export interface ReactionInput {
  onset: Onset
  product: 'rbc' | 'platelets' | 'plasma'
  fever: boolean // ≥ 38 °C and rise ≥ 1 °C
  highFever: boolean // ≥ 39 °C or rise ≥ 2 °C, or rigors
  hypotension: boolean
  hypertension: boolean
  hypoxemia: boolean
  infiltrates: boolean
  overload: boolean // JVD, edema, positive fluid balance
  bnpHigh: boolean
  urticaria: boolean
  anaphylaxis: boolean // angioedema, wheeze/stridor
  flankPain: boolean
  hemoglobinuria: boolean
  datPositive: boolean
  hbFallJaundice: boolean
  pancytopeniaRash: boolean
  severeThrombocytopenia: boolean
}

export interface RankedReaction {
  id: string
  name: string
  score: number
  matched: string[]
  action: string
}

type Rule = { name: string; action: string; when: (i: ReactionInput) => [number, string][] }

const RULES: Record<string, Rule> = {
  ahtr: {
    name: 'Acute hemolytic reaction (ABO)',
    action: 'Stop; check ID at the bedside; fluids for urine output > 1 mL/kg/h; DAT, hemolysis labs, DIC screen; notify blood bank.',
    when: (i) => [
      [i.onset === 'minutes' || i.onset === 'under6h' ? 1 : -3, 'early onset'],
      [i.hemoglobinuria ? 3 : 0, 'hemoglobinuria'],
      [i.flankPain ? 2 : 0, 'flank/back pain'],
      [i.fever ? 1 : 0, 'fever'],
      [i.hypotension ? 1 : 0, 'hypotension'],
      [i.datPositive ? 2 : 0, 'positive DAT'],
      [i.product === 'rbc' ? 1 : 0, 'red cells'],
    ],
  },
  fnhtr: {
    name: 'Febrile non-hemolytic reaction',
    action: 'Diagnosis of exclusion: rule out hemolysis and sepsis; antipyretic. Leukoreduced products reduce recurrence; premedication does not prevent it.',
    when: (i) => [
      [i.fever ? 3 : 0, 'fever'],
      [i.onset === 'minutes' || i.onset === 'under6h' ? 1 : -2, 'during/after transfusion'],
      [i.hypotension || i.hypoxemia || i.hemoglobinuria ? -3 : 0, 'no instability'],
      [i.highFever ? -1 : 0, ''],
    ],
  },
  allergic: {
    name: 'Allergic (mild)',
    action: 'Antihistamine; the same unit can be resumed if urticaria alone resolves.',
    when: (i) => [
      [i.urticaria ? 4 : 0, 'urticaria/pruritus'],
      [i.anaphylaxis || i.hypotension ? -3 : 0, 'no systemic features'],
      [i.fever ? -1 : 0, ''],
    ],
  },
  anaphylaxis: {
    name: 'Anaphylactic reaction',
    action: 'Stop permanently; IM epinephrine; airway. Check IgA (anti-IgA) and haptoglobin deficiency; washed or IgA-deficient products.',
    when: (i) => [
      [i.anaphylaxis ? 4 : 0, 'angioedema/bronchospasm'],
      [i.hypotension ? 2 : 0, 'hypotension'],
      [i.onset === 'minutes' ? 2 : 0, 'within minutes'],
      [i.fever ? -2 : 0, 'no fever'],
    ],
  },
  trali: {
    name: 'TRALI',
    action: 'Stop; respiratory support (often ventilation); avoid diuretics; report to the supplier for donor antibody testing.',
    when: (i) => [
      [i.hypoxemia ? 3 : 0, 'hypoxemia'],
      [i.infiltrates ? 2 : 0, 'bilateral infiltrates'],
      [i.onset === 'minutes' || i.onset === 'under6h' ? 1 : -4, 'within 6 h'],
      [i.hypotension ? 1 : 0, 'hypotension'],
      [i.fever ? 1 : 0, 'fever'],
      [i.overload || i.hypertension || i.bnpHigh ? -3 : 0, 'no volume overload'],
      [i.product === 'plasma' || i.product === 'platelets' ? 1 : 0, 'plasma-rich product'],
    ],
  },
  taco: {
    name: 'TACO',
    action: 'Stop or slow; sit upright; oxygen; IV diuretic. Prevent with single units, slower rates and pre-emptive diuretics.',
    when: (i) => [
      [i.hypoxemia ? 2 : 0, 'respiratory distress'],
      [i.overload ? 3 : 0, 'JVD/edema/positive balance'],
      [i.hypertension ? 2 : 0, 'hypertension'],
      [i.bnpHigh ? 2 : 0, 'raised BNP'],
      [i.infiltrates ? 1 : 0, 'pulmonary edema'],
      [i.onset === 'days' ? -4 : 0, 'within 12 h'],
      [i.hypotension ? -2 : 0, ''],
    ],
  },
  septic: {
    name: 'Septic (bacterial contamination)',
    action: 'Stop; culture patient and bag; broad-spectrum IV antibiotics; quarantine co-components; notify blood bank.',
    when: (i) => [
      [i.highFever ? 3 : 0, 'high fever/rigors'],
      [i.hypotension ? 2 : 0, 'hypotension'],
      [i.product === 'platelets' ? 2 : 0, 'platelets (room temperature)'],
      [i.onset === 'minutes' || i.onset === 'under6h' ? 1 : -3, 'early'],
    ],
  },
  dhtr: {
    name: 'Delayed hemolytic reaction',
    action: 'Antibody screen and DAT/eluate; supportive; record the antibody. In SCD suspect hyperhemolysis (avoid further transfusion; IVIG + steroids).',
    when: (i) => [
      [i.onset === 'days' ? 3 : -4, 'days later'],
      [i.hbFallJaundice ? 3 : 0, 'falling Hb/jaundice'],
      [i.datPositive ? 2 : 0, 'new positive DAT'],
      [i.fever ? 1 : 0, 'fever'],
    ],
  },
  tagvhd: {
    name: 'Transfusion-associated GVHD',
    action: 'Very high mortality; supportive care, consider HSCT. Prevention is irradiation of products for at-risk recipients and directed donations from relatives.',
    when: (i) => [
      [i.onset === 'days' ? 2 : -4, '2–30 days'],
      [i.pancytopeniaRash ? 5 : 0, 'pancytopenia + rash/diarrhea/LFTs'],
    ],
  },
  ptp: {
    name: 'Post-transfusion purpura',
    action: 'IVIG; HPA-1a-negative platelets if bleeding.',
    when: (i) => [
      [i.onset === 'days' ? 2 : -4, '5–12 days'],
      [i.severeThrombocytopenia ? 4 : 0, 'severe thrombocytopenia'],
    ],
  },
}

export function rankReactions(i: ReactionInput): RankedReaction[] {
  return Object.entries(RULES)
    .map(([id, r]) => {
      const parts = r.when(i)
      const score = parts.reduce((a, [s]) => a + s, 0)
      const matched = parts.filter(([s, label]) => s > 0 && label).map(([, l]) => l)
      return { id, name: r.name, score, matched, action: r.action }
    })
    .filter((r) => r.score >= 3)
    .sort((a, b) => b.score - a.score)
}

export const UNIVERSAL_STEPS = [
  'Stop the transfusion; keep the line open with saline.',
  'Check patient ID against the unit at the bedside.',
  'Vital signs, examine, treat the emergency (airway, BP).',
  'Notify the blood bank; return the bag; send post-transfusion sample (type, DAT, hemolysis labs, urinalysis) ± cultures, CXR, BNP.',
]
