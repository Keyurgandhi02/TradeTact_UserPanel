import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthenticatedLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
