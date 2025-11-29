import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Coagulation() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coagulation Disorders</h1>
          <p className="text-muted-foreground mt-1">
            PT/PTT interpretation, hemophilia, von Willebrand, DIC, and mixing studies
          </p>
        </div>
      </div>

      {/* PT/PTT Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle>PT/PTT Interpretation Framework</CardTitle>
          <CardDescription>Systematic approach to coagulation studies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Remember:</strong> PT tests extrinsic + common pathway. PTT tests intrinsic + common pathway.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">PT</th>
                  <th className="text-left p-2">PTT</th>
                  <th className="text-left p-2">Possible Causes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2">Normal</td>
                  <td className="p-2">Normal</td>
                  <td className="p-2">
                    Platelet disorder, vWF disease, Factor XIII deficiency, mild factor deficiencies
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">↑</td>
                  <td className="p-2">Normal</td>
                  <td className="p-2">
                    <strong>Factor VII deficiency</strong>, warfarin (early), vitamin K deficiency (early), liver disease (early)
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Normal</td>
                  <td className="p-2 font-semibold">↑</td>
                  <td className="p-2">
                    <strong>Hemophilia A (VIII)</strong>, <strong>Hemophilia B (IX)</strong>, Factor XI/XII deficiency, heparin, lupus anticoagulant
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">↑</td>
                  <td className="p-2 font-semibold">↑</td>
                  <td className="p-2">
                    <strong>Common pathway defects:</strong> Factor X, V, II (prothrombin), I (fibrinogen)
                    <br />
                    DIC, severe liver disease, warfarin, direct thrombin inhibitors
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mixing Studies */}
      <Card>
        <CardHeader>
          <CardTitle>Mixing Studies Logic</CardTitle>
          <CardDescription>Distinguishing factor deficiency from inhibitor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm mb-4">
            <strong>Concept:</strong> Mix patient plasma 1:1 with normal plasma and retest PT/PTT.
          </div>

          <div className="space-y-3">
            <div className="bg-green-500/10 p-3 rounded border border-green-500/20">
              <h3 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-1">
                Mixing Study CORRECTS (normalizes)
              </h3>
              <p className="text-sm text-muted-foreground">
                <strong>Interpretation:</strong> Factor deficiency
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Normal plasma provides missing factors → coagulation normalizes
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Examples: Hemophilia, vitamin K deficiency, other factor deficiencies
              </p>
            </div>

            <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
              <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-1">
                Mixing Study DOES NOT CORRECT
              </h3>
              <p className="text-sm text-muted-foreground">
                <strong>Interpretation:</strong> Inhibitor present
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Inhibitor neutralizes factors in normal plasma → coagulation stays abnormal
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Examples: Lupus anticoagulant, acquired factor VIII inhibitor, heparin contamination
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hemophilia */}
      <Card>
        <CardHeader>
          <CardTitle>Hemophilia A & B</CardTitle>
          <CardDescription>X-linked recessive bleeding disorders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-3">
              <h3 className="font-semibold mb-2">Hemophilia A</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li><strong>Factor VIII deficiency</strong></li>
                <li>Most common hemophilia (~80%)</li>
                <li>X-linked recessive (affects males)</li>
                <li>Normal PT, ↑PTT</li>
                <li>Mixing study corrects</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <h3 className="font-semibold mb-2">Hemophilia B (Christmas Disease)</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li><strong>Factor IX deficiency</strong></li>
                <li>Less common (~20%)</li>
                <li>X-linked recessive</li>
                <li>Normal PT, ↑PTT</li>
                <li>Clinically indistinguishable from Hemophilia A</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Clinical Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Hemarthrosis:</strong> Bleeding into joints (knees, ankles, elbows) → most common manifestation</li>
              <li>Deep tissue hematomas</li>
              <li>Prolonged bleeding after trauma or surgery</li>
              <li>CNS hemorrhage (life-threatening)</li>
              <li>Severity correlates with factor level (&lt;1% severe, 1-5% moderate, &gt;5% mild)</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded text-sm">
            <strong>Treatment:</strong> Factor replacement (recombinant VIII or IX). Desmopressin (DDAVP) can be used
            for mild Hemophilia A.
          </div>
        </CardContent>
      </Card>

      {/* von Willebrand Disease */}
      <Card>
        <CardHeader>
          <CardTitle>von Willebrand Disease (vWD)</CardTitle>
          <CardDescription>Most common inherited bleeding disorder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Function of vWF</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Platelet adhesion to damaged endothelium</li>
              <li>Carries and stabilizes Factor VIII (protects from degradation)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Types</h3>
            <div className="space-y-2 text-sm">
              <div className="border-l-2 border-primary pl-3">
                <strong>Type 1 (Most common, ~75%):</strong> Partial quantitative deficiency. Mild symptoms.
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Type 2:</strong> Qualitative defect (abnormal vWF function)
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Type 3 (Rare):</strong> Complete deficiency. Severe bleeding.
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Lab Findings</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>↑PTT (due to low Factor VIII)</li>
              <li>↑Bleeding time (platelet function affected)</li>
              <li>Low vWF antigen and activity</li>
              <li>May have low Factor VIII levels</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Clinical Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Mucocutaneous bleeding (epistaxis, gingival bleeding, menorrhagia)</li>
              <li>Easy bruising</li>
              <li>Prolonged bleeding after surgery/dental work</li>
              <li>Less severe than hemophilia (usually no hemarthrosis)</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded text-sm">
            <strong>Treatment:</strong> Desmopressin (DDAVP) for Type 1 (releases vWF from endothelial stores).
            vWF/Factor VIII concentrate for Type 2/3.
          </div>
        </CardContent>
      </Card>

      {/* DIC */}
      <Card>
        <CardHeader>
          <CardTitle>Disseminated Intravascular Coagulation (DIC)</CardTitle>
          <CardDescription>Consumption coagulopathy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
            <strong className="text-red-600 dark:text-red-400">Medical Emergency</strong>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pathophysiology</h3>
            <p className="text-sm text-muted-foreground">
              Widespread activation of coagulation cascade → formation of microthrombi → consumption of platelets and
              clotting factors → simultaneous bleeding AND thrombosis
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Triggers</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Sepsis</strong> (most common)</li>
              <li>Trauma, burns</li>
              <li>Malignancy (especially APL, adenocarcinomas)</li>
              <li>Obstetric complications (placental abruption, amniotic fluid embolism, retained dead fetus)</li>
              <li>Transfusion reactions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Classic Lab Pattern</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Platelets</td>
                    <td className="p-2">↓ (consumed)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">PT/PTT</td>
                    <td className="p-2">↑ (factor consumption)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Fibrinogen</td>
                    <td className="p-2">↓ (consumed)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">D-dimer</td>
                    <td className="p-2">↑↑ (fibrin breakdown)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Smear</td>
                    <td className="p-2">Schistocytes (microangiopathic hemolysis)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-muted p-3 rounded text-sm">
            <strong>Treatment:</strong> Treat underlying cause. Supportive care with blood products (platelets, FFP,
            cryoprecipitate) as needed. Heparin rarely used.
          </div>
        </CardContent>
      </Card>

      {/* Liver Disease */}
      <Card>
        <CardHeader>
          <CardTitle>Liver Disease Coagulopathy</CardTitle>
          <CardDescription>Multifactorial bleeding disorder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Why Liver Disease Causes Bleeding</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Liver synthesizes most clotting factors (except vWF and VIII)</li>
              <li>Decreased vitamin K-dependent factors (II, VII, IX, X)</li>
              <li>Decreased fibrinogen production</li>
              <li>Thrombocytopenia (splenomegaly from portal hypertension)</li>
              <li>Dysfibrinogenemia (abnormal fibrinogen)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Lab Pattern</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>↑PT (Factor VII has shortest half-life → elevated first)</li>
              <li>↑PTT (later in disease)</li>
              <li>Normal or ↓fibrinogen</li>
              <li>Thrombocytopenia (if portal hypertension)</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Distinction from Vitamin K Deficiency:</strong> Vitamin K deficiency responds to vitamin K
            supplementation. Liver disease does not (liver can't synthesize factors even with vitamin K).
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
