import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import PrivateRoute from "./PrivateRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound404Page from "./pages/NotFound404Page";
import AnalyticsPage from "./pages/AnalyticsPage";

// Lazy-loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const ReturnPerformancePage = lazy(() =>
  import("./pages/ReturnPerformancePage")
);
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const TradeJournalPage = lazy(() => import("./pages/TradeJournalPage"));
const CreateEditWatchlist = lazy(() =>
  import("./components/CreateEditWatchlist")
);
const CreateEditTradeJournal = lazy(() =>
  import("./components/CreateEditTradeJournal")
);
const CreateEditReturnPerformance = lazy(() =>
  import("./components/CreateEditReturnPerformance")
);
const CreateEditRiskManagement = lazy(() =>
  import("./components/CreateEditRiskManagement")
);
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const UpdatesPage = lazy(() => import("./pages/UpdatesPage"));
const ConsolePage = lazy(() => import("./pages/ConsolePage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound404Page />} />
              <Route path="/analytics" element={<AnalyticsPage />} />

              <Route path="/all_watchlist" element={<WatchlistPage />} />
              <Route
                path="/create_watchlist"
                element={<CreateEditWatchlist />}
              />
              <Route
                path="/edit_watchlist/:id"
                element={<CreateEditWatchlist />}
              />
              <Route path="/all_trade_journal" element={<TradeJournalPage />} />
              <Route
                path="/create_trade_journal"
                element={<CreateEditTradeJournal />}
              />
              <Route
                path="/edit_trade_journal/:id"
                element={<CreateEditTradeJournal />}
              />
              <Route
                path="/create_risk_management"
                element={<CreateEditRiskManagement />}
              />
              <Route
                path="/all_return_performance"
                element={<ReturnPerformancePage />}
              />
              <Route
                path="/create_return_performance"
                element={<CreateEditReturnPerformance />}
              />
              <Route
                path="/edit_return_performance/:id"
                element={<CreateEditReturnPerformance />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/updates" element={<UpdatesPage />} />
              <Route path="/console/*" element={<ConsolePage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
