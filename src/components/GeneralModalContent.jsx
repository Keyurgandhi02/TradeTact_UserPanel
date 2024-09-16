import React from "react";

function GeneralModalContent({
  heading,
  description,
  onRejectHandler,
  onSuccessHandler,
  btnTitleReject,
  btnTitleSuccess,
  icon,
}) {
  return (
    <>
      <div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 bg-black-dark-200 rounded-xl">
        <div class="">
          <div class="text-center p-5 flex-auto justify-center">
            {icon}
            <h2 class="text-xl font-bold py-4 text-gray-200">{heading}</h2>
            <p class="text-sm text-gray-500 px-8">{description}</p>
          </div>
          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => onRejectHandler()}
              class="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
            >
              {btnTitleReject}
            </button>
            <button
              onClick={() => onSuccessHandler()}
              class="bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
            >
              {btnTitleSuccess}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralModalContent;
