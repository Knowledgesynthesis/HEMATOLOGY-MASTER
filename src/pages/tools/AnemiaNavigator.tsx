import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function AnemiaNavigator() {
  const [mcv, setMcv] = useState('')
  const [retic, setRetic] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const navigate = () => {
    const mcvValue = parseFloat(mcv)
    const reticValue = parseFloat(retic)

    let interpretation = ''

    if (mcvValue < 80) {
      interpretation = `MICROCYTIC ANEMIA (MCV < 80)\n\nDifferential Diagnosis (TAILS):\n• Thalassemia\n• Anemia of Chronic Disease (ACD)\n• Iron Deficiency Anemia (IDA)\n• Lead poisoning\n• Sideroblastic anemia\n\nNext Steps:\n→ Check iron studies (Fe, TIBC, ferritin)\n→ Consider hemoglobin electrophoresis if suspect thalassemia\n→ Peripheral smear review`
    } else if (mcvValue > 100) {
      interpretation = `MACROCYTIC ANEMIA (MCV > 100)\n\nMegaloblastic:\n• B12 deficiency (pernicious anemia, malabsorption, vegan diet)\n• Folate deficiency (poor intake, alcoholism, drugs)\n→ Check B12 and folate levels\n→ Look for hypersegmented neutrophils on smear\n\nNon-Megaloblastic:\n• Alcohol\n• Liver disease\n• Hypothyroidism\n• MDS (myelodysplastic syndrome)\n• Drugs (zidovudine, hydroxyurea)\n• Reticulocytosis (large young RBCs)\n\nNext Steps:\n→ Check B12, folate, TSH, liver function tests\n→ Peripheral smear\n→ Consider bone marrow biopsy if concern for MDS`
    } else {
      // Normocytic - use reticulocyte count
      interpretation = `NORMOCYTIC ANEMIA (MCV 80-100)\n\n`

      if (reticValue > 2) {
        interpretation += `HIGH RETICULOCYTE COUNT (${reticValue}%)\n→ Marrow IS responding (production intact)\n\nCauses:\n• Acute blood loss\n• Hemolytic anemia\n  - Check: LDH (↑), haptoglobin (↓), indirect bilirubin (↑)\n  - DAT/Coombs: Positive → immune hemolysis\n  - DAT/Coombs: Negative → non-immune (G6PD, hereditary spherocytosis, PNH, TTP/HUS)\n\nNext Steps:\n→ Hemolysis workup (LDH, haptoglobin, bilirubin, DAT)\n→ Peripheral smear for schistocytes, spherocytes, etc.\n→ History of bleeding`
      } else {
        interpretation += `LOW RETICULOCYTE COUNT (${reticValue}%)\n→ Marrow is NOT responding (production problem)\n\nCauses:\n• Anemia of chronic disease (ACD)\n• Chronic kidney disease (↓ EPO production)\n• Aplastic anemia / marrow failure\n• Pure red cell aplasia\n• Early iron deficiency (before MCV drops)\n• Marrow infiltration (leukemia, myelofibrosis)\n\nNext Steps:\n→ Check inflammatory markers (CRP, ESR) for ACD\n→ Check creatinine/BUN for CKD\n→ Consider bone marrow biopsy if aplasia suspected`
      }
    }

    setResult(interpretation)
  }

  const reset = () => {
    setMcv('')
    setRetic('')
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
          <h1 className="text-3xl font-bold tracking-tight">Anemia Navigator</h1>
          <p className="text-muted-foreground mt-1">
            MCV-based decision tree for anemia workup
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Values</CardTitle>
          <CardDescription>
            Systematic approach to anemia classification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                MCV (Mean Corpuscular Volume) in fL
              </label>
              <input
                type="number"
                step="0.1"
                value={mcv}
                onChange={(e) => setMcv(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 80-100 fL"
              />
              <p className="text-xs text-muted-foreground mt-1">
                &lt;80 = Microcytic | 80-100 = Normocytic | &gt;100 = Macrocytic
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Reticulocyte Count (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={retic}
                onChange={(e) => setRetic(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Normal: 0.5-2%"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Especially important for normocytic anemia
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={navigate}>Navigate Anemia</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Anemia Pathway</CardTitle>
            <CardDescription>Diagnostic approach based on your values</CardDescription>
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
