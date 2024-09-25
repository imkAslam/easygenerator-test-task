import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  return (
    <div className="flex h-full relative">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-100">
        <SideBar />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pl-72 w-full">
        <Header />
        <div className="p-2 bg-gray-100 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
