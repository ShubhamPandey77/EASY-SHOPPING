import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "../../utils/auth";
import axiosInstance from "../../utils/axiosInstance";

// Schema
const formSchema = z.object({
  username: z.string().min(2, "Min 2 chars").max(12, "Max 12 chars"),
  password: z.string().min(2, "Min 2 chars").max(12, "Max 12 chars"),
});

type FormData = z.infer<typeof formSchema>;

async function loginApi(data: FormData): Promise<{ accessToken: string }> {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
}
function LoginUser() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const mutation = useMutation({
  mutationFn: loginApi,
    onSuccess: (data) => {
    setToken(data.accessToken); // now it's strongly typed
    navigate("/home", { replace: true });
    console.log("Login response:", data);
  },
  onError: () => {
    alert("Login failed!!");
  },
});

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="bg-white/95 backdrop-blur-md p-8 h-[350px] w-[400px] rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Log In To Continue 🚀
          </h1>
          <p className="text-gray-500 mt-20 text-sm">Enter your credentials below</p>
        </div>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {/* Username */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">User Name</label>
            <input
              type="text"
              placeholder="YourUsername"
              {...register("username")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">Password</label>
            <input
              type="password"
              placeholder="YourPassword"
              {...register("password")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-3 px-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-[220px] h-[40px] mt-3 px-2 py-3.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 transition"
            >
              {mutation.isPending ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
