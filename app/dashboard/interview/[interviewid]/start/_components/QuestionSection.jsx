import { useUser } from "@/context/UserContext";
import { chatSession } from "@/utils/GeminiAiModel";
import { Mic, MicOffIcon } from "lucide-react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
// import TranscriptDisplay from './Transcription';

const QuestionSection = ({
  activeIndex,
  interviewQuestions,
  setActiveIndex,
  interviewDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isMic, setIsMic] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    if (typeof window !== "undefined" && navigator?.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setMicPermissionGranted(true);
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {
          setMicPermissionGranted(false);
        });
    }
  }, []);

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10 && interviewDetails?.mockId) {
      updateUserAnswer();
    }
  }, [userAnswer, interviewDetails?.mockId]); // Ensure interviewDetails is available

  const updateUserAnswer = async () => {
    console.log("UserAnswer:", userAnswer);
    try {
      setIsLoading(true);
      const feedbackPrompt = `
You are an expert interview evaluator.

Evaluate the user's answer to the interview question below. Give your response **only** in the following JSON format:

{
  "rating": <number from 1 to 10>,
  "feedback": "<short feedback in 2–3 lines focusing on areas of improvement or strengths>"
}

Question: ${interviewQuestions[activeQuestionIndex]?.question}
User Answer: ${userAnswer}

Please ensure the response is **valid JSON only**, without any explanation or markdown formatting.
`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      const text = await result.response.text();
      const MockResponse = await text.replace("```json", "").replace("```", "");
      console.log("response from Ai", MockResponse);
      const jsonResponse = JSON.parse(MockResponse);
      console.log("jsonResponse", jsonResponse);

      const resp = await fetch("/api/useranswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockIdRef: interviewDetails?.mockId,
          question: interviewQuestions[activeIndex]?.question,
          correctAns: interviewQuestions[activeIndex]?.answer,
          userAns: userAnswer,
          feedback: jsonResponse.feedback,
          rating: jsonResponse.rating,
          userEmail: user?.email,
          createdAt: moment().format("DD-MM-YYYY"),
        }),
      });
      if (resp) {
        console.log("User answer saved with ID:", data.userAnswerId);
        toast.success("Your answer has been recorded successfully!");
        setUserAnswer(""); // Clear the user answer after saving
        setResults([]); // Clear the results after saving
      }
    } catch (error) {
      console.log("Error is ", error);
      toast.error("Error while evaluating answer");
    } finally {
      setIsLoading(false);
      setResults([]);
    }
  };

  console.log("Recording:", isRecording);
  console.log("Results:", results);
  console.log("Interim:", interimResult);

  return (
    interviewQuestions && (
      <div className="question-section p-6 rounded-lg space-y-6">
        {/* Top Row: Question Badges */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {interviewQuestions.map((question, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-center px-4 py-2 rounded-full border font-semibold cursor-pointer 
              transition-all duration-300 
              ${
                activeIndex === index
                  ? "bg-blue-600 text-white"
                  : "hover:border-blue-900"
              }
            `}
            >
              {`Q${index + 1}`}
            </div>
          ))}
        </div>

        {/* Actual Question Display */}
        <div className="p-5 border rounded-xl text-lg font-medium bg-white/20 backdrop-blur-md">
          {interviewQuestions?.[activeIndex]?.question ||
            "No question available"}
        </div>

        {/* Mic Button */}
        <div className="flex flex-col items-center pt-8 space-y-6">
          {" "}
          <button
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
            className={`p-4 rounded-full transition-all duration-300 shadow-md ${
              isRecording
                ? "bg-red-600 text-white animate-pulse"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {isRecording ? <Mic size={32} /> : <MicOffIcon size={32} />}
          </button>
          {/* Status */}
          <div className="text-white font-semibold">
            {isRecording
              ? "🎙️ Listening..."
              : "Click the mic to start recording"}
          </div>
          {/* Transcripts */}
          <div className="w-full max-w-xl bg-white/20 p-4 rounded-lg text-white space-y-2 border border-white/30 max-h-64 overflow-y-auto">
            {results?.length > 0 ? (
              results.map((res, i) => (
                <p key={i} className="text-base">
                  {res.transcript}
                </p>
              ))
            ) : (
              <p className="text-gray-400 italic">No transcript yet</p>
            )}

            {interimResult && (
              <p className="text-yellow-200 italic animate-pulse">
                Listening: {interimResult}
              </p>
            )}
          </div>
          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm">
              🎤 Speech Error: {error.message || error}
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default QuestionSection;
