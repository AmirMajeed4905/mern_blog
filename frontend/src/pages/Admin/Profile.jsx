import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
        reset({ name: res.data.user.name }); // prefill name
      } catch (err) {
        console.error("Could not fetch profile:", err);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      if (data.name !== user.name) {
        await api.put("/api/auth/update-name", { name: data.name });
        toast.success("Name updated successfully!");
      }

      if (data.newPassword) {
        if (data.newPassword !== data.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        await api.put("/api/auth/update-password", { password: data.newPassword });
        toast.success("Password updated successfully!");
      }

      // refetch user
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
      reset({ name: res.data.user.name });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!user) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label>Role</label>
          <input
            type="text"
            value={user.role}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <hr />

        <div>
          <label>New Password</label>
          <input
            type="password"
            {...register("newPassword", { minLength: 6 })}
            placeholder="Leave blank to keep current password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};


export default Profile;
