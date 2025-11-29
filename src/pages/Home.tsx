import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Microscope,
  Droplets,
  Activity,
  Zap,
  CircleDot,
  HeartPulse,
  Dna,
  Syringe,
  Baby,
  FlaskConical,
  Brain,
} from 'lucide-react'

export function Home() {
  const modules = [
    {
      id: 'foundations',
      title: 'Prerequisite Physiology',
      description: 'Hematopoiesis, CBC components, iron physiology, and basic coagulation pathways',
      icon: Microscope,
      path: '/modules/foundations',
      color: 'text-blue-500',
    },
    {
      id: 'anemias',
      title: 'Anemias',
      description: 'MCV-based classification, hemolytic vs non-hemolytic, smear patterns, and iron studies',
      icon: Droplets,
      path: '/modules/anemias',
      color: 'text-red-500',
    },
    {
      id: 'leukemias',
      title: 'Leukemias & WBC Disorders',
      description: 'Acute and chronic leukemias, MDS, MPN, and benign WBC patterns',
      icon: Activity,
      path: '/modules/leukemias',
      color: 'text-purple-500',
    },
    {
      id: 'lymphomas',
      title: 'Lymphomas & Plasma Cell Disorders',
      description: 'Hodgkin vs Non-Hodgkin, MGUS, multiple myeloma, and AL amyloidosis',
      icon: Zap,
      path: '/modules/lymphomas',
      color: 'text-violet-500',
    },
    {
      id: 'platelets',
      title: 'Platelets & Thrombocytopenia',
      description: 'Production, destruction, sequestration, and platelet function disorders',
      icon: CircleDot,
      path: '/modules/platelets',
      color: 'text-yellow-500',
    },
    {
      id: 'coagulation',
      title: 'Coagulation Disorders',
      description: 'PT/PTT interpretation, hemophilia, von Willebrand, DIC, and mixing studies',
      icon: HeartPulse,
      path: '/modules/coagulation',
      color: 'text-pink-500',
    },
    {
      id: 'hemoglobinopathies',
      title: 'Hemoglobinopathies',
      description: 'Sickle cell disease, thalassemias, and electrophoresis interpretation',
      icon: Dna,
      path: '/modules/hemoglobinopathies',
      color: 'text-green-500',
    },
    {
      id: 'transfusion',
      title: 'Transfusion Medicine',
      description: 'Blood products, crossmatch, compatibility, and transfusion reactions',
      icon: Syringe,
      path: '/modules/transfusion',
      color: 'text-orange-500',
    },
    {
      id: 'peds',
      title: 'Pediatric Hematology',
      description: 'Pediatric iron deficiency, hemoglobinopathies, and immune hemolysis',
      icon: Baby,
      path: '/modules/peds',
      color: 'text-cyan-500',
    },
  ]

  const tools = [
    { title: 'CBC Interpreter', path: '/tools/cbc-interpreter' },
    { title: 'Anemia Navigator', path: '/tools/anemia-navigator' },
    { title: 'Hemolysis Panel', path: '/tools/hemolysis-panel' },
    { title: 'Iron Study Mapper', path: '/tools/iron-study-mapper' },
    { title: 'Smear Explorer', path: '/tools/smear-explorer' },
    { title: 'Leukemia Predictor', path: '/tools/leukemia-predictor' },
    { title: 'Coagulation Interpreter', path: '/tools/coagulation-interpreter' },
    { title: 'Transfusion Reaction Sorter', path: '/tools/transfusion-reaction-sorter' },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Hematology Master
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything in hematology, finally simple. From physiology to labs to diagnosis.
        </p>
      </div>

      {/* Learning Modules */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Learning Modules</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link key={module.id} to={module.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <module.icon className={`h-8 w-8 ${module.color}`} />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FlaskConical className="h-8 w-8 text-primary" />
            Interactive Tools
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link key={tool.path} to={tool.path}>
              <Button variant="outline" className="w-full justify-start h-auto py-3">
                {tool.title}
              </Button>
            </Link>
          ))}
        </div>
      </section>

      {/* Assessment Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Test Your Knowledge
          </h2>
        </div>
        <Link to="/assessment">
          <Card className="transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
            <CardHeader>
              <CardTitle>Practice Assessment</CardTitle>
              <CardDescription>
                Test your understanding with case-based questions and pattern recognition exercises.
                Session-only results, no tracking.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </section>
    </div>
  )
}
