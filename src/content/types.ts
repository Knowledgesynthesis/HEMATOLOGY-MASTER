/** Who a piece of content applies to. Every section and question carries one. */
export type Pop = 'peds' | 'adult' | 'both'

export type CalloutKind = 'pearl' | 'pitfall' | 'redflag' | 'update' | 'algo' | 'mnemonic'

export interface CheckOption {
  html: string
  correct: boolean
}

/** A single-best-answer question (inline quick check, bank item, or case decision). */
export interface Check {
  id: string
  stem: string
  options: CheckOption[]
  explain: string
  pop: Pop
  refs: string[]
  moduleId?: string
  sectionId?: string
  sectionTitle?: string
}

export type Block =
  | { kind: 'html'; html: string }
  | { kind: 'callout'; variant: CalloutKind; title?: string; html: string; year?: string }
  | { kind: 'check'; check: Check }

export interface Section {
  id: string
  title: string
  pop: Pop
  refs: string[]
  blocks: Block[]
  /** Plain text for search. */
  text: string
  moduleId: string
}

export interface ParsedDoc {
  intro: Block[]
  sections: Section[]
}

export interface CaseDoc {
  id: string
  title: string
  pop: Pop
  moduleId: string
  teaser: string
  refs: string[]
  stages: Section[]
}

export interface Ref {
  /** Short label shown inline, e.g. "ASH 2019 ITP". */
  label: string
  /** Full citation. */
  cite: string
  year: number
  url: string
  kind: 'guideline' | 'trial' | 'regulatory' | 'review' | 'reference'
  note?: string
}
