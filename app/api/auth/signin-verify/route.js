import { sendOTPEmail } from "@/lib/mailer";
import { generateOTP } from "@/lib/otp";
import { User } from "@/model/User";
import { connectDB } from "@/utils/db";
import bcrypt from "bcryptjs";
// POST /api/auth/signin-verify


export async function POST(req) {

    const {email,password} = await req.json();
    await connectDB();
    try {
        
        // is user exists (email check)
        const isExists = await User.findOne({email});
        if(!isExists){
            return new Response(JSON.stringify({success:false, message: "User does not exists"}), {
                status: 404,
                headers:{
                    "Content-Type": "application/json"
                }
            })
        }

        // check if verified or not
        // if(!isExists.verified){
        //     return new Response(JSON.stringify({success: false,message:"Email is not verified"}),{
        //         status:404,
        //         headers:{
        //             'Content-Type':'application/json'
        //         }
        //     })
        // }

        // check if password matches
        const isPassMatch = await bcrypt.compare(password, isExists.password);
        if(!isPassMatch){
            return new Response(JSON.stringify({success:false, message: "Invalid password"}), {
                status: 401,
                headers: {
                    "Content-Type": "application/json"
                }
                })
        }
        
        const otp = generateOTP();
            const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
            
            await User.updateOne(
                {email},
                {$set: {otp,otpExpires}}
            )
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
        console.log(error);
        return new Response(JSON.stringify({success:false, message: "Internal server error"}),{
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}