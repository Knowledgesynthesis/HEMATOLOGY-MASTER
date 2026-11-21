import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { PopBadge } from '@/components/PopBadge'
import { TOOLS } from '@/tools/meta'

export function ToolsIndex() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Interactive" title="Clinical tools">
        Age-aware interpreters, scores and calculators. Each one links back to the teaching it is built on.
      </PageHeader>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link key={t.id} to={`/tools/${t.id}`} className="flex flex-col rounded-2xl border bg-card p-5 hover:border-primary/50 hover:shadow-md">
            <div className="flex items-center justify-between">
              <t.icon className="h-6 w-6 text-primary" />
              <PopBadge pop={t.pop} />
            </div>
            <h2 className="mt-3 font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
