import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register User
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    if (email) {
      // Check if the new email is already in use
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists.id !== req.user.id) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Google Authentication
export const googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    // Decode the JWT token from Google (without validation)
    // In production, you should verify this token with Google's API
    const decoded = jwt.decode(credential);

    if (!decoded || !decoded.email) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    // Extract user information from the decoded token
    const {
      email,
      given_name: firstName,
      family_name: lastName,
      sub: googleId,
      picture: profilePicture,
    } = decoded;

    // Check if user exists with this email
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new one
      user = new User({
        firstName: firstName || "User",
        lastName: lastName || "",
        email,
        googleId,
        profilePicture,
        password: await bcrypt.hash(
          Math.random().toString(36).slice(-8) + Date.now().toString(),
          10
        ),
        isGoogleUser: true,
      });
      await user.save();
    } else if (!user.googleId) {
      // If user exists but has no googleId (was registered via email), link accounts
      user.googleId = googleId;
      user.isGoogleUser = true;
      if (profilePicture) user.profilePicture = profilePicture;
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google authentication successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
