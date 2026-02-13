import asyncHandler from "../utils/asyncHandler.js"

import Category from "../models/category.model.js";
import slugify from "slugify";

// Create new category
export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const existing = await Category.findOne({ slug });
    if (existing) res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, slug });
    res.status(201).json(category);
});

// Get all categories
export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
});

// Get category by slug
export const getCategoryBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
});

// Update category by ID
export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const category = await Category.findByIdAndUpdate(id, { name, slug }, { new: true });
    if (!category) res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
});

// Delete category by ID
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
});
