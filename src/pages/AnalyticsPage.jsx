import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getFirebaseData } from "../config/firestoreOperations";
import { FIREBASE_ENDPOINTS } from "../constants/apiConstants";
import { useAuth } from "../store/AuthContext";
import { useLoading } from "../store/LoadingContext";
import ApexCharts from "../components/ApexCharts";
import Chart from "react-apexcharts";
import { formatNumber } from "../config/helper";
import NoRecordFound from "../components/NoRecordFound";
import LongCard from "../components/LongCard";
import LongCardItem from "../components/LongCardItem";
import CardTitle from "../components/CardTitle";
import {
  TRADE_ANALYSIS_DETAILS_COLUMNS,
  TRADE_ANALYSIS_USER_COLUMNS,
} from "../constants/Columns";
function AnalyticsPage() {
  const { currentUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [fetchedData, setFetchedData] = useState([]);

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
    const userTrades = {};
    const monthlyData = {};
    const userMonthlyData = {};

    fetchedData.forEach((item) => {
      const user = item?.dematUser;
      const date =
        item?.buyDate && format(parseISO(item.buyDate), "yyyy-MM-dd");
      const plDate =
        item?.buyDate && format(parseISO(item.buyDate), "MMMM yyyy");

      // Calculate Trade Date wise
      if (user) {
        if (!userTrades[user]) userTrades[user] = {};
        if (date) {
          userTrades[user][date] = (userTrades[user][date] || 0) + 1;
        }
      }

      if (!monthlyData[plDate]) {
        monthlyData[plDate] = {
          totalProfitLoss: 0,
          totalItems: 0,
          profitCount: 0,
          lossCount: 0,
          totalBought: 0,
          totalSold: 0,
        };
      }

      // Initialize userMonthlyData for that user and month
      if (!userMonthlyData[user]) userMonthlyData[user] = {};
      if (!userMonthlyData[user][plDate]) {
        userMonthlyData[user][plDate] = {
          totalProfitLoss: 0,
          totalItems: 0,
          profitCount: 0,
          lossCount: 0,
          totalBought: 0,
          totalSold: 0,
        };
      }

      const entryValue = item?.entryPrice * item?.quantity;
      const exitValue = item?.exitPrice * item?.quantity;
      const profitLoss = parseFloat(item?.profitLossPrice);

      monthlyData[plDate].totalProfitLoss += profitLoss;
      monthlyData[plDate].totalItems += 1;
      monthlyData[plDate].totalBought += entryValue;
      monthlyData[plDate].totalSold += exitValue;

      if (profitLoss > 0) {
        monthlyData[plDate].profitCount += 1;
      } else {
        monthlyData[plDate].lossCount += 1;
      }

      // User monthly data
      userMonthlyData[user][plDate].totalProfitLoss += profitLoss;
      userMonthlyData[user][plDate].totalItems += 1;
      userMonthlyData[user][plDate].totalBought += entryValue;
      userMonthlyData[user][plDate].totalSold += exitValue;

      if (profitLoss > 0) {
        userMonthlyData[user][plDate].profitCount += 1;
      } else {
        userMonthlyData[user][plDate].lossCount += 1;
      }
    });

    const allDates = Array.from(
      new Set(Object.values(userTrades).flatMap(Object.keys))
    ).sort();

    const apexChartData = {
      series: Object.keys(userTrades).map((user) => ({
        name: user,
        data: allDates.map((date) => userTrades[user][date] || 0),
      })),
      categories: allDates,
    };

    const userCounts = Object.keys(userTrades).map((user) => ({
      label: user,
      count: Object.values(userTrades[user]).reduce((a, b) => a + b, 0),
    }));

    return {
      apexChartData,
      userCounts,
      monthlyData,
      userMonthlyData,
    };
  }, [fetchedData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const rowsData = Object.keys(computedData.monthlyData).map((month) => ({
    month,
    totalItems: computedData.monthlyData[month].totalItems,
    profitCount: computedData.monthlyData[month].profitCount,
    lossCount: computedData.monthlyData[month].lossCount,
    totalProfitLoss: formatNumber(
      computedData.monthlyData[month].totalProfitLoss
    ),
    totalBought: formatNumber(computedData.monthlyData[month].totalBought),
    totalSold: formatNumber(computedData.monthlyData[month].totalSold),
  }));

  // Helper to get sorted months in descending order
  const getSortedMonths = (userMonthlyData) => {
    const allMonths = new Set();

    Object.keys(userMonthlyData).forEach((user) => {
      Object.keys(userMonthlyData[user]).forEach((month) => {
        allMonths.add(month);
      });
    });

    return Array.from(allMonths).sort((a, b) => new Date(b) - new Date(a)); // Sort in descending order (latest first)
  };

  // Generate rowsData
  const rowsData1 = getSortedMonths(computedData.userMonthlyData).flatMap(
    (month) =>
      Object.keys(computedData.userMonthlyData)
        .map((user) => {
          const userMonthData = computedData.userMonthlyData[user]?.[month];

          // If the user has no data for that month, skip the row
          if (!userMonthData) return null;

          return {
            user,
            month,
            totalItems: userMonthData.totalItems || 0,
            profitCount: userMonthData.profitCount || 0,
            lossCount: userMonthData.lossCount || 0,
            totalProfitLoss: formatNumber(userMonthData.totalProfitLoss || 0),
            totalBought: formatNumber(userMonthData.totalBought || 0),
            totalSold: formatNumber(userMonthData.totalSold || 0),
          };
        })
        .filter(Boolean) // Filter out any `null` values
  );

  return (
    <>
      {fetchedData.length > 0 ? (
        <>
          <div className="p-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:mt-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 md:col-span-9 rounded-xl bg-black-dark-200 px-4 py-5 shadow-default sm:px-7.5">
              <ApexCharts
                series={computedData.apexChartData.series}
                categories={computedData.apexChartData.categories}
              />
            </div>

            {/* Right Donut Chart Container */}
            <div className="col-span-12 md:col-span-3 rounded-xl bg-black-dark-200 px-4 py-5 shadow-default sm:px-7.5">
              <CardTitle title="Trade User Analysis" />
              <div className="border-b mb-5 border-black-dark-300"></div>
              <div className="donut">
                <Chart
                  options={{
                    labels: computedData.userCounts.map((user) => user.label),
                    legend: { position: "bottom" },
                    chart: { foreColor: "#fff" },
                    stroke: { colors: ["#282828"] },
                  }}
                  series={computedData.userCounts.map((user) => user.count)}
                  type="donut"
                  height={450}
                />
              </div>
            </div>
          </div>

          <div className="p-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:mt-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 md:col-span-12 rounded-xl bg-black-dark-200 px-4 py-5 shadow-default sm:px-7.5">
              <CardTitle title="Trade Details Analysis" />
              <div className="h-100 overflow-y-auto no-scrollbar">
                {rowsData.map((item, i) => (
                  <LongCard
                    children={
                      <>
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[0]}
                          value={item?.month}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[1]}
                          value={item?.totalItems}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[2]}
                          value={item?.profitCount}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[3]}
                          value={item?.lossCount}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[4]}
                          value={item?.totalProfitLoss}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[5]}
                          value={item?.totalBought}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_DETAILS_COLUMNS[6]}
                          value={item?.totalSold}
                        />
                      </>
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:mt-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 md:col-span-12 rounded-xl bg-black-dark-200 px-4 py-5 shadow-default sm:px-7.5">
              <CardTitle title="Trade Details Analysis" />
              <div className="h-100 overflow-y-auto no-scrollbar">
                {rowsData1.map((item, i) => (
                  <LongCard
                    children={
                      <>
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[0]}
                          value={item?.user}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[1]}
                          value={item?.month}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[2]}
                          value={item?.totalItems}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[3]}
                          value={item?.profitCount}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[4]}
                          value={item?.lossCount}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[5]}
                          value={item?.totalProfitLoss}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[6]}
                          value={item?.totalBought}
                        />
                        <LongCardItem
                          heading={TRADE_ANALYSIS_USER_COLUMNS[7]}
                          value={item?.totalSold}
                        />
                      </>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
}

export default AnalyticsPage;
