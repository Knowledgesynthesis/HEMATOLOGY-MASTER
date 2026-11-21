import { ExternalLink } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { allSections } from '@/content/load'
import { MODULE_BY_ID } from '@/content/modules'
import { REFS } from '@/content/refs'
import type { Ref } from '@/content/types'
import { cn } from '@/lib/utils'

const KIND_LABEL: Record<Ref['kind'], string> = {
  guideline: 'Guidelines & consensus',
  trial: 'Trials & key studies',
  regulatory: 'Regulatory actions',
  review: 'Reviews',
  reference: 'Reference texts',
}

export function References() {
  const { hash } = useLocation()
  const citedIn = useMemo(() => {
    const map: Record<string, { moduleId: string; sectionId: string; title: string }[]> = {}
    for (const s of allSections()) {
      const html = s.blocks.map((b) => (b.kind === 'check' ? b.check.explain + b.check.stem : b.html)).join(' ')
      const ids = new Set([...s.refs, ...[...html.matchAll(/\/references#ref-([\w-]+)/g)].map((m) => m[1])])
      for (const id of ids) (map[id] ??= []).push({ moduleId: s.moduleId, sectionId: s.id, title: s.title })
    }
    return map
  }, [])

  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'center' }), 30)
  }, [hash])

  const groups = (Object.keys(KIND_LABEL) as Ref['kind'][]).map((k) => ({
    kind: k,
    items: Object.entries(REFS)
      .filter(([, r]) => r.kind === k)
      .sort((a, b) => b[1].year - a[1].year),
  }))

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Evidence" title="References">
        {Object.keys(REFS).length} sources behind the content, newest first within each group. Every inline citation links here.
      </PageHeader>
      <div className="space-y-10">
        {groups
          .filter((g) => g.items.length)
          .map((g) => (
            <section key={g.kind}>
              <h2 className="mb-3 text-lg font-semibold">{KIND_LABEL[g.kind]}</h2>
              <ol className="space-y-3">
                {g.items.map(([id, r]) => (
                  <li key={id} id={`ref-${id}`} className={cn('scroll-mt-24 rounded-xl border bg-card p-4 transition-colors', hash === `#ref-${id}` && 'border-primary ring-2 ring-primary/30')}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="cite">{r.label}</span>
                      <span className="text-xs text-muted-foreground">{r.year}</span>
                    </div>
                    <p className="mt-1.5 text-sm">{r.cite}</p>
                    {r.note && <p className="mt-1 text-xs italic text-muted-foreground">{r.note}</p>}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                      {citedIn[id]?.slice(0, 6).map((c) => (
                        <Link key={c.moduleId + c.sectionId} to={`/learn/${c.moduleId}#${c.sectionId}`} className="text-muted-foreground hover:text-foreground">
                          {MODULE_BY_ID[c.moduleId]?.short} › {c.title}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
      </div>
    </div>
  )
}
