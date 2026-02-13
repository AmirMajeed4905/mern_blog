import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import slugify from "slugify";
import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import cloudinary from "../config/cloudinary.js";


// ================= CREATE BLOG =================
export const createBlog = asyncHandler(async (req, res) => {
  const { author, category, title, blogContent } = req.body;

  if (!author || !category || !title || !blogContent) {
    return res.status(400).json({
      message: "Author, Category, Title and Blog Content are required.",
    });
  }

  const authorExists = await User.findById(author);
  if (!authorExists) {
    return res.status(400).json({ message: "Invalid author ID" });
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Featured image is required" });
  }
  

  // Upload image
  const uploadResult = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    { folder: "blogs" }
  );

  // Create unique slug
  let baseSlug = slugify(title, { lower: true, strict: true });
  const existingSlug = await Blog.findOne({ slug: baseSlug });
  const slug = existingSlug ? `${baseSlug}-${nanoid(6)}` : baseSlug;

  const blog = await Blog.create({
    author,
    category,
    title,
    slug,
    blogContent,
    featuredImage: {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    },
  });

  res.status(201).json(blog);
});


// ================= GET ALL BLOGS =================
export const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalBlogs = await Blog.countDocuments();

  const blogs = await Blog.find()
    .populate("author", "name")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    blogs,
    totalBlogs,
    totalPages: Math.ceil(totalBlogs / limit),
    currentPage: page,
  });
});


// ================= GET BLOG BY SLUG =================
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


// ================= GET SINGLE BLOG BY ID =================
export const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Fetching blog with ID:", id);

  const blog = await Blog.findById(id)
    .populate("author")
    .populate("category");

  if (!blog) {
    console.log("Blog not found for ID:", id);
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json(blog);
});



// ================= UPDATE BLOG =================
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, blogContent } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // Update text fields
  if (title) {
    let baseSlug = slugify(title, { lower: true, strict: true });

    const existingSlug = await Blog.findOne({
      slug: baseSlug,
      _id: { $ne: id },
    });

    blog.slug = existingSlug ? `${baseSlug}-${nanoid(6)}` : baseSlug;
    blog.title = title;
  }

  if (category) blog.category = category;
  if (blogContent) blog.blogContent = blogContent;

  // If new image uploaded
  if (req.file) {
    // Delete old image from Cloudinary
    if (blog.featuredImage?.public_id) {
      await cloudinary.uploader.destroy(blog.featuredImage.public_id);
    }

    // Upload new image
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "blogs" }
    );

    blog.featuredImage = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  }

  await blog.save();

  res.status(200).json(blog);
});


// ================= DELETE BLOG =================
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // Delete image from Cloudinary
  if (blog.featuredImage?.public_id) {
    await cloudinary.uploader.destroy(blog.featuredImage.public_id);
  }

  await blog.deleteOne();

  res.status(200).json({ message: "Blog deleted successfully" });
});
