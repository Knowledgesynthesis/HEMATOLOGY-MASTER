import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function CoagulationInterpreter() {
  const [values, setValues] = useState({ pt: '', ptt: '', mixing: '' })
  const [result, setResult] = useState<string | null>(null)

  const interpret = () => {
    const pt = values.pt.toLowerCase()
    const ptt = values.ptt.toLowerCase()
    const mixing = values.mixing.toLowerCase()

    let interpretation = 'COAGULATION STUDY INTERPRETATION:\n\n'

    if (pt === 'normal' && ptt === 'normal') {
      interpretation += 'PT: Normal | PTT: Normal\n\n'
      interpretation += '→ NORMAL COAGULATION PATHWAY\n\n'
      interpretation += 'Consider:\n'
      interpretation += '• Platelet disorders (won\'t affect PT/PTT)\n'
      interpretation += '• von Willebrand disease (may have normal or ↑PTT)\n'
      interpretation += '• Factor XIII deficiency (rare)\n'
      interpretation += '• Mild factor deficiencies (&gt;30% activity)\n'
      interpretation += '• Vascular disorders'
    } else if (pt === 'elevated' && ptt === 'normal') {
      interpretation += 'PT: ↑ | PTT: Normal\n\n'
      interpretation += '→ EXTRINSIC PATHWAY DEFECT\n\n'
      interpretation += 'Most Likely:\n'
      interpretation += '• Factor VII deficiency (shortest half-life)\n'
      interpretation += '• Early warfarin effect\n'
      interpretation += '• Early vitamin K deficiency\n'
      interpretation += '• Early liver disease\n\n'
      interpretation += 'Factor VII is first to drop because it has the shortest half-life (~6 hours)'
    } else if (pt === 'normal' && ptt === 'elevated') {
      interpretation += 'PT: Normal | PTT: ↑\n\n'
      interpretation += '→ INTRINSIC PATHWAY DEFECT\n\n'

      if (mixing === 'corrects') {
        interpretation += 'Mixing Study: CORRECTS → Factor Deficiency\n\n'
        interpretation += 'Differential:\n'
        interpretation += '• Hemophilia A (Factor VIII deficiency) - most common\n'
        interpretation += '• Hemophilia B (Factor IX deficiency)\n'
        interpretation += '• Factor XI deficiency\n'
        interpretation += '• Factor XII deficiency (no bleeding)\n\n'
        interpretation += 'Next: Measure specific factor levels'
      } else if (mixing === 'does not correct') {
        interpretation += 'Mixing Study: DOES NOT CORRECT → Inhibitor Present\n\n'
        interpretation += 'Differential:\n'
        interpretation += '• Lupus anticoagulant (associated with thrombosis, not bleeding)\n'
        interpretation += '• Acquired Factor VIII inhibitor\n'
        interpretation += '• Heparin contamination\n\n'
        interpretation += 'Next: Specific inhibitor assays'
      } else {
        interpretation += 'Consider:\n'
        interpretation += '• Hemophilia A or B\n'
        interpretation += '• Heparin therapy\n'
        interpretation += '• Lupus anticoagulant\n\n'
        interpretation += 'Recommend: Mixing study to distinguish factor deficiency from inhibitor'
      }
    } else if (pt === 'elevated' && ptt === 'elevated') {
      interpretation += 'PT: ↑ | PTT: ↑\n\n'
      interpretation += '→ COMMON PATHWAY DEFECT or MULTIPLE DEFECTS\n\n'
      interpretation += 'Most Common Causes:\n'
      interpretation += '• Severe liver disease (can\'t synthesize factors)\n'
      interpretation += '• Warfarin (blocks Vit K-dependent factors)\n'
      interpretation += '• Vitamin K deficiency\n'
      interpretation += '• DIC (consumption of factors)\n'
      interpretation += '• Direct thrombin inhibitors (dabigatran)\n\n'
      interpretation += 'Specific Factor Deficiencies:\n'
      interpretation += '• Factor X, V, II (prothrombin), I (fibrinogen)\n\n'

      interpretation += 'Distinguishing Features:\n'
      interpretation += '• DIC: ↓platelets, ↓fibrinogen, ↑D-dimer, schistocytes\n'
      interpretation += '• Liver disease: Other liver dysfunction signs\n'
      interpretation += '• Warfarin: Responds to vitamin K\n'
      interpretation += '• Vit K deficiency: Responds to vitamin K, liver function normal'
    }

    setResult(interpretation)
  }

  const reset = () => {
    setValues({ pt: '', ptt: '', mixing: '' })
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
          <h1 className="text-3xl font-bold tracking-tight">Coagulation Study Interpreter</h1>
          <p className="text-muted-foreground mt-1">PT/PTT pattern analysis with mixing studies</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Coagulation Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">PT (Prothrombin Time)</label>
              <select
                value={values.pt}
                onChange={(e) => setValues({ ...values, pt: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="normal">Normal (11-13 sec)</option>
                <option value="elevated">Elevated (&gt;13 sec)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">PTT (Partial Thromboplastin Time)</label>
              <select
                value={values.ptt}
                onChange={(e) => setValues({ ...values, ptt: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="normal">Normal (25-35 sec)</option>
                <option value="elevated">Elevated (&gt;35 sec)</option>
              </select>
            </div>

            {values.ptt === 'elevated' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Mixing Study (if done)</label>
                <select
                  value={values.mixing}
                  onChange={(e) => setValues({ ...values, mixing: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">Not done / Select...</option>
                  <option value="corrects">Corrects (normalizes)</option>
                  <option value="does not correct">Does NOT correct</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Mix patient plasma 1:1 with normal plasma and retest
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={interpret}>Interpret</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Coagulation Interpretation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md font-mono">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
