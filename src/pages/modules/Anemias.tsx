import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Anemias() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Anemias</h1>
          <p className="text-muted-foreground mt-1">
            Master framework for understanding and classifying anemias
          </p>
        </div>
      </div>

      {/* Classification by MCV */}
      <Card>
        <CardHeader>
          <CardTitle>Classification by MCV</CardTitle>
          <CardDescription>The primary approach to anemia workup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Framework:</strong> Start with MCV (Mean Corpuscular Volume) to categorize anemia, then narrow
            down with additional tests.
          </div>

          {/* Microcytic */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold mb-2">Microcytic Anemia (MCV &lt; 80 fL)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Mnemonic: TAILS</strong>
            </p>
            <div className="space-y-3 text-sm">
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">T - Thalassemia</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>α-thalassemia: 4 α-gene deletions spectrum</li>
                  <li>β-thalassemia: β-gene mutations, ↑HbA2</li>
                  <li>Low MCV often out of proportion to anemia</li>
                  <li>Target cells on smear</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">A - Anemia of Chronic Disease</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Usually normocytic, can be microcytic</li>
                  <li>↑Hepcidin blocks iron absorption</li>
                  <li>Low Fe, Low TIBC, Normal/High ferritin</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">I - Iron Deficiency Anemia (IDA)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common anemia worldwide</li>
                  <li>Low Fe, High TIBC, Low ferritin</li>
                  <li>Causes: blood loss (GI, menstrual), poor intake, malabsorption</li>
                  <li>Smear: microcytosis, hypochromia, pencil cells</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">L - Lead Poisoning</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Basophilic stippling on smear</li>
                  <li>Inhibits heme synthesis enzymes</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded">
                <strong className="text-red-600 dark:text-red-400">S - Sideroblastic Anemia</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Iron gets stuck in mitochondria</li>
                  <li>Ring sideroblasts on marrow stain</li>
                  <li>Causes: congenital, alcohol, drugs (INH), MDS</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Normocytic */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold mb-2">Normocytic Anemia (MCV 80-100 fL)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Check reticulocyte count to differentiate production vs destruction
            </p>
            <div className="space-y-3 text-sm">
              <div className="bg-green-500/10 p-3 rounded border border-green-500/20">
                <strong className="text-green-600 dark:text-green-400">High Reticulocyte Count (↑ Production)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Acute blood loss</li>
                  <li>Hemolysis (see hemolysis section below)</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
                <strong className="text-red-600 dark:text-red-400">Low Reticulocyte Count (↓ Production)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Anemia of chronic disease (ACD)</li>
                  <li>Chronic kidney disease (↓EPO)</li>
                  <li>Aplastic anemia / marrow failure</li>
                  <li>Pure red cell aplasia</li>
                  <li>Early iron deficiency (before microcytosis develops)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Macrocytic */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Macrocytic Anemia (MCV &gt; 100 fL)</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-500/10 p-3 rounded">
                <strong className="text-blue-600 dark:text-blue-400">Megaloblastic (DNA synthesis defect)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li><strong>B12 deficiency:</strong> Pernicious anemia, vegan diet, malabsorption</li>
                  <li><strong>Folate deficiency:</strong> Poor intake, alcoholism, drugs (methotrexate)</li>
                  <li>Smear: Hypersegmented neutrophils (≥6 lobes), macro-ovalocytes</li>
                  <li>Pancytopenia can occur</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 p-3 rounded">
                <strong className="text-blue-600 dark:text-blue-400">Non-Megaloblastic</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Alcohol (direct marrow toxicity)</li>
                  <li>Liver disease</li>
                  <li>Hypothyroidism</li>
                  <li>Myelodysplastic syndrome (MDS)</li>
                  <li>Drugs: Zidovudine, hydroxyurea</li>
                  <li>Reticulocytosis (large young RBCs)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hemolytic vs Non-Hemolytic */}
      <Card>
        <CardHeader>
          <CardTitle>Hemolytic vs Non-Hemolytic Anemia</CardTitle>
          <CardDescription>Key lab markers for hemolysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Classic Hemolysis Pattern:</strong> ↑LDH, ↓Haptoglobin, ↑Indirect (unconjugated) bilirubin,
            ↑Reticulocyte count
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Hemolysis Lab Markers</h3>
              <div className="space-y-2">
                <div className="border-l-2 border-primary pl-3">
                  <strong>LDH (Lactate Dehydrogenase):</strong> Released from lysed RBCs → High
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <strong>Haptoglobin:</strong> Binds free hemoglobin → Low (consumed)
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <strong>Indirect Bilirubin:</strong> From heme breakdown → High
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <strong>Reticulocyte Count:</strong> Marrow response → High
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Direct Antiglobulin Test (DAT / Coombs)</h3>
              <div className="space-y-2">
                <div className="bg-green-500/10 p-2 rounded">
                  <strong className="text-green-600 dark:text-green-400">DAT Positive:</strong> Immune-mediated hemolysis
                  <br />
                  <span className="text-muted-foreground text-xs">
                    Warm AIHA, cold agglutinin disease, drug-induced, transfusion reaction
                  </span>
                </div>
                <div className="bg-orange-500/10 p-2 rounded">
                  <strong className="text-orange-600 dark:text-orange-400">DAT Negative:</strong> Non-immune hemolysis
                  <br />
                  <span className="text-muted-foreground text-xs">
                    Hereditary spherocytosis, G6PD deficiency, PNH, TTP/HUS, mechanical (valve, MAHA)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Intravascular vs Extravascular Hemolysis</h3>
              <div className="space-y-2">
                <div className="bg-red-500/10 p-2 rounded">
                  <strong className="text-red-600 dark:text-red-400">Intravascular (in blood vessels):</strong>
                  <br />
                  <span className="text-muted-foreground text-xs">
                    Hemoglobinuria, hemoglobinemia. Causes: Transfusion reaction, PNH, G6PD crisis, mechanical
                  </span>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded">
                  <strong className="text-yellow-600 dark:text-yellow-400">Extravascular (spleen/liver):</strong>
                  <br />
                  <span className="text-muted-foreground text-xs">
                    Jaundice, splenomegaly. Causes: Hereditary spherocytosis, warm AIHA, sickle cell
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smear Pattern Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Smear Pattern Gallery</CardTitle>
          <CardDescription>Recognizing key RBC morphologies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border p-3 rounded">
              <strong className="text-sm">Target Cells</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Thalassemia, liver disease, HbC, post-splenectomy
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Schistocytes (Helmet Cells)</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Microangiopathic hemolysis: TTP/HUS, DIC, mechanical valves, HELLP
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Spherocytes</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Hereditary spherocytosis, warm AIHA, transfusion reaction
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Bite Cells & Heinz Bodies</strong>
              <p className="text-xs text-muted-foreground mt-1">
                G6PD deficiency (oxidative stress)
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Teardrop Cells</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Myelofibrosis, thalassemia major, severe marrow infiltration
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Basophilic Stippling</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Thalassemia, lead poisoning, sideroblastic anemia
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Howell-Jolly Bodies</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Post-splenectomy, functional asplenia (sickle cell)
              </p>
            </div>
            <div className="border p-3 rounded">
              <strong className="text-sm">Rouleaux Formation</strong>
              <p className="text-xs text-muted-foreground mt-1">
                Multiple myeloma, hypergammaglobulinemia
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Iron Studies Mastery */}
      <Card>
        <CardHeader>
          <CardTitle>Iron Studies Mastery</CardTitle>
          <CardDescription>Interpreting Fe, TIBC, and ferritin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Condition</th>
                  <th className="text-left p-2">Serum Fe</th>
                  <th className="text-left p-2">TIBC</th>
                  <th className="text-left p-2">Ferritin</th>
                  <th className="text-left p-2">Saturation</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-semibold">Iron Deficiency</td>
                  <td className="p-2">↓</td>
                  <td className="p-2">↑</td>
                  <td className="p-2">↓</td>
                  <td className="p-2">↓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Anemia of Chronic Disease</td>
                  <td className="p-2">↓</td>
                  <td className="p-2">↓</td>
                  <td className="p-2">Normal/↑</td>
                  <td className="p-2">↓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Sideroblastic Anemia</td>
                  <td className="p-2">↑</td>
                  <td className="p-2">Normal/↓</td>
                  <td className="p-2">↑</td>
                  <td className="p-2">↑</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Thalassemia</td>
                  <td className="p-2">Normal/↑</td>
                  <td className="p-2">Normal</td>
                  <td className="p-2">Normal/↑</td>
                  <td className="p-2">Normal/↑</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Hemochromatosis</td>
                  <td className="p-2">↑↑</td>
                  <td className="p-2">↓</td>
                  <td className="p-2">↑↑↑</td>
                  <td className="p-2">↑↑</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Differentiator:</strong> TIBC separates IDA (high TIBC) from ACD (low TIBC). Ferritin is an
            acute phase reactant, so it can be falsely normal/elevated in inflammation despite iron deficiency.
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
