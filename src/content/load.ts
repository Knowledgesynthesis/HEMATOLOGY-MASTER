import { MODULES } from './modules'
import { parseCases, parseDoc, scanSections, stripHtml, type ParseResult } from './parse'
import type { Block, CaseDoc, Check, Pop, Section } from './types'

const moduleSrc = import.meta.glob('./modules/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const bankSrc = import.meta.glob('./questions/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const caseSrc = import.meta.glob('./cases/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const fileId = (path: string) => path.split('/').pop()!.replace(/\.md$/, '')

const srcById: Record<string, string> = Object.fromEntries(Object.entries(moduleSrc).map(([p, s]) => [fileId(p), s]))

const docCache = new Map<string, ParseResult>()

export function getModuleDoc(id: string): ParseResult | undefined {
  const src = srcById[id]
  if (src === undefined) return undefined
  let doc = docCache.get(id)
  if (!doc) {
    doc = parseDoc(src, { moduleId: id, requirePop: true })
    docCache.set(id, doc)
  }
  return doc
}

/** Fast outline without rendering Markdown. */
export function moduleOutline(id: string) {
  return scanSections(srcById[id] ?? '')
}

export function allSections(): Section[] {
  return MODULES.flatMap((m) => getModuleDoc(m.id)?.sections ?? [])
}

const collectChecks = (blocks: Block[]): Check[] =>
  blocks.flatMap((b) => (b.kind === 'check' ? [b.check] : []))

let questionCache: Check[] | null = null
export function allQuestions(): Check[] {
  if (questionCache) return questionCache
  const inline = MODULES.flatMap((m) => {
    const doc = getModuleDoc(m.id)
    return doc ? doc.sections.flatMap((s) => collectChecks(s.blocks)) : []
  })
  const bank = Object.entries(bankSrc).flatMap(([path, src]) => {
    const moduleId = fileId(path)
    const doc = parseDoc(src, { moduleId, idPrefix: `${moduleId}.bank` })
    const secTitles = Object.fromEntries((getModuleDoc(moduleId)?.sections ?? []).map((s) => [s.id, s.title]))
    return [...collectChecks(doc.intro), ...doc.sections.flatMap((s) => collectChecks(s.blocks))].map((c) => ({
      ...c,
      sectionTitle: c.sectionId ? secTitles[c.sectionId] : undefined,
    }))
  })
  questionCache = [...inline, ...bank]
  return questionCache
}

let caseCache: CaseDoc[] | null = null
export function allCases(): CaseDoc[] {
  if (caseCache) return caseCache
  caseCache = Object.values(caseSrc).flatMap((src) => parseCases(src).cases)
  return caseCache
}

export interface UpdateItem {
  moduleId: string
  sectionId: string
  sectionTitle: string
  pop: Pop
  title?: string
  year?: string
  html: string
}

export function allUpdates(): UpdateItem[] {
  return allSections().flatMap((s) =>
    s.blocks.flatMap((b) =>
      b.kind === 'callout' && b.variant === 'update'
        ? [{ moduleId: s.moduleId, sectionId: s.id, sectionTitle: s.title, pop: s.pop, title: b.title, year: b.year, html: b.html }]
        : [],
    ),
  )
}

export interface SearchDoc {
  kind: 'section' | 'tool' | 'case' | 'page'
  title: string
  subtitle: string
  text: string
  url: string
  pop?: Pop
}

/** All warnings from every content file — used by the integrity test. */
export function contentWarnings(): string[] {
  const w: string[] = []
  for (const m of MODULES) {
    const doc = getModuleDoc(m.id)
    if (!doc) w.push(`module ${m.id} has no content file`)
    else w.push(...doc.warnings)
  }
  for (const [path, src] of Object.entries(bankSrc)) {
    w.push(...parseDoc(src, { moduleId: fileId(path), idPrefix: `${fileId(path)}.bank` }).warnings)
  }
  for (const src of Object.values(caseSrc)) w.push(...parseCases(src).warnings)
  return w
}

export function sectionSearchDocs(): SearchDoc[] {
  const titles = Object.fromEntries(MODULES.map((m) => [m.id, m.short]))
  return allSections().map((s) => ({
    kind: 'section' as const,
    title: s.title,
    subtitle: titles[s.moduleId],
    text: s.text,
    url: `/learn/${s.moduleId}#${s.id}`,
    pop: s.pop,
  }))
}

export function caseSearchDocs(): SearchDoc[] {
  return allCases().map((c) => ({
    kind: 'case' as const,
    title: c.title,
    subtitle: 'Case',
    text: c.teaser + ' ' + stripHtml(c.stages.map((s) => s.text).join(' ')),
    url: `/cases/${c.id}`,
    pop: c.pop,
  }))
}
