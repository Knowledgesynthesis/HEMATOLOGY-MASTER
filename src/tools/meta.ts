import type { LucideIcon } from 'lucide-react'
import { Baby, Calculator, ClipboardList, Droplets, Flame, FlaskConical, Gauge, HeartPulse, ScanSearch, Siren, Syringe } from 'lucide-react'
import type { Pop } from '@/content/types'

export interface ToolMeta {
  id: string
  title: string
  blurb: string
  icon: LucideIcon
  pop: Pop
}

export const TOOLS: ToolMeta[] = [
  { id: 'cbc', title: 'CBC Interpreter', blurb: 'Age- and sex-specific flags from birth to adulthood, RPI, Mentzer, red flags.', icon: ClipboardList, pop: 'both' },
  { id: 'anemia', title: 'Anemia Work-up', blurb: 'Three-step pathway: real? → production → size, with age-specific differentials.', icon: Droplets, pop: 'both' },
  { id: 'iron', title: 'Iron Studies', blurb: 'AAP 2026 / WHO ferritin cut-offs, inflammation-aware, thal-trait screen.', icon: FlaskConical, pop: 'both' },
  { id: 'hemolysis', title: 'Hemolysis Work-up', blurb: 'DAT-first, smear-led differential with neonatal caveats.', icon: Flame, pop: 'both' },
  { id: 'smear-atlas', title: 'Smear Atlas', blurb: 'Illustrated RBC, WBC and platelet findings with a flashcard drill.', icon: ScanSearch, pop: 'both' },
  { id: 'leukemia-red-flags', title: 'Leukemia Red Flags', blurb: 'ALL vs ITP/JIA mimics, mediastinal mass, APL, CML/CLL/JMML patterns.', icon: Siren, pop: 'both' },
  { id: 'coagulation', title: 'Coagulation Interpreter', blurb: 'PT/aPTT/TT/fibrinogen, mixing, bleeding phenotype, neonatal and drug context.', icon: HeartPulse, pop: 'both' },
  { id: 'transfusion-reactions', title: 'Transfusion Reactions', blurb: 'Rank likely reactions from bedside findings (ISBT definitions).', icon: Syringe, pop: 'both' },
  { id: 'newborn-screen', title: 'Newborn Screen Decoder', blurb: 'FS, FAS, FSC, FA+Barts and more: meaning, urgency, next steps.', icon: Baby, pop: 'peds' },
  { id: 'scores', title: 'Clinical Scores', blurb: '4Ts (HIT), PLASMIC (TTP), ISTH DIC, HLH-2004.', icon: Gauge, pop: 'both' },
  { id: 'calculators', title: 'Bedside Calculators', blurb: 'Transfusion volumes, exchange, iron (oral/Ganzoni), factor, enoxaparin, hydroxyurea, RPI, ANC.', icon: Calculator, pop: 'both' },
]

export const TOOL_BY_ID: Record<string, ToolMeta> = Object.fromEntries(TOOLS.map((t) => [t.id, t]))
