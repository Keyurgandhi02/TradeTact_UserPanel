import React, { useState } from "react";
import ReturnPerformanceForm from "../components/ReturnPerformanceForm";
import ReturnPerformanceTable from "../components/ReturnPerformanceTable";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";

function ReturnPerformancePage() {
  const [roi, setRoi] = useState("");

  const initialState = {
    created_at: "",
    accountName: "",
    returnPercentage: "",
    returnAmount: "",
    invested_amount: "",
    returned_amount: "",
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

  console.log("form", formData);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ...formData,
      returnPercentage: roi,
      returnAmount: formData?.returned_amount - formData?.invested_amount,
    };
    addData(data);
    setFormData(initialState);
    setUpdateData(true);
    setVisible(false);
  };

  const addData = async (newData) => {
    const ref = collection(db, "return_performance_data");
    await addDoc(ref, newData);
    alert("Data Added Successfully!");
  };

  useEffect(() => {
    if (formData?.invested_amount && formData?.returned_amount) {
      calculateROI(formData?.invested_amount, formData?.returned_amount);
    }
  }, [formData?.invested_amount, formData?.returned_amount]);

  const calculateROI = (investment, returnAmount) => {
    const investmentNum = parseFloat(investment);
    const returnAmountNum = parseFloat(returnAmount);

    if (isNaN(investmentNum) || isNaN(returnAmountNum)) {
      alert("Please enter valid numbers");
      return;
    }

    const roiResult = ((returnAmountNum - investmentNum) / investmentNum) * 100;
    setRoi(roiResult.toFixed(2));
  };

  return (
    <>
      <button
        className="btn btn-primary mt-5 ml-5"
        onClick={() => setVisible(!isVisible)}
      >
        Add Performance
      </button>

      {isVisible && (
        <ReturnPerformanceForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          returnROI={roi}
          amountReturn={formData?.returned_amount - formData?.invested_amount}
        />
      )}
      <ReturnPerformanceTable updateData={isUpdateData} />
    </>
  );
}

export default ReturnPerformancePage;
