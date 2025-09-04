"use client"
import React from 'react'
import QuestionSection from './_components/QuestionSection'
import { useEffect,useState } from 'react'
import Webcam from "react-webcam"; 

import { WebcamIcon, Mic, CameraIcon, CheckCircle2, Lightbulb as IconBulb, MicOff } from "lucide-react"; 
import { Button } from '@/components/ui/button';

const InterviewPage = ({params}) => {
  const [interviewQuestions, setInterviewQuestions] = useState()
  const [interviewDetails, setInterviewDetails] = useState()
  const [activeIndex, setActiveIndex] = useState(2)
  const interviewid = params.interviewid
 const [webCamEnable, setWebCamEnable] = useState(false)
 
  useEffect(()=>{
    getInterviewDetails();
  },[interviewid])

  const getInterviewDetails = async()=>{
    try {
      const resp = await fetch(`/api/interview?mockInterviewId=${interviewid}`, {
        method:"GET",
        headers: {'Content-Type': 'application/json'},
      })
      if (!resp.ok) {
        throw new Error("Failed to fetch interview details");
      }
      const data = await resp.json();
      const mockInterview = data.mockInterview;
      const jsonResponse = JSON.parse(mockInterview.jsonMockResponse);
      setInterviewQuestions(jsonResponse);
      setInterviewDetails(jsonResponse[0])
      console.log("jsonresponse",jsonResponse)
    } catch (error) {
      console.error("Error fetching interview details:", error);
      
    }
  }
  return (
    <div className='flex w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg'>
  {/* LEFT: Question Section */}
  <div className="border-r border-gray-300 w-3/4 h-full p-4">
    <QuestionSection interviewQuestions={interviewQuestions} setActiveIndex={setActiveIndex} activeIndex={activeIndex} interviewDetails={interviewDetails} />
  </div>

  {/* RIGHT: Webcam Section */}
  <div className="flex flex-col items-center justify-center w-1/4 h-full p-4 rounded-xl shadow-lg text-white">
<div className="h-1/2 p-4 flex flex-col items-center justify-between">
  {/* Webcam Preview or Icon */}
  {webCamEnable ? (
    <Webcam
      audio={false}
      mirrored={true}
      onUserMedia={() => setWebCamEnable(true)}
      onUserMediaError={() => setWebCamEnable(false)}
      className="w-full h-full rounded-xl object-cover"
      videoConstraints={{ facingMode: "user" }}
    />
  ) : (
    <WebcamIcon className="text-white" size={74} />
  )}

  {/* Toggle Webcam & Mic Button */}
  <div className="mt-4 flex gap-2">
    <Button
      className={`cursor-pointer hover:shadow-2xl ${webCamEnable ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      variant="secondary"
      onClick={() => setWebCamEnable(prev => !prev)}  // toggles state
    >
      {webCamEnable ? (
        <>
          <CameraIcon className="mr-1" size={18} />
          Disable Webcam 
        </>
      ) : (
        <>
          <CameraIcon className="mr-1" size={18} />
          Enable Webcam 
        </>
      )}
    </Button>
  </div>
  
  
</div>
{/*next andprevious buttons */}
  <div className="mt-12 flex gap-2">
    {activeIndex>0&&<Button
      className="cursor-pointer hover:shadow-2xl hover:border"
      variant="secondary"
      onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))} // Decrease index
    >
      Previous
    </Button>}
    {activeIndex<interviewQuestions?.length-1 ? (<Button
      className="cursor-pointer hover:shadow-2xl hover:border"
      variant="secondary"
      onClick={() => setActiveIndex(prev => prev + 1)} // Increase index
    >
      Next
    </Button>):(
      <Button
        className="cursor-pointer hover:shadow-2xl hover:border bg-green-500"
        variant="secondary"
        onClick={() => alert("Interview Completed!")} // Placeholder for completion action
      >
        <CheckCircle2 className="mr-1" size={18} />
        Finish Interview
      </Button>
    )}
    </div>
  </div>
  
      

</div>

  )
}

export default InterviewPage
