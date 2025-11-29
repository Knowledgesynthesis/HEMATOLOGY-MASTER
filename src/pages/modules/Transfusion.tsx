import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Transfusion() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transfusion Medicine</h1>
          <p className="text-muted-foreground mt-1">
            Blood products, crossmatch, compatibility, and transfusion reactions
          </p>
        </div>
      </div>

      {/* Blood Products */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Product Basics</CardTitle>
          <CardDescription>Types and indications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="border-l-4 border-red-500 pl-3">
              <strong>Packed Red Blood Cells (PRBCs)</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                <li>Indication: Symptomatic anemia, acute blood loss</li>
                <li>Expected rise: ~1 g/dL Hgb per unit</li>
                <li>Volume: ~300 mL per unit</li>
                <li>Storage: 35-42 days at 1-6°C</li>
              </ul>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <strong>Platelets</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                <li>Indication: Thrombocytopenia with bleeding or &lt;10,000</li>
                <li>Expected rise: ~30,000-50,000 per unit</li>
                <li>Storage: 5 days at room temperature (risk of bacterial contamination)</li>
                <li>Threshold for procedures: Usually &gt;50,000 (higher for neuro/ophthalmic)</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <strong>Fresh Frozen Plasma (FFP)</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                <li>Contains: All clotting factors</li>
                <li>Indication: Coagulopathy with active bleeding, warfarin reversal, TTP</li>
                <li>Volume: ~250 mL per unit</li>
                <li>Must be ABO-compatible</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <strong>Cryoprecipitate</strong>
              <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                <li>Contains: Fibrinogen, Factor VIII, vWF, Factor XIII</li>
                <li>Indication: Hypofibrinogenemia (DIC), Hemophilia A, vWD</li>
                <li>Rich source of fibrinogen</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blood Typing & Compatibility */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Typing & Compatibility</CardTitle>
          <CardDescription>ABO and Rh systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">ABO Blood Groups</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Blood Type</th>
                    <th className="text-left p-2">Antigen on RBC</th>
                    <th className="text-left p-2">Antibody in Plasma</th>
                    <th className="text-left p-2">Can Receive From</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-2 font-semibold">A</td>
                    <td className="p-2">A</td>
                    <td className="p-2">Anti-B</td>
                    <td className="p-2">A, O</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">B</td>
                    <td className="p-2">B</td>
                    <td className="p-2">Anti-A</td>
                    <td className="p-2">B, O</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">AB</td>
                    <td className="p-2">A and B</td>
                    <td className="p-2">None</td>
                    <td className="p-2">A, B, AB, O (Universal recipient)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">O</td>
                    <td className="p-2">None</td>
                    <td className="p-2">Anti-A, Anti-B</td>
                    <td className="p-2">O only (Universal donor)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Rh System</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Rh-positive (Rh+):</strong> D antigen present (~85% of population)</li>
              <li><strong>Rh-negative (Rh-):</strong> D antigen absent</li>
              <li>Rh- patients can receive Rh- blood only (unless emergency)</li>
              <li>Rh+ patients can receive Rh+ or Rh- blood</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded text-sm">
            <strong>Emergency Transfusion:</strong> O-negative PRBCs (universal donor) and AB plasma (universal donor
            for plasma) can be given without crossmatch in life-threatening situations.
          </div>
        </CardContent>
      </Card>

      {/* Crossmatch */}
      <Card>
        <CardHeader>
          <CardTitle>Crossmatch Procedure</CardTitle>
          <CardDescription>Ensuring compatibility before transfusion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Type & Screen</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Determines patient's ABO and Rh type</li>
              <li>Screens for unexpected antibodies</li>
              <li>If screen negative: Compatible blood usually available quickly</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Type & Crossmatch</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Mixes patient plasma with donor RBCs</li>
              <li>Checks for incompatibility reactions</li>
              <li>Takes ~45-60 minutes for full crossmatch</li>
              <li>Required before most transfusions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Transfusion Reactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transfusion Reactions</CardTitle>
          <CardDescription>Recognition and management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Acute Hemolytic */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">Acute Hemolytic Transfusion Reaction</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-red-500/10 p-2 rounded">
                <strong>Most dangerous reaction</strong>
              </div>
              <div>
                <strong>Cause:</strong>
                <p className="text-muted-foreground">ABO incompatibility (usually clerical error)</p>
              </div>
              <div>
                <strong>Onset:</strong>
                <p className="text-muted-foreground">Within minutes to hours</p>
              </div>
              <div>
                <strong>Symptoms:</strong>
                <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                  <li>Fever, chills, rigors</li>
                  <li>Flank/back pain</li>
                  <li>Hypotension, tachycardia</li>
                  <li>Hemoglobinuria (red/brown urine)</li>
                  <li>DIC in severe cases</li>
                </ul>
              </div>
              <div>
                <strong>Management:</strong>
                <p className="text-muted-foreground">STOP transfusion immediately, IV fluids, investigate cause</p>
              </div>
            </div>
          </div>

          {/* Febrile Non-Hemolytic */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">Febrile Non-Hemolytic Transfusion Reaction (FNHTR)</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Cause:</strong>
                <p className="text-muted-foreground">Cytokine release or anti-leukocyte antibodies</p>
              </div>
              <div>
                <strong>Symptoms:</strong>
                <p className="text-muted-foreground">Fever, chills (no hemolysis)</p>
              </div>
              <div>
                <strong>Most common reaction</strong>
              </div>
              <div>
                <strong>Prevention:</strong>
                <p className="text-muted-foreground">Leukoreduced blood products, acetaminophen premedication</p>
              </div>
            </div>
          </div>

          {/* Allergic */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-400">Allergic Reaction</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Cause:</strong>
                <p className="text-muted-foreground">Recipient antibodies to donor plasma proteins</p>
              </div>
              <div>
                <strong>Symptoms:</strong>
                <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                  <li>Mild: Urticaria, itching (most common)</li>
                  <li>Severe: Anaphylaxis (rare) - bronchospasm, hypotension, angioedema</li>
                </ul>
              </div>
              <div>
                <strong>Management:</strong>
                <p className="text-muted-foreground">Antihistamines for mild. Epinephrine for anaphylaxis.</p>
              </div>
            </div>
          </div>

          {/* TRALI */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">TRALI (Transfusion-Related Acute Lung Injury)</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Cause:</strong>
                <p className="text-muted-foreground">Donor anti-leukocyte antibodies → neutrophil activation in lungs</p>
              </div>
              <div>
                <strong>Onset:</strong>
                <p className="text-muted-foreground">Within 6 hours of transfusion</p>
              </div>
              <div>
                <strong>Symptoms:</strong>
                <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                  <li>Acute hypoxemia</li>
                  <li>Bilateral pulmonary infiltrates</li>
                  <li>NO volume overload (distinguishes from TACO)</li>
                  <li>Fever, hypotension</li>
                </ul>
              </div>
              <div>
                <strong>Management:</strong>
                <p className="text-muted-foreground">Supportive care, oxygen, mechanical ventilation if needed</p>
              </div>
            </div>
          </div>

          {/* TACO */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">TACO (Transfusion-Associated Circulatory Overload)</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Cause:</strong>
                <p className="text-muted-foreground">Volume overload (too much/too fast transfusion)</p>
              </div>
              <div>
                <strong>Risk Factors:</strong>
                <p className="text-muted-foreground">Heart failure, renal failure, elderly, small patients</p>
              </div>
              <div>
                <strong>Symptoms:</strong>
                <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                  <li>Dyspnea, orthopnea</li>
                  <li>Hypertension (vs hypotension in TRALI)</li>
                  <li>JVD, peripheral edema</li>
                  <li>Pulmonary edema on imaging</li>
                  <li>↑BNP</li>
                </ul>
              </div>
              <div>
                <strong>Management:</strong>
                <p className="text-muted-foreground">Diuretics, slow transfusion rate, upright positioning</p>
              </div>
            </div>
          </div>

          {/* Delayed Hemolytic */}
          <div className="border-l-4 border-pink-500 pl-4">
            <h3 className="font-semibold mb-2 text-pink-600 dark:text-pink-400">Delayed Hemolytic Transfusion Reaction</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Onset:</strong>
                <p className="text-muted-foreground">3-10 days post-transfusion</p>
              </div>
              <div>
                <strong>Cause:</strong>
                <p className="text-muted-foreground">
                  Anamnestic response (antibody levels too low to detect initially, then rise)
                </p>
              </div>
              <div>
                <strong>Symptoms:</strong>
                <p className="text-muted-foreground">
                  Mild: Fever, jaundice, falling Hgb. Usually not life-threatening.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TRALI vs TACO */}
      <Card>
        <CardHeader>
          <CardTitle>TRALI vs TACO: Key Distinctions</CardTitle>
          <CardDescription>Critical differential diagnosis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">TRALI</th>
                  <th className="text-left p-2">TACO</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-semibold">Mechanism</td>
                  <td className="p-2">Immune-mediated lung injury</td>
                  <td className="p-2">Volume overload</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Blood Pressure</td>
                  <td className="p-2">Hypotension</td>
                  <td className="p-2">Hypertension</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">JVD</td>
                  <td className="p-2">Absent</td>
                  <td className="p-2">Present</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">BNP</td>
                  <td className="p-2">Normal/Low</td>
                  <td className="p-2">Elevated</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Response to Diuretics</td>
                  <td className="p-2">No improvement</td>
                  <td className="p-2">Improvement</td>
                </tr>
              </tbody>
            </table>
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
