const { default: mongoose } = require("mongoose");


const mockInterview = new mongoose.Schema({
    jsonMockResponse:{ type: String, required: true},
    jobPosition: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobExperience: {type: String, required: true},
    jobProject: {type: String},
    createdBy: {type: String, ref: 'User', required:true},
    createdAt:{type: String},
    mockInterviewId: {type:String, unique: true, required: true},

},{timestamps: true});

export const MockInterview = mongoose.models.MockInterview || mongoose.model("MockInterview",mockInterview)