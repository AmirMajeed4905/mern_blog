import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Type, FolderPlus } from "lucide-react";
import api from "../../utils/axios";

const CategoryForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/api/categories", { name: data.name });
      toast.success("Category created successfully!");
      reset();
      navigate("/admin/categories");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-orange-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <FolderPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Category</h2>
          <p className="text-gray-600 text-sm">Enter the category name</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="e.g., Technology, Travel"
                {...register("name", {
                  required: "Category name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Max 50 characters" },
                })}
                className={`w-full pl-10 pr-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                  errors.name ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
