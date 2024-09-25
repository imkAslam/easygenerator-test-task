import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileSidebar from "./MobileSideBar";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const location = window.location;
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center px-2 bg-white py-2 border-b-[1px] border-black/5">
      <MobileSidebar />
      <div className="flex w-full justify-between items-center">
        <h4>
          {location.pathname
            .split("/")
            .filter(Boolean)
            .map((segment, index, array) => (
              <React.Fragment key={index}>
                <strong>{segment.toUpperCase()}</strong>
                {index < array.length - 1 && <>&nbsp;&gt;&nbsp;</>}
              </React.Fragment>
            ))}
        </h4>
        <div className="flex flex-row justify-between items-center gap-2">
          <strong>{user?.fullName || "N/A"}</strong>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <button className="" type="button" onClick={() => logout()}>
                  Sign out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
