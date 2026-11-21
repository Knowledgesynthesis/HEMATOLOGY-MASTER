import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { PopBadge } from '@/components/PopBadge'
import { Prose } from '@/components/Prose'
import { allUpdates } from '@/content/load'
import { MODULE_BY_ID } from '@/content/modules'
import { usePrefs, visibleFor } from '@/store/prefs'

export function WhatsNew() {
  const focus = usePrefs((s) => s.focus)
  const items = useMemo(() => allUpdates().sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)), [])
  const shown = items.filter((u) => visibleFor(focus, u.pop))
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Updates" title="What’s new in hematology">
        Practice-changing guidelines, approvals and withdrawals from 2022 to 2026, pulled automatically from the modules.
      </PageHeader>
      <ol className="relative space-y-5 border-l pl-6">
        {shown.map((u) => (
          <li key={u.moduleId + u.sectionId + u.title} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-sky-500" aria-hidden />
            <div className="flex flex-wrap items-center gap-2">
              {u.year && <span className="rounded bg-sky-500/15 px-2 py-0.5 text-xs font-bold text-sky-500">{u.year}</span>}
              <h2 className="font-semibold">{u.title}</h2>
              <PopBadge pop={u.pop} />
            </div>
            <Prose html={u.html} className="mt-1" />
            <Link to={`/learn/${u.moduleId}#${u.sectionId}`} className="text-sm font-medium text-primary hover:underline">
              {MODULE_BY_ID[u.moduleId]?.short} › {u.sectionTitle} →
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
