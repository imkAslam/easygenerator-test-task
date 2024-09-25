import React from "react";
import { FlowerIcon } from "lucide-react";
import LoginForm from "@/components/shared-component/SigninForm";

const Login: React.FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <a href="#">
            <FlowerIcon className="h-10 w-10 text-primary" />
            <span className="sr-only">Test Task</span>
          </a>
        </div>
        <LoginForm />
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
