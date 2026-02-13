import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import slugify from "slugify";
import asyncHandler from "../utils/asyncHandler.js"
import { nanoid } from "nanoid";

import cloudinary from "../config/cloudinary.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { author, category, title, blogContent } = req.body;

  // 1️⃣ Validate required fields
  if (!author || !category || !title) {
    return res.status(400).json({ message: "Author, Category and Title are required." });
  }

  // 2️⃣ Validate author and category exist
  const authorExists = await User.findById(author);
  if (!authorExists) return res.status(400).json({ message: "Invalid author ID" });

  const categoryExists = await Category.findById(category);
  if (!categoryExists) return res.status(400).json({ message: "Invalid category ID" });

  // 3️⃣ Check if file exists
  if (!req.file) {
    return res.status(400).json({ message: "Featured image is required" });
  }

  // 4️⃣ Upload image to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    { folder: "blogs" }
  );

  // 5️⃣ Create unique slug
  let baseSlug = slugify(title, { lower: true, strict: true });
  const exists = await Blog.findOne({ slug: baseSlug });
  const slug = exists ? `${baseSlug}-${nanoid(6)}` : baseSlug;

  // 6️⃣ Create blog in DB
  const blog = await Blog.create({
    author,
    category,
    title,
    slug,
    blogContent,
    featuredImage: uploadResult.secure_url, // URL from Cloudinary
  });

  res.status(201).json(blog);
});




export const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalBlogs = await Blog.countDocuments(); // ← total posts count
  const blogs = await Blog.find()
    .populate("author", "name")     // sirf author name populate
    .populate("category", "name")   // sirf category name populate
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    blogs,
    totalBlogs,
    totalPages: Math.ceil(totalBlogs / limit),
  });
});


// Get blog by slug
export const getBlogBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
        .populate("author")
        .populate("category");

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
});


// Update blog by ID
export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title) updates.slug = slugify(updates.title, { lower: true, strict: true });

    const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
    if (!blog) res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
});

// Delete blog by ID
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.featuredImage?.public_id) {
    await cloudinary.uploader.destroy(blog.featuredImage.public_id);
  }

  await blog.deleteOne();

  res.status(200).json({ message: "Blog deleted successfully" });
});
