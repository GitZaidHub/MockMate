"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { WebcamIcon, Mic, CameraIcon, CheckCircle2, Lightbulb as IconBulb } from "lucide-react"; // adjust icon imports if needed
import Link from "next/link";
import { use, useState,useEffect } from "react";
import Webcam from "react-webcam"; 
import { toast } from "sonner";

const PreInterview = ({params}) => {
  const [webCamEnable, setWebCamEnable] = useState(false)
  const [interviewDetails, setInterviewDetails] = useState({})

  const interviewid = params.interviewid;
  console.log("interviewid", interviewid)
  useEffect(()=>{
    getInterviewDetails();
    
  },[interviewid])

  const getInterviewDetails=async()=>{
    try {
      const response = await fetch(`/api/interview?mockInterviewId=${interviewid}`,{
      method:"GET",
      headers:{'content-type':'application/json'},
    })
    const interview = await response.json();
    if(!response.ok){
      throw new Error("Failed to fetch the interview")
    }
    console.log("schedule interview",interview)
    setInterviewDetails(interview.mockInterview)
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <div className="bg-sidebar rounded-2xl p-6 w-full max-w-6xl mx-auto h-full shadow-md">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mb-2">
        Hello Buddy! Welcome to Your Interview Setup
      </h1>
      <p className="text-center text-muted-foreground mb-4">
        Make sure everything’s ready before we begin!
      </p>

      <Separator className="mb-6" />

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-6 h-auto">
        {/* Left: Media Permission Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-4 bg-muted/40 rounded-xl p-6">
          {/* Placeholder for webcam preview or icon */}
          <div className="w-full h-56 bg-black rounded-lg flex items-center justify-center">
            {/* Replace with actual webcam preview */}
            {webCamEnable ? (
          <Webcam
            audio={true}
            mirrored={true}
            onUserMedia={() => setWebCamEnable(true)}
            onUserMediaError={() => setWebCamEnable(false)}
            className="w-full h-full rounded-lg object-cover"
            // style={{height:200, width:600 }}
            videoConstraints={{
              facingMode: "user",
            }}
          />
        ) : (
          <WebcamIcon className="text-white" size={64} />
        )}
          </div>

          {/* Allow buttons */}
          <div className="flex gap-3">
            <Button className={"cursor-pointer hover:shadow-2xl hover:border "} variant="secondary" onClick={() => setWebCamEnable(true)}>
          <CameraIcon className="mr-1" size={18} />
          Allow Webcam and Mic
          <Mic className="ml-1" size={18} />
        </Button>

            
          </div>

          {/* Privacy Tooltip */}
          <Tooltip>
            <TooltipTrigger>
              <IconBulb className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="w-64 text-sm">
              <p>
                🔒 <strong>Your privacy is protected.</strong><br />
                We request access to your mic and camera only for this interview session. Nothing is stored, recorded, or shared.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Right: Interview Info Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-4 bg-muted/40 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-center mb-2">
            Interview Overview
          </h2>
          <div className="space-y-1 text-base">
            <p><strong>Job Title:</strong> {interviewDetails.jobPosition}</p>
            <p><strong>Skills:</strong> {interviewDetails.jobDescription}</p>
            <p><strong>Experience:</strong> {interviewDetails.jobExperience}</p>
            { interviewDetails.jobProject && <p><strong>Project:</strong> {interviewDetails.jobProject}</p>}
          </div>

          {/* Notice Box */}
          <div className="text-sm text-muted-foreground mt-4 p-4 border rounded-md flex items-start gap-2 bg-background">
            <CheckCircle2 className="text-green-600 mt-0.5" />
            <span className="text-green-300" >
              <strong>Note:</strong> Please review your information before starting.
              Once the interview begins, changes are not allowed.
              Ensure your mic and camera are functioning properly. <br />
              Don't click any button from sidebar or back , otherwise you will loose your interview
            </span>
          </div>

          {/* Start Button */}
          <div className="mt-auto flex justify-center pt-4">
            <Link href={`/dashboard/interview/${interviewid}/start`}  className="cursor-pointer bg-white text-black rounded-md font-semibold hover:bg-gray-600 p-2 " >
              Start Interview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreInterview;
