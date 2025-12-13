"use client";
import React, { useState } from 'react';
import ResumeDropzone from '../_components/Resume_dropd';
import { Loader2, CheckCircle2, AlertTriangle, XCircle, FileText, ArrowRight, RotateCcw, BrainCircuit } from 'lucide-react';
import { toast } from 'sonner';

export default function ResumePage() {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.error) throw new Error(data.details);
            setAnalysis(data);

        } catch (error) {
            console.error(error);
            toast.error("Analysis failed. Please try a clearer PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 relative overflow-hidden">

            {/* --- BACKGROUND LAYERS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">

                {/* --- HEADER --- */}
                {!analysis && !loading && (
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium animate-in fade-in slide-in-from-bottom-4">
                            <BrainCircuit className="w-3 h-3" />
                            <span>AI Resume Doctor</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Is your resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">ATS Ready?</span>
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Get a detailed score, keyword analysis, and actionable fixes to crack the shortlist algorithm.
                        </p>
                    </div>
                )}

                {/* --- MAIN CONTENT SWITCHER --- */}
                <div className="w-full">
                    {loading ? (
                        // 1. LOADING STATE
                        <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-700">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full"></div>
                                <Loader2 className="w-16 h-16 text-violet-500 animate-spin relative z-10" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="text-xl font-semibold text-white">Analyzing Document...</h3>
                                <p className="text-zinc-500 text-sm">Extracting keywords • Checking formatting • Calculating Score</p>
                            </div>
                        </div>
                    ) : !analysis ? (
                        // 2. UPLOAD STATE
                        <ResumeDropzone onFileUpload={handleFileUpload} />
                    ) : (
                        // 3. RESULT DASHBOARD
                        <ResumeAnalysisDashboard data={analysis} reset={() => setAnalysis(null)} />
                    )}
                </div>
            </div>
        </div>
    );
}

// --- DASHBOARD COMPONENT ---
function ResumeAnalysisDashboard({ data, reset }) {

    // Helper for Score Color
    const getScoreInfo = (score) => {
        if (score >= 80) return { color: "text-green-400", border: "border-green-500/50", bg: "bg-green-500/10", label: "Strong" };
        if (score >= 60) return { color: "text-yellow-400", border: "border-yellow-500/50", bg: "bg-yellow-500/10", label: "Average" };
        return { color: "text-red-400", border: "border-red-500/50", bg: "bg-red-500/10", label: "Needs Work" };
    };

    const scoreInfo = getScoreInfo(data.ats_score);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Top Row: Score & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. Score Card */}
                <div className="relative group overflow-hidden bg-zinc-900/40 border border-white/5 p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-zinc-900/60 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/5 pointer-events-none" />

                    <div className={`relative w-40 h-40 flex items-center justify-center rounded-full border-8 ${scoreInfo.bg} ${scoreInfo.border} mb-6 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]`}>
                        <div className="flex flex-col items-center">
                            <span className={`text-5xl font-bold ${scoreInfo.color}`}>{data.ats_score}</span>
                            <span className="text-xs text-zinc-500 font-mono mt-1">/100</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">ATS Score</h3>
                    <p className={`text-sm font-medium ${scoreInfo.color} px-3 py-1 rounded-full bg-zinc-950 border border-white/5`}>
                        {scoreInfo.label}
                    </p>
                </div>

                {/* 2. Summary Card */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-violet-500/20 transition-all">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-zinc-800 rounded-lg text-zinc-300">
                                <FileText size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Professional Summary</h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                            "{data.summary}"
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex gap-4">
                        <div className="text-sm">
                            <span className="text-zinc-500 block mb-1">Detected Role</span>
                            <span className="text-zinc-200 font-medium bg-zinc-800/50 px-3 py-1 rounded-lg border border-white/5">
                                {data.job_title || "General Software Engineer"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row: Keyword Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 3. Missing Keywords */}
                <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl relative overflow-hidden group hover:border-red-500/20 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="text-red-400" />
                        <h3 className="text-lg font-bold text-red-100">Missing Critical Keywords</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.missing_keywords?.length > 0 ? (
                            data.missing_keywords.map((kw, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-300 text-sm border border-red-500/20">
                                    {kw}
                                </span>
                            ))
                        ) : (
                            <p className="text-green-400 text-sm flex items-center gap-2">
                                <CheckCircle2 size={16} /> No critical keywords missing!
                            </p>
                        )}
                    </div>
                </div>

                {/* 4. Skills Found */}
                <div className="bg-green-500/5 border border-green-500/10 p-8 rounded-3xl relative overflow-hidden hover:border-green-500/20 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                        <CheckCircle2 className="text-green-400" />
                        <h3 className="text-lg font-bold text-green-100">Skills Detected</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.key_skills_found?.map((skill, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-300 text-sm border border-green-500/20">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Detailed Fixes */}
            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">Actionable Improvements</h3>
                <div className="grid gap-4">
                    {data.weaknesses?.map((item, i) => (
                        <div key={i} className="group p-5 bg-zinc-950/50 border border-white/5 rounded-2xl hover:border-violet-500/20 transition-all">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {i + 1}
                                </span>
                                <div className="space-y-2">
                                    <p className="text-zinc-300 font-medium text-sm">
                                        <span className="text-red-400 mr-2">Issue:</span>
                                        {item.point}
                                    </p>
                                    <div className="flex gap-2 items-start text-sm">
                                        <ArrowRight size={16} className="text-green-500 mt-1 shrink-0" />
                                        <p className="text-zinc-400 italic">
                                            <span className="text-green-400 not-italic font-medium mr-1">Fix:</span>
                                            {item.fix}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center pt-8 pb-20">
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold rounded-xl transition-all hover:scale-105"
                >
                    <RotateCcw size={18} />
                    Upload New Resume
                </button>
            </div>
        </div>
    );
}