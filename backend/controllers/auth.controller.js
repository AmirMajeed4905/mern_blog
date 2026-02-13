import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../utils/validators.js";

const maxAge = 7 * 24 * 60 * 60; // 7 days

const createToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: maxAge });

export const registerUser = asyncHandler(async (req, res) => {
  const parsed = registerSchema.parse(req.body);

  // Check if user already exists
  const exists = await User.findOne({ email: parsed.email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(parsed.password, 10);

  // Create user
  const user = await User.create({ ...parsed, password: hashedPassword });

  // Create JWT token
  const token = createToken(user._id,user.role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: maxAge * 1000
  });

  res.status(201).json({
    user: { name: user.name, email: user.email, role: user.role }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const parsed = loginSchema.parse(req.body);

  // Fetch user and include password
  const user = await User.findOne({ email: parsed.email }).select("+password");
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Compare password
  const isMatch = await bcrypt.compare(parsed.password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = createToken(user._id, user.role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: maxAge * 1000
  });

  res.json({ user: { name: user.name, email: user.email, role: user.role } });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 0, httpOnly: true });
  res.json({ message: "Logged out successfully" });
});



export const updatePassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  await user.save();

  res.json({ message: "Password updated successfully" });
});


// auth.controller.js
export const updateName = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Use user.id from JWT (set by requireAuth middleware)
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name;
  await user.save();

  res.json({ message: "Name updated successfully", user });
});


export const getCurrentUser = asyncHandler(async (req, res) => {
 
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password"); // password hide

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user });
});

