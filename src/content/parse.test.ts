import { describe, expect, it } from 'vitest'
import { parseCases, parseDoc, splitAttrs } from './parse'

describe('splitAttrs', () => {
  it('reads population, id and refs', () => {
    const { text, attrs } = splitAttrs('Iron deficiency {peds #ida refs=aap-iron-2026,who-ferritin-2020 year=2026}')
    expect(text).toBe('Iron deficiency')
    expect(attrs.pop).toBe('peds')
    expect(attrs.id).toBe('ida')
    expect(attrs.refs).toEqual(['aap-iron-2026', 'who-ferritin-2020'])
    expect(attrs.kv.year).toBe('2026')
  })
  it('leaves plain titles alone', () => {
    expect(splitAttrs('Just a title').text).toBe('Just a title')
  })
})

describe('parseDoc', () => {
  const src = [
    'Intro paragraph.',
    '## First {peds #first refs=ash-itp-2019}',
    'Some **bold** text [@ash-itp-2019] and [[adult]].',
    '',
    '| a | b |',
    '|---|---|',
    '| 1 | 2 |',
    ':::pearl Remember',
    'Pearl body',
    ':::',
    ':::check',
    'What is 2+2?',
    '- [ ] 3',
    '- [x] 4',
    '- [ ] 5',
    '> Because arithmetic.',
    ':::',
    '## Second {adult}',
    'Text',
  ].join('\n')
  const doc = parseDoc(src, { moduleId: 'm', requirePop: true })

  it('splits sections with metadata', () => {
    expect(doc.warnings).toEqual([])
    expect(doc.sections.map((s) => [s.id, s.pop])).toEqual([
      ['first', 'peds'],
      ['second', 'adult'],
    ])
    expect(doc.intro[0].kind).toBe('html')
  })
  it('renders citations, chips and wraps tables', () => {
    const html = doc.sections[0].blocks[0]
    expect(html.kind).toBe('html')
    if (html.kind !== 'html') return
    expect(html.html).toContain('class="cite"')
    expect(html.html).toContain('ASH 2019 ITP')
    expect(html.html).toContain('pop-chip pop-adult')
    expect(html.html).toContain('<div class="table-wrap"><table>')
  })
  it('parses callouts and checks', () => {
    const blocks = doc.sections[0].blocks
    const callout = blocks.find((b) => b.kind === 'callout')
    expect(callout && callout.kind === 'callout' && callout.title).toBe('Remember')
    const check = blocks.find((b) => b.kind === 'check')
    expect(check?.kind).toBe('check')
    if (check?.kind !== 'check') return
    expect(check.check.id).toBe('m.first.q1')
    expect(check.check.options.map((o) => o.correct)).toEqual([false, true, false])
    expect(check.check.explain).toContain('arithmetic')
    expect(check.check.pop).toBe('peds')
  })
  it('flags malformed content', () => {
    const bad = parseDoc('## No pop\n:::check\nQ\n- [x] a\n- [x] b\n:::\n:::bogus\n:::', { moduleId: 'x', requirePop: true })
    expect(bad.warnings.join('\n')).toMatch(/no population tag/)
    expect(bad.warnings.join('\n')).toMatch(/exactly 1 correct/)
    expect(bad.warnings.join('\n')).toMatch(/≥3 options/)
    expect(bad.warnings.join('\n')).toMatch(/unknown directive/)
  })
  it('flags unknown references', () => {
    const d = parseDoc('## S {both}\nSee [@nope].', { moduleId: 'x' })
    const b = d.sections[0].blocks[0]
    expect(b.kind === 'html' && b.html).toContain('cite-missing')
  })
})

describe('parseCases', () => {
  it('builds staged cases', () => {
    const { cases, warnings } = parseCases(
      ['# Pale toddler {peds #pale module=anemia}', 'Teaser line.', '## Presentation', 'Text', ':::check', 'Next?', '- [x] CBC', '- [ ] MRI', '- [ ] Nothing', '> CBC first.', ':::', '## Result', 'Done'].join('\n'),
    )
    expect(warnings).toEqual([])
    expect(cases[0].id).toBe('pale')
    expect(cases[0].teaser).toBe('Teaser line.')
    expect(cases[0].stages.map((s) => s.title)).toEqual(['Presentation', 'Result'])
    const c = cases[0].stages[0].blocks.find((b) => b.kind === 'check')
    expect(c?.kind === 'check' && c.check.id).toBe('case.pale.presentation.q1')
  })
})

describe('check attributes', () => {
  it('accepts bare attributes on :::check', () => {
    const d = parseDoc(':::check peds #abc sec=s1 refs=ash-itp-2019\nQ\n- [x] a\n- [ ] b\n- [ ] c\n> why\n:::', { moduleId: 'm', idPrefix: 'm.bank' })
    const b = d.intro[0]
    expect(b.kind).toBe('check')
    if (b.kind !== 'check') return
    expect(b.check.id).toBe('m.bank.abc')
    expect(b.check.pop).toBe('peds')
    expect(b.check.sectionId).toBe('s1')
    expect(b.check.refs).toEqual(['ash-itp-2019'])
  })
})
