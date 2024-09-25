import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/private/Dashboard";
import NotFound from "@/pages/NotFound";
import { useAuth } from "@/context/AuthContext";
import PrivateLayout from "@/components/layout/PrivateLayout";
import { PATH } from "@/lib/constants";

export const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={location.state?.from || PATH.dashboard} replace />
  );
};

export const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <PrivateLayout />
  ) : (
    <Navigate to={PATH.sign_in} state={{ from: location.pathname }} replace />
  );
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
        </Route>

        {/* Catch-all Route */}
        <Route path={PATH.no_page} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouters;
