import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PedsHematology() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pediatric Hematology</h1>
          <p className="text-muted-foreground mt-1">
            Pediatric-specific hematologic conditions and patterns
          </p>
        </div>
      </div>

      {/* Pediatric Normal Values */}
      <Card>
        <CardHeader>
          <CardTitle>Pediatric Hematology Considerations</CardTitle>
          <CardDescription>How children differ from adults</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Normal Values Change with Age</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Newborns have higher Hgb (14-24 g/dL) due to hypoxic intrauterine environment</li>
              <li>Physiologic nadir at 2-3 months (as low as 9-11 g/dL is normal)</li>
              <li>Gradual rise through childhood</li>
              <li>Adolescent values approach adult ranges</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fetal Hemoglobin (HbF)</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Predominant at birth (~70-80%)</li>
              <li>Gradually replaced by HbA over first 6 months</li>
              <li>&lt;1% by age 2 years (adult level)</li>
              <li>Higher O₂ affinity → better placental oxygen extraction</li>
            </ul>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Clinical Pearl:</strong> Hemoglobinopathies (sickle cell, β-thalassemia) don't manifest until HbF
            levels drop (~6 months of age).
          </div>
        </CardContent>
      </Card>

      {/* Pediatric Iron Deficiency */}
      <Card>
        <CardHeader>
          <CardTitle>Pediatric Iron Deficiency Anemia</CardTitle>
          <CardDescription>Most common pediatric anemia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Risk Factors</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Premature infants (low iron stores)</li>
              <li>Exclusive breastfeeding beyond 6 months without iron supplementation</li>
              <li>Cow's milk before 12 months (poor iron, GI microbleeding)</li>
              <li>Excessive cow's milk consumption in toddlers (&gt;24 oz/day)</li>
              <li>Poor dietary intake</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Pallor, fatigue</li>
              <li>Pica (especially ice craving - pagophagia)</li>
              <li>Developmental delays (severe, chronic cases)</li>
              <li>Irritability</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Prevention & Treatment</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Iron supplementation starting at 4-6 months for breastfed infants</li>
              <li>Iron-fortified formula or cereals</li>
              <li>Limit cow's milk to &lt;24 oz/day after age 1</li>
              <li>Oral iron supplementation (ferrous sulfate)</li>
              <li>Dietary counseling (iron-rich foods)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Hemoglobinopathies in Children */}
      <Card>
        <CardHeader>
          <CardTitle>Hemoglobinopathies in Children</CardTitle>
          <CardDescription>Sickle cell and thalassemias</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sickle Cell in Peds */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold mb-2">Sickle Cell Disease in Children</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Newborn Screening:</strong>
                <p className="text-muted-foreground mt-1">
                  Universal screening in US allows early identification and intervention
                </p>
              </div>
              <div>
                <strong>Pediatric-Specific Complications:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li><strong>Dactylitis ("hand-foot syndrome"):</strong> First manifestation (6 months-2 years). Painful
                    swelling of hands/feet from vaso-occlusion.</li>
                  <li><strong>Splenic sequestration:</strong> Life-threatening. Sudden spleen enlargement, severe anemia,
                    shock. More common &lt;5 years.</li>
                  <li><strong>Stroke:</strong> Peak risk 2-5 years. Screen with transcranial Doppler. Chronic transfusions
                    for high-risk patients.</li>
                  <li><strong>Acute chest syndrome:</strong> Leading cause of death. Fever, chest pain, infiltrate.</li>
                </ul>
              </div>
              <div>
                <strong>Prophylaxis:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Penicillin prophylaxis starting at 2 months (functional asplenia)</li>
                  <li>Pneumococcal, Haemophilus, meningococcal vaccinations</li>
                  <li>Hydroxyurea to increase HbF</li>
                  <li>Folic acid supplementation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Thalassemia in Peds */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">β-Thalassemia Major in Children</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Presentation:</strong>
                <p className="text-muted-foreground mt-1">
                  Severe anemia by 6 months (as HbF declines). Failure to thrive, pallor, hepatosplenomegaly.
                </p>
              </div>
              <div>
                <strong>Complications:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Bone deformities (marrow expansion): "Chipmunk facies," frontal bossing, maxillary overgrowth</li>
                  <li>Growth retardation</li>
                  <li>Delayed puberty</li>
                  <li>Iron overload (from chronic transfusions): Cardiac, hepatic, endocrine dysfunction</li>
                </ul>
              </div>
              <div>
                <strong>Management:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Regular transfusions (every 2-4 weeks) to suppress ineffective erythropoiesis</li>
                  <li>Iron chelation therapy (deferoxamine, deferasirox) to prevent organ damage</li>
                  <li>Bone marrow transplant (curative)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immune Hemolysis */}
      <Card>
        <CardHeader>
          <CardTitle>Immune Hemolysis in Neonates</CardTitle>
          <CardDescription>Hemolytic disease of the newborn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ABO Incompatibility */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-2">ABO Hemolytic Disease</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Scenario:</strong>
                <p className="text-muted-foreground mt-1">
                  Mother type O, baby type A or B. Maternal IgG anti-A or anti-B crosses placenta.
                </p>
              </div>
              <div>
                <strong>Features:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common cause of hemolytic disease in newborns</li>
                  <li>Can occur in first pregnancy (pre-existing antibodies)</li>
                  <li>Usually mild: Jaundice, mild anemia</li>
                  <li>Spherocytes on smear</li>
                  <li>Positive DAT (Coombs)</li>
                </ul>
              </div>
              <div>
                <strong>Treatment:</strong>
                <p className="text-muted-foreground">Phototherapy for hyperbilirubinemia. Exchange transfusion if severe.</p>
              </div>
            </div>
          </div>

          {/* Rh Incompatibility */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2">Rh (D) Hemolytic Disease</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Scenario:</strong>
                <p className="text-muted-foreground mt-1">
                  Rh-negative mother, Rh-positive baby. Mother sensitized during prior pregnancy or delivery.
                </p>
              </div>
              <div>
                <strong>Features:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Rare now (RhoGAM prophylaxis)</li>
                  <li>Does NOT occur in first pregnancy (requires prior sensitization)</li>
                  <li>Can be severe: Hydrops fetalis (severe anemia, heart failure, edema)</li>
                  <li>Hyperbilirubinemia → kernicterus risk</li>
                </ul>
              </div>
              <div>
                <strong>Prevention:</strong>
                <p className="text-muted-foreground">
                  RhoGAM (anti-D immunoglobulin) at 28 weeks gestation and within 72 hours of delivery to Rh-negative
                  mothers. Prevents maternal sensitization.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ALL in Children */}
      <Card>
        <CardHeader>
          <CardTitle>Acute Lymphoblastic Leukemia (ALL) in Children</CardTitle>
          <CardDescription>Most common childhood malignancy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Epidemiology</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Peak incidence: Age 2-5 years</li>
              <li>~80% are B-cell ALL</li>
              <li>Better prognosis in children than adults (&gt;85% cure rate)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Fatigue, pallor (anemia)</li>
              <li>Fever, infections (neutropenia)</li>
              <li>Bruising, petechiae (thrombocytopenia)</li>
              <li>Bone pain (marrow infiltration) - common in children</li>
              <li>Lymphadenopathy, hepatosplenomegaly</li>
              <li>Limp, refusal to walk (bone/joint pain)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Favorable Prognostic Factors</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Age 1-10 years</li>
              <li>WBC &lt;50,000 at diagnosis</li>
              <li>B-cell phenotype (vs T-cell)</li>
              <li>Hyperdiploidy (&gt;50 chromosomes)</li>
              <li>t(12;21) translocation</li>
              <li>Rapid response to initial therapy</li>
            </ul>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>CNS Prophylaxis:</strong> ALL can involve CNS. Prophylactic intrathecal chemotherapy is standard.
          </div>
        </CardContent>
      </Card>

      {/* ITP in Children */}
      <Card>
        <CardHeader>
          <CardTitle>Immune Thrombocytopenic Purpura (ITP) in Children</CardTitle>
          <CardDescription>Self-limited in most pediatric cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Key Differences from Adult ITP</h3>
            <div className="space-y-2 text-sm">
              <div className="border-l-2 border-primary pl-3">
                <strong>Pediatric ITP:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2">
                  <li>Often follows viral infection (1-4 weeks after URI, viral illness)</li>
                  <li>Acute onset</li>
                  <li>Self-limited (~80% resolve within 6 months)</li>
                  <li>Less likely to become chronic</li>
                </ul>
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Adult ITP:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2">
                  <li>Insidious onset</li>
                  <li>Usually chronic (&gt;12 months)</li>
                  <li>Requires treatment more often</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Sudden onset petechiae, purpura</li>
              <li>Mucosal bleeding (epistaxis, gingival)</li>
              <li>Platelets often &lt;20,000</li>
              <li>Otherwise well-appearing child</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Management</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Observation if no/minimal bleeding (many resolve spontaneously)</li>
              <li>Avoid contact sports, aspirin, trauma</li>
              <li>Treatment if severe bleeding: IVIG or steroids</li>
              <li>Platelet transfusion reserved for life-threatening bleeding</li>
            </ul>
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
