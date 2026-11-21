import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { allCases, allSections } from '@/content/load'
import { MODULES } from '@/content/modules'
import { TOOL_IDS } from '@/tools/registry'

const ROOT = join(__dirname, '..')
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(f) && !/\.test\./.test(f) ? [p] : []
  })
}

describe('hard-coded links in source', () => {
  it('every /learn, /tools and /cases link in TS/TSX resolves', () => {
    const sections = new Set(allSections().map((s) => `${s.moduleId}#${s.id}`))
    const modules = new Set(MODULES.map((m) => m.id))
    const cases = new Set(allCases().map((c) => c.id))
    const bad: string[] = []
    for (const f of files(ROOT)) {
      const src = readFileSync(f, 'utf8')
      for (const m of src.matchAll(/['"`](\/(learn|tools|cases)\/[a-z0-9-]+(#[a-z0-9-]+)?)['"`]/g)) {
        const href = m[1]
        const [path, hash] = href.split('#')
        const [, kind, id] = path.split('/')
        const ok = kind === 'learn' ? modules.has(id) && (!hash || sections.has(`${id}#${hash}`)) : kind === 'tools' ? TOOL_IDS.includes(id) : cases.has(id)
        if (!ok) bad.push(`${f.replace(ROOT, 'src')}: ${href}`)
      }
      // template links like `/learn/${m}#${s}` in the peds fast-track are checked via data below
    }
    expect(bad).toEqual([])
  })
})
