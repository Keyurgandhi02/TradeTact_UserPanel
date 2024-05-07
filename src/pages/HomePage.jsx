import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import FloatCard from "../components/FloatCard";
import WorldClock from "../components/WorldClock";

function HomePage() {
  const [isFloatShow, setFloatShow] = useState(false);

  const setShowHandler = (status) => {
    setFloatShow(status);
  };
  return (
    <>
      <div className="container-fluid py-4 mt-5">
        <div className="row">
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <Card />
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <Card />
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <Card />
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <Card />
          </div>
        </div>
      </div>
      <WorldClock />

      <div className={`fixed-plugin ${isFloatShow ? "show" : ""}`}>
        <button
          className="fixed-plugin-button text-dark position-fixed px-3 py-2 border-0"
          onClick={() => setFloatShow(true)}
        >
          <i className="material-icons py-2">settings</i>
        </button>
        <FloatCard setShowHandler={setShowHandler} />
      </div>
    </>
  );
}

export default HomePage;
