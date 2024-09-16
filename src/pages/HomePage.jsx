import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { getFirebaseData } from "../config/firestoreOperations";
import { formatNumber } from "../config/helper";
import { FIREBASE_ENDPOINTS } from "../constants/apiConstants";
import { useAuth } from "../store/AuthContext";
import {
  GainSVG,
  LossSVG,
  MINUS_SVG,
  PLUS_SVG,
  RealizedPLSVG,
  TotalTradesSVG,
} from "../UI/GlobalSVG";
import CardTitle from "../components/CardTitle";
import { useLoading } from "../store/LoadingContext";
import { useNavigate } from "react-router-dom";
import UpdateInfoCard from "../components/UpdateInfoCard";
import { EconomicCalendar } from "react-ts-tradingview-widgets";

function HomePage() {
  const { currentUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [fetchedData, setFetchedData] = useState([]);
  const navigate = useNavigate();

  // Fetch Trade Data
  const fetchData = useCallback(async () => {
    const fetchedTasks = await getFirebaseData(
      FIREBASE_ENDPOINTS.MASTER_DATA,
      currentUser.uid,
      FIREBASE_ENDPOINTS.USER_TRADE_JOURNAL,
      startLoading,
      stopLoading,
      "desc",
      "buyDate"
    );

    setFetchedData(fetchedTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

  // Compute Trade Data
  const computedData = useMemo(() => {
    let positiveTotal = 0;
    let negativeTotal = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    fetchedData.forEach((item) => {
      const price = parseFloat(item?.profitLossPrice);
      if (!isNaN(price)) {
        if (price > 0) {
          positiveTotal += price;
          positiveCount += 1;
        } else {
          negativeTotal += price;
          negativeCount += 1;
        }
      }
    });

    return {
      positiveTotal,
      negativeTotal,
      combinedTotal: positiveTotal + negativeTotal,
      positiveCount,
      negativeCount,
    };
  }, [fetchedData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-12 lg:grid-cols-12 2xl:gap-7.5">
        {/* First Column: All Cards */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-4 mt-5">
          <div className="space-y-4">
            <Card
              icon={<GainSVG />}
              onClickHandler={() => navigate("/all_trade_journal")}
              heading="Winning Trades"
              value={computedData.positiveCount}
            />
            <Card
              icon={<LossSVG />}
              heading="Lossing Trades"
              onClickHandler={() => navigate("/all_trade_journal")}
              value={computedData.negativeCount}
            />
            <Card
              icon={<TotalTradesSVG />}
              heading="Total Trades"
              onClickHandler={() => navigate("/all_trade_journal")}
              value={fetchedData.length}
            />
          </div>
          <div className="space-y-4">
            <Card
              icon={<PLUS_SVG />}
              heading="Overall Gain"
              value={formatNumber(computedData.positiveTotal)}
            />
            <Card
              icon={<MINUS_SVG />}
              heading="Overall Loss"
              value={formatNumber(computedData.negativeTotal)}
            />
            <Card
              icon={<RealizedPLSVG />}
              heading="Realized P&L"
              value={formatNumber(computedData.combinedTotal)}
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-5 rounded-xl bg-black-dark-200 px-4 py-5 mt-5 shadow-default sm:px-7.5 flex flex-col">
          <CardTitle title="Market Updates" />
          <div className="h-full overflow-y-auto no-scrollbar">
            <UpdateInfoCard />
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-4 rounded-xl bg-black-dark-200 px-4 py-5 mt-5 shadow-default sm:px-7.5 flex flex-col">
          <CardTitle title="Market Events" />
          <EconomicCalendar
            colorTheme="dark"
            isTransparent={true}
            width="100%"
            showSymbolLogo={false}
            countryFilter="in"
          ></EconomicCalendar>
        </div>
      </div>
    </>
  );
}

export default HomePage;
