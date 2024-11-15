import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Docs from "../pages/Documentation";
import AnalyticsDashboard from "../pages/AnalysisResults";
import UploadingData from "../pages/Uploading";
import EnhancedCGPACalculator from "../pages/Calculator";
import AnonymousNotepad from "../pages/AnonymousNotepad"
import ExcuseOMatic from "../pages/ExcuseOMatic";
import LandingPage from "../pages/LandingPage";
import React from "react";

export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/uploading" element={<UploadingData />} />
        <Route path="/generation" element={<AnalyticsDashboard />} />
        <Route path="/cgpa" element={<EnhancedCGPACalculator />} />
        <Route path="/note" element={<AnonymousNotepad />} />
        <Route path="/excuse" element={<ExcuseOMatic />} />

      </Routes>
    </Router>
  );
}
