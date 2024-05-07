import React from "react";
import GlobalInput from "./GlobalInput";

function ReturnPerformanceForm({
  handleSubmit,
  handleChange,
  formData,
  returnROI,
  amountReturn,
}) {
  return (
    <div class="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="pad-bg">
            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="month"
                  className="form-control"
                  placeholder="Date"
                  isValue={formData?.created_at}
                  name="created_at"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="text"
                  placeholder="Account Name"
                  className="form-control"
                  isValue={formData?.accountName}
                  name="accountName"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  className="form-control"
                  placeholder="Amount Invested"
                  isValue={formData?.invested_amount}
                  name="invested_amount"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Amount Returned"
                  className="form-control"
                  isValue={formData?.returned_amount}
                  name="returned_amount"
                  onChangeHandler={(name, value) => handleChange(name, value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Total Return(%)"
                  className="form-control"
                  isValue={returnROI}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="returnPercentage"
                  disabledStatus={true}
                />
              </div>

              <div className="form-group col-md-6">
                <GlobalInput
                  inputType="number"
                  placeholder="Total Return(Rupees)"
                  className="form-control"
                  isValue={amountReturn}
                  onChangeHandler={(name, value) => handleChange(name, value)}
                  name="returnAmount"
                  disabledStatus={true}
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

export default ReturnPerformanceForm;
