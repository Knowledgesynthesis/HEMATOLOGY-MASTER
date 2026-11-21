import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Baby,
  CircleDot,
  Dna,
  Droplets,
  Flame,
  HeartPulse,
  Microscope,
  Network,
  ShieldAlert,
  Syringe,
  Waypoints,
} from 'lucide-react'

export interface ModuleMeta {
  id: string
  title: string
  short: string
  blurb: string
  icon: LucideIcon
  /** Tailwind text color class for the icon. */
  accent: string
  /** Where the weight of the module sits. */
  lean: 'peds' | 'adult' | 'balanced'
}

/** Curriculum order: physiology first, then benign → malignant → hemostasis → transfusion. */
export const MODULES: ModuleMeta[] = [
  {
    id: 'foundations',
    title: 'Foundations & Normal Values',
    short: 'Foundations',
    blurb: 'Developmental hematopoiesis, the CBC read like a hematologist, age-specific ranges, reticulocytes, iron, hemoglobin switching, hemostasis.',
    icon: Microscope,
    accent: 'text-sky-500',
    lean: 'balanced',
  },
  {
    id: 'neonatal',
    title: 'Neonatal Hematology',
    short: 'Neonatal',
    blurb: 'Physiologic nadir, HDFN and bilirubin, polycythemia, neonatal thrombocytopenia and FNAIT, VKDB, neonatal thrombosis, Down syndrome TAM.',
    icon: Baby,
    accent: 'text-cyan-500',
    lean: 'peds',
  },
  {
    id: 'anemia',
    title: 'Anemia: Approach, Iron & Nutritional',
    short: 'Anemia',
    blurb: 'A three-question approach, iron deficiency across ages (AAP 2026), inflammation, lead, thalassemia trait vs IDA, sideroblastic and macrocytic anemias.',
    icon: Droplets,
    accent: 'text-red-500',
    lean: 'balanced',
  },
  {
    id: 'hemolysis',
    title: 'Hemolytic Anemias & TMA',
    short: 'Hemolysis',
    blurb: 'Markers and pitfalls, membrane and enzyme disorders, immune hemolysis (warm, cold, PCH), HUS, TTP, PNH.',
    icon: Flame,
    accent: 'text-orange-500',
    lean: 'balanced',
  },
  {
    id: 'hemoglobinopathies',
    title: 'Sickle Cell Disease & Thalassemia',
    short: 'Sickle & Thal',
    blurb: 'Newborn screen to adulthood: fever, pain, ACS, sequestration, stroke screening, hydroxyurea, gene therapy, α/β-thalassemia, electrophoresis.',
    icon: Dna,
    accent: 'text-emerald-500',
    lean: 'peds',
  },
  {
    id: 'marrow',
    title: 'Marrow Failure, Neutropenia & WBC Disorders',
    short: 'Marrow & WBC',
    blurb: 'Neutropenia work-up, febrile neutropenia, aplastic anemia, inherited marrow failure (FA, DBA, SDS), reactive patterns, HLH, LCH.',
    icon: ShieldAlert,
    accent: 'text-amber-500',
    lean: 'peds',
  },
  {
    id: 'leukemia',
    title: 'Leukemias & Myeloid Neoplasms',
    short: 'Leukemia',
    blurb: 'Pediatric ALL and AML, APL, CML, CLL, MDS/JMML, MPN, WHO/ICC 2022 and oncologic emergencies.',
    icon: Activity,
    accent: 'text-purple-500',
    lean: 'balanced',
  },
  {
    id: 'lymphoma',
    title: 'Lymphadenopathy, Lymphoma & Plasma Cells',
    short: 'Lymphoma',
    blurb: 'When a node needs biopsy, Hodgkin across ages, pediatric vs adult NHL, MGUS, myeloma, AL amyloidosis.',
    icon: Network,
    accent: 'text-violet-500',
    lean: 'balanced',
  },
  {
    id: 'platelets',
    title: 'Platelet Disorders',
    short: 'Platelets',
    blurb: 'Approach to thrombocytopenia, pediatric vs adult ITP (ASH 2019/2026), DIC, HIT, inherited platelet disorders, thrombocytosis.',
    icon: CircleDot,
    accent: 'text-yellow-500',
    lean: 'balanced',
  },
  {
    id: 'bleeding',
    title: 'Bleeding Disorders & Coagulation',
    short: 'Bleeding',
    blurb: 'Bleeding history, PT/aPTT logic, mixing studies, VWD (2021 guidelines), hemophilia in the non-factor era, rare factors, bleeding vs abuse.',
    icon: HeartPulse,
    accent: 'text-pink-500',
    lean: 'balanced',
  },
  {
    id: 'thrombosis',
    title: 'Thrombosis & Anticoagulation',
    short: 'Thrombosis',
    blurb: 'Pediatric VTE (ASH/ISTH 2025), adult VTE, thrombophilia testing, APS, estrogen in adolescents, anticoagulant reversal.',
    icon: Waypoints,
    accent: 'text-indigo-500',
    lean: 'balanced',
  },
  {
    id: 'transfusion',
    title: 'Transfusion Medicine',
    short: 'Transfusion',
    blurb: 'Products and modifications, compatibility, evidence-based thresholds (AABB 2023/2025, TOP, PlaNeT-2), pediatric dosing, reactions, massive transfusion.',
    icon: Syringe,
    accent: 'text-rose-500',
    lean: 'balanced',
  },
]

export const MODULE_BY_ID: Record<string, ModuleMeta> = Object.fromEntries(MODULES.map((m) => [m.id, m]))
