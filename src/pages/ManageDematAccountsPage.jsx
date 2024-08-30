import React from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../components/FloatButton";
import { ADD_FLOAT_SVG } from "../UI/GlobalSVG";
import ManageDematAccounts from "../components/ManageDematAccounts";

function ManageDematAccountsPage() {
  const navigate = useNavigate();

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate("/create_demat_accounts");
  };

  return (
    <>
      <ManageDematAccounts />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<ADD_FLOAT_SVG />}
      />
    </>
  );
}

export default ManageDematAccountsPage;
