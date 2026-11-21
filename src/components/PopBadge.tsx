import type { Pop } from '@/content/types'
import { cn } from '@/lib/utils'

const LABEL: Record<Pop, string> = { peds: 'Peds', adult: 'Adult', both: 'Peds + Adult' }

export function PopBadge({ pop, className }: { pop: Pop; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide',
        pop === 'peds' && 'bg-peds/15 text-peds',
        pop === 'adult' && 'bg-adult/15 text-adult',
        pop === 'both' && 'bg-muted text-muted-foreground',
        className,
      )}
      title={pop === 'both' ? 'Applies to children and adults' : pop === 'peds' ? 'Pediatric-specific' : 'Adult-specific'}
    >
      {pop === 'both' ? (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-peds" />
          <span className="h-1.5 w-1.5 rounded-full bg-adult" />
        </>
      ) : (
        <span className={cn('h-1.5 w-1.5 rounded-full', pop === 'peds' ? 'bg-peds' : 'bg-adult')} />
      )}
      {LABEL[pop]}
    </span>
  )
}
