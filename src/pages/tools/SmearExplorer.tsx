import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function SmearExplorer() {
  const smearFindings = [
    {
      name: 'Target Cells',
      associations: ['Thalassemia', 'Liver disease', 'HbC disease', 'Post-splenectomy'],
      description: 'Central dark area with surrounding pale ring'
    },
    {
      name: 'Schistocytes (Helmet Cells)',
      associations: ['TTP/HUS', 'DIC', 'Mechanical heart valves', 'HELLP syndrome'],
      description: 'Fragmented RBCs - microangiopathic hemolysis'
    },
    {
      name: 'Spherocytes',
      associations: ['Hereditary spherocytosis', 'Warm autoimmune hemolytic anemia', 'Transfusion reaction'],
      description: 'Small, round RBCs without central pallor'
    },
    {
      name: 'Bite Cells & Heinz Bodies',
      associations: ['G6PD deficiency'],
      description: 'Oxidative damage - precipitated hemoglobin removed by spleen'
    },
    {
      name: 'Teardrop Cells',
      associations: ['Myelofibrosis', 'Thalassemia major', 'Severe marrow infiltration'],
      description: 'RBCs deformed passing through fibrotic marrow'
    },
    {
      name: 'Basophilic Stippling',
      associations: ['Thalassemia', 'Lead poisoning', 'Sideroblastic anemia'],
      description: 'Small blue dots throughout RBC (ribosomal RNA)'
    },
    {
      name: 'Howell-Jolly Bodies',
      associations: ['Post-splenectomy', 'Functional asplenia (sickle cell)'],
      description: 'Nuclear remnants normally removed by spleen'
    },
    {
      name: 'Rouleaux Formation',
      associations: ['Multiple myeloma', 'Hypergammaglobulinemia'],
      description: 'RBCs stacked like coins due to high protein'
    },
    {
      name: 'Sickle Cells',
      associations: ['Sickle cell disease'],
      description: 'Crescent-shaped RBCs from HbS polymerization'
    },
    {
      name: 'Auer Rods',
      associations: ['Acute myeloid leukemia (AML)'],
      description: 'Needle-like inclusions in myeloblasts - pathognomonic for AML'
    },
    {
      name: 'Smudge Cells',
      associations: ['Chronic lymphocytic leukemia (CLL)'],
      description: 'Fragile lymphocytes ruptured during smear preparation'
    },
    {
      name: 'Hypersegmented Neutrophils',
      associations: ['B12/Folate deficiency (megaloblastic anemia)'],
      description: 'Neutrophil nucleus with ≥6 lobes'
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smear Explorer</h1>
          <p className="text-muted-foreground mt-1">
            Morphology recognition guide
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Peripheral Blood Smear Findings</CardTitle>
          <CardDescription>
            Pattern recognition for common smear abnormalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smearFindings.map((finding, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold text-lg">{finding.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{finding.description}</p>
                <div className="mt-2">
                  <strong className="text-sm">Associated Conditions:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {finding.associations.map((assoc, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 text-xs bg-primary/10 rounded"
                      >
                        {assoc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/50">
        <CardHeader>
          <CardTitle>Clinical Pearl</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="mb-2"><strong>Schistocytes =</strong> Microangiopathic hemolysis until proven otherwise</p>
          <p className="mb-2"><strong>Auer rods =</strong> Pathognomonic for AML</p>
          <p className="mb-2"><strong>Smudge cells =</strong> Think CLL</p>
          <p><strong>Target cells =</strong> Think thalassemia or liver disease</p>
        </CardContent>
      </Card>
    </div>
  )
}
