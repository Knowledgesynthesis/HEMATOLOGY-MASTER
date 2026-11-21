/**
 * Age- and sex-specific hematology reference values.
 * RBC values: mean and lower limit (−2 SD) after Dallman / Nathan & Oski (as reproduced in Harriet Lane).
 * Leukocyte values: Altman & Dittmer ranges (as reproduced in Harriet Lane).
 * Upper limits for Hb/MCV are approximated as mean + (mean − LLN), capped at adult values.
 */
export type Sex = 'female' | 'male'

export interface RbcBand {
  label: string
  /** Inclusive lower bound, exclusive upper bound, in days. */
  fromDays: number
  toDays: number
  hb: [mean: number, lln: number]
  hct: [mean: number, lln: number]
  mcv: [mean: number, lln: number]
  sexSpecific?: { female: Omit<RbcBand, 'label' | 'fromDays' | 'toDays' | 'sexSpecific'>; male: Omit<RbcBand, 'label' | 'fromDays' | 'toDays' | 'sexSpecific'> }
}

const Y = 365.25

export const RBC_BANDS: RbcBand[] = [
  { label: '1–3 days', fromDays: 0, toDays: 3, hb: [18.5, 14.5], hct: [56, 45], mcv: [108, 95] },
  { label: '1 week', fromDays: 3, toDays: 11, hb: [17.5, 13.5], hct: [54, 42], mcv: [107, 88] },
  { label: '2 weeks', fromDays: 11, toDays: 21, hb: [16.5, 12.5], hct: [51, 39], mcv: [105, 86] },
  { label: '1 month', fromDays: 21, toDays: 46, hb: [14.0, 10.0], hct: [43, 31], mcv: [104, 85] },
  { label: '2 months', fromDays: 46, toDays: 76, hb: [11.5, 9.0], hct: [35, 28], mcv: [96, 77] },
  { label: '3–6 months', fromDays: 76, toDays: 0.5 * Y, hb: [11.5, 9.5], hct: [35, 29], mcv: [91, 74] },
  { label: '6 months–2 years', fromDays: 0.5 * Y, toDays: 2 * Y, hb: [12.0, 10.5], hct: [36, 33], mcv: [78, 70] },
  { label: '2–6 years', fromDays: 2 * Y, toDays: 6 * Y, hb: [12.5, 11.5], hct: [37, 34], mcv: [81, 75] },
  { label: '6–12 years', fromDays: 6 * Y, toDays: 12 * Y, hb: [13.5, 11.5], hct: [40, 35], mcv: [86, 77] },
  {
    label: '12–18 years',
    fromDays: 12 * Y,
    toDays: 18 * Y,
    hb: [14.0, 12.0],
    hct: [41, 36],
    mcv: [90, 78],
    sexSpecific: {
      female: { hb: [14.0, 12.0], hct: [41, 36], mcv: [90, 78] },
      male: { hb: [14.5, 13.0], hct: [43, 37], mcv: [88, 78] },
    },
  },
  {
    label: 'Adult',
    fromDays: 18 * Y,
    toDays: Infinity,
    hb: [14.0, 12.0],
    hct: [41, 36],
    mcv: [90, 80],
    sexSpecific: {
      female: { hb: [14.0, 12.0], hct: [41, 36], mcv: [90, 80] },
      male: { hb: [15.5, 13.5], hct: [47, 41], mcv: [90, 80] },
    },
  },
]

export interface WbcBand {
  label: string
  fromDays: number
  toDays: number
  wbc: [number, number]
  anc: [number, number]
  alc: [number, number]
}

export const WBC_BANDS: WbcBand[] = [
  { label: 'Birth–1 day', fromDays: 0, toDays: 2, wbc: [9.0, 34.0], anc: [5.0, 28.0], alc: [2.0, 11.0] },
  { label: '1 week', fromDays: 2, toDays: 8, wbc: [5.0, 21.0], anc: [1.5, 10.0], alc: [2.0, 17.0] },
  { label: '2 weeks', fromDays: 8, toDays: 21, wbc: [5.0, 20.0], anc: [1.0, 9.5], alc: [2.0, 17.0] },
  { label: '1–6 months', fromDays: 21, toDays: 0.5 * Y, wbc: [5.0, 19.5], anc: [1.0, 9.0], alc: [2.5, 16.5] },
  { label: '6–12 months', fromDays: 0.5 * Y, toDays: 1 * Y, wbc: [6.0, 17.5], anc: [1.0, 8.5], alc: [4.0, 13.5] },
  { label: '1–2 years', fromDays: 1 * Y, toDays: 2 * Y, wbc: [6.0, 17.5], anc: [1.5, 8.5], alc: [4.0, 10.5] },
  { label: '2–4 years', fromDays: 2 * Y, toDays: 4 * Y, wbc: [6.0, 17.0], anc: [1.5, 8.5], alc: [3.0, 9.5] },
  { label: '4–6 years', fromDays: 4 * Y, toDays: 6 * Y, wbc: [5.5, 15.5], anc: [1.5, 8.5], alc: [2.0, 8.0] },
  { label: '6–8 years', fromDays: 6 * Y, toDays: 8 * Y, wbc: [5.0, 14.5], anc: [1.5, 8.0], alc: [1.5, 7.0] },
  { label: '8–10 years', fromDays: 8 * Y, toDays: 10 * Y, wbc: [4.5, 13.5], anc: [1.5, 8.0], alc: [1.5, 6.8] },
  { label: '10–16 years', fromDays: 10 * Y, toDays: 16 * Y, wbc: [4.5, 13.5], anc: [1.8, 8.0], alc: [1.5, 6.5] },
  { label: '16–21 years', fromDays: 16 * Y, toDays: 21 * Y, wbc: [4.5, 13.0], anc: [1.8, 8.0], alc: [1.2, 5.2] },
  { label: 'Adult', fromDays: 21 * Y, toDays: Infinity, wbc: [4.5, 11.0], anc: [1.8, 7.7], alc: [1.0, 4.8] },
]

export const PLATELET_RANGE: [number, number] = [150, 450]

export type AgeUnit = 'days' | 'weeks' | 'months' | 'years'

export function ageToDays(value: number, unit: AgeUnit): number {
  switch (unit) {
    case 'days':
      return value
    case 'weeks':
      return value * 7
    case 'months':
      return value * (Y / 12)
    case 'years':
      return value * Y
  }
}

export interface RbcRef {
  label: string
  hb: { mean: number; lln: number; uln: number }
  hct: { mean: number; lln: number; uln: number }
  mcv: { mean: number; lln: number; uln: number }
}

const sym = ([mean, lln]: [number, number], cap?: number) => ({
  mean,
  lln,
  uln: cap !== undefined ? Math.min(cap, +(mean + (mean - lln)).toFixed(1)) : +(mean + (mean - lln)).toFixed(1),
})

export function rbcRef(ageDays: number, sex: Sex): RbcRef {
  const band = RBC_BANDS.find((b) => ageDays >= b.fromDays && ageDays < b.toDays) ?? RBC_BANDS[RBC_BANDS.length - 1]
  const v = band.sexSpecific ? band.sexSpecific[sex] : band
  const adultish = ageDays >= 12 * Y
  return {
    label: band.label + (band.sexSpecific ? `, ${sex}` : ''),
    hb: sym(v.hb),
    hct: sym(v.hct),
    mcv: sym(v.mcv, adultish ? 100 : undefined),
  }
}

export function wbcRef(ageDays: number): WbcBand {
  return WBC_BANDS.find((b) => ageDays >= b.fromDays && ageDays < b.toDays) ?? WBC_BANDS[WBC_BANDS.length - 1]
}

/** Clinical neutropenia threshold (×10⁹/L) by age. */
export function neutropeniaThreshold(ageDays: number): number {
  if (ageDays < 0.5 * Y) return wbcRef(ageDays).anc[0]
  if (ageDays < 1 * Y) return 1.0
  return 1.5
}

/** Normal Hct for reticulocyte correction (age mean). */
export function normalHct(ageDays: number, sex: Sex): number {
  return rbcRef(ageDays, sex).hct.mean
}
