import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components/layout/SideBar";

const MobileSidebar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden bg-gray-50 shadow-sm p-1 rounded">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-60 md:w-72 te">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
