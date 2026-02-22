import { connectDB } from "@/utils/db";
import { User } from "@/model/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json(
        { success: false, message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    console.log("user", user);

    // Make sure this matches your schema: otpExpired vs otpExpires
    console.log("details ->", otp, user?.otp, user?.otpExpires);

    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      return Response.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      return Response.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "User verified successfully",
        token,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in verify-otp route:", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
