"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from "sonner";
import {
  Loader2Icon,
  ShieldCheck,
  Mail,
  ArrowRight,
  Sparkles
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const router = useRouter();

  // 1. Logic: Extract Email or Redirect
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Small delay to allow toast to show if redirected immediately (though rare in effect)
      // verify logic usually expects email
      // If we want to allow manual entry, we might remove this.
      // But adhering to original logic:
      toast.error('Email not found, go back to signup page');
      router.push('/signup');
    }
  }, [searchParams, router]);

  // 2. Logic: Verify OTP API Call
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        // Fallback if server didn't send JSON
        const text = await res.text();
        console.error("Non-JSON response:", text);
        toast.error("Server error. Please try again.");
        setIsLoading(false);
        return;
      }

      console.log("login data", data);

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token); //
        toast.success(data.message);
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden selection:bg-violet-500/30">

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Spotlight Gradient - Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-md px-6">

        {/* Glass Container */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative group overflow-hidden">

          {/* Subtle sheen effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Header Section */}
          <div className="flex flex-col items-center mb-8 space-y-4">
            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner relative">
              {/* Glowing icon */}
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
              <ShieldCheck className="w-8 h-8 text-green-400 relative z-10" />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                Verify Identity <Sparkles className="w-4 h-4 text-violet-400" />
              </h1>
              <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                We&apos;ve sent a 6-digit code to <br />
                <span className="text-zinc-200 font-medium">{email}</span>
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={verifyOTP} className="space-y-8">

            {/* InputOTP Wrapper */}
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOTP}>
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="h-12 w-10 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 ring-violet-500 transition-all focus:ring-2 focus:border-violet-500" />
                  <InputOTPSlot index={1} className="h-12 w-10 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 ring-violet-500 transition-all focus:ring-2 focus:border-violet-500" />
                  <InputOTPSlot index={2} className="h-12 w-10 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 ring-violet-500 transition-all focus:ring-2 focus:border-violet-500" />
                </InputOTPGroup>

                <InputOTPSeparator className="mx-2 text-zinc-600" />

                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={3} className="h-12 w-10 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 ring-violet-500 transition-all focus:ring-2 focus:border-violet-500" />
                  <InputOTPSlot index={4} className="h-12 w-10 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 ring-violet-500 transition-all focus:ring-2 focus:border-violet-500" />
                  <InputOTPSlot index={5} className="h-12 w-10 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 ring-violet-500 transition-all focus:ring-2 focus:border-violet-500" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Confirm & Enter <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full h-11 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
                onClick={() => window.open("https://mail.google.com", "_blank")} //
              >
                <Mail className="mr-2 h-4 w-4" /> Open Gmail
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm">
              Didn&apos;t receive code?{' '}
              <button className="text-violet-400 hover:text-violet-300 font-medium hover:underline underline-offset-4 transition-colors">
                Resend
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center text-white">
        <Loader2Icon className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}