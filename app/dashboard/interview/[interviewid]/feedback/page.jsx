"use client"

import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
    ChevronsUpDownIcon,
    MessageSquareWarning,
    Sparkles,
    Home,
    Trophy,
    Target,
    CheckCircle2,
    XCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'


const Feedback = ({ params }) => {
    const [feedbacks, setFeedbacks] = useState([])
    const [overallRating, setOverallRating] = useState(0)
    const router = useRouter();

    useEffect(() => {
        getFeedback();
    }, [])

    const getFeedback = async () => {
        try {
            const resp = await fetch(`/api/useranswer?mockInterviewIdRef=${params.interviewid}`);
            const result = await resp.json();

            if (result.success) {
                setFeedbacks(result.data);

                // Calculate average rating if data exists
                if (result.data.length > 0) {
                    const totalRating = result.data.reduce((sum, item) => sum + Number(item.rating), 0);
                    setOverallRating((totalRating / result.data.length).toFixed(1));
                }
            }
        } catch (error) {
            console.error("Unexpected error fetching feedback:", error);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 relative overflow-hidden">

            {/* --- BACKGROUND LAYERS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-2">
                            <Trophy size={14} />
                            <span>Interview Completed</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Performance Report
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Review your answers and AI feedback below.
                        </p>
                    </div>

                    {/* Overall Score Card */}
                    <div className="flex items-center gap-6 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="text-right">
                            <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider">Overall Score</p>
                            <p className="text-xs text-green-400">PASSED</p>
                        </div>
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            {/* Circular Progress (Simple CSS representation) */}
                            <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                            <span className="text-3xl font-bold text-white">{overallRating}<span className="text-base text-zinc-500">/10</span></span>
                        </div>
                    </div>
                </div>

                {/* --- FEEDBACK LIST --- */}
                <div className="space-y-6">
                    {feedbacks && feedbacks.map((item, index) => (
                        <Collapsible key={index} className='group'>

                            {/* Question Header (Trigger) */}
                            <CollapsibleTrigger className='w-full bg-zinc-900/40 border border-white/5 p-6 rounded-xl flex items-center justify-between hover:bg-zinc-900/60 hover:border-violet-500/30 transition-all duration-300 text-left' >
                                <div className='flex gap-4 items-start'>
                                    <div className="mt-1 w-8 h-8 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 border border-white/5">
                                        Q{index + 1}
                                    </div>
                                    <h3 className="text-lg font-medium text-zinc-200 group-data-[state=open]:text-violet-300 transition-colors">
                                        {item.question}
                                    </h3>
                                </div>
                                <ChevronsUpDownIcon className='h-5 w-5 text-zinc-500 group-hover:text-white transition-colors' />
                            </CollapsibleTrigger>

                            {/* Detailed Content */}
                            <CollapsibleContent>
                                <div className='mt-3 ml-2 md:ml-12 space-y-4 pr-2'>

                                    {/* Rating Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${Number(item.rating) < 5 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                                            Rating: {item.rating}/10
                                        </div>
                                    </div>

                                    {/* User Answer Card */}
                                    <div className='p-4 rounded-xl bg-zinc-900/30 border-l-2 border-l-amber-500/50 border-y border-r border-white/5'>
                                        <h4 className='flex items-center gap-2 text-sm font-bold text-amber-500 mb-2'>
                                            <XCircle size={16} /> Your Answer
                                        </h4>
                                        <p className='text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap'>{item.userAns}</p>
                                    </div>

                                    {/* Correct Answer Card */}
                                    <div className='p-4 rounded-xl bg-green-900/10 border-l-2 border-l-green-500/50 border-y border-r border-green-500/10'>
                                        <h4 className='flex items-center gap-2 text-sm font-bold text-green-400 mb-2'>
                                            <CheckCircle2 size={16} /> Better Answer
                                        </h4>
                                        <p className='text-zinc-300 text-sm leading-relaxed'>{item.correctAns}</p>
                                    </div>

                                    {/* Feedback Card */}
                                    <div className='p-4 rounded-xl bg-blue-900/10 border border-blue-500/20'>
                                        <h4 className='flex items-center gap-2 text-sm font-bold text-blue-400 mb-2'>
                                            <Target size={16} /> AI Feedback
                                        </h4>
                                        <p className='text-blue-200/80 text-sm italic'>{item.feedback}</p>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>

                {/* --- FOOTER ACTIONS --- */}
                <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-white/5'>

                    {/* Disclaimer */}
                    <HoverCard>
                        <HoverCardTrigger className='flex items-center gap-2 text-zinc-500 text-sm hover:text-zinc-300 cursor-pointer transition-colors'>
                            <MessageSquareWarning size={16} />
                            <span>Disclaimer</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs leading-relaxed shadow-xl">
                            AI-generated feedback may not be 100% accurate. Use this analysis as a guide for improvement rather than an absolute metric.
                        </HoverCardContent>
                    </HoverCard>

                    {/* Action Buttons */}
                    <div className='flex gap-4 w-full md:w-auto'>
                        <Button
                            variant="outline"
                            className="flex-1 md:flex-none border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            onClick={() => router.push('/dashboard')}
                        >
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                        </Button>

                        <Button
                            className="flex-1 md:flex-none bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]"
                            onClick={() => router.replace('/dashboard/interview/new')}
                        >
                            Start New Interview <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Feedback