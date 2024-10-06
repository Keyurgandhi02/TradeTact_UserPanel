import React from "react";
import { useNavigate } from "react-router-dom";
import { ADD_FLOAT_SVG } from "../../assets/svgIcons";
import FloatButton from "../../components/FloatButton";
import { ROI_ROUTES } from "../../constants/routesConstants";
import { ManageReturnPerformance } from "../../components/roi";

function ReturnPerformancePage() {
  const navigate = useNavigate();

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate(ROI_ROUTES.ROI_CREATE);
  };
  return (
    <>
      <ManageReturnPerformance />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<ADD_FLOAT_SVG />}
      />
    </>
  );
}

export default ReturnPerformancePage;
