import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CreateEditBrokerAccounts from "../components/CreateEditBrokerAccounts";
import CreateEditDematAccounts from "../components/CreateEditDematAccounts";
import CreateEditStrategy from "../components/CreateEditStrategy";
import FloatButton from "../components/FloatButton";
import TabBar from "../components/TabBar";
import { LIST_FLOAT_SVG } from "../UI/GlobalSVG";
import ManageBrokerAccountsPage from "./ManageBrokerAccountsPage";
import ManageDematAccountsPage from "./ManageDematAccountsPage";
import ManageStrategyPage from "./ManageStrategyPage";

function ConsolePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/")[2] || "all_broker_accounts"
  );

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    if (!path) {
      navigate("/console/all_broker_accounts");
    } else {
      switch (path) {
        case "all_broker_accounts":
        case "create_broker_accounts":
        case "edit_broker_accounts":
          setActiveTab("all_broker_accounts");
          break;
        case "all_demat_accounts":
        case "create_demat_accounts":
        case "edit_demat_accounts":
          setActiveTab("all_demat_accounts");
          break;
        case "all_user_strategy":
        case "create_user_strategy":
        case "edit_user_strategy":
          setActiveTab("all_user_strategy");
          break;
        default:
          setActiveTab("all_broker_accounts");
      }
    }
  }, [location, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/console/${tab}`);
  };

  const handleFloatButtonClick = () => {
    const path = location.pathname.split("/")[2];
    if (path.startsWith("create_")) {
      navigate(`/console/${path.replace("create_", "all_")}`);
    } else {
      switch (activeTab) {
        case "all_broker_accounts":
          navigate("/console/create_broker_accounts");
          break;
        case "all_demat_accounts":
          navigate("/console/create_demat_accounts");
          break;
        case "all_user_strategy":
          navigate("/console/create_user_strategy");
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div>
        <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
        <div className="p-10">
          <Routes>
            <Route
              path="/all_broker_accounts"
              element={<ManageBrokerAccountsPage />}
            />
            <Route
              path="/create_broker_accounts"
              element={<CreateEditBrokerAccounts />}
            />
            <Route
              path="/edit_broker_accounts/:id"
              element={<CreateEditBrokerAccounts />}
            />

            <Route
              path="/all_demat_accounts"
              element={<ManageDematAccountsPage />}
            />
            <Route
              path="/create_demat_accounts"
              element={<CreateEditDematAccounts />}
            />
            <Route
              path="/edit_demat_accounts/:id"
              element={<CreateEditDematAccounts />}
            />

            <Route path="/all_user_strategy" element={<ManageStrategyPage />} />
            <Route
              path="/create_user_strategy"
              element={<CreateEditStrategy />}
            />
            <Route
              path="/edit_user_strategy/:id"
              element={<CreateEditStrategy />}
            />
          </Routes>
        </div>
        <FloatButton
          onClickHandler={handleFloatButtonClick}
          icon={<LIST_FLOAT_SVG />}
        />
      </div>
    </>
  );
}

export default ConsolePage;
