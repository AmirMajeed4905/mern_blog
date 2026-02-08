// controller/user.controller.js
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // current page
  const limit = parseInt(req.query.limit) || 10; // items per page
  const skip = (page - 1) * limit;

  const total = await User.countDocuments();
  const users = await User.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-password"); // hide passwords

  res.json({
    users,
    page,
    totalPages: Math.ceil(total / limit),
    totalUsers: total,
  });
});
