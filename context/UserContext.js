import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext();

export function UserProvider({children}){
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      const checkUser = async()=>{
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            await fetch('/api/auth/verify-token', {
                method: 'POST',
                body: JSON.stringify({ token }),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
            .then(data => {
                if (data.valid) {
                    setUser(data?.user);
                } else {
                    localStorage.removeItem('token');
                }
            })
        } catch (error) {
            console.log(error)
        }
      }
      checkUser();
    }, [])
    

    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext);
}