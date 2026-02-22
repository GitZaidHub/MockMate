// import jwt from 'jsonwebtoken';

// export async function POST(req) {
//     try {
//         const {token} = await req.json();
//         if(!token){
//             return new Response(JSON.stringify({success:false, message:"Token is required"}), {
//                 status:400,
//                 headers:{
//                     "Content-Type": "application/json"
//                 }
//             })
//         }
//         // verify token
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         return new Response(JSON.stringify({valid:true, message:"Token is valid",user:decode}),{
//             status:200,
//             headers:{
//                 "Content-Type": "application/json"
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         return new Response(JSON.stringify({success:false, message:" internal server error"}), {
//             status:500,
//             headers:{
//                 "Content-Type": "application/json"
//             }
//         })
//     }
// }
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) {
      return Response.json({ success: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return Response.json({
      valid: true,
      user: decoded,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return Response.json(
        { valid: false, message: "Token expired" },
        { status: 401 }
      );
    }

    return Response.json(
      { valid: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}