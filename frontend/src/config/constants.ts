import { Bot, LayoutDashboard, MessageSquare } from "lucide-react";

export const PATH = {
  no_page: "*",
  sign_in: "/",
  sign_up: "/sign-up",
  forget_password: "/forget-password",
  reset_password: "/reset-password",
  profile_page: "/profile",
  dashboard: "/dashboard",
  assistant: "/assistants",
  conversations: "/conversations",
};

export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    path: PATH.dashboard,
    icon: LayoutDashboard,
    color: "text-sky-400",
  },
  {
    title: "Assistants",
    path: PATH.assistant,
    icon: Bot,
    color: "text-emerald-700",
  },
  {
    title: "Conversation",
    icon: MessageSquare,
    path: PATH.conversations,
    color: "text-violet-500",
  },
];
