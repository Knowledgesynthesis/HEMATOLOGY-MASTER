import type { Insight } from './types'

export interface CoagInput {
  pt: 'normal' | 'prolonged'
  aptt: 'normal' | 'prolonged'
  fibrinogen: 'normal' | 'low' | 'unknown'
  platelets: 'normal' | 'low'
  tt: 'normal' | 'prolonged' | 'unknown'
  mixing: 'not-done' | 'corrects' | 'no-correct' | 'late-prolong'
  bleeding: 'none' | 'mucocutaneous' | 'deep'
  ctx: {
    neonate?: boolean
    heparin?: boolean
    warfarin?: boolean
    doac?: boolean
    emicizumab?: boolean
    liver?: boolean
    sick?: boolean
    vitkRisk?: boolean
  }
}

export interface CoagResult {
  pattern: string
  differential: { name: string; why: string; next: string; href?: string }[]
  insights: Insight[]
}

export function interpretCoag(i: CoagInput): CoagResult {
  const d: CoagResult['differential'] = []
  const insights: Insight[] = []
  const add = (name: string, why: string, next: string, href?: string) => d.push({ name, why, next, href })
  const c = i.ctx
  let pattern = ''

  if (c.neonate) {
    insights.push({ title: 'Use neonatal ranges', tone: 'info', points: ['PT and aPTT are physiologically longer in neonates (developmental hemostasis). Interpret against gestational-age-specific ranges.'] })
  }
  if (c.emicizumab) {
    insights.push({
      title: 'Emicizumab interferes',
      tone: 'warn',
      points: ['Emicizumab shortens or normalizes the aPTT and invalidates one-stage FVIII and Bethesda assays. Use chromogenic (bovine) assays.'],
    })
  }

  // DIC first when the overall picture fits
  const dicPicture = i.pt === 'prolonged' && i.platelets === 'low' && (i.fibrinogen === 'low' || c.sick)

  if (i.pt === 'normal' && i.aptt === 'normal') {
    pattern = 'Normal PT and aPTT'
    if (i.bleeding === 'none') {
      add('No coagulation factor defect evident', 'Screening tests are normal and there is no bleeding history', 'No further testing unless history changes')
    } else {
      if (i.platelets === 'low') add('Thrombocytopenia', 'Low platelet count', 'Smear, platelet work-up', '/learn/platelets#approach')
      add('von Willebrand disease', 'VWD often has a normal aPTT', 'VWF antigen, activity (GPIbM), FVIII; repeat if stressed', '/learn/bleeding#vwd')
      add('Platelet function disorder', i.bleeding === 'mucocutaneous' ? 'Mucocutaneous pattern' : 'Normal screening tests', 'Light transmission aggregometry, flow cytometry, PFA-100 (screen only)', '/learn/platelets#inherited')
      add('Factor XIII deficiency', 'Not detected by PT/aPTT; umbilical bleeding, ICH, poor wound healing', 'FXIII activity', '/learn/bleeding#rare-factors')
      add('Mild factor deficiency (e.g., FXI, mild hemophilia)', 'Mild deficiencies can leave screening tests normal', 'Specific factor assays')
      add('Fibrinolytic defect (α2-antiplasmin, PAI-1), vascular (EDS), scurvy', 'Delayed bleeding with normal tests', 'Specialist testing; trial of antifibrinolytic')
    }
  } else if (i.pt === 'prolonged' && i.aptt === 'normal') {
    pattern = 'Isolated prolonged PT'
    if (c.warfarin) add('Warfarin effect', 'On a VKA', 'INR; reverse with vitamin K ± 4F-PCC if bleeding', '/learn/thrombosis#reversal')
    if (c.vitkRisk || c.neonate) add('Vitamin K deficiency (early)', c.neonate ? 'Newborn (missed prophylaxis, cholestasis, maternal drugs)' : 'Malabsorption, antibiotics, cholestasis', 'Give vitamin K; PT corrects within ~12–24 h; PIVKA-II', '/learn/neonatal#vkdb')
    if (c.liver) add('Liver disease (early)', 'FVII has the shortest half-life', 'FV and FVIII (FV low in liver disease; FVIII normal/high)', '/learn/bleeding#liver-acquired')
    add('Congenital FVII deficiency', 'Isolated PT prolongation', 'FVII activity', '/learn/bleeding#rare-factors')
    if (!c.warfarin && !c.vitkRisk) add('Vitamin K deficiency or warfarin (occult)', 'Common causes even without obvious history', 'Vitamin K trial; drug history')
  } else if (i.pt === 'normal' && i.aptt === 'prolonged') {
    pattern = 'Isolated prolonged aPTT'
    if (c.heparin || i.tt === 'prolonged') add('Heparin (therapy or line contamination)', i.tt === 'prolonged' ? 'Prolonged thrombin time' : 'Heparin exposure', 'Thrombin time ± heparinase; redraw peripherally')
    if (i.mixing === 'corrects' || i.mixing === 'not-done') {
      if (i.bleeding !== 'none') {
        add('Hemophilia A (FVIII) or B (FIX)', i.bleeding === 'deep' ? 'Deep tissue/joint bleeding' : 'Bleeding with long aPTT', 'FVIII, FIX activity', '/learn/bleeding#hemophilia')
        add('von Willebrand disease (low FVIII; type 2N, 3)', 'VWF carries FVIII', 'VWF panel, FVIII binding (2N)', '/learn/bleeding#vwd')
        add('Factor XI deficiency', 'Injury/surgery-related bleeding, Ashkenazi ancestry', 'FXI activity', '/learn/bleeding#rare-factors')
      } else {
        add('Contact factor deficiency (FXII, prekallikrein, HMWK)', 'No bleeding history', 'FXII activity; prekallikrein (aPTT shortens with long incubation)', '/learn/bleeding#screening-labs')
        add('Lupus anticoagulant', 'Common, especially post-viral in children', 'dRVVT + LA-sensitive aPTT (screen/mix/confirm)', '/learn/bleeding#mixing')
        add('Mild hemophilia / carrier', 'Mild deficiency may not bleed until surgery', 'FVIII, FIX, FXI')
      }
    }
    if (i.mixing === 'no-correct') {
      add('Lupus anticoagulant', 'Immediate non-correction', 'dRVVT and LA-sensitive aPTT; check PT for LA-hypoprothrombinemia in children', '/learn/bleeding#mixing')
      if (c.heparin) add('Heparin', 'Inhibitor effect', 'Thrombin time, anti-Xa')
      add('Specific factor inhibitor (rare in non-hemophiliacs)', 'Non-correction', 'Bethesda assay')
    }
    if (i.mixing === 'late-prolong') {
      add('Acquired FVIII inhibitor (acquired hemophilia A)', 'Corrects immediately, prolongs after incubation (time/temperature-dependent)', 'FVIII activity, Bethesda titer; bypassing agents/emicizumab + immunosuppression', '/learn/bleeding#liver-acquired')
      add('Inhibitor in known hemophilia A', 'If known hemophilia: inhibitor development', 'Bethesda (chromogenic if on emicizumab)', '/learn/bleeding#hemophilia')
    }
  } else {
    pattern = 'Prolonged PT and aPTT'
    if (dicPicture) add('DIC', 'Prolonged PT/aPTT + low platelets' + (i.fibrinogen === 'low' ? ' + low fibrinogen' : '') + (c.sick ? ' in a sick patient' : ''), 'D-dimer, ISTH DIC score, treat cause', '/learn/platelets#dic')
    if (c.liver) add('Liver synthetic failure', 'Multiple factor deficiencies', 'FV (low), FVIII (normal/high), vitamin K trial', '/learn/bleeding#liver-acquired')
    if (c.warfarin) add('Supratherapeutic warfarin', 'VKA', 'Vitamin K + 4F-PCC if bleeding', '/learn/thrombosis#reversal')
    if (c.vitkRisk || c.neonate) add('Vitamin K deficiency (severe) / VKDB', 'Both tests prolonged, platelets and fibrinogen normal', 'Vitamin K now; PCC or plasma if bleeding', '/learn/neonatal#vkdb')
    if (c.doac) add('Anticoagulant effect (DOAC, argatroban)', 'Drug effect', 'Drug-calibrated anti-Xa (Xa inhibitors) or dilute TT (dabigatran)', '/learn/thrombosis#reversal')
    if (c.heparin) add('High-dose heparin', 'Very high heparin affects PT too', 'Anti-Xa, thrombin time')
    if (i.fibrinogen === 'low' && !dicPicture) add('Hypo/afibrinogenemia or dysfibrinogenemia', 'Low fibrinogen; thrombin time ↑', 'Clauss fibrinogen vs antigen; fibrinogen concentrate', '/learn/bleeding#rare-factors')
    add('Common pathway factor deficiency (FX, FV, FII)', 'Congenital or acquired (FX in AL amyloidosis)', 'Specific factor assays', '/learn/bleeding#rare-factors')
    add('Dilutional (massive transfusion)', 'After large-volume resuscitation', 'Viscoelastic testing; balanced products', '/learn/transfusion#massive')
  }

  if (i.tt === 'prolonged' && !c.heparin && !c.doac) {
    insights.push({ title: 'Prolonged thrombin time', tone: 'info', points: ['Heparin contamination, dabigatran, low or dysfunctional fibrinogen, high FDPs, paraproteins.'] })
  }
  if (i.bleeding !== 'none' && d.length === 0) {
    add('Seek specialist testing', 'Bleeding without explanation', 'Hematology consult')
  }

  insights.push({
    title: 'Before you chase a factor',
    tone: 'info',
    points: ['Rule out pre-analytic error: heparin from lines, underfilled citrate tube, Hct > 55% (citrate adjustment), traumatic draw.'],
  })

  return { pattern, differential: d, insights }
}
