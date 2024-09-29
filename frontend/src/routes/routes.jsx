import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Docs from "../pages/Documentation";
import AnalyticsDashboard from "../pages/AnalysisResults";
import UploadingData from "../pages/Uploading";
import CGPACalculator from "../pages/CGPACalculator";
import React from "react";

export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/uploading" element={<UploadingData />} />
        <Route path="/generation" element={<AnalyticsDashboard />} />
        <Route path="/cgpa" element={<CGPACalculator />} />
      </Routes>
    </Router>
  );
}
