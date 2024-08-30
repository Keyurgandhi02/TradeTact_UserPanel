import React from "react";

function NoRecordFound() {
  return (
    <div className="flex flex-col mt-5">
      <img
        className="w-250 h-150 mx-auto"
        src="https://firebasestorage.googleapis.com/v0/b/smk24-6f0bf.appspot.com/o/file.png?alt=media&token=46a19701-50a4-40bc-a245-f0431907190d"
        alt="No Record Found!"
      ></img>
      <h3 className="justify-center font-semibold text-center mt-5 text-lg text-primary-300 sm:text-title-xl2">
        No Data Found!
      </h3>
    </div>
  );
}

export default NoRecordFound;
