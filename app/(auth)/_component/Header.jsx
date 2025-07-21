'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {GiBookStorm} from "react-icons/gi";

const Header = () => {
 
//    const [isVerified, setIsVerified] = useState(false)
//   const router = useRouter();
//       // add check if token is present in localstorage redirect to dashboard
//       useEffect(() => {
//         const checkTOken=async()=>{
//           const token =   localStorage.getItem('token');
          
//         if(token){
//             try {
//               const res = await fetch('/api/auth/verify-token', {
//               method: 'POST',
//               body: JSON.stringify({ token }),
//               headers: { 'Content-Type': 'application/json' }
//           });
//           const data  =await res.json();
//           if(data.valid){
//             setIsVerified(true);
//           }
//             } catch (error) {
//               console.error("Error verifying token:", error);
//               // Optionally, you can redirect to login if token verification fails
//               router.push('/signin');
              
//             }
          
//         } 
//         }
//         checkTOken();
//       }, [router])
  return (

    <div className='flex justify-between mx-auto my-6 lg:max-w-1/2 md:max-w-3/4 max-w-[85%]  items-center py-4 border-white border rounded-3xl px-6 text-white'>
      <Link href={"/"} className='text-xl flex font-bold' >
         <span><GiBookStorm className='text-4xl' /></span>  A!_Interview
      </Link>
       <div  className='flex space-x-4'>
        <Link href={'/signin'} className='border rounded-l-2xl hover:rounded-r-2xl p-2' >Login</Link>
        <Link href={'/signup'} className='border rounded-r-2xl hover:rounded-l-2xl p-2' >signUp</Link>
      </div>
      
    </div>
  )
}

export default Header
