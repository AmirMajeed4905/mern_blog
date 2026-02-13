import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

const router = express.Router();

// POST /api/categories - create category
router.post("/", createCategory);

// GET /api/categories - get all categories
router.get("/", getAllCategories);

// GET /api/categories/:slug - get category by slug
router.get("/:slug", getCategoryBySlug);

// PUT /api/categories/:id - update category by ID
router.put("/:id", updateCategory);

// DELETE /api/categories/:id - delete category by ID
router.delete("/:id", deleteCategory);

export default router;
