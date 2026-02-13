import express from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    getSingleBlog
} from "../controllers/blog.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();
// Create blog
router.post("/", upload.single("featuredImage"), createBlog);

// Get all blogs (pagination)
router.get("/", getAllBlogs);

// Get single blog by ID
router.get("/:id", getSingleBlog);

// Get single blog by slug
router.get("/slug/:slug", getBlogBySlug);

// Update blog
router.put("/:id", upload.single("featuredImage"), updateBlog);

// Delete blog
router.delete("/:id", deleteBlog);



export default router;
