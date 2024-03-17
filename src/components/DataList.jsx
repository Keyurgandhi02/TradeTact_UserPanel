import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/mantine";

function DataList() {
  const [nodes, setFetchedData] = useState([]);
  const [positiveTotal, setPositiveTotal] = useState(0);
  const [negativeTotal, setNegativeTotal] = useState(0);
  const [combinedTotal, setCombinedTotal] = useState(0);

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ref = collection(db, "journal_data");
    const snapshot = await getDocs(ref);
    const dataArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchedData(dataArray);

    let positiveSum = 0;
    let negativeSum = 0;

    dataArray.forEach((item) => {
      const price = parseFloat(item.profitLossPrice);
      if (!isNaN(price)) {
        if (price > 0) {
          positiveSum += price;
        } else {
          negativeSum += price;
        }
      }
    });

    setPositiveTotal(positiveSum);
    setNegativeTotal(negativeSum);
    setCombinedTotal(positiveSum + negativeSum);
  };

  const COLUMNS = [
    {
      label: "Script Name",
      renderCell: (item) => item.scriptName,
    },
    {
      label: "Buy Date",
      renderCell: (item) => item.buyDate,
    },
    {
      label: "Strategy Name",
      renderCell: (item) => item.strategyName,
    },
    {
      label: "Entry Price",
      renderCell: (item) => item.entryPrice,
    },
    {
      label: "SL Price",
      renderCell: (item) => item.slPrice,
    },
    {
      label: "Target Price",
      renderCell: (item) => item.targetPrice,
    },
    {
      label: "Quantity",
      renderCell: (item) => item.quantity,
    },
    {
      label: "Exit Price",
      renderCell: (item) => item.exitPrice,
    },
    {
      label: "Profit Loss Price",
      renderCell: (item) => Math.floor(item.profitLossPrice),
    },
    {
      label: "Emotions When Enter",
      renderCell: (item) => item.emotionsWhenEnter,
    },
    {
      label: "Emotions When Exit",
      renderCell: (item) => item.emotionsWhenExit,
    },
    {
      label: "Learning",
      renderCell: (item) => item.learning,
    },
    {
      label: "Mistake",
      renderCell: (item) => item.mistake,
    },
    {
      label: "Rating",
      renderCell: (item) => item.rating,
    },
    {
      label: "Chart",
      renderCell: (item) => item.chart,
    },
  ];

  const data = { nodes };

  return (
    <div>
      {data && <CompactTable columns={COLUMNS} data={data} theme={theme} />}

      <div
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: 50,
        }}
      >
        <h4 style={{ marginRight: "10px" }}>
          Total Profit (Rs): {Math.floor(positiveTotal)}
        </h4>
        <h4 style={{ marginRight: "10px" }}>
          Total Loss (Rs): {Math.floor(negativeTotal)}
        </h4>
        <h4>Total Amount (Rs): {Math.floor(combinedTotal)}</h4>
      </div>
    </div>
  );
}

export default DataList;
