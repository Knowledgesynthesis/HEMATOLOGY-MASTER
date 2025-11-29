import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Platelets() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platelets & Thrombocytopenia</h1>
          <p className="text-muted-foreground mt-1">
            Production, destruction, sequestration, and platelet function disorders
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Thrombocytopenia Overview</CardTitle>
          <CardDescription>Platelet count &lt;150,000/μL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Framework: Three Main Mechanisms</strong>
            <ul className="list-decimal list-inside text-muted-foreground mt-2 ml-2 space-y-1">
              <li>Decreased production (marrow problem)</li>
              <li>Increased destruction (immune or non-immune)</li>
              <li>Sequestration (splenomegaly)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bleeding Risk by Platelet Count</h3>
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground">
                <strong>&gt;50,000:</strong> Usually no spontaneous bleeding
              </div>
              <div className="text-muted-foreground">
                <strong>20,000-50,000:</strong> Mild bleeding with trauma/surgery
              </div>
              <div className="text-muted-foreground">
                <strong>&lt;20,000:</strong> Risk of spontaneous bleeding (mucosal, petechiae)
              </div>
              <div className="text-muted-foreground">
                <strong>&lt;10,000:</strong> High risk of serious bleeding (CNS, GI)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decreased Production */}
      <Card>
        <CardHeader>
          <CardTitle>Decreased Production</CardTitle>
          <CardDescription>Marrow failure or suppression</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-red-500 pl-3">
              <strong>Aplastic Anemia</strong>
              <p className="text-muted-foreground">
                Pancytopenia (low RBC, WBC, platelets). Hypocellular marrow.
              </p>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>Myelodysplastic Syndrome (MDS)</strong>
              <p className="text-muted-foreground">
                Ineffective hematopoiesis with dysplasia. Pre-leukemic.
              </p>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>Marrow Infiltration</strong>
              <p className="text-muted-foreground">
                Leukemia, lymphoma, metastatic solid tumors, myelofibrosis
              </p>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>Nutritional</strong>
              <p className="text-muted-foreground">
                B12/folate deficiency (megaloblastic changes affect all cell lines)
              </p>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <strong>Medications/Toxins</strong>
              <p className="text-muted-foreground">
                Chemotherapy, alcohol, valproic acid, radiation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Increased Destruction */}
      <Card>
        <CardHeader>
          <CardTitle>Increased Destruction</CardTitle>
          <CardDescription>Peripheral platelet consumption or destruction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Immune-mediated */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2">Immune-Mediated</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-purple-500/10 p-3 rounded">
                <strong className="text-purple-600 dark:text-purple-400">ITP (Immune Thrombocytopenic Purpura)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Antiplatelet antibodies → splenic destruction</li>
                  <li>Isolated thrombocytopenia (normal RBC, WBC)</li>
                  <li>Petechiae, purpura, mucosal bleeding</li>
                  <li>Diagnosis of exclusion (rule out other causes)</li>
                  <li>Children: Often post-viral, self-limited</li>
                  <li>Adults: Chronic, may need treatment</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 p-3 rounded">
                <strong className="text-purple-600 dark:text-purple-400">Drug-Induced</strong>
                <p className="text-muted-foreground mt-1">
                  Common culprits: Heparin (HIT), quinine, sulfonamides, vancomycin
                </p>
              </div>
            </div>
          </div>

          {/* Non-immune */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-2">Non-Immune (Microangiopathic)</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-orange-500/10 p-3 rounded">
                <strong className="text-orange-600 dark:text-orange-400">TTP (Thrombotic Thrombocytopenic Purpura)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>ADAMTS13 deficiency → vWF multimers → platelet clumping</li>
                  <li><strong>Pentad (classic):</strong> Thrombocytopenia, MAHA, renal failure, fever, neuro changes</li>
                  <li>Schistocytes on smear</li>
                  <li>Emergency: Requires urgent plasmapheresis</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 p-3 rounded">
                <strong className="text-orange-600 dark:text-orange-400">HUS (Hemolytic Uremic Syndrome)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Similar to TTP but renal-predominant</li>
                  <li><strong>Triad:</strong> Thrombocytopenia, MAHA, acute kidney injury</li>
                  <li>Often post-diarrheal (E. coli O157:H7, Shiga toxin)</li>
                  <li>More common in children</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 p-3 rounded">
                <strong className="text-orange-600 dark:text-orange-400">DIC (Disseminated Intravascular Coagulation)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Widespread activation of coagulation → consumption of platelets and factors</li>
                  <li>↓Platelets, ↓fibrinogen, ↑PT/PTT, ↑D-dimer, schistocytes</li>
                  <li>Causes: Sepsis, trauma, malignancy, obstetric complications</li>
                  <li>Both bleeding AND thrombosis</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HIT */}
      <Card>
        <CardHeader>
          <CardTitle>Heparin-Induced Thrombocytopenia (HIT)</CardTitle>
          <CardDescription>Important iatrogenic cause</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
            <strong className="text-red-600 dark:text-red-400">High Clinical Importance</strong>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Mechanism</h3>
              <p className="text-muted-foreground">
                Antibodies against heparin-PF4 complex → platelet activation → THROMBOSIS (paradoxically)
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                <li>Onset: 5-10 days after starting heparin (or sooner if prior exposure)</li>
                <li>50% drop in platelets (may not be &lt;150,000)</li>
                <li><strong>Thrombosis risk &gt;&gt; bleeding risk</strong></li>
                <li>More common with unfractionated heparin than LMWH</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Management</h3>
              <p className="text-muted-foreground">
                <strong>STOP heparin immediately.</strong> Switch to alternative anticoagulant (argatroban, bivalirudin).
                Do NOT use warfarin alone initially.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sequestration */}
      <Card>
        <CardHeader>
          <CardTitle>Sequestration</CardTitle>
          <CardDescription>Splenomegaly trapping platelets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Normal spleen holds ~1/3 of platelets. Enlarged spleen can sequester up to 90%.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Causes of Splenomegaly</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Portal hypertension (cirrhosis)</li>
              <li>Infections (mono, malaria)</li>
              <li>Hematologic malignancies (lymphoma, CLL, myelofibrosis)</li>
              <li>Storage diseases (Gaucher)</li>
            </ul>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Clinical Pearl:</strong> Mild-moderate thrombocytopenia (50,000-100,000) with splenomegaly often
            doesn't require treatment.
          </div>
        </CardContent>
      </Card>

      {/* Platelet Function Disorders */}
      <Card>
        <CardHeader>
          <CardTitle>Platelet Function Disorders</CardTitle>
          <CardDescription>Normal platelet count, abnormal function</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-blue-500 pl-3">
              <strong>von Willebrand Disease</strong>
              <p className="text-muted-foreground">
                Most common inherited bleeding disorder. vWF needed for platelet adhesion. See Coagulation module.
              </p>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <strong>Glanzmann Thrombasthenia</strong>
              <p className="text-muted-foreground">
                Defect in GPIIb/IIIa receptor → impaired aggregation
              </p>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <strong>Bernard-Soulier Syndrome</strong>
              <p className="text-muted-foreground">
                Defect in GPIb receptor → impaired adhesion to vWF. Giant platelets.
              </p>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <strong>Medication-Induced</strong>
              <p className="text-muted-foreground">
                Aspirin, NSAIDs, clopidogrel (therapeutic), uremia
              </p>
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
