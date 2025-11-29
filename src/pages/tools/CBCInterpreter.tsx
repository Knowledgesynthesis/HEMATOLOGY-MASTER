import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function CBCInterpreter() {
  const [values, setValues] = useState({
    hgb: '',
    hct: '',
    wbc: '',
    platelets: '',
    mcv: '',
    retic: '',
  })

  const [result, setResult] = useState<string | null>(null)

  const interpret = () => {
    const hgb = parseFloat(values.hgb)
    const wbc = parseFloat(values.wbc)
    const platelets = parseFloat(values.platelets)
    const mcv = parseFloat(values.mcv)

    const findings: string[] = []

    // Interpret Hemoglobin
    if (hgb < 12) {
      findings.push('Anemia detected (low hemoglobin)')
      if (mcv < 80) {
        findings.push('• Microcytic anemia → Consider: Iron deficiency, thalassemia, anemia of chronic disease, sideroblastic anemia')
      } else if (mcv > 100) {
        findings.push('• Macrocytic anemia → Consider: B12/folate deficiency, liver disease, alcohol, MDS, hypothyroidism')
      } else {
        findings.push('• Normocytic anemia → Check reticulocyte count to assess marrow response')
        findings.push('• If high retic: hemolysis or acute blood loss')
        findings.push('• If low retic: production problem (CKD, ACD, aplasia)')
      }
    } else if (hgb > 17.5) {
      findings.push('Polycythemia (high hemoglobin) → Consider: Polycythemia vera, chronic hypoxia, dehydration')
    } else {
      findings.push('Hemoglobin: Normal')
    }

    // Interpret WBC
    if (wbc < 4.5) {
      findings.push('Leukopenia (low WBC) → Consider: Viral infection, medications, marrow failure, autoimmune')
    } else if (wbc > 11) {
      findings.push('Leukocytosis (high WBC) → Consider: Infection, inflammation, stress, leukemia, steroids')
      findings.push('• Differential needed to determine which cell line is elevated')
    } else {
      findings.push('WBC: Normal')
    }

    // Interpret Platelets
    if (platelets < 150) {
      findings.push('Thrombocytopenia (low platelets)')
      if (platelets < 50) {
        findings.push('• Moderate-severe thrombocytopenia → Increased bleeding risk')
      }
      findings.push('• Consider: ITP, TTP/HUS, DIC, HIT, splenomegaly, marrow failure, medications')
    } else if (platelets > 400) {
      findings.push('Thrombocytosis (high platelets) → Consider: Essential thrombocythemia, reactive (infection, iron deficiency), post-splenectomy')
    } else {
      findings.push('Platelets: Normal')
    }

    setResult(findings.join('\n'))
  }

  const reset = () => {
    setValues({ hgb: '', hct: '', wbc: '', platelets: '', mcv: '', retic: '' })
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
          <h1 className="text-3xl font-bold tracking-tight">CBC Interpreter</h1>
          <p className="text-muted-foreground mt-1">
            Build anemia, WBC, and platelet differentials from CBC values
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter CBC Values</CardTitle>
          <CardDescription>
            All values are synthetic. For educational purposes only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Hemoglobin (g/dL)
                <span className="text-muted-foreground ml-2 font-normal">Normal: 12-16</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={values.hgb}
                onChange={(e) => setValues({ ...values, hgb: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 10.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Hematocrit (%)
                <span className="text-muted-foreground ml-2 font-normal">Normal: 36-44</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={values.hct}
                onChange={(e) => setValues({ ...values, hct: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 32"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                WBC (×10³/μL)
                <span className="text-muted-foreground ml-2 font-normal">Normal: 4.5-11</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={values.wbc}
                onChange={(e) => setValues({ ...values, wbc: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 15"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Platelets (×10³/μL)
                <span className="text-muted-foreground ml-2 font-normal">Normal: 150-400</span>
              </label>
              <input
                type="number"
                step="1"
                value={values.platelets}
                onChange={(e) => setValues({ ...values, platelets: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 95"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                MCV (fL)
                <span className="text-muted-foreground ml-2 font-normal">Normal: 80-100</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={values.mcv}
                onChange={(e) => setValues({ ...values, mcv: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 72"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Reticulocyte (%)
                <span className="text-muted-foreground ml-2 font-normal">Normal: 0.5-2</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={values.retic}
                onChange={(e) => setValues({ ...values, retic: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 6"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={interpret}>Interpret CBC</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Interpretation</CardTitle>
            <CardDescription>Educational analysis based on entered values</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md">
              {result}
            </div>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-sm">
              <strong className="text-yellow-600 dark:text-yellow-400">Note:</strong> This is for educational purposes
              only. Always correlate with clinical context and confirmatory testing.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
