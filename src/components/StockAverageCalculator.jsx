import React, { useState } from "react";
import GlobalInput from "./GlobalInput";

const StockAverageCalculator = () => {
  const [totalShares1, setTotalShares1] = useState("");
  const [totalCost1, setTotalCost1] = useState("");
  const [totalShares2, setTotalShares2] = useState("");
  const [totalCost2, setTotalCost2] = useState("");
  const [averagePrice, setAveragePrice] = useState("");

  const calculateAveragePrice = () => {
    if (!totalShares1 || !totalCost1 || !totalShares2 || !totalCost2) {
      alert("Please enter all values.");
      return;
    }

    const shares1 = parseFloat(totalShares1);
    const cost1 = parseFloat(totalCost1);
    const shares2 = parseFloat(totalShares2);
    const cost2 = parseFloat(totalCost2);

    if (isNaN(shares1) || isNaN(cost1) || isNaN(shares2) || isNaN(cost2)) {
      alert("Please enter valid numbers.");
      return;
    }

    const totalShares = shares1 + shares2;
    const totalCost = cost1 + cost2;
    const average = (totalCost / totalShares).toFixed(2);
    setAveragePrice(average);
  };

  return (
    <div>
      <h2>Stock Average Price Calculator</h2>
      <div className="form-row">
        <div className="form-group col-md-6">
          <GlobalInput
            inputType="number"
            placeholder="Total Shares (Trade 1):"
            isValue={totalShares1}
            name="shares_trade1"
            className="form-control"
            onChangeHandler={(name, value) => setTotalShares1(name, value)}
          />
        </div>
        <div className="form-group col-md-6">
          <GlobalInput
            inputType="number"
            placeholder="Total Cost (Trade 1):"
            isValue={totalCost1}
            name="cost_trade1"
            className="form-control"
            onChangeHandler={(name, value) => setTotalCost1(name, value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <GlobalInput
            inputType="number"
            placeholder="Total Shares (Trade 2):"
            isValue={totalShares2}
            name="shares_trade2"
            className="form-control"
            onChangeHandler={(name, value) => setTotalShares2(name, value)}
          />
        </div>
        <div className="form-group col-md-6">
          <GlobalInput
            inputType="number"
            placeholder="Total Cost (Trade 2):"
            isValue={totalCost2}
            name="cost_trade2"
            className="form-control"
            onChangeHandler={(name, value) => setTotalCost2(name, value)}
          />
        </div>
      </div>

      <button onClick={calculateAveragePrice}>Calculate Average Price</button>
      {averagePrice && <p>Average Price per Share: {averagePrice}</p>}
    </div>
  );
};

export default StockAverageCalculator;
