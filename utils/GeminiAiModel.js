import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Handle both client-side and server-side env vars
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Changed to 1.5-flash (Standard stable version)
});

/* --- CHAT SESSION (For Interview) --- */
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});

/* --- RESUME ANALYSIS (For Resume Doctor) --- */
export const analyzeResumeWithAI = async (resumeText) => {
  // 1. Configure model specifically for JSON response
  const jsonModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json" // Enforces strict JSON
    }
  });

  // 2. The Expert Prompt
  const prompt = `
    Act as a strict Senior Technical Recruiter and ATS Expert. 
    Analyze the following resume text for a Software Engineer role.

    Resume Text:
    "${resumeText.slice(0, 10000)}" 

    Provide a structured JSON response with the following schema:
    {
      "ats_score": number (0-100),
      "summary": "String (Professional summary of the candidate)",
      "job_title": "String (Predicted role based on resume)",
      "key_skills_found": ["String", "String"],
      "missing_keywords": ["String", "String"],
      "formatting_issues": ["String"],
      "weaknesses": [{ "point": "String (The issue)", "fix": "String (Actionable advice)" }],
      "verdict": "String (Short professional judgement)"
    }
  `;

  // 3. Generate & Return
  const result = await jsonModel.generateContent(prompt);
  const response = await result.response;

  // No need for regex replacement if using responseMimeType: "application/json"
  return JSON.parse(response.text());
};