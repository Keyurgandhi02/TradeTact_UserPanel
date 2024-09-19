import React from "react";

function Card({ icon, value, heading }) {
  return (
    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-black-dark-200 shadow-soft-xl rounded-md bg-clip-border">
      <div className="flex-auto p-5">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-2 font-sans font-semibold leading-normal text-sm text-gray-500">
                {heading}
              </p>
              <h5 className="mb-0 font-bold text-whiten mt-1">{value}</h5>
            </div>
          </div>
          <div className="w-4/12 max-w-full  ml-auto text-right flex-0">
            <div className="inline-block items-center justify-center w-10 h-10">
              <div className="text-lg text-center text-secondary">{icon}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
