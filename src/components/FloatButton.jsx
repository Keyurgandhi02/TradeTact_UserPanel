import React from "react";

function FloatButton({ onClickHandler, icon }) {
  return (
    <div className="fixed bottom-8 right-8">
      <button
        onClick={onClickHandler}
        className="bg-primary-300 hover:bg-opacity-90 text-whiten font-bold py-4 px-4 rounded-full shadow-lg"
      >
        {icon}
      </button>
    </div>
  );
}

export default FloatButton;
