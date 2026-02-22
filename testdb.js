import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
console.log("Mongo connected successfully");
process.exit(0);