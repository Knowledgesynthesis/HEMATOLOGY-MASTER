import { describe, expect, it } from 'vitest'
import { allCases, allQuestions, allSections, contentWarnings, getModuleDoc } from '@/content/load'
import { MODULES } from '@/content/modules'
import { REFS } from '@/content/refs'
import { TOOL_IDS } from '@/tools/registry'

const STATIC_ROUTES = ['/', '/learn', '/tools', '/practice', '/cases', '/whats-new', '/references', '/normal-values', '/settings']

function allHtml(): string[] {
  const out: string[] = []
  for (const s of allSections()) for (const b of s.blocks) out.push(b.kind === 'check' ? b.check.stem + b.check.explain + b.check.options.map((o) => o.html).join('') : b.html)
  for (const q of allQuestions()) out.push(q.stem + q.explain)
  for (const c of allCases()) for (const s of c.stages) for (const b of s.blocks) out.push(b.kind === 'check' ? b.check.stem + b.check.explain : b.html)
  return out
}

describe('content integrity', () => {
  it('every module has a content file and parses without warnings', () => {
    expect(contentWarnings()).toEqual([])
  })

  it('every section has a population tag and unique id within its module', () => {
    for (const m of MODULES) {
      const doc = getModuleDoc(m.id)!
      expect(doc.sections.length, m.id).toBeGreaterThan(3)
      const ids = doc.sections.map((s) => s.id)
      expect(new Set(ids).size, m.id).toBe(ids.length)
      for (const s of doc.sections) expect(['peds', 'adult', 'both']).toContain(s.pop)
    }
  })

  it('all cited references exist', () => {
    const missing = allHtml().flatMap((h) => [...h.matchAll(/cite-missing">\[\?([\w-]+)\]/g)].map((m) => m[1]))
    expect(missing).toEqual([])
    for (const s of allSections()) for (const r of s.refs) expect(REFS[r], `${s.moduleId}#${s.id} → ${r}`).toBeDefined()
    for (const q of allQuestions()) for (const r of q.refs) expect(REFS[r], `${q.id} → ${r}`).toBeDefined()
  })

  it('internal links resolve to real modules, sections, tools and pages', () => {
    const sectionKeys = new Set(allSections().map((s) => `${s.moduleId}#${s.id}`))
    const moduleIds = new Set(MODULES.map((m) => m.id))
    const caseIds = new Set(allCases().map((c) => c.id))
    const bad: string[] = []
    for (const h of allHtml()) {
      for (const [, href] of h.matchAll(/href="(\/[^"]*)"/g)) {
        const [path, hash] = href.split('#')
        if (path.startsWith('/references')) continue
        if (path.startsWith('/learn/')) {
          const mod = path.slice('/learn/'.length)
          if (!moduleIds.has(mod)) bad.push(href)
          else if (hash && !sectionKeys.has(`${mod}#${hash}`)) bad.push(href)
        } else if (path.startsWith('/tools/')) {
          if (!TOOL_IDS.includes(path.slice('/tools/'.length))) bad.push(href)
        } else if (path.startsWith('/cases/')) {
          if (!caseIds.has(path.slice('/cases/'.length))) bad.push(href)
        } else if (path === '' && hash) {
          // same-page anchor: must exist in some module
          if (![...sectionKeys].some((k) => k.endsWith(`#${hash}`))) bad.push(href)
        } else if (!STATIC_ROUTES.includes(path)) bad.push(href)
      }
    }
    expect(bad).toEqual([])
  })

  it('questions are well-formed and ids unique', () => {
    const qs = allQuestions()
    const ids = qs.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const q of qs) {
      expect(q.options.filter((o) => o.correct).length, q.id).toBe(1)
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3)
      expect(q.explain.length, q.id).toBeGreaterThan(20)
      expect(MODULES.some((m) => m.id === q.moduleId), q.id).toBe(true)
    }
  })

  it('bank questions link to real sections', () => {
    const keys = new Set(allSections().map((s) => `${s.moduleId}#${s.id}`))
    const bad = allQuestions().filter((q) => q.id.includes('.bank.') && (!q.sectionId || !keys.has(`${q.moduleId}#${q.sectionId}`))).map((q) => q.id)
    expect(bad).toEqual([])
  })

  it('cases have stages and decisions', () => {
    const cases = allCases()
    expect(cases.length).toBeGreaterThanOrEqual(15)
    const ids = cases.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const c of cases) {
      expect(c.stages.length, c.id).toBeGreaterThanOrEqual(2)
      expect(c.stages.some((s) => s.blocks.some((b) => b.kind === 'check')), c.id).toBe(true)
      expect(MODULES.some((m) => m.id === c.moduleId), c.id).toBe(true)
    }
  })

  it('pediatric emphasis: peds-tagged content outweighs adult-only content', () => {
    const s = allSections()
    const peds = s.filter((x) => x.pop === 'peds').length
    const adult = s.filter((x) => x.pop === 'adult').length
    expect(peds).toBeGreaterThan(adult)
    const qs = allQuestions()
    expect(qs.filter((q) => q.pop === 'peds').length).toBeGreaterThan(qs.length / 2)
    const cases = allCases()
    expect(cases.filter((c) => c.pop === 'peds').length).toBeGreaterThan(cases.length / 2)
  })
})
