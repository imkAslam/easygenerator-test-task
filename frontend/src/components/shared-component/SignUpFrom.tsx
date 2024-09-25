import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordRegex } from "@/lib/constants";
import { toast } from "sonner";
import axios from "axios";
import { userSignUp } from "@/lib/auth-apis";
import { useAuth } from "@/context/AuthContext";

const formSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        passwordRegex,
        "Password must contain at least 1 letter, 1 number, and 1 special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const { login } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const res = await userSignUp(
        Object.defineProperty(data, "confirmPassword", {
          enumerable: false,
        })
      );
      toast.success(res.data.message);
      login(res.data.data);
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
  }
  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
