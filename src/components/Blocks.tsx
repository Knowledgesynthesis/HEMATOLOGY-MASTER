import type { Block } from '@/content/types'
import { Callout } from './Callout'
import { Prose } from './Prose'
import { QuickCheck } from './QuickCheck'

export function Blocks({ blocks, onCheck }: { blocks: Block[]; onCheck?: (id: string, correct: boolean) => void }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.kind === 'html' ? (
          <Prose key={i} html={b.html} />
        ) : b.kind === 'callout' ? (
          <Callout key={i} variant={b.variant} title={b.title} html={b.html} year={b.year} />
        ) : (
          <QuickCheck key={b.check.id} check={b.check} onAnswer={(c) => onCheck?.(b.check.id, c)} />
        ),
      )}
    </>
  )
}
