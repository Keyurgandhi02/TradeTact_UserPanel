import React from "react";
import GlobalButton from "./GlobalButton";

function GeneralModalContent({
  heading,
  description,
  onRejectHandler,
  onSuccessHandler,
  btnTitleReject,
  btnTitleSuccess,
}) {
  return (
    <>
      <div class="bg-black-dark-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div class="mt-5 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              class="text-lg font-semibold leading-6 text-whiten"
              id="modal-title"
            >
              {heading}
            </h3>
            <div class="mt-2">
              <p class="text-md text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 sm:flex sm:flex-row-reverse sm:px-6">
        <div className="w-full">
          <GlobalButton
            btnTitle={btnTitleReject}
            disabled={false}
            type="button"
            onButtonClickHandler={onRejectHandler}
            bgColor="bg-red-500"
            textColor=""
          />
        </div>

        <div className="mx-2 w-full">
          <GlobalButton
            btnTitle={btnTitleSuccess}
            disabled={false}
            type="button"
            onButtonClickHandler={onSuccessHandler}
            bgColor="bg-green-500"
            textColor=""
          />
        </div>
      </div>
    </>
  );
}

export default GeneralModalContent;
