import { lazy, Suspense, type ComponentType } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'

const page = <T extends string>(load: () => Promise<Record<T, ComponentType>>, name: T) => lazy(() => load().then((m) => ({ default: m[name] })))

const Home = page(() => import('./pages/Home'), 'Home')
const LearnIndex = page(() => import('./pages/LearnIndex'), 'LearnIndex')
const ModulePage = page(() => import('./pages/ModulePage'), 'ModulePage')
const ToolsIndex = page(() => import('./pages/ToolsIndex'), 'ToolsIndex')
const Practice = page(() => import('./pages/Practice'), 'Practice')
const CasesIndex = page(() => import('./pages/Cases'), 'CasesIndex')
const CasePlayer = page(() => import('./pages/Cases'), 'CasePlayer')
const WhatsNew = page(() => import('./pages/WhatsNew'), 'WhatsNew')
const References = page(() => import('./pages/References'), 'References')
const NormalValues = page(() => import('./pages/NormalValues'), 'NormalValues')
const Settings = page(() => import('./pages/Settings'), 'Settings')
const NotFound = page(() => import('./pages/NotFound'), 'NotFound')

const TOOL_PAGES: Record<string, ComponentType> = {
  cbc: page(() => import('./pages/tools/CbcTool'), 'CbcTool'),
  anemia: page(() => import('./pages/tools/AnemiaTool'), 'AnemiaTool'),
  iron: page(() => import('./pages/tools/IronTool'), 'IronTool'),
  hemolysis: page(() => import('./pages/tools/HemolysisTool'), 'HemolysisTool'),
  'smear-atlas': page(() => import('./pages/tools/SmearAtlasTool'), 'SmearAtlasTool'),
  'leukemia-red-flags': page(() => import('./pages/tools/LeukemiaTool'), 'LeukemiaTool'),
  coagulation: page(() => import('./pages/tools/CoagTool'), 'CoagTool'),
  'transfusion-reactions': page(() => import('./pages/tools/TransfusionTool'), 'TransfusionTool'),
  'newborn-screen': page(() => import('./pages/tools/NewbornScreenTool'), 'NewbornScreenTool'),
  scores: page(() => import('./pages/tools/ScoresTool'), 'ScoresTool'),
  calculators: page(() => import('./pages/tools/CalculatorsTool'), 'CalculatorsTool'),
}

/** URLs from the first version of the app, kept so old links and bookmarks still work. */
const LEGACY_MODULES: Record<string, string> = {
  foundations: 'foundations',
  anemias: 'anemia',
  leukemias: 'leukemia',
  lymphomas: 'lymphoma',
  platelets: 'platelets',
  coagulation: 'bleeding',
  hemoglobinopathies: 'hemoglobinopathies',
  transfusion: 'transfusion',
  peds: 'neonatal',
}
const LEGACY_TOOLS: Record<string, string> = {
  'cbc-interpreter': 'cbc',
  'anemia-navigator': 'anemia',
  'hemolysis-panel': 'hemolysis',
  'iron-study-mapper': 'iron',
  'smear-explorer': 'smear-atlas',
  'leukemia-predictor': 'leukemia-red-flags',
  'coagulation-interpreter': 'coagulation',
  'transfusion-reaction-sorter': 'transfusion-reactions',
}

function ToolRoute() {
  const { toolId = '' } = useParams()
  if (LEGACY_TOOLS[toolId]) return <Navigate to={`/tools/${LEGACY_TOOLS[toolId]}`} replace />
  const Tool = TOOL_PAGES[toolId]
  return Tool ? <Tool /> : <NotFound />
}

function LegacyModule() {
  const { id = '' } = useParams()
  return <Navigate to={LEGACY_MODULES[id] ? `/learn/${LEGACY_MODULES[id]}` : '/learn'} replace />
}

function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<LearnIndex />} />
            <Route path="/learn/:moduleId" element={<ModulePage />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/:toolId" element={<ToolRoute />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/cases" element={<CasesIndex />} />
            <Route path="/cases/:caseId" element={<CasePlayer />} />
            <Route path="/whats-new" element={<WhatsNew />} />
            <Route path="/references" element={<References />} />
            <Route path="/normal-values" element={<NormalValues />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/modules/:id" element={<LegacyModule />} />
            <Route path="/assessment" element={<Navigate to="/practice" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
