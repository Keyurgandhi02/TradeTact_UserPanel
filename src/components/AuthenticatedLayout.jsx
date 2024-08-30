import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideDrawer from "./SideDrawer";
import UpdateInfoCard from "./UpdateInfoCard";

const AuthenticatedLayout = () => {
  const [open, setOpen] = useState(false);

  const sendDataToParent = (status) => {
    setOpen(status);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sendDataToParent={sendDataToParent} />
       
        <main>
          <Outlet />
          <SideDrawer
            status={open}
            setOpen={setOpen}
            title="Updates"
            children={<UpdateInfoCard />}
          />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
