"use client";
import React, { useEffect, useState } from "react";
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

    const [stats, setStats] = useState({ score: "--/10", taken: 0, status: "N/A" });

    useEffect(() => {
        if (user?.user?.email) {
            fetchStats();
        }
    }, [user?.user?.email]);

    const fetchStats = async () => {
        try {
            const resp = await fetch(`/api/interview?createdBy=${user.user.email}`);
            const result = await resp.json();
            
            if (result.success && result.data) {
                const interviews = result.data;
                const taken = interviews.length;
                let score = "--/10";
                let status = "N/A";
                
                if (taken > 0) {
                    const lastInterview = interviews[0];
                    status = lastInterview.jobPosition || "Completed";
                    if (status.length > 18) {
                        status = status.substring(0, 15) + "...";
                    }

                    const ansResp = await fetch(`/api/useranswer?mockInterviewIdRef=${lastInterview.mockInterviewId}`);
                    const ansResult = await ansResp.json();
                    
                    if (ansResult.success && ansResult.data && ansResult.data.length > 0) {
                        const totalRating = ansResult.data.reduce((sum, item) => sum + Number(item.rating), 0);
                        score = `${(totalRating / ansResult.data.length).toFixed(1)}/10`;
                    }
                }
                
                setStats({ score, taken, status });
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    console.log("User in Dashboard Page:", user);
    
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 relative overflow-hidden flex flex-col items-center w-full pb-20">
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto space-y-10 p-6 md:p-10">
                {/* Header Section */}
                <div className="w-full bg-zinc-900/40 border border-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-violet-500/20 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
                                {(() => {
                                    const hour = new Date().getHours();
                                    if (hour < 12) return "Good Morning";
                                    if (hour < 18) return "Good Afternoon";
                                    return "Good Evening";
                                })()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">{user?.user?.email.split('@')[0]}!</span>
                            </h1>
                            <p className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
                                Ready to ace your next interview? Start a new mock session or track your progress below.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="flex items-center gap-5 p-6 bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-3xl hover:border-violet-500/20 hover:bg-zinc-900/60 transition-all duration-300 group">
                        <div className="p-4 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform">
                            <SquarePen className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-zinc-500 mb-1">Last Score</div>
                            <div className="text-3xl font-bold text-white">{stats.score}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-6 bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-3xl hover:border-indigo-500/20 hover:bg-zinc-900/60 transition-all duration-300 group">
                        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                            <User2Icon className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-zinc-500 mb-1">Interviews Taken</div>
                            <div className="text-3xl font-bold text-white">{stats.taken}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-6 bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-3xl hover:border-fuchsia-500/20 hover:bg-zinc-900/60 transition-all duration-300 group">
                        <div className="p-4 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20 text-fuchsia-400 group-hover:scale-110 transition-transform">
                            <File className="w-7 h-7" />
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium text-zinc-500 mb-1">Last Interview</div>
                            <div className="text-xl font-bold text-white capitalize truncate">{stats.status}</div>
                        </div>
                    </div>
                </div>

                {/* Action Zone */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="text-violet-400 w-6 h-6" />
                            Action Zone
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Interview Card */}
                        <div className="group relative flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-md hover:border-violet-500/30 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 flex flex-col h-full space-y-8">
                                <div>
                                    <h3 className="font-bold text-2xl text-white mb-3 group-hover:text-violet-300 transition-colors">
                                        Mock Interview
                                    </h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        Test your skills with an AI-driven behavioral and technical interview session. Get instant, actionable feedback.
                                    </p>
                                </div>
                                
                                <div className="flex-1 flex items-center justify-center py-8">
                                    <div className="w-24 h-24 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.1)] group-hover:scale-110 transition-all duration-500 group-hover:border-violet-500/30 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                                        <Sparkles className="w-10 h-10 text-violet-500" />
                                    </div>
                                </div>

                                <Link href="/dashboard/interview" className="w-full mt-auto block">
                                    <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-6 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                        Start Session
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Resume Doctor Card */}
                        <div className="group relative flex flex-col p-8 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-md hover:border-fuchsia-500/30 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 flex flex-col h-full space-y-6">
                                <div>
                                    <h3 className="font-bold text-2xl text-white mb-3 group-hover:text-fuchsia-300 transition-colors">
                                        Resume Doctor
                                    </h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        Analyze your resume for ATS compatibility and get detailed suggestions to land more interviews.
                                    </p>
                                </div>
                                
                                <div className="flex-1 w-full flex flex-col items-center justify-center">
                                    <div className="w-full transition-transform duration-500">
                                        <ResumeDropzone />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interview List Area */}
                <div className="w-full pt-6">
                    <InterviewList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;