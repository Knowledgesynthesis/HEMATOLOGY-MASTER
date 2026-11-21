export type Tone = 'ok' | 'info' | 'warn' | 'danger'

export interface Link {
  label: string
  href: string
}

export interface Insight {
  title: string
  tone: Tone
  points: string[]
  links?: Link[]
}

export type AgeGroup = 'neonate' | 'infant' | 'toddler' | 'child' | 'adolescent' | 'adult'

const Y = 365.25

export function ageGroup(ageDays: number): AgeGroup {
  if (ageDays < 28) return 'neonate'
  if (ageDays < Y) return 'infant'
  if (ageDays < 5 * Y) return 'toddler'
  if (ageDays < 12 * Y) return 'child'
  if (ageDays < 18 * Y) return 'adolescent'
  return 'adult'
}

export const isPeds = (g: AgeGroup) => g !== 'adult'

/** Parse a form string to a finite number, or undefined if blank/invalid. */
export function num(s: string | number | undefined | null): number | undefined {
  if (s === undefined || s === null) return undefined
  if (typeof s === 'number') return Number.isFinite(s) ? s : undefined
  const t = s.trim()
  if (!t) return undefined
  const n = Number(t)
  return Number.isFinite(n) ? n : undefined
}
