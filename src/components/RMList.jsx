import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/mantine";

function RMList() {
  const [nodes, setFetchedData] = useState([]);

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ref = collection(db, "rm_data");
    const snapshot = await getDocs(ref);
    const dataArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchedData(dataArray);
  };

  const COLUMNS = [
    {
      label: "Total Capital (Rs)",
      renderCell: (item) => item.capital_per_trade,
    },
    {
      label: "Risk (%)",
      renderCell: (item) => Math.floor(item.risk_per_trade),
    },
    {
      label: "Stop Loss/share",
      renderCell: (item) => Math.floor(item.sl_per_share),
    },
    {
      label: "Entry Price",
      renderCell: (item) => Math.floor(item.entryPrice),
    },
    {
      label: "Target Price",
      renderCell: (item) => Math.floor(item.target_trade),
    },
    {
      label: "Exit Price",
      renderCell: (item) => Math.floor(item.exit_price),
    },
    {
      label: "SL Price",
      renderCell: (item) => Math.floor(item.slPrice),
    },
    {
      label: "Qty",
      renderCell: (item) => Math.floor(item.qty_trade),
    },
  ];

  const data = { nodes };
  return (
    <div>
      {data && <CompactTable columns={COLUMNS} data={data} theme={theme} />}
    </div>
  );
}

export default RMList;
