/**
 * Content dialect: GitHub-flavored Markdown plus a few conventions.
 *
 *   ## Section title {peds #section-id refs=ash-itp-2019,aap-iron-2026}
 *     Starts a section. A population tag (peds | adult | both) is required.
 *
 *   :::pearl Optional title          (pearl | pitfall | redflag | update | algo | mnemonic)
 *   markdown…
 *   :::
 *
 *   :::check {#optional-id refs=a,b}  Single-best-answer question
 *   Stem (markdown)
 *   - [ ] distractor
 *   - [x] correct answer
 *   > Explanation (markdown, one or more lines)
 *   :::
 *
 *   Inline: [@ref-id] → citation link · [[peds]] / [[adult]] / [[both]] → population chip
 */
import { marked } from 'marked'
import { REFS } from './refs'
import type { Block, CalloutKind, CaseDoc, Check, Pop, Section } from './types'

marked.setOptions({ gfm: true })

const POPS = new Set<Pop>(['peds', 'adult', 'both'])
const CALLOUTS = new Set<CalloutKind>(['pearl', 'pitfall', 'redflag', 'update', 'algo', 'mnemonic'])
export const POP_LABEL: Record<Pop, string> = { peds: 'Peds', adult: 'Adult', both: 'Peds + Adult' }

export interface Attrs {
  pop?: Pop
  id?: string
  refs: string[]
  kv: Record<string, string>
  flags: string[]
}

export interface ParseResult {
  intro: Block[]
  sections: Section[]
  warnings: string[]
}

export function splitAttrs(s: string): { text: string; attrs: Attrs } {
  const m = s.match(/^(.*?)\s*\{([^}]*)\}\s*$/)
  const text = (m ? m[1] : s).trim()
  const attrs: Attrs = { refs: [], kv: {}, flags: [] }
  if (m) {
    for (const tok of m[2].trim().split(/\s+/).filter(Boolean)) {
      if (POPS.has(tok as Pop)) attrs.pop = tok as Pop
      else if (tok.startsWith('#')) attrs.id = tok.slice(1)
      else if (tok.includes('=')) {
        const [k, v] = tok.split('=')
        if (k === 'refs') attrs.refs = v.split(',').filter(Boolean)
        else attrs.kv[k] = v
      } else attrs.flags.push(tok)
    }
  }
  return { text, attrs }
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Expand inline extensions before Markdown rendering. */
export function inline(src: string): string {
  return src
    .replace(
      /\[\[(peds|adult|both)\]\]/g,
      (_, p: Pop) => `<span class="pop-chip pop-${p}">${POP_LABEL[p]}</span>`,
    )
    .replace(/\[@([\w-]+)\]/g, (_, id: string) => {
      const r = REFS[id]
      return r
        ? `<a class="cite" href="/references#ref-${id}" title="${escapeAttr(r.cite)}">${r.label}</a>`
        : `<span class="cite cite-missing">[?${id}]</span>`
    })
}

function postProcess(html: string): string {
  return html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
}

export function md(src: string): string {
  if (!src.trim()) return ''
  return postProcess(marked.parse(inline(src), { async: false }) as string)
}

export function mdInline(src: string): string {
  return postProcess(marked.parseInline(inline(src.trim()), { async: false }) as string)
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

const OPT_RE = /^\s*[-*]\s+\[( |x|X)\]\s+(.*)$/

export function parseCheck(
  lines: string[],
  base: Omit<Check, 'stem' | 'options' | 'explain'>,
  warn: (m: string) => void,
): Check {
  const stem: string[] = []
  const explain: string[] = []
  const options: { text: string; correct: boolean }[] = []
  for (const line of lines) {
    const o = line.match(OPT_RE)
    if (o) {
      options.push({ text: o[2], correct: o[1].toLowerCase() === 'x' })
    } else if (/^\s*>/.test(line)) {
      explain.push(line.replace(/^\s*>\s?/, ''))
    } else if (options.length && !explain.length && /^\s{2,}\S/.test(line)) {
      options[options.length - 1].text += ' ' + line.trim()
    } else if (!options.length) {
      stem.push(line)
    } else if (line.trim()) {
      explain.push(line)
    }
  }
  const nCorrect = options.filter((o) => o.correct).length
  if (options.length < 3) warn(`check ${base.id}: needs ≥3 options (has ${options.length})`)
  if (nCorrect !== 1) warn(`check ${base.id}: needs exactly 1 correct option (has ${nCorrect})`)
  if (!explain.join('').trim()) warn(`check ${base.id}: missing explanation`)
  if (!stem.join('').trim()) warn(`check ${base.id}: missing stem`)
  return {
    ...base,
    stem: md(stem.join('\n')),
    options: options.map((o) => ({ html: mdInline(o.text), correct: o.correct })),
    explain: md(explain.join('\n')),
  }
}

interface ParseOpts {
  moduleId: string
  idPrefix?: string
  defaultPop?: Pop
  /** Require a population tag on every section (true for modules). */
  requirePop?: boolean
}

export function parseDoc(src: string, opts: ParseOpts): ParseResult {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  const intro: Block[] = []
  const sections: Section[] = []
  const warnings: string[] = []
  const warn = (m: string) => warnings.push(`[${opts.moduleId}] ${m}`)
  const prefix = opts.idPrefix ?? opts.moduleId
  let sec: Section | null = null
  let buf: string[] = []
  let dir: { type: string; title: string; attrs: Attrs; lines: string[]; line: number } | null = null
  let introChecks = 0
  const secChecks = new Map<string, number>()
  const seenIds = new Set<string>()

  const target = () => (sec ? sec.blocks : intro)
  const flush = () => {
    const html = md(buf.join('\n'))
    if (html) target().push({ kind: 'html', html })
    buf = []
  }

  const finishDirective = () => {
    if (!dir) return
    const { type, title, attrs } = dir
    if (type === 'check') {
      let n: number
      if (sec) {
        n = (secChecks.get(sec.id) ?? 0) + 1
        secChecks.set(sec.id, n)
      } else n = ++introChecks
      const id = attrs.id
        ? `${prefix}.${attrs.id}`
        : sec
          ? `${prefix}.${sec.id}.q${n}`
          : `${prefix}.q${n}`
      if (seenIds.has(id)) warn(`duplicate check id ${id}`)
      seenIds.add(id)
      const check = parseCheck(
        dir.lines,
        {
          id,
          pop: attrs.pop ?? sec?.pop ?? opts.defaultPop ?? 'both',
          refs: attrs.refs.length ? attrs.refs : [],
          moduleId: attrs.kv.mod ?? opts.moduleId,
          sectionId: attrs.kv.sec ?? sec?.id,
          sectionTitle: sec?.title,
        },
        warn,
      )
      target().push({ kind: 'check', check })
    } else if (CALLOUTS.has(type as CalloutKind)) {
      target().push({
        kind: 'callout',
        variant: type as CalloutKind,
        title: title || undefined,
        html: md(dir.lines.join('\n')),
        year: attrs.kv.year,
      })
    } else {
      warn(`unknown directive :::${type} (line ${dir.line})`)
    }
  }

  const finalizeSection = () => {
    if (!sec) return
    sec.text = stripHtml(
      sec.blocks
        .map((b) => (b.kind === 'check' ? b.check.stem : b.html))
        .join(' '),
    )
  }

  lines.forEach((line, i) => {
    if (dir) {
      if (/^:::\s*$/.test(line)) {
        finishDirective()
        dir = null
      } else dir.lines.push(line)
      return
    }
    const h2 = line.match(/^##\s+(.+)$/)
    if (h2) {
      flush()
      finalizeSection()
      const { text, attrs } = splitAttrs(h2[1])
      const id = attrs.id ?? slugify(text)
      if (!attrs.pop && opts.requirePop) warn(`section "${text}" has no population tag`)
      if (sections.some((s) => s.id === id)) warn(`duplicate section id ${id}`)
      sec = {
        id,
        title: text,
        pop: attrs.pop ?? opts.defaultPop ?? 'both',
        refs: attrs.refs,
        blocks: [],
        text: '',
        moduleId: opts.moduleId,
      }
      sections.push(sec)
      return
    }
    const d = line.match(/^:::(\w+)\s*(.*)$/)
    if (d) {
      flush()
      // Checks carry no title, so bare attributes are allowed: `:::check peds #id sec=x`
      const rest = d[2].trim()
      const { text, attrs } = splitAttrs(d[1] === 'check' && rest && !rest.includes('{') ? `{${rest}}` : rest)
      dir = { type: d[1], title: text, attrs, lines: [], line: i + 1 }
      return
    }
    buf.push(line)
  })
  if (dir) warn(`unterminated directive :::${(dir as { type: string }).type}`)
  flush()
  finalizeSection()
  return { intro, sections, warnings }
}

/** Cases: one file holds many. `# Title {peds #case-id module=anemia refs=…}` then `## Stage` blocks. */
export function parseCases(src: string): { cases: CaseDoc[]; warnings: string[] } {
  const warnings: string[] = []
  const chunks: { header: string; body: string[] }[] = []
  for (const line of src.replace(/\r\n/g, '\n').split('\n')) {
    const h1 = line.match(/^#\s+(.+)$/)
    if (h1) chunks.push({ header: h1[1], body: [] })
    else if (chunks.length) chunks[chunks.length - 1].body.push(line)
  }
  const cases = chunks.map(({ header, body }) => {
    const { text, attrs } = splitAttrs(header)
    const id = attrs.id ?? slugify(text)
    const pop = attrs.pop ?? 'both'
    if (!attrs.pop) warnings.push(`case "${text}" has no population tag`)
    const moduleId = attrs.kv.module ?? 'cases'
    const doc = parseDoc(body.join('\n'), { moduleId, idPrefix: `case.${id}`, defaultPop: pop })
    warnings.push(...doc.warnings)
    const teaser = stripHtml(doc.intro.map((b) => (b.kind === 'html' ? b.html : '')).join(' '))
    for (const s of doc.sections) {
      for (const b of s.blocks) if (b.kind === 'check') b.check.moduleId = moduleId
    }
    return { id, title: text, pop, moduleId, teaser, refs: attrs.refs, stages: doc.sections }
  })
  return { cases, warnings }
}

/** Cheap heading scan (no Markdown render) for counts on overview screens. */
export function scanSections(src: string): { id: string; title: string; pop: Pop }[] {
  const out: { id: string; title: string; pop: Pop }[] = []
  for (const line of src.split('\n')) {
    const h2 = line.match(/^##\s+(.+)$/)
    if (!h2) continue
    const { text, attrs } = splitAttrs(h2[1])
    out.push({ id: attrs.id ?? slugify(text), title: text, pop: attrs.pop ?? 'both' })
  }
  return out
}
