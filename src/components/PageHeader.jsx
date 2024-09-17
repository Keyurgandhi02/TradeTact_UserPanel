import React from "react";
import PageHeading from "./PageHeading";

function PageHeader({
  pageTitle,
  isListPage,
  firstData,
  firstDataTitle,
  secondData,
  secondSubData,
}) {
  return (
    <div class="sm:flex sm:items-center sm:justify-between px-6 py-8">
      <div>
        <div class="flex items-center gap-x-3">
          <PageHeading title={pageTitle} isListPage={isListPage} />
          <span class="px-3 py-1 text-xs text-black-dark-200 bg-secondary rounded-full">
            {firstData} {firstDataTitle}
          </span>
        </div>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
          {secondData} records showing out of {secondSubData}
        </p>
      </div>
    </div>
  );
}

export default PageHeader;
