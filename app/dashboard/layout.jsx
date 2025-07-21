"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProvider } from "@/context/UserContext";


export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkToken=async()=>{
      const token = localStorage.getItem('token');
      console.log("Token in dashboard layout:", token);
    try {
      if (!token) {
      router.push('/signin');
      return;
    }
    const res = await fetch('/api/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' }
    })
      const data = await res.json();
      console.log("Token verification response:", data);
      
      if(!data.valid) {
        router.push('/signin');
        return;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      // Optionally, you can redirect to login if token verification fails
      router.push('/signin');
      
    }
    }
    checkToken();
  }, []);

  return (
    <div className="dark " >
      <UserProvider>
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full" >
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
      </UserProvider>
    </div>
  )
}

