import { useUser } from "@/context/UserContext";
import { chatSession } from "@/utils/GeminiAiModel";
import { Mic, MicOff, Volume2, Loader2, Sparkles } from "lucide-react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";

const QuestionSection = ({
  activeIndex,
  interviewQuestions,
  setActiveIndex,
  interviewDetails,
  MockInterview,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
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
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    }
  }, []);

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10 && MockInterview?.mockInterviewId) {
      updateUserAnswer();
    }
  }, [userAnswer, isRecording, MockInterview?.mockInterviewId]);

  const updateUserAnswer = async () => {
    try {
      setIsLoading(true);
      const feedbackPrompt = `
        You are an expert interview evaluator.
        Evaluate the user's answer to the interview question below. Give your response **only** in the following JSON format:
        {
          "rating": <number from 1 to 10>,
          "feedback": "<short feedback in 2–3 lines focusing on areas of improvement or strengths>"
        }
        Question: ${interviewQuestions[activeIndex]?.question} 
        User Answer: ${userAnswer}
        Please ensure the response is **valid JSON only**, without any explanation or markdown formatting.
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const text = await result.response.text();
      const MockResponse = text.replace("```json", "").replace("```", "").trim();
      const jsonResponse = JSON.parse(MockResponse);

      const resp = await fetch("/api/useranswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockInterviewIdRef: MockInterview?.mockInterviewId,
          question: interviewQuestions[activeIndex]?.question,
          correctAns: interviewQuestions[activeIndex]?.answer,
          userAns: userAnswer,
          feedback: jsonResponse.feedback,
          rating: jsonResponse.rating,
          userEmail: user?.email,
          createdAt: moment().format("DD-MM-YYYY"),
        }),
      });

      if (resp.ok) {
        toast.success("Answer recorded successfully!");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.log("Error is ", error);
      toast.error("Error while evaluating answer");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setResults([]);
    setUserAnswer("");
  }, [activeIndex]);


  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);
      }
    }
  }

  return (
    interviewQuestions && (
      <div className="flex flex-col h-full gap-6">

        {/* --- QUESTION CARD --- */}
        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-sm shadow-xl relative overflow-hidden group hover:border-violet-500/20 transition-all duration-500">
          {/* Decorative Background for Card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full group-hover:bg-violet-500/20 transition-colors"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-300 text-xs font-bold uppercase tracking-wider">
                Question {activeIndex + 1}
              </div>
              <span className="text-zinc-500 text-sm">/ {interviewQuestions.length}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium text-zinc-100 leading-snug">
              {interviewQuestions?.[activeIndex]?.question || "Loading question..."}
            </h2>

            {/* Read Question Button (TTS) */}
            <div
              className={`mt-4 flex items-center gap-2 text-xs cursor-pointer transition-colors ${isSpeaking ? 'text-violet-400' : 'text-zinc-500 hover:text-violet-400'}`}
              onClick={() => textToSpeech(interviewQuestions?.[activeIndex]?.question)}
            >
              <Volume2 size={14} className={isSpeaking ? "animate-pulse" : ""} />
              <span>{isSpeaking ? "Stop Reading" : "Read Aloud"}</span>
            </div>
          </div>
        </div>

        {/* --- RECORDING AREA --- */}
        <div className="flex-1 bg-zinc-900 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden">

          {/* Recording Status Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {isRecording ? (
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-red-400 font-semibold text-sm">Recording in progress...</span>
                </div>
              ) : (
                <span className="text-zinc-500 text-sm font-medium">Ready to record answer</span>
              )}
            </div>
            {isLoading && (
              <div className="flex items-center gap-2 text-violet-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving & Analyzing...
              </div>
            )}
          </div>

          {/* Transcript Area (Terminal Style) */}
          <div className="flex-1 bg-zinc-950/50 rounded-xl border border-white/5 p-4 overflow-y-auto min-h-[200px] mb-6 font-mono text-sm leading-relaxed shadow-inner">
            {results?.length > 0 ? (
              results.map((res, i) => (
                <span key={i} className="text-zinc-300">{res.transcript} </span>
              ))
            ) : (
              <span className="text-zinc-700 italic">" Click the microphone button below and start speaking clearly to answer the question... "</span>
            )}
            {interimResult && (
              <span className="text-violet-400 animate-pulse">{interimResult}</span>
            )}
          </div>

          {/* Big Mic Button */}
          <div className="flex justify-center">
            <button
              onClick={isRecording ? stopSpeechToText : startSpeechToText}
              disabled={isLoading}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group ${isRecording
                ? "bg-red-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.6)] scale-110"
                : "bg-white hover:bg-zinc-200 shadow-lg"
                }`}
            >
              {isRecording ? (
                <>
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping"></div>
                  <Mic className="text-white w-8 h-8" />
                </>
              ) : (
                <Mic className="text-black w-8 h-8 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          <p className="text-center text-zinc-500 text-xs mt-4">
            {isRecording ? "Click to stop recording" : "Click to start recording"}
          </p>

        </div>
      </div>
    )
  );
};

export default QuestionSection;