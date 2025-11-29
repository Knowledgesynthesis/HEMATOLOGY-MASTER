import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function TransfusionReactionSorter() {
  const [values, setValues] = useState({
    timing: '',
    fever: '',
    hypotension: '',
    dyspnea: '',
    jvd: '',
  })
  const [result, setResult] = useState<string | null>(null)

  const sort = () => {
    const { timing, fever, hypotension, dyspnea, jvd } = values

    let interpretation = 'TRANSFUSION REACTION ANALYSIS:\n\n'

    if (timing === 'immediate' && fever === 'yes' && hypotension === 'yes') {
      interpretation += '→ ACUTE HEMOLYTIC TRANSFUSION REACTION\n\n'
      interpretation += '⚠️ MOST DANGEROUS REACTION\n\n'
      interpretation += 'Features:\n'
      interpretation += '• Onset: Within minutes to hours\n'
      interpretation += '• Fever, chills, rigors\n'
      interpretation += '• Flank/back pain\n'
      interpretation += '• Hypotension, tachycardia\n'
      interpretation += '• Hemoglobinuria (red/brown urine)\n'
      interpretation += '• DIC in severe cases\n\n'
      interpretation += 'Cause: ABO incompatibility (usually clerical error)\n\n'
      interpretation += 'IMMEDIATE ACTION:\n'
      interpretation += '1. STOP transfusion\n'
      interpretation += '2. IV fluids (aggressive)\n'
      interpretation += '3. Maintain urine output\n'
      interpretation += '4. Send blood bank workup\n'
      interpretation += '5. Monitor for DIC'
    } else if (timing === 'immediate' && fever === 'yes' && hypotension === 'no') {
      interpretation += '→ FEBRILE NON-HEMOLYTIC TRANSFUSION REACTION (FNHTR)\n\n'
      interpretation += 'Most common transfusion reaction\n\n'
      interpretation += 'Features:\n'
      interpretation += '• Fever, chills\n'
      interpretation += '• No hemolysis\n'
      interpretation += '• Benign, self-limited\n\n'
      interpretation += 'Cause: Cytokine release or anti-leukocyte antibodies\n\n'
      interpretation += 'Management:\n'
      interpretation += '• Usually can continue transfusion after ruling out hemolysis\n'
      interpretation += '• Acetaminophen\n'
      interpretation += '• Prevention: Leukoreduced products'
    } else if (timing === 'immediate' && fever === 'no' && dyspnea === 'yes' && jvd === 'no') {
      interpretation += '→ TRALI (Transfusion-Related Acute Lung Injury)\n\n'
      interpretation += 'Features:\n'
      interpretation += '• Onset: Within 6 hours\n'
      interpretation += '• Acute hypoxemia\n'
      interpretation += '• Bilateral pulmonary infiltrates\n'
      interpretation += '• NO volume overload (no JVD)\n'
      interpretation += '• Fever, hypotension common\n\n'
      interpretation += 'Cause: Donor anti-leukocyte antibodies → neutrophil activation\n\n'
      interpretation += 'Management:\n'
      interpretation += '• Supportive care\n'
      interpretation += '• Oxygen, mechanical ventilation if needed\n'
      interpretation += '• Typically resolves in 48-96 hours'
    } else if (timing === 'immediate' && fever === 'no' && dyspnea === 'yes' && jvd === 'yes') {
      interpretation += '→ TACO (Transfusion-Associated Circulatory Overload)\n\n'
      interpretation += 'Features:\n'
      interpretation += '• Dyspnea, orthopnea\n'
      interpretation += '• HYPERTENSION (vs TRALI hypotension)\n'
      interpretation += '• JVD, peripheral edema\n'
      interpretation += '• Pulmonary edema\n'
      interpretation += '• ↑BNP\n\n'
      interpretation += 'Cause: Volume overload (too much/too fast)\n\n'
      interpretation += 'Risk Factors: Heart failure, renal failure, elderly\n\n'
      interpretation += 'Management:\n'
      interpretation += '• Diuretics\n'
      interpretation += '• Upright positioning\n'
      interpretation += '• Slow transfusion rate in future'
    } else if (timing === 'immediate' && fever === 'no') {
      interpretation += '→ ALLERGIC REACTION\n\n'
      interpretation += 'Features:\n'
      interpretation += '• Mild: Urticaria, itching (most common)\n'
      interpretation += '• Severe: Anaphylaxis (rare)\n'
      interpretation += '  - Bronchospasm\n'
      interpretation += '  - Hypotension\n'
      interpretation += '  - Angioedema\n\n'
      interpretation += 'Cause: Antibodies to donor plasma proteins\n\n'
      interpretation += 'Management:\n'
      interpretation += '• Mild: Antihistamines\n'
      interpretation += '• Severe: Epinephrine, stop transfusion'
    } else if (timing === 'delayed') {
      interpretation += '→ DELAYED HEMOLYTIC TRANSFUSION REACTION\n\n'
      interpretation += 'Features:\n'
      interpretation += '• Onset: 3-10 days post-transfusion\n'
      interpretation += '• Fever, jaundice\n'
      interpretation += '• Falling hemoglobin\n'
      interpretation += '• Usually mild, not life-threatening\n\n'
      interpretation += 'Cause: Anamnestic response\n'
      interpretation += '(Antibody levels were too low to detect initially, then rise)\n\n'
      interpretation += 'Management: Usually self-limited'
    } else {
      interpretation += 'Please select values to analyze transfusion reaction pattern.\n\n'
      interpretation += 'Key Discriminators:\n'
      interpretation += '• Timing: Immediate (<6h) vs Delayed (days)\n'
      interpretation += '• Hypotension: Think hemolytic or TRALI\n'
      interpretation += '• Hypertension + JVD: Think TACO\n'
      interpretation += '• Fever + hemolysis: Think acute hemolytic\n'
      interpretation += '• Fever alone: Think FNHTR\n'
      interpretation += '• Urticaria: Think allergic'
    }

    setResult(interpretation)
  }

  const reset = () => {
    setValues({ timing: '', fever: '', hypotension: '', dyspnea: '', jvd: '' })
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
          <h1 className="text-3xl font-bold tracking-tight">Transfusion Reaction Sorter</h1>
          <p className="text-muted-foreground mt-1">Identify transfusion reaction types</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Clinical Presentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Timing of Symptoms</label>
              <select
                value={values.timing}
                onChange={(e) => setValues({ ...values, timing: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="immediate">Immediate (within 6 hours)</option>
                <option value="delayed">Delayed (3-10 days)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Fever Present?</label>
              <select
                value={values.fever}
                onChange={(e) => setValues({ ...values, fever: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Hypotension?</label>
              <select
                value={values.hypotension}
                onChange={(e) => setValues({ ...values, hypotension: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="yes">Yes (low BP)</option>
                <option value="no">No / Hypertension (high BP)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Dyspnea/Respiratory Distress?</label>
              <select
                value={values.dyspnea}
                onChange={(e) => setValues({ ...values, dyspnea: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">JVD (Jugular Venous Distension)?</label>
              <select
                value={values.jvd}
                onChange={(e) => setValues({ ...values, jvd: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Select...</option>
                <option value="yes">Yes (volume overload)</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={sort}>Identify Reaction</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Reaction Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md font-mono">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
