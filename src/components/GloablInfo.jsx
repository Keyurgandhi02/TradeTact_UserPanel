import React from "react";
import { Link } from "react-router-dom";

function GloablInfo({ firstTitle, secondTitle, desc, linktitle, link }) {
  return (
    <main className="flex justify-center mt-40 bg-black-200 px-6 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-primary">{firstTitle}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-whiten sm:text-5xl">
          {secondTitle}
        </h1>
        <p className="mt-6 text-base leading-7 text-whiten">
         {desc}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={link}
            className="cursor-pointer rounded-md bg-primary-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          >
            {linktitle}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default GloablInfo;
