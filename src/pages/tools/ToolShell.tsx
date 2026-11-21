import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { PopBadge } from '@/components/PopBadge'
import { Button } from '@/components/ui/Button'
import { TOOL_BY_ID } from '@/tools/meta'

export function ToolShell({ id, children, learn, onReset }: { id: string; children: ReactNode; learn?: { label: string; href: string }[]; onReset?: () => void }) {
  const t = TOOL_BY_ID[id]
  useEffect(() => {
    document.title = `${t.title} · Hematology Master`
  }, [t])
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow={
          <Link to="/tools" className="hover:underline">
            Tools
          </Link>
        }
        title={
          <span className="flex flex-wrap items-center gap-3">
            <t.icon className="h-7 w-7 text-primary" /> {t.title} <PopBadge pop={t.pop} />
          </span>
        }
        actions={
          onReset && (
            <Button variant="outline" size="sm" onClick={onReset}>
              Reset
            </Button>
          )
        }
      >
        {t.blurb}
      </PageHeader>
      {children}
      {learn && learn.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-4 text-sm">
          <span className="font-semibold text-muted-foreground">Learn more:</span>
          {learn.map((l) => (
            <Link key={l.href} to={l.href} className="rounded-md border px-2 py-1 hover:bg-accent">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Panel({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border bg-card p-4 sm:p-5 ${className ?? ''}`}>
      {title && <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h2>}
      {children}
    </section>
  )
}
