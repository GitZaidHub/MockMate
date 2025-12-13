"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Header from "./_component/Header";



export default function AuthLayout({ children }) {
  const router = useRouter();
  // add check if token is present in localstorage redirect to dashboard
  useEffect(() => {
    const checkTOken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }
      if (token) {
        try {
          const res = await fetch('/api/auth/verify-token', {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await res.json();
          if (data.valid) {
            router.push('/dashboard');
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          // Optionally, you can redirect to login if token verification fails
          router.push('/signin');

        }
        // .then(res => res.json())
        // .then(data => {
        //     if(data.valid){
        //         router.push('/dashboard');
        //     }
        // })
        // .catch(()=>{
        //     console.error("Token verification failed");
        //     // Optionally, you can redirect to login if token is invalid
        //     router.push('/signin');
        // })
      }
    }
    checkTOken();
  }, [router])

  return (
    <div>
      {/* <Header/> */}
      {children}
    </div>
  );
}