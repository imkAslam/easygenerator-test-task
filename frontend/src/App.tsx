import React from "react";
import AppRouters from "./navigation/Routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouters />
      <Toaster richColors position="top-right" closeButton />
    </AuthProvider>
  );
};

export default App;
