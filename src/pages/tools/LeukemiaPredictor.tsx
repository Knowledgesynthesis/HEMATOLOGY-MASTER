import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function LeukemiaPredictor() {
  const [values, setValues] = useState({
    wbc: '',
    age: '',
    blasts: '',
    cellType: '',
  })
  const [result, setResult] = useState<string | null>(null)

  const analyze = () => {
    const wbc = parseFloat(values.wbc)
    const age = parseInt(values.age)
    const blasts = parseFloat(values.blasts)
    const cellType = values.cellType

    let interpretation = 'LEUKEMIA PATTERN ANALYSIS:\n\n'

    if (blasts >= 20) {
      interpretation += '✓ ACUTE LEUKEMIA (≥20% blasts)\n\n'

      if (cellType === 'myeloid') {
        interpretation += '→ ACUTE MYELOID LEUKEMIA (AML)\n\n'
        interpretation += 'Features:\n'
        interpretation += '• Myeloblasts present\n'
        interpretation += '• Look for Auer rods (pathognomonic)\n'
        interpretation += '• MPO+, CD13+, CD33+\n'
        interpretation += `• Age ${age} - median age ~65 years\n\n`
        interpretation += 'Presentation:\n'
        interpretation += '• Pancytopenia symptoms\n'
        interpretation += '• Gingival hypertrophy (monocytic subtypes)\n'
        interpretation += '• DIC risk (especially APL)\n\n'
        interpretation += 'Emergency: If APL suspected (t(15;17)), start ATRA immediately'
      } else if (cellType === 'lymphoid') {
        interpretation += '→ ACUTE LYMPHOBLASTIC LEUKEMIA (ALL)\n\n'
        interpretation += 'Features:\n'
        interpretation += '• Lymphoblasts (smaller, less cytoplasm than myeloblasts)\n'
        interpretation += '• TdT+, CD10+\n'
        interpretation += `• Age ${age} - most common in children (peak 2-5 years)\n\n`
        interpretation += 'Presentation:\n'
        interpretation += '• Pancytopenia\n'
        interpretation += '• Bone pain (common in children)\n'
        interpretation += '• Lymphadenopathy\n'
        interpretation += '• CNS involvement possible\n\n'
        interpretation += age < 18 ? 'Prognosis: Better in children (>85% cure rate)' : 'Prognosis: More challenging in adults'
      }
    } else if (blasts < 20 && wbc > 50) {
      interpretation += '✓ CHRONIC LEUKEMIA (Mature cells, high WBC)\n\n'

      if (cellType === 'myeloid') {
        interpretation += '→ CHRONIC MYELOID LEUKEMIA (CML)\n\n'
        interpretation += 'Hallmark Features:\n'
        interpretation += '• Philadelphia chromosome t(9;22) → BCR-ABL\n'
        interpretation += '• Marked leukocytosis (often >100,000)\n'
        interpretation += '• BASOPHILIA (key clue)\n'
        interpretation += '• Full myeloid spectrum on smear\n\n'
        interpretation += 'Phases:\n'
        interpretation += '• Chronic: Asymptomatic or mild\n'
        interpretation += '• Accelerated: Increasing symptoms\n'
        interpretation += '• Blast crisis: ≥20% blasts (becomes acute leukemia)\n\n'
        interpretation += 'Treatment: Tyrosine kinase inhibitors (imatinib)'
      } else if (cellType === 'lymphoid') {
        interpretation += '→ CHRONIC LYMPHOCYTIC LEUKEMIA (CLL)\n\n'
        interpretation += 'Hallmark Features:\n'
        interpretation += '• Mature-appearing lymphocytes\n'
        interpretation += '• SMUDGE CELLS on smear (very suggestive)\n'
        interpretation += `• Age ${age} - median ~70 years\n`
        interpretation += '• Often found incidentally\n\n'
        interpretation += 'Presentation:\n'
        interpretation += '• Often asymptomatic\n'
        interpretation += '• Lymphadenopathy\n'
        interpretation += '• Autoimmune hemolytic anemia (warm AIHA)\n\n'
        interpretation += 'Many patients: Watch and wait (no immediate treatment needed)'
      }
    } else {
      interpretation += 'REACTIVE LEUKOCYTOSIS or EARLY DISEASE\n\n'
      interpretation += 'Current values suggest:\n'
      interpretation += '• May be reactive (infection, inflammation)\n'
      interpretation += '• Early leukemia possible but not definitive\n'
      interpretation += '• Need bone marrow biopsy for diagnosis\n\n'
      interpretation += 'Consider:\n'
      interpretation += '• Clinical context (symptoms, physical exam)\n'
      interpretation += '• Smear review\n'
      interpretation += '• Flow cytometry\n'
      interpretation += '• Bone marrow biopsy'
    }

    setResult(interpretation)
  }

  const reset = () => {
    setValues({ wbc: '', age: '', blasts: '', cellType: '' })
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
          <h1 className="text-3xl font-bold tracking-tight">Leukemia Pattern Predictor</h1>
          <p className="text-muted-foreground mt-1">Acute vs chronic pattern recognition</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Clinical Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">WBC Count (×10³/μL)</label>
              <input
                type="number"
                value={values.wbc}
                onChange={(e) => setValues({ ...values, wbc: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 85"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Patient Age</label>
              <input
                type="number"
                value={values.age}
                onChange={(e) => setValues({ ...values, age: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., 45"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Blast Percentage (%)</label>
              <input
                type="number"
                value={values.blasts}
                onChange={(e) => setValues({ ...values, blasts: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="0-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Predominant Cell Type</label>
              <select
                value={values.cellType}
                onChange={(e) => setValues({ ...values, cellType: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="myeloid">Myeloid</option>
                <option value="lymphoid">Lymphoid</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={analyze}>Predict Pattern</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Pattern Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md font-mono">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
