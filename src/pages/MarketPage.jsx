import React from "react";
import { EconomicCalendar } from "react-ts-tradingview-widgets";
import CardTitle from "../components/CardTitle";

function MarketPage() {
  return (
    <>
      <div className="p-3 grid grid-cols-1 gap-4 md:grid-cols-12 lg:grid-cols-12 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-4 lg:col-span-4 rounded-md bg-black-dark-200 px-4 py-5  shadow-default sm:px-7.5 flex flex-col">
          <CardTitle title="Market Events" />
          <EconomicCalendar
            colorTheme="dark"
            isTransparent={true}
            width="100%"
            showSymbolLogo={false}
            countryFilter="in"
          ></EconomicCalendar>
        </div>
      </div>
    </>
  );
}

export default MarketPage;
