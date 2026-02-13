import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/auth/login", data);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate("/"); // redirect after login
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black text-white">
      {/* Background Layers */}
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md p-10 rounded-3xl bg-gradient-to-tl from-yellow-400 via-orange-400 to-red-500 shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-black text-center mb-8">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-black mb-2 font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="your@email.com"
            className={`w-full px-5 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black ${
              errors.email ? "border-red-500" : "border-black"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-black mb-2 font-semibold">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="********"
            className={`w-full px-5 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black ${
              errors.password ? "border-red-500" : "border-black"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-black text-yellow-400 font-bold text-lg hover:text-white hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
