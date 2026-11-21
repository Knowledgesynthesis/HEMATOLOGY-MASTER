import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { RBC_BANDS, WBC_BANDS } from '@/lib/ranges'

export function NormalValues() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader eyebrow="Reference" title="Normal values by age">
        Mean (lower limit = −2 SD) after Dallman and Nathan &amp; Oski, as reproduced in the Harriet Lane Handbook. Use your laboratory’s ranges in practice. The{' '}
        <Link className="font-medium text-primary hover:underline" to="/tools/cbc">
          CBC Interpreter
        </Link>{' '}
        applies these bands automatically.
      </PageHeader>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Red cells</h2>
        <div className="table-wrap">
          <table className="text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="px-3 py-2">Age</th>
                <th className="px-3 py-2">Hb g/dL</th>
                <th className="px-3 py-2">Hct %</th>
                <th className="px-3 py-2">MCV fL</th>
              </tr>
            </thead>
            <tbody>
              {RBC_BANDS.flatMap((b) =>
                b.sexSpecific
                  ? (['female', 'male'] as const).map((s) => (
                      <tr key={b.label + s} className="border-t">
                        <td className="px-3 py-2 font-medium">
                          {b.label}, {s}
                        </td>
                        <td className="px-3 py-2">
                          {b.sexSpecific![s].hb[0]} ({b.sexSpecific![s].hb[1]})
                        </td>
                        <td className="px-3 py-2">
                          {b.sexSpecific![s].hct[0]} ({b.sexSpecific![s].hct[1]})
                        </td>
                        <td className="px-3 py-2">
                          {b.sexSpecific![s].mcv[0]} ({b.sexSpecific![s].mcv[1]})
                        </td>
                      </tr>
                    ))
                  : [
                      <tr key={b.label} className="border-t">
                        <td className="px-3 py-2 font-medium">{b.label}</td>
                        <td className="px-3 py-2">
                          {b.hb[0]} ({b.hb[1]})
                        </td>
                        <td className="px-3 py-2">
                          {b.hct[0]} ({b.hct[1]})
                        </td>
                        <td className="px-3 py-2">
                          {b.mcv[0]} ({b.mcv[1]})
                        </td>
                      </tr>,
                    ],
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Rule of thumb: lower limit of MCV ≈ 70 + age in years (to 80 fL). Cord blood (term): Hb 16.5 (13.5), MCV 108 (98).</p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">White cells (× 10⁹/L, range)</h2>
        <div className="table-wrap">
          <table className="text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="px-3 py-2">Age</th>
                <th className="px-3 py-2">WBC</th>
                <th className="px-3 py-2">Neutrophils</th>
                <th className="px-3 py-2">Lymphocytes</th>
              </tr>
            </thead>
            <tbody>
              {WBC_BANDS.map((b) => (
                <tr key={b.label} className="border-t">
                  <td className="px-3 py-2 font-medium">{b.label}</td>
                  <td className="px-3 py-2">
                    {b.wbc[0]}–{b.wbc[1]}
                  </td>
                  <td className="px-3 py-2">
                    {b.anc[0]}–{b.anc[1]}
                  </td>
                  <td className="px-3 py-2">
                    {b.alc[0]}–{b.alc[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Clinical neutropenia: ANC &lt; 1.5 (≥ 1 year) or &lt; 1.0 (2–12 months). Lymphocytes outnumber neutrophils from ~1 week to ~4–6 years. Duffy-null individuals have lower
          ANCs without infection risk.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Platelets</h3>
          <p className="mt-1 text-sm text-muted-foreground">150–450 × 10⁹/L at all ages, including term neonates.</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Reticulocytes</h3>
          <p className="mt-1 text-sm text-muted-foreground">3–7% in the first days of life, &lt; 1% by 1–2 weeks, then 0.5–2.5%. Absolute count 25–100 × 10⁹/L.</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">HbF and HbA₂</h3>
          <p className="mt-1 text-sm text-muted-foreground">HbF ~60–80% at birth, &lt; 10% by 6 months, &lt; 1–2% by 1–2 years. HbA₂ 2.0–3.5% in adults (low in infancy).</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Coagulation</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Neonatal PT/aPTT are longer and vitamin K–dependent factors are ~30–60% of adult values. Use gestational-age-specific ranges.{' '}
            <Link to="/learn/foundations#hemostasis" className="text-primary hover:underline">
              Developmental hemostasis →
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
