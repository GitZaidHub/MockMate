const { default: mongoose } = require("mongoose");

const userAnswer = new mongoose.Schema({
    mockInterviewIdRef: {type: mongoose.Schema.Types.ObjectId, ref: 'MockInterview', required:true},
    question:{ types: String, required:true},
    correctAns:{type:String},
    userAns:{type: String},
    feedback:{type:String},
    rating:{type:String},
    userEmail: {type:String},
},{timestamps: true});

export const UserAnswer = mongoose.models.UserAnswer || mongoose.model("UserAnswer",userAnswer)