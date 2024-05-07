import React, { useState } from "react";
import JournalForm from "../components/JournalForm";
import JournalTable from "../components/JournalTable";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function JournalPage() {
  const initialState = {
    scriptName: "",
    buyDate: "",
    strategyName: "",
    entryPrice: "",
    slPrice: "",
    targetPrice: "",
    quantity: "",
    exitPrice: "",
    profitLossPrice: "",
    emotionsWhenEnter: "",
    emotionsWhenExit: "",
    learning: "",
    mistake: "",
    rating: "",
    chart: "",
  };

  const [isVisible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);

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
    setVisible(false);
  };

  const addData = async (newData) => {
    const ref = collection(db, "journal_data");
    await addDoc(ref, newData);
    alert("Data Added Successfully!");
  };

  return (
    <>
      <button
        className="btn btn-primary mt-5 ml-5"
        onClick={() => setVisible(!isVisible)}
      >
        Add Journal Data
      </button>
      {isVisible && (
        <JournalForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      )}

      <JournalTable />
    </>
  );
}

export default JournalPage;
