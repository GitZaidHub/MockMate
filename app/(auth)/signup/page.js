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
  User,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Unified State for Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 2. State for Real-time Errors
  const [errors, setErrors] = useState({});

  // 3. Handle Input Changes & Real-time Validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update value
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate immediately
    let newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (value.length < 3 || value.length > 20) {
          newErrors.name = "Name must be 3-20 characters.";
        } else if (!/^[a-zA-Z0-9!_-]+$/.test(value)) {
          newErrors.name = "Only letters, numbers, !, _, or - allowed.";
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address.";
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (/\s/.test(value)) {
          newErrors.password = "Password cannot contain spaces.";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters.";
        } else if (value.length > 20) {
          newErrors.password = "Password cannot be > 20 characters.";
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // 4. Send OTP Function
  const sendOTP = async () => {
    // Final check before submission
    if (Object.keys(errors).length > 0 || !formData.name || !formData.email || !formData.password) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      toast.success("OTP sent successfully");
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid to enable button
  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name.length > 0 &&
    formData.email.length > 0 &&
    formData.password.length > 0;

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden selection:bg-violet-500/30">

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Spotlight Gradient - Shifted slightly right for variety */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-md px-6 my-10">

        {/* Glass Container */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative group overflow-hidden">

          {/* Subtle moving sheen effect */}
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
                Create Account <Sparkles className="w-4 h-4 text-yellow-400" />
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Join MOckMate Ai and master your interviews.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-4">

            {/* Name Input */}
            <div className="space-y-1">
              <div className="relative group/input">
                <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`pl-10 h-11 bg-zinc-950/50 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl transition-all ${errors.name ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <div className="relative group/input">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`pl-10 h-11 bg-zinc-950/50 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl transition-all ${errors.email ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="relative group/input">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className={`pl-10 h-11 bg-zinc-950/50 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl transition-all ${errors.password ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={sendOTP}
              disabled={!isFormValid || isLoading}
              className="w-full h-11 cursor-pointer bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-violet-400 hover:text-violet-300 font-medium hover:underline underline-offset-4 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}