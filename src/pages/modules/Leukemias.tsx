import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Leukemias() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leukemias & WBC Disorders</h1>
          <p className="text-muted-foreground mt-1">
            Acute and chronic leukemias, MDS, MPN, and benign patterns
          </p>
        </div>
      </div>

      {/* Benign WBC Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Benign WBC Patterns</CardTitle>
          <CardDescription>Reactive vs malignant leukocytosis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Neutrophilia (Increased Neutrophils)</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Infection:</strong> Bacterial, fungal</li>
              <li><strong>Inflammation:</strong> Tissue necrosis, autoimmune</li>
              <li><strong>Stress:</strong> Surgery, trauma, medications (steroids, G-CSF)</li>
              <li><strong>Smoking</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Left Shift</h3>
            <p className="text-sm text-muted-foreground">
              Increased immature neutrophils (bands) in response to infection or stress. Marrow releasing young cells.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Toxic Granulation</h3>
            <p className="text-sm text-muted-foreground">
              Dark, coarse granules in neutrophils. Seen in severe infection/sepsis. Benign reactive finding.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Lymphocytosis</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Viral infections:</strong> EBV, CMV, viral hepatitis (reactive/atypical lymphocytes)</li>
              <li><strong>Pertussis</strong> (whooping cough)</li>
              <li><strong>Chronic infection</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Acute Leukemias */}
      <Card>
        <CardHeader>
          <CardTitle>Acute Leukemias</CardTitle>
          <CardDescription>Rapidly progressive, &gt;20% blasts in marrow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Definition:</strong> ≥20% blasts in bone marrow or peripheral blood
          </div>

          {/* AML */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold mb-2">Acute Myeloid Leukemia (AML)</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Median age: ~65 years (adults)</li>
                  <li>Myeloblasts on smear</li>
                  <li><strong>Auer rods:</strong> Pathognomonic for AML (needle-like inclusions in blasts)</li>
                  <li>Positive: Myeloperoxidase (MPO), CD13, CD33</li>
                </ul>
              </div>
              <div>
                <strong>Presentation:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Fatigue, infections, bleeding (pancytopenia)</li>
                  <li>Gingival hypertrophy (monocytic subtypes)</li>
                  <li>Leukostasis if very high WBC</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-2 rounded">
                <strong className="text-red-600 dark:text-red-400">Emergency: APL (Acute Promyelocytic Leukemia)</strong>
                <p className="text-muted-foreground text-xs mt-1">
                  t(15;17) translocation. High risk of DIC. Treat immediately with ATRA.
                </p>
              </div>
            </div>
          </div>

          {/* ALL */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2">Acute Lymphoblastic Leukemia (ALL)</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common childhood malignancy (peak age 2-5 years)</li>
                  <li>Lymphoblasts on smear (smaller than myeloblasts, scant cytoplasm)</li>
                  <li>Positive: TdT (terminal deoxynucleotidyl transferase), CD10</li>
                  <li>B-ALL (80%) vs T-ALL (20%)</li>
                </ul>
              </div>
              <div>
                <strong>Presentation:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Fatigue, infections, bleeding, bone pain</li>
                  <li>Lymphadenopathy, hepatosplenomegaly</li>
                  <li>CNS involvement possible (T-ALL more common)</li>
                  <li>Mediastinal mass (T-ALL)</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 p-2 rounded">
                <strong className="text-purple-600 dark:text-purple-400">Favorable Prognostic Factors:</strong>
                <p className="text-muted-foreground text-xs mt-1">
                  Age 1-10 years, low WBC at presentation, hyperdiploidy, t(12;21)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chronic Leukemias */}
      <Card>
        <CardHeader>
          <CardTitle>Chronic Leukemias</CardTitle>
          <CardDescription>Mature cells, slower progression</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* CML */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-2">Chronic Myeloid Leukemia (CML)</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Hallmark:</strong>
                <p className="text-muted-foreground mt-1">
                  <strong>Philadelphia chromosome:</strong> t(9;22) → BCR-ABL fusion gene
                </p>
              </div>
              <div>
                <strong>CBC Pattern:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Marked leukocytosis (often &gt;100,000)</li>
                  <li><strong>Basophilia</strong> (key clue)</li>
                  <li>Full myeloid maturation spectrum (blasts to mature neutrophils)</li>
                  <li>Thrombocytosis common</li>
                </ul>
              </div>
              <div>
                <strong>Phases:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li><strong>Chronic phase:</strong> Asymptomatic or mild symptoms, responsive to therapy</li>
                  <li><strong>Accelerated phase:</strong> Increasing blasts, worsening symptoms</li>
                  <li><strong>Blast crisis:</strong> ≥20% blasts, acts like acute leukemia</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CLL */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Chronic Lymphocytic Leukemia (CLL)</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common adult leukemia in Western countries</li>
                  <li>Median age: ~70 years</li>
                  <li>Mature-appearing lymphocytes</li>
                  <li><strong>Smudge cells:</strong> Fragile lymphocytes破 during smear preparation (highly suggestive)</li>
                </ul>
              </div>
              <div>
                <strong>Presentation:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Often asymptomatic, found incidentally</li>
                  <li>Lymphocytosis (absolute lymphocyte count &gt;5,000)</li>
                  <li>Lymphadenopathy, hepatosplenomegaly</li>
                  <li>Autoimmune hemolytic anemia (warm AIHA)</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 p-2 rounded">
                <strong className="text-blue-600 dark:text-blue-400">Watch and Wait:</strong>
                <p className="text-muted-foreground text-xs mt-1">
                  Many patients with early-stage CLL require no immediate treatment, just monitoring.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MDS & MPN */}
      <Card>
        <CardHeader>
          <CardTitle>Myelodysplastic Syndrome (MDS) & Myeloproliferative Neoplasms (MPN)</CardTitle>
          <CardDescription>Clonal disorders of hematopoietic stem cells</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* MDS */}
          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="font-semibold mb-2">Myelodysplastic Syndrome (MDS)</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Key Concept:</strong>
                <p className="text-muted-foreground mt-1">
                  Ineffective hematopoiesis → cytopenias + dysplasia. Pre-leukemic condition (can transform to AML).
                </p>
              </div>
              <div>
                <strong>Features:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Cytopenias (anemia most common)</li>
                  <li>Macrocytic anemia often present</li>
                  <li>Dysplastic cells in marrow (abnormal maturation)</li>
                  <li>&lt;20% blasts (otherwise it's AML)</li>
                  <li>Risk factors: Age &gt;60, prior chemo/radiation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* MPN */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-2">Myeloproliferative Neoplasms (MPN)</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-green-500/10 p-2 rounded">
                <strong className="text-green-600 dark:text-green-400">Polycythemia Vera (PV)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>↑↑ RBC mass (high Hgb/Hct)</li>
                  <li>JAK2 mutation (~95%)</li>
                  <li>Symptoms: Headache, pruritus (after shower), erythromelalgia, thrombosis</li>
                </ul>
              </div>
              <div className="bg-green-500/10 p-2 rounded">
                <strong className="text-green-600 dark:text-green-400">Essential Thrombocythemia (ET)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>↑↑ Platelets (often &gt;450,000)</li>
                  <li>JAK2 or CALR mutations</li>
                  <li>Risk: Thrombosis and paradoxical bleeding</li>
                </ul>
              </div>
              <div className="bg-green-500/10 p-2 rounded">
                <strong className="text-green-600 dark:text-green-400">Primary Myelofibrosis (MF)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Marrow fibrosis → extramedullary hematopoiesis</li>
                  <li>Massive splenomegaly</li>
                  <li>Teardrop cells, leukoerythroblastic smear</li>
                  <li>JAK2, CALR, or MPL mutations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
