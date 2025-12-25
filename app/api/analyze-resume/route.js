import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import { analyzeResumeWithAI } from "@/utils/GeminiAiModel"; // Import the logic

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // 1. Parse PDF
        const buffer = Buffer.from(await file.arrayBuffer());
        const pdfData = await pdf(buffer);
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.length < 50) {
            console.warn("PDF Extraction Warning: Very little text found.", resumeText);
            // Proceed anyway, let AI decide if it's readable, but log it.
        }

        // 2. Get AI Analysis (Logic extracted to utility)
        const analysisResult = await analyzeResumeWithAI(resumeText);

        // 3. Return JSON
        return NextResponse.json(analysisResult);

    } catch (error) {
        console.error("Analysis Error:", error);
        return NextResponse.json({
            error: "Analysis Failed",
            details: error.message || String(error)
        }, { status: 500 });
    }
}