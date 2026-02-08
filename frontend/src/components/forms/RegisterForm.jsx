import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



// Zod schema with role included
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
     
      toast.success(`Registered successfully! Welcome ${res.data.user.name}`);
 navigate("/dashboard");
      
    } catch (err) {
    toast.error(err.response?.data?.message || "Error registering user");
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        {/* Name */}
        <div className="mb-4">
          <input 
            {...register("name")}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input 
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input 
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

      


        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Create Account"}
        </button>
        
        {/* Error Messages */}
        {(errors.name || errors.email || errors.password || errors.role) && (
          <ul className="list-[dotted] list-inside ml-4 space-y-1 text-red-500 text-sm mb-4">
            {errors.name && <li>{errors.name.message}</li>}
            {errors.email && <li>{errors.email.message}</li>}
            {errors.password && <li>{errors.password.message}</li>}
            {errors.role && <li>{errors.role.message}</li>}
          </ul>
        )}

        {/* Already have account link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
