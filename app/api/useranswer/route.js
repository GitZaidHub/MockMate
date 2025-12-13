import { UserAnswer } from "@/model/UserAnswer";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const { connectDB } = require("@/utils/db");

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("📥 Incoming body:", body);

    const Answer = await UserAnswer.create({
      mockInterviewIdRef: body.mockInterviewIdRef,  // ✅ expects ObjectId
      question: body.question,                      // ✅ required
      correctAns: body.correctAns,
      userAns: body.userAns,
      feedback: body.feedback,
      rating: body.rating,
      userEmail: body.userEmail,
      // ⛔ no need for createdAt, schema timestamps handle it
    });

    console.log("✅ Saved Answer:", Answer);

    return NextResponse.json({ success: true, userAnswerId: Answer._id });
  } catch (error) {
    console.error("❌ API /useranswer error:", error);

    // Handle mongoose-specific errors more clearly
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Validation Error", details: error.errors },
        { status: 400 }
      );
    }

    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, error: "Invalid ObjectId", field: error.path, value: error.value },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const mockInterviewIdRef = searchParams.get("mockInterviewIdRef");

    if (!mockInterviewIdRef) {
      return NextResponse.json(
        { success: false, message: "mockInterviewIdRef is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(mockInterviewIdRef)) {
      return NextResponse.json(
        { success: false, message: "Invalid mockInterviewIdRef" },
        { status: 400 }
      );
    }

    const answers = await UserAnswer.find({
      mockInterviewIdRef: new mongoose.Types.ObjectId(mockInterviewIdRef),
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: answers });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
