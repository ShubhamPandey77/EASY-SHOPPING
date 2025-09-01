import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "../../utils/auth";
import loginApi from "../../api/login-api";
import toast, { Toaster } from "react-hot-toast";
import { ROUTE } from "../../constant/route.constants";


interface LoginForm {
  username: string;
  password: string;
}

function LoginUser() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate(ROUTE.Home, { replace: true });
      toast.success("✅ Logged in successfully!");
    },
    onError: () => {
      toast.error("❌ You entered the wrong username or password.");
    },
  });

  return (
    <>
      <Toaster position="top-center" />

      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 px-4">
        <div className="bg-white/95 backdrop-blur-md p-8 w-full max-w-md rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800">
              Log In To Continue 🚀
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Enter your credentials below
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
            className="space-y-6"
          >
            {/* Username */}
            <div>
              <label className="font-semibold text-gray-700 block mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="YourUsername"
                {...register("username", { required: "Username is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-gray-700 block mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="YourPassword"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 transition"
            >
              {mutation.isPending ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
