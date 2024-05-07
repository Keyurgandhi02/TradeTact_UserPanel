import React, { useState } from "react";
import GlobalInput from "./GlobalInput";
import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function RiskManagementForm() {
  const initialState = {
    slPrice: "",
    capital_per_trade: "",
    risk_per_trade: "",
    entryPrice: "",
    active_candle_size: "",
    target_candle_size: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isRiskPer, setRiskPer] = useState(0);
  const [isSLPerShare, setSLPerShare] = useState(0);
  const [isQty, setQty] = useState(0);
  const [isTarget, setTarget] = useState(0);

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
    const request_data = {
      ...newData,
      risk_per_trade: isRiskPer,
      sl_per_share: isSLPerShare,
      qty_trade: isQty,
      target_trade: isTarget,
      exit_price: Number(formData?.entryPrice) + isTarget,
    };

    const ref = collection(db, "rm_data");
    await addDoc(ref, request_data);
    alert("Data Added Successfully!");
  };

  useEffect(() => {
    if (formData?.capital_per_trade && formData?.risk_per_trade) {
      let result =
        (formData?.risk_per_trade / formData?.capital_per_trade) * 100;
      setRiskPer(result);
    }
    if (formData?.entryPrice && formData?.slPrice) {
      let result = formData?.entryPrice - formData?.slPrice;
      setSLPerShare(result);
    }
    if (formData?.capital_per_trade && formData?.entryPrice) {
      let result = formData?.capital_per_trade / formData?.entryPrice;
      setQty(result);
    }
    if (formData?.active_candle_size && formData?.target_candle_size) {
      let result = formData?.active_candle_size * formData?.target_candle_size;
      setTarget(Math.floor(result));
    }
  }, [formData]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="pad-bg">
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Capital Per Trade"
                  isValue={formData?.capital_per_trade}
                  name="capital_per_trade"
                  className="form-control"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Risk Per Trade"
                  isValue={formData?.risk_per_trade}
                  name="risk_per_trade"
                  className="form-control"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Entry Price"
                  className="form-control"
                  isValue={formData?.entryPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="entryPrice"
                />
              </div>

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="SL Price"
                  isValue={formData?.slPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="slPrice"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Active Candle Size"
                  isValue={formData?.active_candle_size}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="active_candle_size"
                />
              </div>

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Target Candle Size (Ex. 1:2)"
                  isValue={formData?.target_candle_size}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="target_candle_size"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Calculate Risk & Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RiskManagementForm;
