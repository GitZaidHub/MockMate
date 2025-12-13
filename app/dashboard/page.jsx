"use client";
import React from "react";
import AddInterview from "./_components/AddInterview";
import InterviewList from "./_components/InterviewList";
import { ArrowRight, Edit2Icon, File, Sparkles, SquarePen, User2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ResumeDropzone from "./_components/Resume_dropd";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {

    const user = useUser(); // Assuming you have a useUser hook to get user info

    console.log("User in Dashboard Page:", user);
    return (
        <div className="p-6 flex flex-col items-center w-full">

            {/* Greeting Card - 80% Width */}
            <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl shadow-xl text-white mb-10 transition-all hover:scale-[1.01]">
                {/* Greeting Card - 80% Width */}
                <h1 className="text-3xl font-bold">
                    {(() => {
                        const hour = new Date().getHours();
                        if (hour < 12) return "Good Morning";
                        if (hour < 18) return "Good Afternoon";
                        return "Good Evening";
                    })()}, {user?.user?.email}!
                </h1>
                <p className="mt-2 text-blue-100">Ready to ace your next interview? Start a new mock interview or review your progress below.</p>
                {/* <div className="mt-6 flex items-center gap-4">
                    <AddInterview />
                </div> */}
            </div>
            <div className="header-content flex w-full justify-between  ">
                <div className="flex items-center w-1/4 h-24 cards gap-4">
                    <div className="logo"><SquarePen /></div>
                    <div className="content">
                        <div className="text-xl text-gray-300 " >Interview Score</div>
                        <div className="font-bold text-[rgba(139, 92, 246, 0.5)]" >79/100</div>
                    </div>
                </div>
                <div className="flex items-center w-1/4 gap-4 cards">
                    <div className="logo"><User2Icon /></div>
                    <div className="content">
                        <div className="text-xl text-gray-300" >Interview Taken</div>
                        <div className="font-bold text-[rgba(139, 92, 246, 0.5)]" >15</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-1/4  cards">
                    <div className="logo"><File /></div>
                    <div className="content">
                        <div className="text-xl text-gray-300" >Resume Status</div>
                        <div className="font-bold" >Good</div>
                    </div>
                </div>
            </div>
            {/* <Separator className="my-2 bg-gray-500 " /> */}
            <div className="actionElement w-full">
                <h1 className="text-2xl font-bold my-3 mb-4" >Action Zone</h1>
                <div className="flex justify-center w-full gap-18" >
                    <div className="
    group relative h-64 w-1/2 flex flex-col justify-between p-6 
    rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-md 
    hover:border-violet-500/50 transition-all duration-300
">
                        {/* 1. Subtle Background Gradient (Decoration) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* 2. Top Section: Text Info */}
                        <div className="relative z-10">
                            <h1 className="font-bold text-xl text-white mb-2 group-hover:text-violet-300 transition-colors">
                                Mock Interview
                            </h1>
                            <p className="text-sm text-zinc-400">
                                Start a new AI-driven session to test your skills.
                            </p>
                        </div>

                        {/* 3. Middle Section: Visual Icon (To fill the empty space) */}
                        <div className="relative z-10 flex justify-center items-center flex-1">
                            <div className="p-4 bg-zinc-800/50 rounded-full border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="w-8 h-8 text-violet-500 animate-pulse" />
                            </div>
                        </div>

                        {/* 4. Bottom Section: The Button */}
                        <div className="relative z-10">
                            <Link href="/dashboard/interview" className="w-full block">
                                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-2">
                                    Start Session
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 items-center gap-4 cards">
                        <h1 className="font-bold text-xl" >Resume Doctor</h1>
                        <ResumeDropzone />
                    </div>
                </div>

            </div>


            {/* Content Area - Matching Width */}
            <div className="w-[80%]">
                <InterviewList />
            </div>

        </div >
    );
};

export default Dashboard;