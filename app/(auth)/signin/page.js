"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Loader2Icon,
  Cpu,
  Mail,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendOTP = async () => {
    // 1. Validation Logic
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (/\s/.test(password)) {
      toast.error("Password cannot contain spaces");
      return;
    }
    if (password.length > 20) {
      toast.error("Password cannot be more than 20 characters long");
      return;
    }

    // 2. API Call
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/signin-verify', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      toast.success("OTP sent successfully");
      router.push(`/verify?email=${encodeURIComponent(email)}`);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden selection:bg-violet-500/30">

      {/* --- BACKGROUND EFFECTS (Same as Landing Page) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Spotlight Gradient - slightly shifted for this page */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-md px-6">

        {/* Glass Container */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative group overflow-hidden">

          {/* Subtle moving sheen effect on card */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Logo / Header Section */}
          <div className="flex flex-col items-center mb-8 space-y-4">
            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner relative">
              {/* Glowing icon */}
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
              <Logo />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                Welcome Back <Sparkles className="w-4 h-4 text-yellow-400" />
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Continue your preparation journey.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-4">

            {/* Email Input */}
            <div className="space-y-1">
              <div className="relative group/input">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" />
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="pl-10 h-11 bg-zinc-950/50 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="relative group/input">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" />
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-10 h-11 bg-zinc-950/50 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={sendOTP}
              disabled={isLoading}
              className="w-full h-11 cursor-pointer bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Log In <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-violet-400 hover:text-violet-300 font-medium hover:underline underline-offset-4 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;