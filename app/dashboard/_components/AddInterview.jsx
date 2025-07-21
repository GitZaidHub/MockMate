"use client"
import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@/context/UserContext'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'

const AddInterview = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [Project, setProject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [jobExperience, setJobExperience] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [jobPosition, setJobPosition] = useState('')
  const {user} = useUser();
  const router = useRouter();
  console.log("user is : ",user);
  const handleSubmit =  async(e)=>{
    setIsLoading(true);
    e.preventDefault();
    console.log( "this is console log",jobExperience, jobDescription, jobPosition, Project);

 try {
  const InputPrompt = `
You are an AI Interviewer. Based on the following details, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS} interview questions and answers in JSON format. Each item should have a "question" and "answer".

Details:
- Job Role: ${jobPosition}
- Job Description: ${jobDescription}
- Experience: ${jobExperience} years
- Project: ${Project || "None"}
`
  const result = await chatSession.sendMessage(InputPrompt);
  const text = await result.response.text();
  const MockResponse = await text.replace('```json','').replace('```','');
  console.log("normal",MockResponse);
  console.log("json ",JSON.parse(MockResponse));
  setJsonResponse(JSON.parse(MockResponse));
  
  const resp = await fetch('/api/interview',{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
      
      jobPosition,
      jobExperience,
      jobDescription,
      jsonMockResponse: MockResponse,
      createdBy: user.email,
      createdAt:moment().format('YYYY-MM-DD')
    })
  })

  const data =await  resp.json();
  console.log("response data ->",data);

  if(data){
    setOpenDialogue(false);
    toast.success("interview generated");
    router.push(`/dashboard/interview/`+data?.mockInterviewId);
  }
 } catch (error) {
  toast.error("Facing problem while generating interview");
  console.log(error);
 }finally{
  setIsLoading(false);
 }
  }

  return (
    <div className=''>
      <h1 className='md:text-2xl text-xl  ml-10 font-semibold pb-4' >Add and start new Interview</h1>
      <div onClick={()=>setOpenDialogue(true)} className='md:w-1/4 w-1/2 rounded-md flex justify-center items-center h-26
      hover:bg-white hover:text-black cursor-pointer bg-black border-1  border-white  ' >
        <span className='font-semibold hover:z-10  text-lg'>+Add Interview</span>
      </div>
      <Dialog open={openDialogue} onOpenChange={setOpenDialogue} >
  <DialogTrigger></DialogTrigger>
  <DialogContent className="bg-black text-white">
    <DialogHeader>
      <DialogTitle className="text-xl text-white">Tell us more about your job interviewing</DialogTitle>
      <DialogDescription>
        </DialogDescription>
    </DialogHeader>
        <form onSubmit={handleSubmit} >
          <div>
            <h2 className="text-lg text-white">Add Details about your job position/role, job experience</h2>
            <div className="mt-7 my-3">
              <label className="block pb-2 text-sm text-gray-300">Job Role/Position</label>
              <Input
              onChange={(e)=>setJobPosition(e.target.value)}
                placeholder="Ex. AWS developer"
                className="bg-black text-white"
                required
              />
            </div>
            <div className="my-3">
              <label className="block pb-2 text-sm text-gray-300">Skills/Tech Stack</label>
              <Input
              onChange={(e)=>setJobDescription(e.target.value)}
                placeholder="Ex. mongodb , react , nextjs .."
                className="bg-black text-white"
                required
              />
            </div>
            <div className="my-3">
              <label className="block pb-2 text-sm text-gray-300">Experience (in years)</label>
              <Input
              onChange={(e)=>setJobExperience(e.target.value)}
                placeholder="Ex. 12"
                className=" bg-black  text-white"
                required
              type="number"
              min="0"
              />
            </div>
            <div className="my-3">
              <label className="block pb-2 text-sm text-gray-300">Project (if any)</label>
              <Textarea
                onChange={(e)=>setProject(e.target.value)}
                placeholder="Explain your project in concise"
                className=" bg-black text-white"
              />
            </div>
          </div>
          <div className="flex gap-7 pt-2 justify-end">
            <Button className="cursor-pointer" variant={"secondary"} type="button" onClick={()=>setOpenDialogue(false)} >Cancel</Button>
            {isLoading ? (
              <Button size="sm" disabled>
                        <Loader2Icon className="animate-spin" />
                        Generating Interview
                      </Button>
            ):(
              <Button className="cursor-pointer" variant={"secondary"} type="submit" >Submit</Button>
            )}
          </div>
        </form>
      
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddInterview
