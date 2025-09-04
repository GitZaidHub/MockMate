import { MockInterview } from "@/model/MockInterview";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
const { v4: uuid } = require("uuid");

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const newMock = await MockInterview.create({
      mockInterviewId: uuid(),
      jobPosition: body.jobPosition,
      jobExperience: body.jobExperience,
      jobDescription: body.jobDescription,
      jsonMockResponse: body.jsonMockResponse,
      jobProject: body.jobProject,
      createdBy: body.createdBy,
      createdAt: body.createdAt,
    });
    return NextResponse.json({
      success: true,
      mockInterviewId: newMock.mockInterviewId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const mockInterviewId = searchParams.get("mockInterviewId");
    if (!mockInterviewId) {
      return NextResponse.json(
        { success: false, error: "Mock interview Id is required" },
        { status: 400 }
      );
    }
    console.log("mockInterviewId", mockInterviewId);
    // Find the mock interview by its ID

    const mockInterview = await MockInterview.findOne({ mockInterviewId });
    if (!mockInterview) {
      return NextResponse.json(
        { success: false, error: "Mock Interview is not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, mockInterview: mockInterview },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
