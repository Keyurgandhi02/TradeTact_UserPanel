import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import "./AddJournalForm.css";
import GlobalInput from "./GlobalInput";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/mantine";

function QueueStocks() {
  const initialState = {
    scriptName: "",
    stockPrice: "",
    strategyName: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [nodes, setFetchedData] = useState([]);

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(mantineTheme);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addData(formData);
    setFormData(initialState);
  };

  const addData = async (newData) => {
    const ref = collection(db, "queue_stocks_data");
    await addDoc(ref, newData);
    alert("Data Added Successfully!");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ref = collection(db, "queue_stocks_data");
    const snapshot = await getDocs(ref);
    const dataArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchedData(dataArray);
  };

  const COLUMNS = [
    {
      label: "Script Name",
      renderCell: (item) => item.scriptName,
    },
    {
      label: "Strategy Name",
      renderCell: (item) => item.strategyName,
    },
    {
      label: "Stock Price",
      renderCell: (item) => item.stockPrice,
    },
  ];

  const data = { nodes };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="forms">
          <h2 className="title">Add Queue Stocks</h2>
          <div className="subContainer">
            <GlobalInput
              inputType="text"
              placeholder="Script Name"
              isValue={formData?.scriptName}
              name="scriptName"
              onChangeHandler={(name, value) => handleChange(name, value)}
            />
            <GlobalInput
              inputType="text"
              placeholder="Strategy Name"
              isValue={formData?.strategyName}
              onChangeHandler={(name, value) => handleChange(name, value)}
              name="strategyName"
            />

            <GlobalInput
              inputType="number"
              placeholder="Stock Price"
              isValue={formData?.stockPrice}
              onChangeHandler={(name, value) => handleChange(name, value)}
              name="stockPrice"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      {data && <CompactTable columns={COLUMNS} data={data} theme={theme} />}
    </>
  );
}

export default QueueStocks;
