import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const PostAddForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // ✅ Slug Generator
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  // ✅ Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // ✅ Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", generateSlug(data.title));
      formData.append("category", data.category);
      formData.append("blogContent", data.blogContent);

      // ⚠️ Agar backend req.user se author le raha hai to yeh remove kar do
      formData.append("author", "698e01cbbc5444a1daf8c11d");

      if (data.featuredImage && data.featuredImage[0]) {
        formData.append("featuredImage", data.featuredImage[0]);
      }

      await api.post("/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post Created Successfully ✅");
      reset();
      setImagePreview(null);
      navigate("/admin/blogs");

    } catch (error) {
      console.error("Create Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to create post"
      );
    }
  };

return (
  <div className="p-8 bg-gray-50 min-h-screen">
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">

      <h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
        Create New Blog Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Content
          </label>
          <textarea
            rows="8"
            {...register("blogContent", {
              required: "Content is required",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            placeholder="Write your blog content here..."
          />
          {errors.blogContent && (
            <p className="text-red-500 text-sm mt-1">
              {errors.blogContent.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("featuredImage")}
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-orange-100 file:text-orange-600
                       hover:file:bg-orange-200"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>

      </form>
    </div>
  </div>
);

};

export default PostAddForm;
