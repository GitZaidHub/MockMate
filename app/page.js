'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bot,
  FileText,
  Mic,
  ChevronRight,
  Terminal,
  Code2,
  Cpu,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function Home() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < lastScroll) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 overflow-x-hidden">

      {/* --- BACKGROUND ELEMENTS (Cinematic Upgrade) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Grain Texture for that Retro feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        {/* Modern Grid Pattern with Fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Primary Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      {/* --- NAVBAR (UNTOUCHED AS REQUESTED) --- */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[60%] max-w-6xl 
        rounded-3xl px-6 h-14 flex items-center justify-between
        border border-white/10 bg-transparent backdrop-blur-md shadow-md
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
      `}
      >
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <Logo />
          </div>
          MockMate Ai
        </div>

        <div className="flex gap-3">
          <Link
            href="/signin"
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors shadow"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20">
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-24">

          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span>AI powered Placement Prep</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight pb-2">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
              Master Your
            </span>
            <span className="block text-white">
              Interviews.
            </span>
          </h1>

          {/* Hero Subtext */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Upload your resume, face our <span className="text-zinc-200 font-semibold">Gemini-powered</span> interviewer, and get the real-time feedback you need to crack that 20 LPA package.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.6)] hover:-translate-y-1">
              Start Mock Interview
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium rounded-2xl transition-all hover:-translate-y-1">
              Watch Demo
            </button>
          </div>
        </div>

        {/* --- PRO BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px]">

          {/* 1. Resume Doctor (Large Card) */}
          <div className="md:col-span-3 lg:col-span-8 group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 hover:bg-zinc-900/60 transition-all duration-500 hover:border-violet-500/30">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-110 transform origin-top-right">
              {/* Decorative background element */}
              <div className="w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="text-violet-400 w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-violet-200 transition-colors">Resume Doctor</h3>
                <p className="text-zinc-400 max-w-md text-lg leading-snug">
                  Our engine scores your resume against ATS algorithms and suggests specific keyword fixes.
                </p>
              </div>

              {/* Fake UI Element */}
              <div className="mt-4 flex gap-3">
                <div className="px-3 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">ATS Score: 92/100</div>
                <div className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-mono">Keywords Found: 14</div>
              </div>
            </div>
          </div>

          {/* 2. Voice AI (Tall Card) */}
          <div className="md:col-span-3 lg:col-span-4 group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 hover:bg-zinc-900/60 transition-all duration-500 hover:border-violet-500/30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-violet-900/10 group-hover:to-violet-900/20 transition-all" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:rotate-12 transition-transform duration-300">
                  <Mic className="text-pink-400 w-6 h-6" />
                </div>
                <div className="flex gap-0.5 items-end h-6">
                  {/* Fake Audio Visualizer */}
                  <div className="w-1 bg-pink-500/50 h-3 animate-pulse"></div>
                  <div className="w-1 bg-pink-500/50 h-5 animate-pulse delay-75"></div>
                  <div className="w-1 bg-pink-500/50 h-2 animate-pulse delay-150"></div>
                  <div className="w-1 bg-pink-500/50 h-4 animate-pulse delay-100"></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-white">Voice Analysis</h3>
              <p className="text-zinc-400 text-sm mb-auto">
                Real-time feedback on your confidence, pacing, and filler words.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-white/5">
                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Feedback</div>
                <div className="text-sm text-zinc-200">Your explanation of Big-O was clear, but try to reduce &apos;um&apos; pauses.</div>
              </div>
            </div>
          </div>

          {/* 3. Tech Stack (Small Card) */}
          <div className="md:col-span-3 lg:col-span-4 group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 hover:bg-zinc-900/60 transition-all duration-500 hover:border-violet-500/30">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
              <Code2 className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Tech Screening</h3>
            <p className="text-zinc-400 text-sm">
              Tailored DSA & System Design questions based on your stack (MERN, Java, etc).
            </p>
          </div>

          {/* 4. Instant Feedback (Large Card with Graph Graphic) */}
          <div className="md:col-span-3 lg:col-span-8 group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 hover:bg-zinc-900/60 transition-all duration-500 hover:border-violet-500/30 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                <Bot className="text-yellow-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Instant Feedback Loop</h3>
              <p className="text-zinc-400 max-w-sm">
                Don&apos;t wait for a rejection email. Get detailed feedback immediately after the session.
              </p>
            </div>

            {/* Floating Stats Card Graphic */}
            <div className="relative w-full max-w-xs aspect-video bg-zinc-950 rounded-xl border border-zinc-800 p-4 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-400">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Status</div>
                  <div className="text-sm font-bold text-white">Ready for Google</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[85%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Technical</span>
                  <span>85%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[92%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Communication</span>
                  <span>92%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- HOW IT WORKS (Redesigned) --- */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">How <span className="text-violet-500">AI_Prep</span> Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Resume",
                desc: "Drag & drop your PDF. We parse it instantly to understand your tech stack.",
                icon: <FileText className="text-white" size={20} />
              },
              {
                step: "02",
                title: "Configure Role",
                desc: "Choose Full Stack, Frontend, or Backend paths for targeted questions.",
                icon: <Terminal className="text-white" size={20} />
              },
              {
                step: "03",
                title: "Start Interview",
                desc: "Interactive voice-based session with Gemini. It feels like a real human.",
                icon: <Zap className="text-white" size={20} />
              }
            ].map((item, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 hover:border-violet-500/20 transition-all duration-300">
                <div className="absolute -top-4 left-8 bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-violet-500 font-mono text-sm shadow-xl">
                  {item.step}
                </div>
                <div className="mb-4 mt-2 w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/20 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 py-12 mt-20 bg-zinc-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-300">
              <Logo size={14} />
            </div>
            <span className="font-semibold text-zinc-300">MockMate Ai</span>
          </div>
          <div className="flex gap-8">
            <p className="hover:text-violet-400 transition-colors cursor-pointer">Privacy</p>
            <p className="hover:text-violet-400 transition-colors cursor-pointer">Terms</p>
            <p className="hover:text-violet-400 transition-colors cursor-pointer">Twitter</p>
          </div>
          <p className="mt-4 md:mt-0">© 2025 AI_Prep. Made with 💜 by Students.</p>
        </div>
      </footer>
    </div>
  );
}