"use client"
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection'
import Webcam from "react-webcam";
import Link from 'next/link';
import { WebcamIcon, Mic, Camera, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const InterviewPage = ({ params }) => {
  const [interviewQuestions, setInterviewQuestions] = useState()
  const [interviewDetails, setInterviewDetails] = useState()
  const [MockInterview, setMockInterview] = useState()
  const [activeIndex, setActiveIndex] = useState(0)
  const interviewid = params.interviewid
  const [webCamEnable, setWebCamEnable] = useState(false)

  useEffect(() => {
    getInterviewDetails();
  }, [interviewid])

  const getInterviewDetails = async () => {
    try {
      const resp = await fetch(`/api/interview?mockInterviewId=${interviewid}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      })
      if (!resp.ok) throw new Error("Failed to fetch interview details");
      
      const data = await resp.json();
      const mockInterview = data.mockInterview;
      const jsonResponse = JSON.parse(mockInterview.jsonMockResponse);
      
      setInterviewQuestions(jsonResponse);
      setInterviewDetails(jsonResponse[0])
      setMockInterview(mockInterview)
    } catch (error) {
      console.error("Error fetching interview details:", error);
      toast.error("Error loading questions.");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 relative overflow-hidden flex flex-col">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="relative z-20 px-10 py-6 flex justify-between items-center border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
        <div>
           <h1 className="text-xl font-bold tracking-tight text-white">
             MockMate <span className="text-violet-500">Live</span>
           </h1>
           <p className="text-xs text-zinc-500 font-mono">Session ID: {interviewid?.slice(0,8)}...</p>
        </div>
        
        {/* Progress Badge */}
        {interviewQuestions && (
            <div className="px-4 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-400 font-mono">
                Question {activeIndex + 1} of {interviewQuestions.length}
            </div>
        )}
      </header>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Question & Transcript (Terminals) */}
        <div className="lg:col-span-8 flex flex-col h-full gap-6">
           <QuestionSection 
             interviewQuestions={interviewQuestions} 
             MockInterview={MockInterview} 
             setActiveIndex={setActiveIndex} 
             activeIndex={activeIndex} 
             interviewDetails={interviewDetails} 
           />
        </div>

        {/* RIGHT: Webcam & Controls (HUD) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Webcam Container */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            {/* Viewfinder Overlay Graphics */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg z-20"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg z-20"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg z-20"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg z-20"></div>

            {webCamEnable ? (
              <Webcam
                audio={false}
                mirrored={true}
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(false)}
                className="w-full h-full object-cover"
                videoConstraints={{ facingMode: "user" }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                   <WebcamIcon className="text-zinc-500 w-8 h-8" />
                </div>
                <p className="text-zinc-500 text-sm">Camera is disabled</p>
              </div>
            )}
            
            {/* Live Indicator */}
            {webCamEnable && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-[10px] text-red-200 font-bold uppercase tracking-wider backdrop-blur-md z-30 animate-pulse">
                    REC
                </div>
            )}
          </div>

          {/* Controls Panel */}
          <div className="bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-300">Controls</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-xs ${webCamEnable ? 'text-red-400 hover:text-red-300' : 'text-zinc-400'}`}
                  onClick={() => setWebCamEnable(prev => !prev)}
                >
                  <Camera className="mr-2 w-3 h-3" />
                  {webCamEnable ? 'Disable Video' : 'Enable Video'}
                </Button>
             </div>

             <div className="h-px w-full bg-white/5"></div>

             {/* Navigation */}
             <div className="grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    className="h-12 border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))}
                >
                    Previous
                </Button>

                {activeIndex < (interviewQuestions?.length - 1) ? (
                    <Button
                        className="h-12 bg-white text-black hover:bg-zinc-200 font-semibold"
                        onClick={() => setActiveIndex(prev => prev + 1)}
                    >
                        Next Question <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                ) : (
                    <Link href={`/dashboard/interview/${interviewid}/feedback`} className="w-full block">
                        <Button className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]">
                            Finish Interview <CheckCircle2 className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                )}
             </div>
          </div>

          {/* Tips / Info */}
          <div className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
              <p className="text-violet-300/80 text-xs leading-relaxed">
                  <span className="font-bold text-violet-300">Tip:</span> Speak clearly and directly into your microphone. You can re-record your answer if needed before moving to the next question.
              </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InterviewPage