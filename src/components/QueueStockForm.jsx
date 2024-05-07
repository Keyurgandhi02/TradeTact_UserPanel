import React from "react";
import GlobalInput from "./GlobalInput";

function QueueStockForm({ handleSubmit, handleChange, formData }) {
  return (
    <div class="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="pad-bg">
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="date"
                  className="form-control"
                  placeholder="Buy Date"
                  isValue={formData?.created_at}
                  name="created_at"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  placeholder="Script Name"
                  className="form-control"
                  isValue={formData?.scriptName}
                  name="scriptName"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  placeholder="Strategy Name"
                  className="form-control"
                  isValue={formData?.strategyName}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="strategyName"
                />
              </div>

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Stock Price"
                  className="form-control"
                  isValue={formData?.stockPrice}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="stockPrice"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  placeholder="Status"
                  className="form-control"
                  isValue={formData?.status}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="status"
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

export default QueueStockForm;
