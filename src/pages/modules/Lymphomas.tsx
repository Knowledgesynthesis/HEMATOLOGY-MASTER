import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Lymphomas() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lymphomas & Plasma Cell Disorders</h1>
          <p className="text-muted-foreground mt-1">
            Hodgkin vs Non-Hodgkin lymphomas and plasma cell dyscrasias
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Lymphoma Overview</CardTitle>
          <CardDescription>Malignancies of lymphoid tissue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">General Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li><strong>Lymphadenopathy:</strong> Painless, firm, enlarged lymph nodes</li>
              <li><strong>B symptoms:</strong> Fever, night sweats, weight loss (&gt;10% in 6 months)</li>
              <li>Hepatosplenomegaly possible</li>
              <li>Extranodal involvement varies by type</li>
            </ul>
          </div>
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Diagnosis:</strong> Requires tissue biopsy (excisional lymph node biopsy preferred over FNA)
          </div>
        </CardContent>
      </Card>

      {/* Hodgkin Lymphoma */}
      <Card>
        <CardHeader>
          <CardTitle>Hodgkin Lymphoma</CardTitle>
          <CardDescription>Reed-Sternberg cells define the disease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Hallmark</h3>
            <div className="bg-primary/10 p-3 rounded text-sm">
              <strong>Reed-Sternberg Cells:</strong> Large, binucleate cells with "owl's eye" appearance
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Epidemiology</h3>
            <p className="text-sm text-muted-foreground">
              Bimodal age distribution: Young adults (20s-30s) and older adults (&gt;55)
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Classic Presentation</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
              <li>Painless cervical or mediastinal lymphadenopathy</li>
              <li>B symptoms common (especially in advanced disease)</li>
              <li>Alcohol-induced lymph node pain (rare but specific)</li>
              <li>Contiguous spread (predictable pattern)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Subtypes</h3>
            <div className="space-y-2 text-sm">
              <div className="border-l-2 border-primary pl-3">
                <strong>Nodular Sclerosis (Most common, ~70%):</strong> Young adults, mediastinal mass, good prognosis
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Mixed Cellularity:</strong> Older adults, associated with EBV
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Lymphocyte-rich:</strong> Best prognosis
              </div>
              <div className="border-l-2 border-primary pl-3">
                <strong>Lymphocyte-depleted:</strong> Worst prognosis, often HIV-associated
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Non-Hodgkin Lymphoma */}
      <Card>
        <CardHeader>
          <CardTitle>Non-Hodgkin Lymphoma (NHL)</CardTitle>
          <CardDescription>Diverse group of lymphoid malignancies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Difference from Hodgkin:</strong> No Reed-Sternberg cells, non-contiguous spread
          </div>

          <div>
            <h3 className="font-semibold mb-2">Classification: Indolent vs Aggressive</h3>
          </div>

          {/* Indolent */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Indolent (Slow-growing)</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-500/10 p-2 rounded">
                <strong>Follicular Lymphoma</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common indolent NHL</li>
                  <li>t(14;18) → BCL2 overexpression (blocks apoptosis)</li>
                  <li>Painless lymphadenopathy, waxing/waning</li>
                  <li>Often advanced stage at diagnosis</li>
                  <li>Can transform to aggressive DLBCL</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 p-2 rounded">
                <strong>Marginal Zone Lymphoma (MALT)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Extranodal sites (stomach most common)</li>
                  <li>Associated with H. pylori (gastric MALT)</li>
                  <li>Treatment: Antibiotics can cure early gastric MALT</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Aggressive */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">Aggressive (Fast-growing)</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-red-500/10 p-2 rounded">
                <strong>Diffuse Large B-Cell Lymphoma (DLBCL)</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Most common NHL overall (~30%)</li>
                  <li>Rapidly enlarging lymph nodes</li>
                  <li>Can arise de novo or transform from indolent lymphoma</li>
                  <li>Curable with chemotherapy (R-CHOP)</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-2 rounded">
                <strong>Burkitt Lymphoma</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>t(8;14) → MYC overexpression</li>
                  <li>Fastest-growing human tumor</li>
                  <li>Endemic (Africa, EBV+, jaw mass), Sporadic (abdomen, ileocecal), HIV-associated</li>
                  <li>"Starry sky" appearance on pathology</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-2 rounded">
                <strong>Mantle Cell Lymphoma</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>t(11;14) → Cyclin D1 overexpression</li>
                  <li>Older males, advanced stage at diagnosis</li>
                  <li>GI involvement common</li>
                  <li>Poor prognosis overall</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plasma Cell Disorders */}
      <Card>
        <CardHeader>
          <CardTitle>Plasma Cell Disorders</CardTitle>
          <CardDescription>Monoclonal gammopathies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded text-sm">
            <strong>Key Concept:</strong> Clonal proliferation of plasma cells producing monoclonal immunoglobulin (M protein)
          </div>

          {/* MGUS */}
          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="font-semibold mb-2">MGUS (Monoclonal Gammopathy of Undetermined Significance)</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Criteria:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>M protein &lt;3 g/dL</li>
                  <li>Plasma cells &lt;10% in marrow</li>
                  <li>No end-organ damage (no CRAB)</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                <strong>Management:</strong> Monitor with SPEP (serum protein electrophoresis). Risk of progression to
                myeloma ~1% per year.
              </p>
            </div>
          </div>

          {/* Multiple Myeloma */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2">Multiple Myeloma</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>CRAB Criteria (End-organ damage):</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-4 space-y-1">
                  <li><strong>C</strong>alcium elevation (hypercalcemia)</li>
                  <li><strong>R</strong>enal insufficiency</li>
                  <li><strong>A</strong>nemia</li>
                  <li><strong>B</strong>one lesions (lytic lesions, fractures)</li>
                </ul>
              </div>
              <div>
                <strong>Labs:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>M protein spike on SPEP</li>
                  <li>Plasma cells ≥10% in marrow</li>
                  <li>Elevated β2-microglobulin</li>
                  <li>Bence Jones protein (light chains in urine)</li>
                </ul>
              </div>
              <div>
                <strong>Classic Triad:</strong>
                <p className="text-muted-foreground mt-1">Bone pain + anemia + renal failure</p>
              </div>
              <div className="bg-purple-500/10 p-2 rounded">
                <strong className="text-purple-600 dark:text-purple-400">Complications:</strong>
                <p className="text-muted-foreground text-xs mt-1">
                  Pathologic fractures, hyperviscosity syndrome, recurrent infections (hypogammaglobulinemia),
                  AL amyloidosis
                </p>
              </div>
            </div>
          </div>

          {/* AL Amyloidosis */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold mb-2">AL Amyloidosis</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                Light chain deposition in tissues (heart, kidneys, liver, nerves)
              </p>
              <div>
                <strong>Presentation:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 space-y-1">
                  <li>Restrictive cardiomyopathy (most common cause of death)</li>
                  <li>Nephrotic syndrome</li>
                  <li>Peripheral neuropathy</li>
                  <li>Macroglossia, periorbital purpura ("raccoon eyes")</li>
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
