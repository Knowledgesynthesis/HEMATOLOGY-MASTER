import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Foundations() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prerequisite Physiology</h1>
          <p className="text-muted-foreground mt-1">
            Essential foundations for understanding hematology
          </p>
        </div>
      </div>

      {/* Hematopoiesis */}
      <Card>
        <CardHeader>
          <CardTitle>Hematopoiesis</CardTitle>
          <CardDescription>The formation and development of blood cells</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="text-sm text-muted-foreground">
              Hematopoiesis is the continuous process of blood cell production from hematopoietic stem cells (HSCs)
              in the bone marrow. All blood cells originate from multipotent HSCs that differentiate into:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1 ml-4">
              <li><strong>Myeloid lineage:</strong> RBCs, platelets, granulocytes, monocytes</li>
              <li><strong>Lymphoid lineage:</strong> T cells, B cells, NK cells</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Key Points</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Normal production: ~200 billion RBCs and 100 billion WBCs daily</li>
              <li>Regulation: Growth factors (EPO for RBCs, G-CSF for neutrophils, TPO for platelets)</li>
              <li>Location: Primarily bone marrow (adults); liver/spleen (fetal development)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* CBC Components */}
      <Card>
        <CardHeader>
          <CardTitle>CBC Components</CardTitle>
          <CardDescription>Understanding the complete blood count</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Key Parameters</h3>
            <div className="space-y-3 text-sm">
              <div className="border-l-2 border-primary pl-3">
                <strong>Hemoglobin (Hgb):</strong> Oxygen-carrying protein in RBCs
                <br />
                <span className="text-muted-foreground">Normal: 13.5-17.5 g/dL (M), 12-16 g/dL (F)</span>
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Hematocrit (Hct):</strong> Percentage of blood volume occupied by RBCs
                <br />
                <span className="text-muted-foreground">Normal: 38-50% (M), 36-44% (F)</span>
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>White Blood Cell Count (WBC):</strong> Total leukocytes
                <br />
                <span className="text-muted-foreground">Normal: 4,500-11,000 cells/μL</span>
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Platelet Count:</strong> Thrombocytes for hemostasis
                <br />
                <span className="text-muted-foreground">Normal: 150,000-400,000 cells/μL</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RBC Indices */}
      <Card>
        <CardHeader>
          <CardTitle>RBC Indices</CardTitle>
          <CardDescription>Critical for anemia classification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-red-500 pl-3">
              <strong>MCV (Mean Corpuscular Volume):</strong> Average RBC size
              <br />
              <span className="text-muted-foreground">Normal: 80-100 fL</span>
              <br />
              <span className="text-muted-foreground">
                Low (&lt;80) = Microcytic | High (&gt;100) = Macrocytic
              </span>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>MCH (Mean Corpuscular Hemoglobin):</strong> Average Hgb per RBC
              <br />
              <span className="text-muted-foreground">Normal: 27-31 pg</span>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>MCHC (Mean Corpuscular Hemoglobin Concentration):</strong> Hgb concentration in RBCs
              <br />
              <span className="text-muted-foreground">Normal: 32-36 g/dL</span>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>RDW (Red Cell Distribution Width):</strong> Variation in RBC size
              <br />
              <span className="text-muted-foreground">High RDW suggests mixed populations (e.g., nutritional deficiencies)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reticulocyte Count */}
      <Card>
        <CardHeader>
          <CardTitle>Reticulocyte Count</CardTitle>
          <CardDescription>The marrow's response indicator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Reticulocytes are immature RBCs recently released from the marrow. They tell you if the marrow is trying.
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-muted p-3 rounded">
              <strong>Normal:</strong> 0.5-2% of total RBCs
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded">
              <strong className="text-green-600 dark:text-green-400">High (↑ Retic):</strong> Marrow is responding
              <br />
              <span className="text-muted-foreground">
                Suggests: Hemolysis, acute blood loss, response to treatment
              </span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded">
              <strong className="text-red-600 dark:text-red-400">Low (↓ Retic):</strong> Marrow is not responding
              <br />
              <span className="text-muted-foreground">
                Suggests: Production problem (aplasia, nutritional deficiency, CKD)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Iron Physiology */}
      <Card>
        <CardHeader>
          <CardTitle>Iron Physiology</CardTitle>
          <CardDescription>Essential for oxygen transport</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Iron Cycle</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Absorbed in duodenum (2-3 mg/day)</li>
              <li>Transported by transferrin in blood</li>
              <li>Stored as ferritin (liver, spleen, bone marrow)</li>
              <li>Recycled from old RBCs by macrophages</li>
              <li>Lost through GI, menstruation (~1-2 mg/day)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Key Regulation</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Hepcidin:</strong> Master regulator produced by liver. High hepcidin blocks iron absorption
              (seen in inflammation → anemia of chronic disease).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Basic Coagulation */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Coagulation Pathways</CardTitle>
          <CardDescription>Introduction to hemostasis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Two Pathways (In Vitro)</h3>
            <div className="space-y-2 text-sm">
              <div className="border-l-2 border-blue-500 pl-3">
                <strong>Intrinsic Pathway:</strong> Measured by PTT
                <br />
                <span className="text-muted-foreground">Factors: XII, XI, IX, VIII</span>
              </div>
              <div className="border-l-2 border-orange-500 pl-3">
                <strong>Extrinsic Pathway:</strong> Measured by PT
                <br />
                <span className="text-muted-foreground">Factors: VII, Tissue Factor</span>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <strong>Common Pathway:</strong> Final steps
                <br />
                <span className="text-muted-foreground">Factors: X, V, II (prothrombin), I (fibrinogen)</span>
              </div>
            </div>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Clinical Note:</strong> In vivo, all coagulation is initiated by tissue factor (extrinsic pathway).
            The intrinsic pathway amplifies the response.
          </div>
        </CardContent>
      </Card>

      {/* Platelet Activation */}
      <Card>
        <CardHeader>
          <CardTitle>Platelet Activation Basics</CardTitle>
          <CardDescription>Primary hemostasis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Steps of Platelet Plug Formation</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 ml-4">
              <li>
                <strong>Adhesion:</strong> Platelets bind to exposed collagen via vWF
              </li>
              <li>
                <strong>Activation:</strong> Release of ADP, thromboxane A2 → recruit more platelets
              </li>
              <li>
                <strong>Aggregation:</strong> Platelets bind to each other via fibrinogen bridges
              </li>
            </ol>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Concept:</strong> vWF (von Willebrand factor) is essential for platelet adhesion to damaged
            endothelium. Deficiency → bleeding disorder.
          </div>
        </CardContent>
      </Card>

      {/* Hemoglobin Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Hemoglobin Structure & O₂ Affinity</CardTitle>
          <CardDescription>Understanding oxygen delivery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Hemoglobin Types</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>HbA (α2β2):</strong> Normal adult hemoglobin (~95-98%)</li>
              <li><strong>HbA2 (α2δ2):</strong> Minor adult form (~2-3%)</li>
              <li><strong>HbF (α2γ2):</strong> Fetal hemoglobin (higher O₂ affinity)</li>
              <li><strong>HbS:</strong> Sickle hemoglobin (β-chain mutation)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Oxygen-Hemoglobin Dissociation Curve</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sigmoidal curve showing relationship between PO₂ and Hgb saturation.
            </p>
            <div className="space-y-1 text-sm">
              <div className="text-muted-foreground">
                <strong>Right shift</strong> (decreased affinity, easier O₂ release): 2,3-DPG ↑, acidosis, fever, CO₂ ↑
              </div>
              <div className="text-muted-foreground">
                <strong>Left shift</strong> (increased affinity, harder O₂ release): Fetal Hgb, CO poisoning, alkalosis
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
