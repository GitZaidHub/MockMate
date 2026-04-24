import { NextResponse } from "next/server";
import { analyzeResumeWithAI } from "@/utils/GeminiAiModel";
import PDFParser from "pdf2json";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // BUG FIX #5: Validate that the uploaded file is actually a PDF.
        // Without this, non-PDF files crash the parser with a cryptic error.
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Invalid file type. Please upload a PDF file." },
                { status: 400 }
            );
        }

        // 1. Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // 2. Parse PDF using pdf2json - highly reliable in Next.js App Router
        let resumeText = "";
        try {
            resumeText = await new Promise((resolve, reject) => {
                const pdfParser = new PDFParser(null, 1);
                pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));
                pdfParser.on("pdfParser_dataReady", () => resolve(pdfParser.getRawTextContent()));
                pdfParser.parseBuffer(buffer);
            });
        } catch (parseError) {
            console.error("PDF Parse Error:", parseError);
            resumeText = "";
        }

        if (!resumeText || resumeText.trim().length < 50) {
            console.warn("PDF Extraction Warning: Very little text found. Possibly a scanned/image PDF.");
        }

        // 3. Get AI Analysis
        const analysisResult = await analyzeResumeWithAI(resumeText);

        // 4. Return JSON
        return NextResponse.json(analysisResult);

    } catch (error) {
        console.error("Analysis Error:", error);
        return NextResponse.json({
            error: "Analysis Failed",
            details: error.message || String(error),
        }, { status: 500 });
    }
}