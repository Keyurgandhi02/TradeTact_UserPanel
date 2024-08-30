import React from "react";
import toast, { Toaster } from "react-hot-toast";

import GlobalButton from "../components/GlobalButton";

import { useAuth } from "../store/AuthContext";
import { useLoading } from "../store/LoadingContext";

function DownloadsPage() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-10">
      <div className="rounded-lg w-1/2 grid grid-cols-12 bg-black-dark-200 shadow p-6 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
        <div class="col-span-9 xl:ml-5">
          <p class="text-whiten text-xl font-semibold">Hello</p>
        </div>
        <div class="col-span-12 md:col-span-3">
          <GlobalButton
            btnTitle="Download"
            disabled={false}
            type="button"
            // onButtonClickHandler={}
            bgColor="bg-primary-200"
          />
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default DownloadsPage;
