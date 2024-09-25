import { LayoutDashboard } from "lucide-react";

export const PATH = {
  no_page: "*",
  sign_in: "/",
  sign_up: "/sign-up",
  forget_password: "/forget-password",
  reset_password: "/reset-password",
  profile_page: "/profile",
  dashboard: "/dashboard",
};

export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    path: PATH.dashboard,
    icon: LayoutDashboard,
    color: "text-sky-400",
  },
];

export const BASE_URL = "http://localhost:3001/api";
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
