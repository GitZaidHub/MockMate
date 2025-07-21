import { connectDB } from "@/utils/db";
import { User } from "@/model/User";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mailer";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email,password } = await req.json();
    await connectDB();

    let user = await User.findOne({ email });
    if (user) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    const hashedPassword = await bcrypt.hash(password,10); // Hashing the password
    const newUser = await User.create({
      email,
      password:hashedPassword,
      otp,
      otpExpires,
    });

    await sendOTPEmail(email, otp);

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error while sending OTP",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

