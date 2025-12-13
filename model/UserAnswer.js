import mongoose from "mongoose";

const userAnswer = new mongoose.Schema({
    mockInterviewIdRef: { type: mongoose.Schema.Types.ObjectId, ref: 'MockInterview', required: true },
    question: { type: String, required: true },
    correctAns: { type: String },
    userAns: { type: String },
    feedback: { type: String },
    rating: { type: String },
    userEmail: { type: String },
    createdAt: { type: String }
}, { timestamps: true });

export const UserAnswer = mongoose.models.UserAnswer || mongoose.model("UserAnswer", userAnswer)