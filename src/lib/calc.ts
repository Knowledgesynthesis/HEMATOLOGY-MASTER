/** Bedside hematology calculations. Pure functions; units noted per parameter. */

export const round = (x: number, dp = 1) => Math.round(x * 10 ** dp) / 10 ** dp

/** ANC (×10⁹/L) from WBC (×10⁹/L) and segmented + band neutrophil percentages. */
export function anc(wbc: number, segPct: number, bandPct = 0): number {
  return round((wbc * (segPct + bandPct)) / 100, 2)
}

/** Absolute reticulocyte count (×10⁹/L) from retic % and RBC (×10¹²/L). */
export function absoluteRetic(reticPct: number, rbc: number): number {
  return round((reticPct / 100) * rbc * 1000, 0)
}

export function correctedRetic(reticPct: number, hct: number, normalHct = 45): number {
  return round(reticPct * (hct / normalHct), 2)
}

/** Maturation correction used for the RPI. */
export function maturationFactor(hct: number): number {
  if (hct >= 40) return 1.0
  if (hct >= 30) return 1.5
  if (hct >= 20) return 2.0
  return 2.5
}

export function rpi(reticPct: number, hct: number, normalHct = 45): number {
  return round(correctedRetic(reticPct, hct, normalHct) / maturationFactor(hct), 2)
}

/** Mentzer index: MCV (fL) ÷ RBC (×10¹²/L). < 13 suggests thalassemia trait, > 13 iron deficiency. */
export function mentzer(mcv: number, rbc: number): number {
  return round(mcv / rbc, 1)
}

/** TSAT (%) from serum iron and TIBC (same units). */
export function tsat(iron: number, tibc: number): number {
  return round((iron / tibc) * 100, 0)
}

/** Red cell volume (mL) = ΔHb (g/dL) × weight (kg) × factor (3–5; ~4 for Hct ~60% units). */
export function rbcVolume(weightKg: number, currentHb: number, targetHb: number, factor = 4): number {
  return Math.max(0, Math.round((targetHb - currentHb) * weightKg * factor))
}

export function mlPerKgRange(weightKg: number, lo: number, hi: number): [number, number] {
  return [Math.round(weightKg * lo), Math.round(weightKg * hi)]
}

/** Cryoprecipitate units: 1 unit per 5–10 kg, capped at a standard adult dose of 10 units. */
export function cryoUnits(weightKg: number): [number, number] {
  const lo = Math.max(1, Math.round(weightKg / 10))
  const hi = Math.max(1, Math.round(weightKg / 5))
  return [Math.min(lo, 10), Math.min(hi, 10)]
}

/** Oral elemental iron (mg/day) at mg/kg/day, with liquid ferrous sulfate volumes. */
export function oralIron(weightKg: number, mgPerKg = 3) {
  const mg = round(weightKg * mgPerKg, 0)
  return {
    mgElemental: mg,
    /** Ferrous sulfate drops 75 mg/mL = 15 mg elemental iron per mL. */
    dropsMl: round(mg / 15, 1),
    /** Ferrous sulfate elixir 220 mg/5 mL = 44 mg elemental per 5 mL. */
    elixirMl: round((mg / 44) * 5, 1),
    exceedsTablet: mg > 65,
  }
}

/** Ganzoni total iron deficit (mg) = weight × (target − actual Hb, g/dL) × 2.4 + stores. */
export function ganzoni(weightKg: number, actualHb: number, targetHb: number): { deficit: number; stores: number } {
  const stores = weightKg >= 35 ? 500 : Math.round(15 * weightKg)
  const deficit = Math.max(0, Math.round(weightKg * (targetHb - actualHb) * 2.4 + stores))
  return { deficit, stores }
}

/** Neonatal partial exchange (mL) = blood volume × (observed − target Hct) / observed Hct. */
export function partialExchange(weightKg: number, observedHct: number, targetHct = 55, bvPerKg = 85): number {
  if (observedHct <= targetHct) return 0
  return Math.round((weightKg * bvPerKg * (observedHct - targetHct)) / observedHct)
}

/** Double-volume exchange (mL) = 2 × blood volume (term ~85 mL/kg, preterm ~100 mL/kg). */
export function doubleVolumeExchange(weightKg: number, preterm: boolean): number {
  return Math.round(2 * weightKg * (preterm ? 100 : 85))
}

/** FVIII units = weight × desired rise (IU/dL) × 0.5 (1 IU/kg raises ~2 IU/dL). */
export function fviiiUnits(weightKg: number, desiredRise: number): number {
  return Math.round(weightKg * desiredRise * 0.5)
}

/** FIX units = weight × desired rise ÷ recovery (≈1 for plasma-derived; ~0.7–0.8 for some recombinant products in children). */
export function fixUnits(weightKg: number, desiredRise: number, recovery = 1): number {
  return Math.round((weightKg * desiredRise) / recovery)
}

/** Enoxaparin treatment dose (mg q12h) by age. Target anti-Xa 0.5–1.0 U/mL 4–6 h post-dose. */
export function enoxaparinTreatment(weightKg: number, ageMonths: number): { mgPerKg: number; dose: number } {
  const mgPerKg = ageMonths < 2 ? 1.5 : 1.0
  return { mgPerKg, dose: round(weightKg * mgPerKg, 1) }
}

/** Hydroxyurea starting dose (mg/day): 20 mg/kg/day in children, 15 mg/kg/day in adults (NHLBI 2014). */
export function hydroxyureaStart(weightKg: number, adult: boolean): { mgPerKg: number; dose: number } {
  const mgPerKg = adult ? 15 : 20
  return { mgPerKg, dose: Math.round(weightKg * mgPerKg) }
}
