import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { userLogin } from "@/lib/auth-apis";
import { Loader2 } from "lucide-react";
import { passwordRegex } from "@/lib/constants";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must contain at least 1 letter, 1 number, and 1 special character"
    ),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await userLogin(data);
      toast.success(res.data.message);
      login(res.data.data);
      console.log(res);
    } catch (error) {
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(error)) {
        // If there is a response, use the status and data
        if (error.response) {
          errorMessage =
            error.response.data?.message || "An error occurred during login.";
          console.error("Response Error:", error.response.data);
        } else if (error.request) {
          // No response received
          errorMessage = "No response received from the server.";
          console.error("Request Error:", error.request);
        } else {
          // Other errors
          errorMessage = error.message;
        }
      } else {
        console.error("Generic Error:", error);
      }

      // Display error message in toast
      toast.error("⚠️ Something went wrong!", {
        description: errorMessage,
      });
    }
  };
  // login(data);
  // You can perform login logic here

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your secret password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex justify-center items-center">
                  Sign In
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
