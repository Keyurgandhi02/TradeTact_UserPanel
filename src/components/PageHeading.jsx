import React from "react";

function PageHeading({ title, isListPage }) {
  return (
    <div className={`${isListPage ? "px-0" : "px-2 md:px-4 xl:px-3.5"} py-2`}>
      <h3
        className={`${
          isListPage ? "text-xl" : "text-3xl"
        } font-bold text-primary-400`}
      >
        {title}
      </h3>
    </div>
  );
}

export default PageHeading;
