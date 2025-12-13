"use client"
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { WebcamIcon, Mic, Camera, CheckCircle2, Lightbulb, AlertCircle, ArrowRight } from "lucide-react"; 
import Link from "next/link";
import { useState, useEffect } from "react";
import Webcam from "react-webcam"; 
import { toast } from "sonner";

const PreInterview = ({params}) => {
  const [webCamEnable, setWebCamEnable] = useState(false)
  const [interviewDetails, setInterviewDetails] = useState(null) // Init as null to handle loading
  const [loading, setLoading] = useState(true);

  const interviewid = params.interviewid;

  useEffect(()=>{
    getInterviewDetails();
  },[interviewid])

  const getInterviewDetails=async()=>{
    setLoading(true);
    try {
      const response = await fetch(`/api/interview?mockInterviewId=${interviewid}`,{
        method:"GET",
        headers:{'content-type':'application/json'},
      })
      const interview = await response.json();
      if(!response.ok){
        throw new Error("Failed to fetch the interview")
      }
      setInterviewDetails(interview.mockInterview)
    } catch (error) {
      console.log("error",error)
      toast.error("Failed to load interview details");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 px-4 md:px-10 relative overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS (Matches Landing Page) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-4">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
             </span>
             Pre-Interview Check
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Interview Setup
          </h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Check your audio and video settings before entering the simulation.
          </p>
        </div>

        {/* --- MAIN BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT: WEBCAM SECTION */}
          <div className="flex flex-col gap-6 bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 hover:border-violet-500/20 transition-all duration-500">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-semibold flex items-center gap-2">
                 <Camera className="w-5 h-5 text-violet-400" />
                 Webcam Check
               </h2>
               
               <TooltipProvider>
                 <Tooltip>
                    <TooltipTrigger>
                      <Lightbulb className="w-5 h-5 text-yellow-500/50 hover:text-yellow-400 transition-colors cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                      <p>🔒 We do not record video. This is just for AI analysis.</p>
                    </TooltipContent>
                 </Tooltip>
               </TooltipProvider>
            </div>

            {/* Webcam Window */}
            <div className="aspect-video w-full bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden relative shadow-inner">
              {webCamEnable ? (
                <Webcam
                  audio={true}
                  mirrored={true}
                  onUserMedia={() => setWebCamEnable(true)}
                  onUserMediaError={() => setWebCamEnable(false)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center space-y-4">
                   <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                      <WebcamIcon className="text-zinc-500 w-8 h-8" />
                   </div>
                   <p className="text-zinc-500 text-sm">Camera is currently off</p>
                </div>
              )}
              
              {/* Overlay Status */}
              {webCamEnable && (
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs text-green-400 flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   Active
                </div>
              )}
            </div>

            {/* Toggle Button */}
            <Button 
              className={`w-full py-6 text-base font-medium transition-all duration-300 ${webCamEnable ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700' : 'bg-white text-black hover:bg-zinc-200'}`}
              onClick={() => setWebCamEnable(!webCamEnable)}
            >
              {webCamEnable ? (
                <>Disable Camera & Mic</>
              ) : (
                <>
                  <Camera className="mr-2 w-4 h-4" /> Enable Camera & Mic
                </>
              )}
            </Button>
          </div>

          {/* RIGHT: INFO SECTION */}
          <div className="flex flex-col gap-6 bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 hover:border-violet-500/20 transition-all duration-500">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
                Briefing
              </h2>
              <p className="text-zinc-500 text-sm">Review job details before starting.</p>
            </div>

            {/* Details Card */}
            <div className="space-y-4 bg-zinc-950/50 p-6 rounded-2xl border border-white/5">
              {loading ? (
                 <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                    <div className="h-4 bg-zinc-800 rounded w-full"></div>
                 </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-zinc-500 font-medium">Position:</span>
                    <span className="col-span-2 text-zinc-200 font-semibold">{interviewDetails?.jobPosition || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-zinc-500 font-medium">Experience:</span>
                    <span className="col-span-2 text-zinc-200">{interviewDetails?.jobExperience || "0"} Years</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-zinc-500 font-medium">Tech Stack:</span>
                    <span className="col-span-2 text-zinc-200 leading-relaxed">{interviewDetails?.jobDescription || "N/A"}</span>
                  </div>
                </>
              )}
            </div>

            {/* Warning Box */}
            <div className="mt-auto p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex gap-3 items-start">
               <AlertCircle className="w-5 h-5 text-yellow-500/80 shrink-0 mt-0.5" />
               <div className="space-y-1">
                  <p className="text-yellow-200 text-sm font-medium">Important Note</p>
                  <p className="text-yellow-500/60 text-xs leading-relaxed">
                    Once you start, you cannot pause the session. Ensure you are in a quiet environment. Do not switch tabs or click 'Back'.
                  </p>
               </div>
            </div>

            {/* Start Button */}
            <Link 
              href={`/dashboard/interview/${interviewid}/start`} 
              className={`group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300
                ${webCamEnable 
                  ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] cursor-pointer' 
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              onClick={(e) => !webCamEnable && e.preventDefault()} // Prevent click if webcam is off
            >
              Start Interview
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreInterview;