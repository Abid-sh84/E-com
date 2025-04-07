import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String },
    isGoogleUser: { type: Boolean, default: false },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
