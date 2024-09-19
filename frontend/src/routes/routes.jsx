import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Documentation from "../pages/Documentation";
import AnalyticsDashboard from "../pages/AnalysisResults";
import UploadingData from "../pages/Uploading";
import React from "react";

export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Documentation />} />
        <Route path="/uploading" element={<UploadingData />} />
        <Route path="/generation" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
  );
}
