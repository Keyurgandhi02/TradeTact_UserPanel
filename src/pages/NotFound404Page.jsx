import React from "react";
import { Link } from "react-router-dom";

function NotFound404Page() {
  return (
    <main className="flex justify-center mt-40 bg-black-200 px-6 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-whiten sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-whiten">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="cursor-pointer rounded-md bg-primary-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound404Page;
