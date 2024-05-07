import React from "react";
import { Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import HomePage from "./pages/HomePage";
import QueueStockPage from "./pages/QueueStockPage";
import JournalPage from "./pages/JournalPage";
import RiskManagementPage from "./pages/RiskManagementPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import StockAverageCalculator from "./components/StockAverageCalculator";
import ReturnPerformancePage from "./pages/ReturnPerformancePage";

function App() {
  return (
    <>
      <div className="g-sidenav-show">
        <SideNav />
        <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/queuestocks" element={<QueueStockPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/risk-management" element={<RiskManagementPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route
              path="/return-performance"
              element={<ReturnPerformancePage />}
            />
            <Route
              path="/stock-avg-calculator"
              element={<StockAverageCalculator />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
