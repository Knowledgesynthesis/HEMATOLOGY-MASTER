import { ArrowRight, Shuffle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ART, SmearDefs } from '@/components/smear/art'
import { ATLAS, type AtlasEntry } from '@/components/smear/atlas'
import { Button } from '@/components/ui/Button'
import { Segmented } from '@/components/ui/Field'
import { cn, shuffle } from '@/lib/utils'
import { ToolShell } from './ToolShell'

const CATS = ['All', 'Red cells', 'Inclusions', 'White cells', 'Platelets'] as const

function Art({ id, label }: { id: string; label: string }) {
  const A = ART[id]
  return (
    <div className="aspect-[200/130] overflow-hidden rounded-xl border bg-[#f7eef1]" aria-label={label}>
      {A ? <A /> : null}
    </div>
  )
}

function Drill() {
  const deck = useMemo(() => shuffle(ATLAS.filter((a) => a.id !== 'normal')), [])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState({ c: 0, n: 0 })
  const card = deck[i % deck.length]
  const options = useMemo(() => {
    const same = ATLAS.filter((a) => a.id !== card.id && a.id !== 'normal' && a.category === card.category)
    const others = ATLAS.filter((a) => a.id !== card.id && a.id !== 'normal' && a.category !== card.category)
    return shuffle([card, ...shuffle(same).slice(0, 2), ...shuffle(others).slice(0, 3 - Math.min(2, same.length))].slice(0, 4))
  }, [card])
  const answer = (e: AtlasEntry) => {
    if (picked) return
    setPicked(e.id)
    setScore((s) => ({ c: s.c + (e.id === card.id ? 1 : 0), n: s.n + 1 }))
  }
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div>
        <Art id={card.id} label="Unknown smear finding" />
        <p className="mt-2 text-sm text-muted-foreground">Name the highlighted finding in the center of the field.</p>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">
            Card {(i % deck.length) + 1} / {deck.length}
          </span>
          <span className="tabular-nums text-muted-foreground">
            Score {score.c}/{score.n}
          </span>
        </div>
        <div className="grid gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => answer(o)}
              disabled={!!picked}
              className={cn(
                'rounded-lg border p-3 text-left text-sm',
                !picked && 'hover:bg-accent',
                picked && o.id === card.id && 'border-emerald-500 bg-emerald-500/10',
                picked === o.id && o.id !== card.id && 'border-red-500 bg-red-500/10',
              )}
            >
              {o.name}
            </button>
          ))}
        </div>
        {picked && (
          <div className="mt-4 rounded-xl border bg-card p-4 text-sm">
            <div className="font-semibold">{card.name}</div>
            <p className="mt-1 text-muted-foreground">{card.what}</p>
            <p className="mt-2">
              <span className="font-medium">Think:</span> {card.think.join(' · ')}
            </p>
            <Button className="mt-3" size="sm" onClick={() => { setPicked(null); setI(i + 1) }}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export function SmearAtlasTool() {
  const [mode, setMode] = useState<'atlas' | 'drill'>('atlas')
  const [cat, setCat] = useState<(typeof CATS)[number]>('All')
  const list = ATLAS.filter((a) => cat === 'All' || a.category === cat)
  return (
    <ToolShell id="smear-atlas" learn={[{ label: 'Reading a smear', href: '/learn/foundations#smear' }]}>
      <SmearDefs />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Segmented label="Mode" value={mode} onChange={setMode} options={[{ value: 'atlas', label: 'Atlas' }, { value: 'drill', label: <span className="inline-flex items-center gap-1"><Shuffle className="h-3.5 w-3.5" /> Flashcard drill</span> }]} />
        {mode === 'atlas' && (
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={cn('rounded-full border px-3 py-1 text-xs', cat === c ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent')}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      {mode === 'drill' ? (
        <Drill />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((a) => (
            <article key={a.id} className="flex flex-col rounded-2xl border bg-card p-3">
              <Art id={a.id} label={a.name} />
              <h2 className="mt-3 font-semibold">{a.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.what}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {a.think.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
              {a.pearl && <p className="mt-2 rounded-lg bg-amber-500/10 p-2 text-xs">💡 {a.pearl}</p>}
              {a.href && (
                <Link to={a.href} className="mt-auto pt-2 text-xs font-medium text-primary hover:underline">
                  Learn more →
                </Link>
              )}
            </article>
          ))}
        </div>
      )}
      <p className="mt-6 text-xs text-muted-foreground">Illustrations are schematic, drawn to teach recognition features; they are not photomicrographs.</p>
    </ToolShell>
  )
}
