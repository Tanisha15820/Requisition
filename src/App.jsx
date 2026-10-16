import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequisitionTablePage from './pages/RequisitionTablePage';
import TopicSheetPage from './pages/TopicSheetPage';
import QARequisitionPage from './pages/QARequisitionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main table view matching reference screenshot */}
        <Route path="/" element={<RequisitionTablePage />} />

        {/* QA Requisition direct page */}
        <Route path="/qa-requisition" element={<QARequisitionPage />} />

        {/* Dedicated checksheet page opened upon clicking a topic */}
        <Route path="/topic/:id" element={<TopicSheetPage />} />

        {/* Direct checksheet routes */}
        <Route path="/qasheet1" element={<TopicSheetPage defaultTab="Sheet 1" />} />
        <Route path="/qasheet2" element={<TopicSheetPage defaultTab="Sheet 2" />} />
        <Route path="/qasheet3" element={<TopicSheetPage defaultTab="Sheet 3" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
