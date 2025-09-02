"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import loginApi from "@/api/login-api";
import { setToken } from "@/utils/auth";
import { ROUTE } from "@/constant/route.constants";

interface LoginFormValues {
  username: string;
  password: string;
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate(ROUTE.Home, { replace: true });
      toast.success("✅ Logged in successfully!");
    },
    onError: () => {
      toast.error("❌ Invalid username or password.");
    },
  });

  const onSubmit = (data: LoginFormValues) => mutation.mutate(data);

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
     
      <Card >
      <CardHeader>
  <CardTitle>Login to your account</CardTitle>
  <CardDescription>
    Enter your username and password to login
  </CardDescription>
</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="YourUsername"
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex justify-between items-center ">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className=" ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
