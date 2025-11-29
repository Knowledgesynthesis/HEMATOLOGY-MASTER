import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function HemolysisPanel() {
  const [values, setValues] = useState({
    ldh: '',
    haptoglobin: '',
    indirectBili: '',
    retic: '',
    dat: '',
  })

  const [result, setResult] = useState<string | null>(null)

  const analyze = () => {
    const ldh = parseFloat(values.ldh)
    const haptoglobin = values.haptoglobin.toLowerCase()
    const indirectBili = parseFloat(values.indirectBili)
    const retic = parseFloat(values.retic)
    const dat = values.dat.toLowerCase()

    let findings = 'HEMOLYSIS ANALYSIS:\n\n'

    // Check for hemolysis pattern
    const hasHemolysis = (ldh > 250 || haptoglobin === 'low') && indirectBili > 1.2 && retic > 2

    if (hasHemolysis) {
      findings += '✓ HEMOLYSIS PATTERN PRESENT\n\n'
      findings += 'Classic markers detected:\n'
      if (ldh > 250) findings += `• LDH elevated (${ldh}) - RBC destruction\n`
      if (haptoglobin === 'low') findings += '• Haptoglobin low - consumed binding free Hgb\n'
      if (indirectBili > 1.2) findings += `• Indirect bilirubin elevated (${indirectBili}) - heme breakdown\n`
      if (retic > 2) findings += `• Reticulocytosis (${retic}%) - marrow response\n`

      findings += '\n---\n\n'

      // DAT interpretation
      if (dat === 'positive') {
        findings += 'DAT/COOMBS: POSITIVE → IMMUNE-MEDIATED HEMOLYSIS\n\n'
        findings += 'Differential:\n'
        findings += '• Warm autoimmune hemolytic anemia (AIHA)\n'
        findings += '  - IgG antibodies, extravascular hemolysis\n'
        findings += '  - Associated: SLE, CLL, drugs\n\n'
        findings += '• Cold agglutinin disease\n'
        findings += '  - IgM antibodies, worse in cold\n'
        findings += '  - Associated: Mycoplasma, EBV, lymphoma\n\n'
        findings += '• Drug-induced hemolysis\n'
        findings += '  - Penicillins, cephalosporins, methyldopa\n\n'
        findings += '• Acute transfusion reaction\n'
      } else if (dat === 'negative') {
        findings += 'DAT/COOMBS: NEGATIVE → NON-IMMUNE HEMOLYSIS\n\n'
        findings += 'Differential:\n'
        findings += '• Hereditary spherocytosis\n'
        findings += '  - Membrane defect, spherocytes on smear\n'
        findings += '  - Positive osmotic fragility test\n\n'
        findings += '• G6PD deficiency\n'
        findings += '  - X-linked, oxidative stress triggers\n'
        findings += '  - Bite cells, Heinz bodies\n\n'
        findings += '• Microangiopathic hemolytic anemia (MAHA)\n'
        findings += '  - TTP/HUS, DIC, mechanical valves\n'
        findings += '  - Schistocytes on smear\n\n'
        findings += '• PNH (Paroxysmal Nocturnal Hemoglobinuria)\n'
        findings += '  - Intravascular hemolysis, hemoglobinuria\n'
        findings += '  - Flow cytometry diagnostic\n\n'
        findings += '• Sickle cell disease (if known)\n'
      }
    } else {
      findings += '✗ HEMOLYSIS PATTERN NOT DETECTED\n\n'
      findings += 'Current values do not suggest significant hemolysis.\n\n'
      findings += 'Consider other causes of anemia:\n'
      findings += '• Blood loss\n'
      findings += '• Nutritional deficiency (iron, B12, folate)\n'
      findings += '• Anemia of chronic disease\n'
      findings += '• Bone marrow disorders\n'
    }

    setResult(findings)
  }

  const reset = () => {
    setValues({ ldh: '', haptoglobin: '', indirectBili: '', retic: '', dat: '' })
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hemolysis Panel Engine</h1>
          <p className="text-muted-foreground mt-1">
            Determine if hemolysis is present and classify as immune vs non-immune
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Lab Values</CardTitle>
          <CardDescription>
            Classic hemolysis markers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                LDH (U/L)
              </label>
              <input
                type="number"
                value={values.ldh}
                onChange={(e) => setValues({ ...values, ldh: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 140-250 U/L"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Haptoglobin
              </label>
              <select
                value={values.haptoglobin}
                onChange={(e) => setValues({ ...values, haptoglobin: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="normal">Normal (30-200 mg/dL)</option>
                <option value="low">Low (&lt;30)</option>
                <option value="high">High (&gt;200)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Indirect (Unconjugated) Bilirubin (mg/dL)
              </label>
              <input
                type="number"
                step="0.1"
                value={values.indirectBili}
                onChange={(e) => setValues({ ...values, indirectBili: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 0.2-1.2 mg/dL"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Reticulocyte Count (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={values.retic}
                onChange={(e) => setValues({ ...values, retic: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 0.5-2%"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                DAT (Direct Antiglobulin Test / Coombs)
              </label>
              <select
                value={values.dat}
                onChange={(e) => setValues({ ...values, dat: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="positive">Positive (immune-mediated)</option>
                <option value="negative">Negative (non-immune)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={analyze}>Analyze Hemolysis</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Hemolysis Interpretation</CardTitle>
            <CardDescription>Analysis based on lab markers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md font-mono">
              {result}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
