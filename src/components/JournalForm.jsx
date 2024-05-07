import React from "react";
import GlobalInput from "./GlobalInput";
import "../index.css";

function JournalForm({ handleSubmit, handleChange, formData }) {
  return (
    <div class="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="pad-bg">
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  className="form-control"
                  inputType="text"
                  placeholder="Script Name"
                  isValue={formData?.scriptName}
                  name="scriptName"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="date"
                  className="form-control"
                  placeholder="Buy Date"
                  isValue={formData?.buyDate}
                  name="buyDate"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  className="form-control"
                  placeholder="Strategy Name"
                  isValue={formData?.strategyName}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="strategyName"
                />
              </div>

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Entry Price"
                  isValue={formData?.entryPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="entryPrice"
                />
              </div>
            </div>

            <div className="form-row">
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

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Target Price"
                  isValue={formData?.targetPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="targetPrice"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Quantity"
                  isValue={formData?.quantity}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="quantity"
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Exit Price"
                  isValue={formData?.exitPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="exitPrice"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Profit/Loss Price"
                  isValue={formData?.profitLossPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="profitLossPrice"
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  className="form-control"
                  placeholder="Emotions When Enter"
                  isValue={formData?.emotionsWhenEnter}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="emotionsWhenEnter"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  className="form-control"
                  placeholder="Emotions When Exit"
                  isValue={formData?.emotionsWhenExit}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="emotionsWhenExit"
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  className="form-control"
                  placeholder="Learning"
                  isValue={formData?.learning}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="learning"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  className="form-control"
                  placeholder="Mistake"
                  isValue={formData?.mistake}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="mistake"
                />
              </div>

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Rating out of 5"
                  isValue={formData?.rating}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="rating"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  className="form-control"
                  placeholder="Chart"
                  isValue={formData?.chart}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="chart"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JournalForm;
