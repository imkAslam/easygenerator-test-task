import React from "react";
import SignupForm from "@/components/shared-component/SignUpFrom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const SignUp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignUp;
