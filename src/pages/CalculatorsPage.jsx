import React from "react";
import CalcCards from "../components/CalcCards";

function CalculatorsPage() {
  return (
    <>
      <div class="container-fluid py-4">
        <div class="row">
          <div class="col-md-4 col-4">
            <CalcCards
              title="Stock Average Calculator"
              btntitle="open"
              route="/stock-avg-calculator"
            />
          </div>

          <div class="col-md-4 col-4">
            <CalcCards title="Stock Average Calculator" btntitle="open" />
          </div>

          <div class="col-md-4 col-4">
            <CalcCards title="Stock Average Calculator" btntitle="open" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-4 col-4">
            <CalcCards title="Stock Average Calculator" btntitle="open" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CalculatorsPage;
