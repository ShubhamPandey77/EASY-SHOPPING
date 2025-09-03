"use client";
import { useState } from "react";
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
import { Eye, EyeOff, User, Lock, Store, Loader2 } from "lucide-react";

interface LoginFormValues {
  username: string;
  password: string;
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  // Watch form values for enhanced UX
  const watchedUsername = watch("username");
  const watchedPassword = watch("password");

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate(ROUTE.Home, { replace: true });
      toast.success("Welcome back! 🎉", {
        duration: 3000,
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
    },
    onError: (error: any) => {
      toast.error("Invalid credentials. Please try again.", {
        duration: 4000,
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    },
  });

  const onSubmit = (data: LoginFormValues) => mutation.mutate(data);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Store className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue to Easy Shopping</p>
        </div>
      </div>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
        <CardHeader className="space-y-4 pb-8 pt-8 px-8">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="username" 
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username (e.g., emilys)"
                  className={cn(
                    "h-12 px-4 bg-gray-50 border-gray-200 rounded-xl transition-all duration-200",
                    "focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
                    "placeholder:text-gray-400",
                    errors.username && "border-red-400 focus:border-red-400 focus:ring-red-100",
                    watchedUsername && "bg-white border-blue-200"
                  )}
                  {...register("username", { 
                    required: "Username is required",
                    minLength: {
                      value: 2,
                      message: "Username must be at least 2 characters"
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username can only contain letters, numbers, and underscores"
                    }
                  })}
                />
                {watchedUsername && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              {errors.username && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                  {errors.username.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label 
                  htmlFor="password" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                  onClick={() => {
                    toast("Password recovery coming soon!", {
                      icon: 'ℹ️',
                      duration: 3000,
                    });
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password (min. 6 characters)"
                  className={cn(
                    "h-12 px-4 pr-12 bg-gray-50 border-gray-200 rounded-xl transition-all duration-200",
                    "focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
                    "placeholder:text-gray-400",
                    errors.password && "border-red-400 focus:border-red-400 focus:ring-red-100",
                    watchedPassword && "bg-white border-blue-200"
                  )}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {watchedPassword && !errors.password && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className={cn(
                  "w-full h-12 font-semibold rounded-xl transition-all duration-200 text-base",
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                  "shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                )}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </div>

            {/* Demo Credentials Helper */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-center space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Demo Credentials</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><span className="font-medium">Username:</span> emilys</p>
                  <p><span className="font-medium">Password:</span> emilyspass</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Auto-fill demo credentials
                    const usernameInput = document.getElementById('username') as HTMLInputElement;
                    const passwordInput = document.getElementById('password') as HTMLInputElement;
                    if (usernameInput && passwordInput) {
                      usernameInput.value = 'emilys';
                      passwordInput.value = 'emilyspass';
                      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
                      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Use demo credentials
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600">
        <p>
          New to Easy Shopping?{' '}
          <button 
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            onClick={() => {
              toast("Registration coming soon!", {
                icon: '🚀',
                duration: 3000,
              });
            }}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}