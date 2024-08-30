import React from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../components/FloatButton";
import Watchlist from "../components/Watchlist";
import { ADD_FLOAT_SVG } from "../UI/GlobalSVG";

function WatchlistPage() {
  const navigate = useNavigate();

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate("/create_watchlist");
  };
  return (
    <>
      <Watchlist />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<ADD_FLOAT_SVG />}
      />
    </>
  );
}

export default WatchlistPage;
