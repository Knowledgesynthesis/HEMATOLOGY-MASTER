import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Hemoglobinopathies() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hemoglobinopathies</h1>
          <p className="text-muted-foreground mt-1">
            Sickle cell disease, thalassemias, and electrophoresis interpretation
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Hemoglobinopathy Overview</CardTitle>
          <CardDescription>Genetic disorders of hemoglobin structure or production</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Two Main Categories</h3>
            <div className="space-y-2 text-sm">
              <div className="border-l-2 border-red-500 pl-3">
                <strong>Qualitative (Structure defects):</strong> Abnormal hemoglobin structure
                <br />
                <span className="text-muted-foreground">Examples: Sickle cell disease, HbC, HbE</span>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <strong>Quantitative (Production defects):</strong> Decreased globin chain synthesis
                <br />
                <span className="text-muted-foreground">Examples: Thalassemias (α, β)</span>
              </div>
            </div>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Remember:</strong> Normal adult hemoglobin is HbA (α2β2). Most hemoglobinopathies affect β-chains
            because α-chains are needed for both fetal and adult hemoglobin.
          </div>
        </CardContent>
      </Card>

      {/* Sickle Cell Disease */}
      <Card>
        <CardHeader>
          <CardTitle>Sickle Cell Disease (SCD)</CardTitle>
          <CardDescription>HbS (β-globin mutation) causes RBC sickling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Genetics & Pathophysiology</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Mutation:</strong> Glutamic acid → Valine at position 6 of β-globin</li>
              <li>HbS polymerizes when deoxygenated → RBC sickling</li>
              <li>Sickled cells: Rigid, fragile → hemolysis and vaso-occlusion</li>
              <li>Autosomal recessive (HbSS = disease, HbAS = trait)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Clinical Manifestations</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">Vaso-Occlusive Crisis (VOC)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common complication</li>
                  <li>Severe pain (bones, chest, abdomen)</li>
                  <li>Triggers: Infection, dehydration, cold, hypoxia, stress</li>
                  <li>Treatment: Hydration, oxygen, analgesia</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">Acute Chest Syndrome</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Fever, chest pain, hypoxia, pulmonary infiltrate</li>
                  <li>Leading cause of death in adults with SCD</li>
                  <li>Can be triggered by VOC, infection, fat embolism</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">Splenic Sequestration</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Acute spleen enlargement with pooling of RBCs</li>
                  <li>Severe anemia, shock</li>
                  <li>More common in children (adults have autosplenectomy)</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">Aplastic Crisis</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Parvovirus B19 infection → temporary halt in RBC production</li>
                  <li>Severe anemia with low reticulocyte count</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Chronic Complications</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Functional asplenia:</strong> Repeated infarcts → increased infection risk (encapsulated organisms)</li>
              <li>Avascular necrosis (femoral head)</li>
              <li>Chronic kidney disease</li>
              <li>Pulmonary hypertension</li>
              <li>Stroke (especially children)</li>
              <li>Leg ulcers</li>
              <li>Chronic hemolytic anemia</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Lab Findings</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Hemolytic anemia (↑retic, ↑bili, ↓haptoglobin)</li>
              <li>Sickled cells on smear</li>
              <li>Target cells, Howell-Jolly bodies (asplenia)</li>
              <li>Hemoglobin electrophoresis: HbSS (no HbA), HbAS (trait has both)</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded text-sm">
            <strong>Treatment:</strong> Hydroxyurea (increases HbF production), chronic transfusions, bone marrow
            transplant (curative). Prophylactic penicillin and vaccinations (asplenia).
          </div>
        </CardContent>
      </Card>

      {/* Sickle Cell Trait */}
      <Card>
        <CardHeader>
          <CardTitle>Sickle Cell Trait (HbAS)</CardTitle>
          <CardDescription>Heterozygous carrier state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Key Points</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Asymptomatic under normal conditions</li>
              <li>~40% HbS, ~60% HbA on electrophoresis</li>
              <li>Protective against severe malaria (evolutionary advantage)</li>
              <li>Rarely: Complications under extreme hypoxia (high altitude, severe dehydration)</li>
              <li>Hematuria, renal papillary necrosis possible</li>
            </ul>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Counseling:</strong> No treatment needed, but genetic counseling important (two carriers can have
            child with SCD).
          </div>
        </CardContent>
      </Card>

      {/* Thalassemias */}
      <Card>
        <CardHeader>
          <CardTitle>Thalassemias</CardTitle>
          <CardDescription>Decreased globin chain production</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Concept:</strong> Imbalanced globin chain production → ineffective erythropoiesis and hemolysis
          </div>

          {/* β-Thalassemia */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">β-Thalassemia</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Genetics:</strong>
                <p className="text-muted-foreground mt-1">
                  Mutations in β-globin gene (chromosome 11). Two genes (one from each parent).
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded">
                <strong className="text-blue-600 dark:text-blue-400">β-Thalassemia Minor (Trait)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>One gene affected</li>
                  <li>Mild microcytic anemia (often asymptomatic)</li>
                  <li>MCV often &lt;75 despite mild anemia</li>
                  <li>↑HbA2 on electrophoresis (&gt;3.5%) - diagnostic</li>
                  <li>Often mistaken for iron deficiency</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 p-3 rounded">
                <strong className="text-blue-600 dark:text-blue-400">β-Thalassemia Major (Cooley Anemia)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Both genes affected</li>
                  <li>Severe anemia presenting in infancy</li>
                  <li>Massive hepatosplenomegaly, bone deformities ("chipmunk facies")</li>
                  <li>Requires chronic transfusions → iron overload</li>
                  <li>↑HbF, absent/low HbA</li>
                </ul>
              </div>
            </div>
          </div>

          {/* α-Thalassemia */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-2">α-Thalassemia</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Genetics:</strong>
                <p className="text-muted-foreground mt-1">
                  Four α-globin genes (two on each chromosome 16). Severity depends on number of deleted genes.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground">
                  <strong>1 gene deletion:</strong> Silent carrier (asymptomatic)
                </div>
                <div className="text-muted-foreground">
                  <strong>2 gene deletions:</strong> α-thalassemia trait (mild microcytic anemia)
                </div>
                <div className="text-muted-foreground">
                  <strong>3 gene deletions:</strong> HbH disease (moderate hemolytic anemia, HbH on electrophoresis)
                </div>
                <div className="text-muted-foreground">
                  <strong>4 gene deletions:</strong> Hydrops fetalis (incompatible with life, stillborn)
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Thalassemia vs Iron Deficiency</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Feature</th>
                    <th className="text-left p-2">Thalassemia</th>
                    <th className="text-left p-2">Iron Deficiency</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-2">MCV</td>
                    <td className="p-2">Very low (&lt;75)</td>
                    <td className="p-2">Low</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">RBC count</td>
                    <td className="p-2">Normal/High</td>
                    <td className="p-2">Low</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">RDW</td>
                    <td className="p-2">Normal</td>
                    <td className="p-2">High</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Ferritin</td>
                    <td className="p-2">Normal/High</td>
                    <td className="p-2">Low</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Smear</td>
                    <td className="p-2">Target cells</td>
                    <td className="p-2">Pencil cells, hypochromia</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hemoglobin Electrophoresis */}
      <Card>
        <CardHeader>
          <CardTitle>Hemoglobin Electrophoresis Interpretation</CardTitle>
          <CardDescription>Key patterns to recognize</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="border p-3 rounded">
              <strong>Normal Adult:</strong>
              <p className="text-muted-foreground">HbA ~95-98%, HbA2 ~2-3%, HbF &lt;1%</p>
            </div>
            <div className="border p-3 rounded">
              <strong>Sickle Cell Disease (HbSS):</strong>
              <p className="text-muted-foreground">HbS 80-90%, HbF 5-15%, No HbA</p>
            </div>
            <div className="border p-3 rounded">
              <strong>Sickle Cell Trait (HbAS):</strong>
              <p className="text-muted-foreground">HbA ~60%, HbS ~40%</p>
            </div>
            <div className="border p-3 rounded">
              <strong>β-Thalassemia Minor:</strong>
              <p className="text-muted-foreground">↑HbA2 (&gt;3.5%), slight ↑HbF</p>
            </div>
            <div className="border p-3 rounded">
              <strong>β-Thalassemia Major:</strong>
              <p className="text-muted-foreground">↑↑HbF (70-90%), Absent/very low HbA, ↑HbA2</p>
            </div>
            <div className="border p-3 rounded">
              <strong>HbH Disease (α-thal):</strong>
              <p className="text-muted-foreground">HbH present (β4 tetramers)</p>
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
