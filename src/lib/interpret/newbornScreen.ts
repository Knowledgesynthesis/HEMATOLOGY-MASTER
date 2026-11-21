export interface NbsPattern {
  code: string
  meaning: string
  genotypes: string[]
  urgency: 'none' | 'routine' | 'prompt' | 'urgent'
  actions: string[]
  pitfalls?: string[]
  href?: string
}

/** Newborn hemoglobin screening results are listed in order of quantity (F first in a newborn). */
export const NBS_PATTERNS: NbsPattern[] = [
  { code: 'FA', meaning: 'Normal', genotypes: ['AA'], urgency: 'none', actions: ['No action.'] },
  {
    code: 'FAS',
    meaning: 'Sickle cell trait (A > S)',
    genotypes: ['AS'],
    urgency: 'routine',
    actions: ['Inform the family and primary care.', 'Genetic counseling: offer parental testing; future pregnancies at risk if both parents carry.'],
    pitfalls: ['Not disease; no penicillin needed.'],
    href: '/learn/hemoglobinopathies#trait',
  },
  {
    code: 'FS',
    meaning: 'Sickle cell disease presumed',
    genotypes: ['SS', 'S/β⁰-thalassemia', 'S/HPFH (benign; rare)', 'S/δβ-thalassemia'],
    urgency: 'urgent',
    actions: ['Confirm with repeat HPLC ± DNA/parental studies.', 'Penicillin VK 125 mg BID by 2 months.', 'Refer to a comprehensive SCD center; fever plan (T ≥ 38.5 °C → ED).', 'Spleen palpation teaching; vaccines; hydroxyurea from 9 months.'],
    href: '/learn/hemoglobinopathies#fever',
  },
  {
    code: 'FSA',
    meaning: 'Sickle cell disease: HbS/β⁺-thalassemia (S > A)',
    genotypes: ['S/β⁺-thalassemia'],
    urgency: 'urgent',
    actions: ['Confirm; penicillin by 2 months; SCD center referral (same as FS).'],
    pitfalls: ['If the baby was transfused, A may be donor Hb. Repeat 3–4 months after transfusion or use DNA.'],
    href: '/learn/hemoglobinopathies#genetics-nbs',
  },
  {
    code: 'FSC',
    meaning: 'Sickle cell disease: HbSC',
    genotypes: ['SC'],
    urgency: 'urgent',
    actions: ['Confirm; penicillin; SCD center.', 'Lifelong: retinal screening from age 10 (retinopathy is commoner in SC); sequestration can occur later than in SS.'],
    href: '/learn/hemoglobinopathies#chronic',
  },
  {
    code: 'FAC',
    meaning: 'HbC trait',
    genotypes: ['AC'],
    urgency: 'routine',
    actions: ['Inform; genetic counseling (partner with S trait → HbSC risk).'],
  },
  {
    code: 'FC',
    meaning: 'HbC disease or HbC/β⁰-thalassemia',
    genotypes: ['CC', 'C/β⁰-thalassemia'],
    urgency: 'prompt',
    actions: ['Hematology follow-up; mild hemolysis, target cells, splenomegaly; family studies.'],
  },
  {
    code: 'FAE',
    meaning: 'HbE trait',
    genotypes: ['AE'],
    urgency: 'routine',
    actions: ['Mild microcytosis later; counsel (partner with β-thal trait → HbE/β-thal risk).'],
  },
  {
    code: 'FE',
    meaning: 'HbEE or HbE/β⁰-thalassemia',
    genotypes: ['EE (benign microcytosis)', 'E/β⁰-thalassemia (can be transfusion-dependent)'],
    urgency: 'prompt',
    actions: ['Cannot distinguish at birth: DNA or parental studies.', 'Monitor Hb and growth from 3–6 months.'],
    href: '/learn/hemoglobinopathies#beta-thal',
  },
  {
    code: 'FA + Barts',
    meaning: 'α-thalassemia',
    genotypes: ['Silent carrier (low Barts)', 'α-thal trait', 'HbH disease (high Barts)'],
    urgency: 'routine',
    actions: ['More Barts → more deleted genes. Confirm with CBC at ~1 year ± α-globin gene testing.', 'HbH suspected → hematology; avoid oxidant drugs.', 'Counsel: cis carriers (−−/αα) risk Hb Barts hydrops in offspring.'],
    href: '/learn/hemoglobinopathies#alpha-thal',
  },
  {
    code: 'F only',
    meaning: 'No HbA detected',
    genotypes: ['β⁰-thalassemia major', 'Homozygous HPFH', 'Extreme prematurity (HbA not yet made)'],
    urgency: 'urgent',
    actions: ['Repeat and confirm; DNA studies.', 'Hematology referral; monitor for anemia from ~3–6 months (TDT presents 6–24 months).'],
    href: '/learn/hemoglobinopathies#beta-thal',
  },
  {
    code: 'FAV / FV',
    meaning: 'Other variant hemoglobin',
    genotypes: ['D, G, O-Arab, others'],
    urgency: 'prompt',
    actions: ['Identify the variant. HbS combined with D-Punjab or O-Arab causes SCD.'],
  },
  {
    code: 'AF / AS / AFS',
    meaning: 'A > F in a newborn',
    genotypes: ['Transfused before sampling', 'Older infant'],
    urgency: 'prompt',
    actions: ['Ask about transfusion. Repeat 3–4 months after the last transfusion, or use DNA testing.'],
    pitfalls: ['A pre-transfusion sample avoids this problem.'],
  },
]
