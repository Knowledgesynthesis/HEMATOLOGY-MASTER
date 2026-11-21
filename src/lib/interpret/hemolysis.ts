import type { Insight } from './types'

export type Tri = 'high' | 'normal' | 'unknown'
export type Dat = 'negative' | 'igg' | 'c3' | 'igg-c3' | 'not-done'
export type Smear =
  | 'none'
  | 'spherocytes'
  | 'schistocytes'
  | 'bite'
  | 'sickle'
  | 'targets'
  | 'elliptocytes'
  | 'acanthocytes'
  | 'agglutination'

export interface HemolysisInput {
  ageGroup: 'neonate' | 'young-infant' | 'child' | 'adult'
  retic: 'high' | 'normal' | 'low' | 'unknown'
  ldh: Tri
  haptoglobin: 'low' | 'normal' | 'unknown'
  indirectBili: Tri
  hemoglobinuria: boolean
  dat: Dat
  smear: Smear
  lowPlatelets: boolean
  aki: boolean
  recentTransfusion: boolean
  trigger: 'none' | 'infection' | 'oxidant' | 'cold' | 'diarrhea'
}

export interface Candidate {
  name: string
  why: string
  next: string
  href?: string
}

export interface HemolysisResult {
  likelihood: 'likely' | 'possible' | 'unlikely'
  score: number
  site: 'intravascular' | 'extravascular' | 'undetermined'
  insights: Insight[]
  candidates: Candidate[]
}

export function interpretHemolysis(i: HemolysisInput): HemolysisResult {
  const hapUsable = i.ageGroup === 'child' || i.ageGroup === 'adult'
  const markers = [
    i.retic === 'high',
    i.ldh === 'high',
    hapUsable && i.haptoglobin === 'low',
    i.indirectBili === 'high',
    i.hemoglobinuria,
    ['spherocytes', 'schistocytes', 'bite', 'sickle', 'agglutination'].includes(i.smear),
    i.dat !== 'negative' && i.dat !== 'not-done',
  ]
  const score = markers.filter(Boolean).length
  const likelihood = score >= 3 ? 'likely' : score >= 1 ? 'possible' : 'unlikely'

  const intravascular = i.hemoglobinuria || i.smear === 'schistocytes' || (i.dat === 'c3' && i.trigger === 'infection' && i.ageGroup === 'child') || i.smear === 'bite'
  const site: HemolysisResult['site'] = intravascular ? 'intravascular' : ['spherocytes', 'sickle', 'targets', 'elliptocytes'].includes(i.smear) || i.dat === 'igg' ? 'extravascular' : 'undetermined'

  const insights: Insight[] = []
  const candidates: Candidate[] = []
  const add = (c: Candidate) => candidates.push(c)

  if (!hapUsable && i.haptoglobin === 'low') {
    insights.push({ title: 'Haptoglobin not interpretable', tone: 'info', points: ['Haptoglobin is physiologically low in neonates and young infants. Rely on retic, bilirubin, smear and DAT.'] })
  }
  if (i.retic === 'low' && score >= 2) {
    insights.push({
      title: 'Hemolysis with low retic',
      tone: 'warn',
      points: ['Think parvovirus aplastic crisis, concurrent iron/folate deficiency, autoantibody against precursors, or marrow infiltration.'],
    })
  }

  // DAT-positive branch
  if (i.dat === 'igg' || i.dat === 'igg-c3') {
    if (i.ageGroup === 'neonate') add({ name: 'Alloimmune HDFN (ABO, Rh, Kell)', why: 'Positive DAT in a neonate', next: 'Maternal antibody screen, infant/maternal blood groups, bilirubin plan (AAP 2022)', href: '/learn/neonatal#hdfn' })
    if (i.recentTransfusion) add({ name: 'Delayed hemolytic transfusion reaction', why: 'Recent transfusion with positive DAT', next: 'Antibody screen/eluate; in SCD consider hyperhemolysis', href: '/learn/transfusion#reactions' })
    add({
      name: 'Warm autoimmune hemolytic anemia',
      why: 'IgG-positive DAT' + (i.smear === 'spherocytes' ? ' with spherocytes' : ''),
      next: i.ageGroup === 'adult' ? 'Look for CLL/lymphoma, SLE, drugs; steroids first-line' : 'Post-viral or Evans syndrome → screen for ALPS/immune dysregulation; steroids first-line',
      href: '/learn/hemolysis#aiha',
    })
    if (i.lowPlatelets) add({ name: 'Evans syndrome', why: 'AIHA plus thrombocytopenia', next: 'Immune work-up (DNT cells, immunoglobulins, genetic panel)', href: '/learn/hemolysis#aiha' })
  }
  if (i.dat === 'c3' || i.dat === 'igg-c3') {
    if (i.ageGroup === 'child' && (i.hemoglobinuria || i.trigger === 'infection')) add({ name: 'Paroxysmal cold hemoglobinuria', why: 'C3-only DAT, intravascular hemolysis, young child after infection', next: 'Donath-Landsteiner test; keep warm', href: '/learn/hemolysis#aiha' })
    add({
      name: i.ageGroup === 'adult' ? 'Cold agglutinin disease / syndrome' : 'Cold agglutinin syndrome (Mycoplasma, EBV)',
      why: 'C3-only DAT' + (i.smear === 'agglutination' ? ' with RBC agglutination' : ''),
      next: 'Cold agglutinin titer; keep warm; adults: look for a clonal B-cell disorder',
      href: '/learn/hemolysis#aiha',
    })
  }

  // DAT-negative / not done: smear-led
  if (i.dat === 'negative' || i.dat === 'not-done') {
    switch (i.smear) {
      case 'schistocytes':
        if (i.trigger === 'diarrhea' || (i.aki && i.ageGroup === 'child'))
          add({ name: 'HUS (STEC most often in children)', why: 'Schistocytes' + (i.aki ? ' + AKI' : '') + (i.trigger === 'diarrhea' ? ' after diarrhea' : ''), next: 'Stool Shiga toxin/STEC PCR, complement studies if atypical; supportive care, no antibiotics for STEC', href: '/learn/hemolysis#hus' })
        add({ name: 'TTP', why: 'Schistocytes' + (i.lowPlatelets ? ' with thrombocytopenia' : ''), next: 'ADAMTS13 (before plasma); PLASMIC score; plasma exchange if high probability', href: '/learn/hemolysis#ttp' })
        add({ name: 'DIC', why: 'Schistocytes with consumption', next: 'PT, aPTT, fibrinogen, D-dimer; ISTH score', href: '/learn/platelets#dic' })
        add({ name: 'Mechanical (valves, ECMO, Kasabach-Merritt)', why: 'Fragmentation', next: 'Device/imaging review' })
        break
      case 'spherocytes':
        add({ name: 'Hereditary spherocytosis', why: 'Spherocytes with negative DAT', next: 'EMA binding, family history, MCHC; folate, splenectomy only if severe', href: '/learn/hemolysis#hs' })
        if (i.ageGroup === 'neonate') add({ name: 'ABO HDFN (DAT often weak/negative)', why: 'Neonatal spherocytes', next: 'Mother O and infant A/B? Treat by bilirubin curves', href: '/learn/neonatal#hdfn' })
        add({ name: 'DAT-negative AIHA', why: 'Spherocytes can occur with low-level antibody', next: 'Sensitive DAT methods (column, eluate)', href: '/learn/hemolysis#aiha' })
        break
      case 'bite':
        add({ name: 'G6PD deficiency', why: 'Bite/blister cells' + (i.trigger === 'oxidant' ? ' after an oxidant' : i.trigger === 'infection' ? ' with infection' : ''), next: 'G6PD activity (repeat after recovery if normal); stop oxidants', href: '/learn/hemolysis#g6pd' })
        add({ name: 'Unstable hemoglobin', why: 'Heinz bodies', next: 'Heat/isopropanol stability, HPLC' })
        break
      case 'sickle':
        add({ name: 'Sickle cell disease', why: 'Sickled cells', next: 'HPLC; acute complications (sequestration, aplastic crisis, DHTR)', href: '/learn/hemoglobinopathies#genetics-nbs' })
        break
      case 'targets':
        add({ name: 'Hemoglobinopathy (HbC, HbSC, thalassemia) or liver disease', why: 'Target cells', next: 'HPLC, iron studies, LFTs', href: '/learn/hemoglobinopathies#hplc' })
        break
      case 'elliptocytes':
        add({ name: 'Hereditary elliptocytosis / pyropoikilocytosis', why: 'Elliptocytes', next: 'Ektacytometry, membrane gene panel; HPP in infants can be severe' })
        break
      case 'acanthocytes':
        add({ name: 'Spur cell hemolysis (liver disease)', why: 'Acanthocytes', next: 'LFTs; adolescent with liver disease + Coombs-negative hemolysis → Wilson disease (ceruloplasmin)' })
        break
      default:
        if (score >= 2) {
          add({ name: 'PK deficiency or other enzymopathy', why: 'Hemolysis without diagnostic morphology', next: 'Enzyme panel (PK), NGS hemolysis panel', href: '/learn/hemolysis#pk' })
          add({ name: 'PNH', why: 'DAT-negative intravascular hemolysis' + (i.lowPlatelets ? ' with cytopenias' : ''), next: 'Flow cytometry (FLAER/CD59)', href: '/learn/hemolysis#pnh' })
          if (i.ageGroup !== 'neonate') add({ name: 'Wilson disease (adolescents/young adults)', why: 'Coombs-negative hemolysis ± liver disease', next: 'Ceruloplasmin, urine copper' })
        }
    }
    if (i.trigger === 'oxidant' && !candidates.some((c) => c.name.startsWith('G6PD'))) add({ name: 'G6PD deficiency', why: 'Oxidant exposure', next: 'G6PD activity', href: '/learn/hemolysis#g6pd' })
  }

  if (i.dat === 'not-done' && score >= 1) {
    insights.push({ title: 'Send a DAT', tone: 'info', points: ['The DAT splits immune from non-immune hemolysis and is the pivotal first branch.'] })
  }
  if (i.smear === 'schistocytes' && i.lowPlatelets) {
    insights.unshift({
      title: 'Thrombotic microangiopathy',
      tone: 'danger',
      points: ['Schistocytes + thrombocytopenia: TMA until proven otherwise.', 'Adults: draw ADAMTS13 and start plasma exchange if PLASMIC is high. Children: STEC-HUS most common; consider aHUS, pneumococcal HUS, cblC (infants).'],
      links: [{ label: 'PLASMIC score', href: '/tools/scores' }],
    })
  }
  if (likelihood === 'unlikely') {
    insights.push({ title: 'Hemolysis unlikely', tone: 'ok', points: ['No hemolysis markers are present. Consider blood loss or under-production; check the reticulocyte count and indices.'] })
  }

  return { likelihood, score, site, insights, candidates }
}
