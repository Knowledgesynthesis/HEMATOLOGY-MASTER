import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function IronStudyMapper() {
  const [values, setValues] = useState({ fe: '', tibc: '', ferritin: '' })
  const [result, setResult] = useState<string | null>(null)

  const analyze = () => {
    const fe = parseFloat(values.fe)
    const tibc = parseFloat(values.tibc)
    const ferritin = parseFloat(values.ferritin)
    const saturation = (fe / tibc) * 100

    let interpretation = `IRON STUDY ANALYSIS:\n\nSerum Fe: ${fe} μg/dL\nTIBC: ${tibc} μg/dL\nFerritin: ${ferritin} ng/mL\nSaturation: ${saturation.toFixed(1)}%\n\n`

    if (fe < 60 && tibc > 360 && ferritin < 30) {
      interpretation += '→ IRON DEFICIENCY ANEMIA (IDA)\n\n'
      interpretation += 'Pattern: Low Fe, High TIBC, Low Ferritin\n'
      interpretation += 'Body is iron-starved → increases TIBC to grab any available iron\n\n'
      interpretation += 'Common Causes:\n• Chronic blood loss (GI, menstrual)\n• Poor dietary intake\n• Malabsorption (celiac, H. pylori)\n• Pregnancy\n\n'
      interpretation += 'Next Steps:\n• Identify source of blood loss (colonoscopy, endoscopy)\n• Oral iron supplementation\n• Treat underlying cause'
    } else if (fe < 60 && tibc < 300 && ferritin > 100) {
      interpretation += '→ ANEMIA OF CHRONIC DISEASE (ACD)\n\n'
      interpretation += 'Pattern: Low Fe, Low TIBC, Normal/High Ferritin\n'
      interpretation += 'Iron is trapped in storage due to hepcidin (inflammatory blocker)\n\n'
      interpretation += 'Common Causes:\n• Chronic infections\n• Autoimmune diseases (RA, SLE)\n• Malignancy\n• Chronic kidney disease\n\n'
      interpretation += 'Treatment: Address underlying condition'
    } else if (fe > 150 && tibc < 300 && ferritin > 300) {
      interpretation += '→ IRON OVERLOAD / HEMOCHROMATOSIS / SIDEROBLASTIC ANEMIA\n\n'
      interpretation += 'Pattern: High Fe, Low TIBC, High Ferritin, High Saturation\n\n'
      interpretation += 'Differential:\n• Hereditary hemochromatosis (HFE mutation)\n• Sideroblastic anemia (iron stuck in mitochondria)\n• Chronic transfusions\n• Excessive iron supplementation\n\n'
      interpretation += 'Risk: Organ damage (liver cirrhosis, diabetes, cardiomyopathy)'
    } else if (fe >= 60 && fe <= 150 && tibc >= 250 && tibc <= 400 && ferritin >= 30 && ferritin <= 300) {
      interpretation += '→ NORMAL IRON STUDIES\n\n'
      interpretation += 'Iron status appears adequate.\n'
      interpretation += 'If anemia present, consider non-iron causes.'
    } else {
      interpretation += '→ MIXED OR ATYPICAL PATTERN\n\n'
      interpretation += 'Consider:\n• Combined IDA + ACD\n• Thalassemia (normal/high iron)\n• Recent iron supplementation\n• Acute phase reaction (ferritin is acute phase reactant)\n\n'
      interpretation += 'May need additional testing or clinical correlation'
    }

    setResult(interpretation)
  }

  const reset = () => {
    setValues({ fe: '', tibc: '', ferritin: '' })
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
          <h1 className="text-3xl font-bold tracking-tight">Iron Study Mapper</h1>
          <p className="text-muted-foreground mt-1">IDA vs ACD vs thalassemia patterns</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Iron Study Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Serum Fe (μg/dL)</label>
              <input
                type="number"
                value={values.fe}
                onChange={(e) => setValues({ ...values, fe: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 60-170"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">TIBC (μg/dL)</label>
              <input
                type="number"
                value={values.tibc}
                onChange={(e) => setValues({ ...values, tibc: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 250-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Ferritin (ng/mL)</label>
              <input
                type="number"
                value={values.ferritin}
                onChange={(e) => setValues({ ...values, ferritin: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 30-300"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={analyze}>Analyze Pattern</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Iron Study Interpretation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md font-mono">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
