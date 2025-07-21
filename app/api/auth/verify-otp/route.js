import { connectDB } from "@/utils/db";
import { User } from "@/model/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const {email , otp} = await req.json();
    await connectDB();

    const user = await User.findOne({email});
    console.log("user", user);
    console.log("details ->",otp, user.otp, user.otpExpired);

    if (!user || user.otp !== otp || user.otpExpires < new Date()) 
      {
        // return Response.json({ success: false, message: "Invalid or expired OTP" });
        return new Response(JSON.stringify({success:false, message: "Invalid or expired OTP"}));
      }
    const token = jwt.sign(
      {userId:user._id,email:user.email},
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    )

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpired = undefined;
    await user.save();
    // return Response.json({success:true, message: "User verified successfully",token});
    return new Response(JSON.stringify({success:true, message: "User verfied successfully",token}))
}