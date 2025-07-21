"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Verify() {

  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if(emailParam){
      setEmail(emailParam);
    }else{
      toast.error('Email not found, go back to signup page')
      router.push('/signup')
    }
  
    
  }, [])
  

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("login data", data);
      if (res.ok && data.success) {
        localStorage.setItem("token",data.token)
        toast.success(data.message);
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      
    }
  };

  return (
    <div className="text-white rounded-2xl mx-auto container my-9 py-8 flex  justify-center max-w-3xl bg-blend-darken border border-white">
      {/* <h1>Verify OTP</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="OTP" />
      <button onClick={verifyOTP}>Verify</button> */}
      <form onSubmit={verifyOTP} className="flex flex-col space-y-7">
        <h1 className="text-center text-3xl font-bold ">Enter OTP</h1>

        <InputOTP maxLength={6} value={otp} onChange={setOTP}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex justify-center items-center gap-2.5">
          <Button type="submit" className="btn">
            Verify OTP
          </Button>
          <Button
            className="text-white cursor-pointer"
            variant="link"
            onClick={() => window.open("https://mail.google.com", "_blank")}
          >
            Open Gmail
          </Button>
        </div>
      </form>
    </div>
  );
}
