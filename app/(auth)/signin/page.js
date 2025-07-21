"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { GiBookStorm } from 'react-icons/gi'
import { toast } from 'sonner'



const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const sendOTP = async () => {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    // add check for blank space 
    if (/\s/.test(password)) {
      toast.error("Password cannot contain spaces");
      return;
    }
    // if password is more than 20 characters
    if (password.length > 20) {
      toast.error("Password cannot be more than 20 characters long");
      return;
    }

    
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/signin-verify', {
        method: 'POST',
        body: JSON.stringify({ email ,password}),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }
      toast.success("OTP sent successfully");
      // after successful OTP send
      router.push(`/verify?email=${encodeURIComponent(email)}`);

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
     <div className='text-white rounded-2xl mx-auto container my-9 py-8 flex justify-center max-w-3xl bg-blend-darken border border-white' >
          {/* <h1 className='text-4xl text-center font-bold m-10' >Signup</h1>
          <input value={email} onChange={e => setEmail(e.target.value)}  placeholder="Email" />
          <button className='cursor-pointer mx-4 border' onClick={sendOTP}>Send OTP</button> */}
          <div className='flex flex-col gap-3 w-1/2 justify-center items-center ' >
          <div className='flex item-cente gap-4 space-y-4 justify-center' >
            <span className='text-6xl' ><GiBookStorm/></span>
            <p className='text-4xl font-bold' > A!_INTERVIEW</p>
          </div>
            <p className='text-3xl font-semi-bold' >Practice With Ai</p>
    
            <Input type="email" onChange={e=>setEmail(e.target.value)}  placeholder="Email" />
            <Input type="password" onChange={e=>setPassword(e.target.value)}  placeholder="Create Password" />
            {isLoading ? (
              <Button size="sm" disabled>
          <Loader2Icon className="animate-spin" />
          Please wait
        </Button>
            ): (
              <Button onClick={sendOTP} type="submit" className='cursor-pointer' >Log In</Button>
            ) }
            <span>does&apos;t have account <Link href="/signup" className='hover:underline font-mono' >Create account</Link> </span> 
          </div>
        </div>
  )
}

export default Signin
