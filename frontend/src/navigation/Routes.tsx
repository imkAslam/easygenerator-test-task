import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { PATH } from "@/config/constants";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/private/Dashboard";
import Assistants from "@/pages/private/Assistants";
import NotFound from "@/pages/NotFound";
import { useAuth } from "@/context/AuthContext";
import PrivateLayout from "@/components/layout/PrivateLayout";

export const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/" replace />;
};

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoutes />}>
          <Route index path={PATH.sign_in} element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path={PATH.dashboard} element={<Dashboard />} />
          <Route path={PATH.assistant} element={<Assistants />} />
        </Route>

        {/* Catch-all Route */}
        <Route path={PATH.no_page} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouters;
