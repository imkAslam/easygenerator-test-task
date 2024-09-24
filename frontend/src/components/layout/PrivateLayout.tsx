import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SideBar />
      </div>

      <main className="md:pl-72">
        <Header />
        <div className="p-2 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
