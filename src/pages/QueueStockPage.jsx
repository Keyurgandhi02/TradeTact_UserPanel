import React, { useState } from "react";
import QueueStockForm from "../components/QueueStockForm";
import QueueStockTable from "../components/QueueStockTable";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function QueueStockPage() {
  const initialState = {
    created_at: "",
    scriptName: "",
    stockPrice: "",
    strategyName: "",
    status: "",
  };
  const [isVisible, setVisible] = useState(false);
  const [isUpdateData, setUpdateData] = useState(false);
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
    setUpdateData(true);
    setVisible(false);
  };

  const addData = async (newData) => {
    const ref = collection(db, "queue_stocks_data");
    await addDoc(ref, newData);
    alert("Data Added Successfully!");
  };

  return (
    <>
      <button
        className="btn btn-primary mt-5 ml-5"
        onClick={() => setVisible(!isVisible)}
      >
        Add Queue Stock
      </button>

      {isVisible && (
        <QueueStockForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      )}
      <QueueStockTable updateData={isUpdateData} />
    </>
  );
}

export default QueueStockPage;
