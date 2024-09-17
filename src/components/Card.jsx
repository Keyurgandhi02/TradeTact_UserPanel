import React from "react";

function Card({ icon, value, heading, onClickHandler }) {
  return (
    <div
      className={`rounded-md p-6 bg-black-dark-200 ${
        onClickHandler ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={onClickHandler}
    >
      <div>
        <h5 className="text-primary-500 text-md font-semibold leading-none">
          {heading}
        </h5>
      </div>
      <div className="flex items-center mt-6">
        <div className="text-2xl text-whiten font-bold ">{value}</div>
        <div className="rounded-full  text-whiten w-8 h-8 flex ml-auto transition duration-300">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Card;
