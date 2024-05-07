import React from "react";

function RMList({ rm_data }) {
  return (
    <>
      {rm_data?.map((data) => (
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <span class="mb-2 text-xl">
              Capital:{" "}
              <span class="text-dark font-weight-bold ms-sm-2">
                ₹{data?.capital_per_trade}
              </span>
            </span>

            <span class="mb-2 text-xl">
              Risk(%):{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {Math.floor(data?.risk_per_trade)}
              </span>
            </span>

            <span class="text-xl">
              SL/Share:{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {" "}
                ₹{Math.floor(data?.sl_per_share)}
              </span>
            </span>

            <span class="text-xl">
              Entry Price:{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {" "}
                ₹{Math.floor(data?.entryPrice)}
              </span>
            </span>

            <span class="text-xl">
              Target Price:{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {" "}
                ₹{Math.floor(data?.target_trade)}
              </span>
            </span>

            <span class="text-xl">
              Exit Price:{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {" "}
                ₹{Math.floor(data?.exit_price)}
              </span>
            </span>

            <span class="text-xl">
              SL Price:{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {" "}
                ₹{Math.floor(data?.slPrice)}
              </span>
            </span>

            <span class="text-xl">
              Qty Trade:{" "}
              <span class="text-dark ms-sm-2 font-weight-bold">
                {" "}
                {Math.floor(data?.qty_trade)}
              </span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <button class="btn btn-link text-danger text-gradient px-3 mb-0">
              <i class="material-icons text-sm me-2">delete</i>Delete
            </button>
            <button class="btn btn-link text-dark px-3 mb-0">
              <i class="material-icons text-sm me-2">edit</i>Edit
            </button>
          </div>
        </li>
      ))}
    </>
  );
}

export default RMList;
