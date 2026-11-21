import { FileText, Search, Stethoscope, Wrench, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SearchDoc } from '@/content/load'
import { TOOLS } from '@/tools/meta'
import { cn } from '@/lib/utils'
import { PopBadge } from './PopBadge'

const PAGES: SearchDoc[] = [
  { kind: 'page', title: 'Normal values by age', subtitle: 'Reference', text: 'hemoglobin mcv wbc anc platelets reference ranges children neonates', url: '/normal-values' },
  { kind: 'page', title: 'Practice questions', subtitle: 'Practice', text: 'quiz question bank exam mcq', url: '/practice' },
  { kind: 'page', title: 'Clinical cases', subtitle: 'Practice', text: 'case simulator vignettes', url: '/cases' },
  { kind: 'page', title: 'What’s new (2024–2026)', subtitle: 'Updates', text: 'updates guidelines new approvals', url: '/whats-new' },
  { kind: 'page', title: 'References', subtitle: 'Evidence', text: 'guidelines trials citations evidence', url: '/references' },
]

function score(doc: SearchDoc, tokens: string[]) {
  const title = doc.title.toLowerCase()
  const text = doc.text.toLowerCase()
  let s = 0
  for (const t of tokens) {
    const inTitle = title.includes(t)
    const inText = text.includes(t)
    if (!inTitle && !inText) return 0
    s += (inTitle ? 6 : 0) + (inText ? 1 + Math.min(3, text.split(t).length - 1) * 0.3 : 0)
    if (title.startsWith(t)) s += 2
  }
  return s
}

function snippet(text: string, tokens: string[]) {
  const lower = text.toLowerCase()
  const idx = Math.min(...tokens.map((t) => lower.indexOf(t)).filter((i) => i >= 0), Infinity)
  if (!Number.isFinite(idx)) return text.slice(0, 120)
  const start = Math.max(0, idx - 50)
  return (start > 0 ? '…' : '') + text.slice(start, start + 140) + '…'
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [docs, setDocs] = useState<SearchDoc[] | null>(null)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    setQ('')
    setActive(0)
    setTimeout(() => inputRef.current?.focus(), 10)
    if (!docs) {
      import('@/content/load').then((m) => {
        const tools: SearchDoc[] = TOOLS.map((t) => ({ kind: 'tool', title: t.title, subtitle: 'Tool', text: t.blurb, url: `/tools/${t.id}`, pop: t.pop }))
        setDocs([...tools, ...PAGES, ...m.sectionSearchDocs(), ...m.caseSearchDocs()])
      })
    }
  }, [open, docs])

  const results = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1)
    if (!docs || !tokens.length) return []
    return docs
      .map((d) => ({ d, s: score(d, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => ({ ...x.d, snip: snippet(x.d.text, tokens) }))
  }, [q, docs])

  if (!open) return null
  const go = (url: string) => {
    onClose()
    navigate(url)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-3 pt-[10vh] backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal aria-label="Search">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              }
              if (e.key === 'Enter' && results[active]) go(results[active].url)
            }}
            placeholder="Search topics, tools, cases… e.g. “FNAIT”, “hydroxyurea dose”, “TRALI”"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Search"
          />
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Close search">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!docs && <p className="p-4 text-sm text-muted-foreground">Loading index…</p>}
          {docs && q && results.length === 0 && <p className="p-4 text-sm text-muted-foreground">No matches.</p>}
          {docs && !q && <p className="p-4 text-sm text-muted-foreground">Search across every section, tool and case. Use ↑ ↓ and Enter.</p>}
          {results.map((r, i) => {
            const Icon = r.kind === 'tool' ? Wrench : r.kind === 'case' ? Stethoscope : FileText
            return (
              <button
                key={r.url + i}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.url)}
                className={cn('flex w-full items-start gap-3 rounded-lg p-3 text-left', i === active && 'bg-accent')}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{r.title}</span>
                    <span className="text-xs text-muted-foreground">{r.subtitle}</span>
                    {r.pop && <PopBadge pop={r.pop} />}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">{r.snip}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
