
import { MockInterview } from "@/model/MockInterview";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
const {v4:uuid} = require('uuid')

export async function POST(req) {

    try {
        await connectDB();
        const body = await req.json();
        
        const newMock = await MockInterview.create({
            mockInterviewId:uuid(),
            jobPosition:body.jobPosition,
            jobExperience:body.jobExperience,
            jobDescription:body.jobDescription,
            jsonMockResponse:body.jsonMockResponse,
            createdBy:body.createdBy,
            createdAt:body.createdAt
        })
        return NextResponse.json({success: true,mockInterviewId:newMock.mockInterviewId})
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }
}