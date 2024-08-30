import React from "react";

function DataCardItem({ title, data }) {
  return (
    <div>
      <p className="text-sm font-semibold text-whiten mb-1">{title}</p>
      <p className="text-sm font-normal text-gray-500">{data ? data : "NA"}</p>
    </div>
  );
}

export default DataCardItem;
