import { UserAnswer } from "@/model/UserAnswer";

const { connectDB } = require("@/utils/db");


export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const Answer = await UserAnswer.create({
        mockIdRef: body.mockIdRef,
        question: body.question,
        correctAns: body.correctAns,
        userAns: body.userAns,
        feedback: body.feedback,
        rating: body.rating,
        userEmail: body.userEmail,
        createdAt: body.createdAt,
        })
        return NextResponse.json({ success: true, userAnswerId: Answer._id });
    } catch (error) {
       return NextResponse.json(
             { success: false, error: error.message },
             { status: 500 }
           );
    }
}