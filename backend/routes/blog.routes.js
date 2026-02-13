import express from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog
} from "../controllers/blog.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// POST /api/blogs - create blog
router.post("/create", upload.single("featuredImage"), createBlog);


// GET /api/blogs - get all blogs
router.get("/", getAllBlogs);

// GET /api/blogs/:slug - get blog by slug
router.get("/:slug", getBlogBySlug);

// PUT /api/blogs/:id - update blog by ID
router.put("/:id", updateBlog);

// DELETE /api/blogs/:id - delete blog by ID
router.delete("/:id", deleteBlog);

export default router;
