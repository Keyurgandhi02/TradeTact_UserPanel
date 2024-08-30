import React from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../components/FloatButton";
import TradeJournal from "../components/TradeJournal";
import { ADD_FLOAT_SVG } from "../UI/GlobalSVG";

function TradeJournalPage() {
  const navigate = useNavigate();

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate("/create_trade_journal");
  };

  return (
    <>
      <TradeJournal />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<ADD_FLOAT_SVG />}
      />
    </>
  );
}

export default TradeJournalPage;
