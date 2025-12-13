import { NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { analyzeResumeWithAI } from "@/utils/GeminiAiModel"; // Import the logic

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // 1. Parse PDF
        const resumeText = await parsePdf(file);

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

// Helper: Clean PDF Parsing Wrapper
async function parsePdf(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", (errData) => {
            reject(errData?.parserError || "Unknown PDF parse error");
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            try {
                // Extract text from pages
                const rawText = (pdfData?.formImage?.Pages || []).flatMap((page) =>
                    (page.Texts || []).map((textItem) => decodeURIComponent(textItem.R[0].T))
                ).join(" ");

                resolve(rawText);
            } catch (err) {
                reject("Parsing failed during extraction");
            }
        });

        pdfParser.parseBuffer(buffer);
    });
}