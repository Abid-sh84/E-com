import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  googleAuth,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

router.post("/register", registerUser); // Register route
router.post("/login", loginUser); // Login route
router.put("/update", protect, updateUser); // Update user details (protected route)
router.post("/google-auth", googleAuth); // Google authentication route

export default router;
