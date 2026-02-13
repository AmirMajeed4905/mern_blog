import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateName,
  updatePassword
} from "../controllers/auth.controller.js";
import { getUsers } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/onlyadmin.js";


const router = express.Router();

// ❌ AUTH NOT REQUIRED
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ AUTH REQUIRED
router.post("/logout", requireAuth, logoutUser);
router.get("/me", requireAuth, getCurrentUser);
router.put("/update-name", requireAuth, updateName);
router.put("/update-password", requireAuth, updatePassword);

// ⚠️ ADMIN ONLY (auth zaroori)
router.get("/users", requireAuth,requireAdmin,getUsers);

export default router;
