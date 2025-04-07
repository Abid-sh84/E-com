import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utils/googleAuth.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Google OAuth route
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const userData = await verifyGoogleToken(token);

    // Check if user exists
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // Create new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        Math.random().toString(36),
        salt
      );

      user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        googleId: userData.googleId,
        isGoogleUser: true,
        profilePicture: userData.profilePicture,
      });

      await user.save();
    } else if (!user.googleId) {
      // Link existing account with Google
      user.googleId = userData.googleId;
      user.isGoogleUser = true;
      await user.save();
    }

    // Generate JWT
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google login successful",
      token: authToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error with Google authentication" });
  }
});

export default router;
