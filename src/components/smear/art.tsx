/* Stylized peripheral-smear illustrations. Drawn on a 200 × 130 "slide" so cells read at a glance.
   Colors mimic Wright-Giemsa: pink RBCs, purple nuclei, blue cytoplasm. */
import type { ReactNode } from 'react'

export const PLASMA = '#f7eef1'
const RBC_EDGE = '#c4606f'
const NUC = '#55357f'

export function SmearDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <radialGradient id="sm-rbc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6dde0" />
          <stop offset="38%" stopColor="#f0c4ca" />
          <stop offset="100%" stopColor="#d6707e" />
        </radialGradient>
        <radialGradient id="sm-hypo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8ecee" />
          <stop offset="72%" stopColor="#f6e2e5" />
          <stop offset="100%" stopColor="#d77a87" />
        </radialGradient>
        <radialGradient id="sm-poly" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cdbfd6" />
          <stop offset="100%" stopColor="#a48fb8" />
        </radialGradient>
        <radialGradient id="sm-blast" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#8467b4" />
          <stop offset="100%" stopColor="#5a3c8c" />
        </radialGradient>
      </defs>
    </svg>
  )
}

type P = { x: number; y: number; r?: number }

export const Rbc = ({ x, y, r = 12.5, fill = 'url(#sm-rbc)' }: P & { fill?: string }) => <circle cx={x} cy={y} r={r} fill={fill} stroke={RBC_EDGE} strokeWidth={0.6} />
const Sphero = ({ x, y, r = 9.5 }: P) => <circle cx={x} cy={y} r={r} fill="#c65264" stroke="#a63e50" strokeWidth={0.5} />
const Hypo = ({ x, y, r = 10 }: P) => <circle cx={x} cy={y} r={r} fill="url(#sm-hypo)" stroke={RBC_EDGE} strokeWidth={0.6} />

const BG: [number, number][] = [
  [22, 22],
  [58, 16],
  [146, 16],
  [182, 36],
  [18, 64],
  [26, 108],
  [70, 114],
  [126, 114],
  [176, 104],
  [186, 70],
]

function Field({ children, bg = true, bgKind = 'normal' }: { children: ReactNode; bg?: boolean; bgKind?: 'normal' | 'hypo' }) {
  return (
    <svg viewBox="0 0 200 130" className="h-full w-full" role="img">
      <rect width="200" height="130" rx="10" fill={PLASMA} />
      {bg && BG.map(([x, y], i) => (bgKind === 'hypo' ? <Hypo key={i} x={x} y={y} r={9.5 + (i % 3)} /> : <Rbc key={i} x={x} y={y} r={11.5 + (i % 3) * 0.6} />))}
      {children}
    </svg>
  )
}

const spikes = (x: number, y: number, r: number, n: number, len: number, irregular = false) => {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n + (irregular ? Math.sin(i * 2.7) * 0.25 : 0)
    const rr = i % 2 === 0 ? r + (irregular ? len * (0.6 + ((i * 37) % 10) / 12) : len) : r - 0.5
    pts.push(`${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`)
  }
  return pts.join(' ')
}

const dots = (x: number, y: number, r: number, n: number, seed = 1) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 2.399 + seed) % (Math.PI * 2)
    const d = r * Math.sqrt(((i * 0.618 + seed * 0.13) % 1) * 0.85)
    return [x + d * Math.cos(a), y + d * Math.sin(a)] as const
  })

function Neutrophil({ x, y, lobes = 3, toxic = false, dohle = false, r = 20 }: P & { lobes?: number; toxic?: boolean; dohle?: boolean }) {
  const pos = Array.from({ length: lobes }, (_, i) => {
    const t = lobes === 1 ? 0 : i / (lobes - 1)
    return [x - 10 + t * 20, y + Math.sin(t * Math.PI * 1.6) * 6 - 2] as const
  })
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#f0dbe4" stroke="#d6b3c4" strokeWidth={0.6} />
      {dots(x, y, r - 3, toxic ? 60 : 30, 3).map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={toxic ? 0.9 : 0.55} fill={toxic ? '#4a2566' : '#c99bb4'} />
      ))}
      {pos.slice(1).map(([a, b], i) => (
        <line key={'l' + i} x1={pos[i][0]} y1={pos[i][1]} x2={a} y2={b} stroke={NUC} strokeWidth={1.4} />
      ))}
      {pos.map(([a, b], i) => (
        <ellipse key={i} cx={a} cy={b} rx={lobes > 4 ? 3.6 : 4.6} ry={lobes > 4 ? 4.2 : 5.2} fill={NUC} />
      ))}
      {dohle && <ellipse cx={x + 12} cy={y + 9} rx={4} ry={2.6} fill="#9dbbe0" opacity={0.9} />}
    </g>
  )
}

export const ART: Record<string, () => JSX.Element> = {
  normal: () => (
    <Field>
      <Rbc x={92} y={60} />
      <Rbc x={120} y={66} />
      <Rbc x={104} y={86} />
      <circle cx={140} cy={44} r={2} fill="#7b4aa8" />
    </Field>
  ),
  microcytic: () => (
    <Field bgKind="hypo">
      <Hypo x={92} y={58} r={9} />
      <Hypo x={116} y={70} r={8.5} />
      <ellipse cx={100} cy={92} rx={15} ry={4.2} fill="#e9a7b0" stroke={RBC_EDGE} strokeWidth={0.6} />
      <Hypo x={134} y={52} r={9.5} />
    </Field>
  ),
  target: () => (
    <Field>
      {[
        [96, 62],
        [126, 76],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={13} fill="#d9727f" stroke={RBC_EDGE} strokeWidth={0.6} />
          <circle cx={x} cy={y} r={8.5} fill="#f5d9dd" />
          <circle cx={x} cy={y} r={4.2} fill="#d06876" />
        </g>
      ))}
    </Field>
  ),
  spherocyte: () => (
    <Field>
      <Sphero x={92} y={60} />
      <Sphero x={118} y={72} r={9} />
      <Rbc x={140} y={52} />
      <Sphero x={104} y={90} r={8.5} />
    </Field>
  ),
  schistocyte: () => (
    <Field>
      <path d="M 82 66 A 14 14 0 0 1 110 66 L 104 60 L 99 66 L 93 66 L 88 60 Z" fill="#da7684" stroke={RBC_EDGE} strokeWidth={0.6} />
      <polygon points="120,84 140,76 132,96" fill="#d26c7a" stroke={RBC_EDGE} strokeWidth={0.6} />
      <path d="M 96 92 q 8 -10 16 0 q -8 4 -16 0 Z" fill="#d26c7a" stroke={RBC_EDGE} strokeWidth={0.6} />
      <circle cx={146} cy={50} r={1.8} fill="#7b4aa8" />
    </Field>
  ),
  sickle: () => (
    <Field>
      <path d="M 80 70 Q 100 36 124 66 Q 102 54 80 70 Z" fill="#cf6070" stroke="#a84556" strokeWidth={0.7} />
      <path d="M 112 92 Q 132 70 150 92 Q 132 82 112 92 Z" fill="#cf6070" stroke="#a84556" strokeWidth={0.7} />
      <Rbc x={92} y={94} r={11} />
    </Field>
  ),
  teardrop: () => (
    <Field>
      {[
        [98, 66, 0],
        [128, 84, 1],
      ].map(([x, y, k]) => (
        <g key={k} transform={`rotate(${k ? 150 : -25} ${x} ${y})`}>
          <polygon points={`${x + 8},${y - 7} ${x + 28},${y} ${x + 8},${y + 7}`} fill="#dc8390" stroke={RBC_EDGE} strokeWidth={0.6} />
          <circle cx={x} cy={y} r={11.5} fill="url(#sm-rbc)" stroke={RBC_EDGE} strokeWidth={0.6} />
        </g>
      ))}
    </Field>
  ),
  bite: () => (
    <Field>
      <Rbc x={98} y={66} r={13} />
      <circle cx={110} cy={56} r={6.5} fill={PLASMA} />
      <Rbc x={130} y={84} r={12.5} />
      <circle cx={118} cy={92} r={6} fill={PLASMA} />
      <circle cx={142} cy={92} r={5.5} fill={PLASMA} />
    </Field>
  ),
  blister: () => (
    <Field>
      <circle cx={100} cy={66} r={13} fill="#d06b79" stroke={RBC_EDGE} strokeWidth={0.6} />
      <ellipse cx={108} cy={60} rx={6.5} ry={7.5} fill="#f6e4e7" stroke="#e3b9c0" strokeWidth={0.5} />
      <Rbc x={128} y={86} />
    </Field>
  ),
  elliptocyte: () => (
    <Field>
      {[
        [94, 60, 20],
        [124, 70, -15],
        [104, 92, 5],
      ].map(([x, y, a], i) => (
        <g key={i} transform={`rotate(${a} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={16} ry={7.5} fill="url(#sm-rbc)" stroke={RBC_EDGE} strokeWidth={0.6} />
        </g>
      ))}
    </Field>
  ),
  acanthocyte: () => (
    <Field>
      <polygon points={spikes(98, 64, 10, 6, 5, true)} fill="#cd5e6e" stroke={RBC_EDGE} strokeWidth={0.6} />
      <polygon points={spikes(130, 84, 9.5, 5, 5.5, true)} fill="#cd5e6e" stroke={RBC_EDGE} strokeWidth={0.6} />
    </Field>
  ),
  echinocyte: () => (
    <Field>
      <polygon points={spikes(98, 64, 11.5, 16, 2.4)} fill="url(#sm-rbc)" stroke={RBC_EDGE} strokeWidth={0.6} />
      <polygon points={spikes(130, 84, 11, 15, 2.4)} fill="url(#sm-rbc)" stroke={RBC_EDGE} strokeWidth={0.6} />
    </Field>
  ),
  stomatocyte: () => (
    <Field>
      {[
        [98, 64],
        [128, 84],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={12.5} fill="#d97a86" stroke={RBC_EDGE} strokeWidth={0.6} />
          <ellipse cx={x} cy={y} rx={7.5} ry={2} fill="#f5d8dc" />
        </g>
      ))}
    </Field>
  ),
  'howell-jolly': () => (
    <Field>
      <Rbc x={98} y={64} />
      <circle cx={104} cy={58} r={2.6} fill="#3e1f66" />
      <Rbc x={128} y={84} />
    </Field>
  ),
  stippling: () => (
    <Field>
      <Rbc x={100} y={66} r={13} />
      {dots(100, 66, 11, 22, 2).map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={0.95} fill="#4d3a8a" />
      ))}
      <Rbc x={130} y={88} />
    </Field>
  ),
  pappenheimer: () => (
    <Field>
      <Rbc x={100} y={66} r={13} />
      {[
        [108, 72],
        [110, 69],
        [107, 75],
        [111, 74],
      ].map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={1.2} fill="#3b2a5c" />
      ))}
      <Rbc x={130} y={88} />
    </Field>
  ),
  heinz: () => (
    <svg viewBox="0 0 200 130" className="h-full w-full" role="img">
      <rect width="200" height="130" rx="10" fill="#eef1f6" />
      {[...BG, [98, 64], [128, 84]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={12} fill="#bfc8da" stroke="#8d9ab6" strokeWidth={0.6} />
          {i >= BG.length &&
            [0.4, 2.2, 4.1].map((a, j) => <circle key={j} cx={x + 10.5 * Math.cos(a)} cy={y + 10.5 * Math.sin(a)} r={2} fill="#263e78" />)}
        </g>
      ))}
    </svg>
  ),
  rouleaux: () => (
    <Field bg={false}>
      {Array.from({ length: 8 }, (_, i) => (
        <Rbc key={i} x={46 + i * 15} y={40 + i * 6} r={12} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <Rbc key={'b' + i} x={40 + i * 14} y={100 - i * 2} r={11.5} />
      ))}
    </Field>
  ),
  agglutination: () => (
    <Field bg={false}>
      {[
        [80, 54],
        [92, 62],
        [84, 70],
        [98, 52],
        [104, 66],
        [92, 78],
        [140, 80],
        [150, 90],
        [136, 94],
        [154, 76],
        [40, 100],
        [52, 94],
      ].map(([x, y], i) => (
        <Rbc key={i} x={x} y={y} r={10.5} />
      ))}
    </Field>
  ),
  nrbc: () => (
    <Field>
      <circle cx={100} cy={64} r={11} fill="#d3a8b4" stroke="#b78a98" strokeWidth={0.6} />
      <circle cx={100} cy={64} r={6.5} fill="#2f1b55" />
      <Rbc x={130} y={84} />
    </Field>
  ),
  polychromasia: () => (
    <Field>
      <circle cx={98} cy={64} r={15} fill="url(#sm-poly)" stroke="#8f7aa6" strokeWidth={0.6} />
      <circle cx={130} cy={86} r={14.5} fill="url(#sm-poly)" stroke="#8f7aa6" strokeWidth={0.6} />
    </Field>
  ),
  'auer-rod': () => (
    <Field>
      <circle cx={104} cy={68} r={24} fill="#a6bde6" stroke="#86a2d4" strokeWidth={0.6} />
      <circle cx={101} cy={66} r={17} fill="url(#sm-blast)" />
      <circle cx={95} cy={60} r={2.8} fill="#9d8bcc" />
      <circle cx={106} cy={72} r={2.4} fill="#9d8bcc" />
      <rect x={112} y={78} width={14} height={1.8} rx={0.9} fill="#d43f74" transform="rotate(-35 119 79)" />
    </Field>
  ),
  'faggot-cell': () => (
    <Field>
      <circle cx={104} cy={68} r={25} fill="#ecd2df" stroke="#d6a9bf" strokeWidth={0.6} />
      {dots(104, 68, 22, 70, 5).map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={1.05} fill="#7d2a62" />
      ))}
      <path d="M 92 58 q 10 -8 18 0 q -2 10 -9 10 q -9 0 -9 -10 Z" fill="#5d3b8c" opacity={0.92} />
      {[-30, -20, -40, 20, 30].map((a, i) => (
        <rect key={i} x={104 + (i % 2) * 4} y={80 + (i % 3)} width={16} height={1.5} rx={0.7} fill="#d43f74" transform={`rotate(${a} ${112} ${82})`} />
      ))}
    </Field>
  ),
  lymphoblast: () => (
    <Field>
      <circle cx={102} cy={66} r={17} fill="#a8c0e8" stroke="#89a6d8" strokeWidth={0.6} />
      <circle cx={101} cy={66} r={15} fill="url(#sm-blast)" />
      {dots(101, 66, 13, 30, 7).map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={0.7} fill="#3d2470" opacity={0.6} />
      ))}
    </Field>
  ),
  smudge: () => (
    <Field>
      <path d="M 84 62 C 90 44, 120 46, 124 60 C 130 76, 112 90, 96 84 C 86 80, 80 72, 84 62 Z" fill="#7d5cae" opacity={0.55} />
      <path d="M 92 60 C 104 54, 116 64, 110 74" stroke="#6a4a9c" strokeWidth={1.2} fill="none" opacity={0.6} />
      <circle cx={140} cy={92} r={9} fill="#5a3c8c" />
      <circle cx={140} cy={92} r={10.5} fill="none" stroke="#a8c0e8" strokeWidth={1.6} />
    </Field>
  ),
  hypersegmented: () => (
    <Field>
      <Neutrophil x={104} y={66} lobes={6} r={22} />
      <ellipse cx={142} cy={96} rx={14} ry={11} fill="url(#sm-rbc)" stroke={RBC_EDGE} strokeWidth={0.6} />
    </Field>
  ),
  toxic: () => (
    <Field>
      <Neutrophil x={104} y={66} lobes={3} toxic dohle r={21} />
    </Field>
  ),
  'reactive-lymph': () => (
    <Field>
      <path d="M 74 66 C 74 40, 128 36, 136 58 C 142 74, 130 92, 104 94 C 86 95, 74 86, 74 66 Z" fill="#b3c9ec" stroke="#6f93d0" strokeWidth={2} />
      <ellipse cx={96} cy={62} rx={12} ry={10} fill="#5e468f" />
      <Rbc x={140} y={84} r={12} />
      <Rbc x={118} y={100} r={11.5} />
    </Field>
  ),
  'giant-platelet': () => (
    <Field>
      <circle cx={100} cy={66} r={11} fill="#b79bd3" stroke="#8e6bb5" strokeWidth={0.6} />
      {dots(100, 66, 9, 24, 9).map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={0.9} fill="#5a2f8c" />
      ))}
      <Rbc x={126} y={82} />
      <circle cx={140} cy={56} r={2} fill="#7b4aa8" />
    </Field>
  ),
  'platelet-clump': () => (
    <Field>
      {dots(104, 66, 14, 26, 11).map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r={2.2} fill="#7b4aa8" opacity={0.85} />
      ))}
    </Field>
  ),
}
