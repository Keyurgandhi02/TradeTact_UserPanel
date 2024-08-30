import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnPerformance from "../components/ReturnPerformance";
import { ADD_FLOAT_SVG } from "../UI/GlobalSVG";
import FloatButton from "../components/FloatButton";

function ReturnPerformancePage() {
  const navigate = useNavigate();

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate("/create_return_performance");
  };
  return (
    <>
      <ReturnPerformance />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<ADD_FLOAT_SVG />}
      />
    </>
  );
}

export default ReturnPerformancePage;
