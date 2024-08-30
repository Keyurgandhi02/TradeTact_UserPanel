import React from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../components/FloatButton";
import { ADD_FLOAT_SVG } from "../UI/GlobalSVG";
import ManageStrategy from "../components/ManageStrategy";

function ManageStrategyPage() {
  const navigate = useNavigate();

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate("/create_user_strategy");
  };

  return (
    <>
      <ManageStrategy />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<ADD_FLOAT_SVG />}
      />
    </>
  );
}

export default ManageStrategyPage;
