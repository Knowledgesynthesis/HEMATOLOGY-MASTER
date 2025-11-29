import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
import { Foundations } from './pages/modules/Foundations'
import { Anemias } from './pages/modules/Anemias'
import { Leukemias } from './pages/modules/Leukemias'
import { Lymphomas } from './pages/modules/Lymphomas'
import { Platelets } from './pages/modules/Platelets'
import { Coagulation } from './pages/modules/Coagulation'
import { Hemoglobinopathies } from './pages/modules/Hemoglobinopathies'
import { Transfusion } from './pages/modules/Transfusion'
import { PedsHematology } from './pages/modules/PedsHematology'
import { CBCInterpreter } from './pages/tools/CBCInterpreter'
import { AnemiaNavigator } from './pages/tools/AnemiaNavigator'
import { HemolysisPanel } from './pages/tools/HemolysisPanel'
import { IronStudyMapper } from './pages/tools/IronStudyMapper'
import { SmearExplorer } from './pages/tools/SmearExplorer'
import { LeukemiaPredictor } from './pages/tools/LeukemiaPredictor'
import { CoagulationInterpreter } from './pages/tools/CoagulationInterpreter'
import { TransfusionReactionSorter } from './pages/tools/TransfusionReactionSorter'
import { Assessment } from './pages/Assessment'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />

          {/* Module Routes */}
          <Route path="/modules/foundations" element={<Foundations />} />
          <Route path="/modules/anemias" element={<Anemias />} />
          <Route path="/modules/leukemias" element={<Leukemias />} />
          <Route path="/modules/lymphomas" element={<Lymphomas />} />
          <Route path="/modules/platelets" element={<Platelets />} />
          <Route path="/modules/coagulation" element={<Coagulation />} />
          <Route path="/modules/hemoglobinopathies" element={<Hemoglobinopathies />} />
          <Route path="/modules/transfusion" element={<Transfusion />} />
          <Route path="/modules/peds" element={<PedsHematology />} />

          {/* Interactive Tool Routes */}
          <Route path="/tools/cbc-interpreter" element={<CBCInterpreter />} />
          <Route path="/tools/anemia-navigator" element={<AnemiaNavigator />} />
          <Route path="/tools/hemolysis-panel" element={<HemolysisPanel />} />
          <Route path="/tools/iron-study-mapper" element={<IronStudyMapper />} />
          <Route path="/tools/smear-explorer" element={<SmearExplorer />} />
          <Route path="/tools/leukemia-predictor" element={<LeukemiaPredictor />} />
          <Route path="/tools/coagulation-interpreter" element={<CoagulationInterpreter />} />
          <Route path="/tools/transfusion-reaction-sorter" element={<TransfusionReactionSorter />} />

          {/* Assessment Route */}
          <Route path="/assessment" element={<Assessment />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
