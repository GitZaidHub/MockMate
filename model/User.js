import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpired: Date,
  },
  { timestamps: true }
);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
