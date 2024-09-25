import React from "react";
import { cn } from "@/lib/utils";

import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_MENU } from "@/lib/constants";

const SideBar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="grid place-content-center">
        <Link to="/dashboard" className="border-gray-100  text-white ">
          <h1 className="text-xl font-bold">geneasy test</h1>
        </Link>
      </div>
      <div className="px-3 py-2 flex-1">
        <div className="space-y-2">
          {SIDEBAR_MENU?.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={cn(
                "text-sm flex p-3 font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-md transition",
                menu.path === location?.pathname
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <menu.icon className={cn("h-5 w-5 mr-3", menu.color)} />
                {menu.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
