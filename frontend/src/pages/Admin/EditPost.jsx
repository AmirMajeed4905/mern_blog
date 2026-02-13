import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave, FiImage, FiX, FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";
import api from "../../utils/axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/api/blog/${id}`);
      const post = response.data;
      
      // Populate form fields
      setValue("title", post.title);
      setValue("slug", post.slug);
      setValue("category", post.category?._id || "");
      setValue("blogContent", post.blogContent);
      
      if (post.featuredImage.url) {
        setImagePreview(post.featuredImage.url);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load post");
      navigate("/admin/blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Preview image locally
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server (optional - if you have upload endpoint)
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      // If you have an upload endpoint
      // const uploadResponse = await api.post("/api/upload", formData);
      // setValue("featuredImage", uploadResponse.data.url);
      
      toast.success("Image selected successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("featuredImage", "");
    document.getElementById("featuredImage").value = "";
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("blogContent", data.blogContent);

    const fileInput = document.getElementById("featuredImage");
    if (fileInput && fileInput.files[0]) {
      formData.append("featuredImage", fileInput.files[0]);
    } else if (imagePreview) {
      formData.append("featuredImageUrl", imagePreview);
    }

    await api.put(`/api/blog/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Post updated successfully!");
    navigate(`/admin/blog/${id}`);
  } catch (error) {
    console.error("Error updating post:", error);
    toast.error(error.response?.data?.message || "Failed to update post");
  }
};



  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-200 dark:border-gray-700 border-t-orange-600 dark:border-t-orange-400 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/blogs")}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FiArrowLeft />
          <span>Back to posts</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Edit Post
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Title must not exceed 200 characters",
                },
                onChange: (e) => {
                  const slug = generateSlug(e.target.value);
                  setValue("slug", slug);
                },
              })}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all ${
                errors.title
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              {...register("slug", {
                required: "Slug is required",
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: "Slug can only contain lowercase letters, numbers, and hyphens",
                },
              })}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all ${
                errors.slug
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="post-url-slug"
            />
            {errors.slug && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.slug.message}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Auto-generated from title, but you can customize it
            </p>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              {...register("category", {
                required: "Please select a category",
              })}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all appearance-none cursor-pointer ${
                errors.category
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Featured Image */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Featured Image
            </label>

            {!imagePreview ? (
              <div>
                <input
                  type="file"
                  id="featuredImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <label
                  htmlFor="featuredImage"
                  className="flex flex-col items-center justify-center w-full h-48 bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-gray-600 transition-all"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadingImage ? (
                      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FiUpload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          PNG, JPG, WEBP (MAX. 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Post Content *
            </label>
            <textarea
              {...register("blogContent", {
                required: "Content is required",
                minLength: {
                  value: 50,
                  message: "Content must be at least 50 characters",
                },
              })}
              rows="12"
              className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all resize-none ${
                errors.blogContent
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Write your post content here..."
            />
            {errors.blogContent && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.blogContent.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || uploadingImage}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave />
                  Update Post
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;