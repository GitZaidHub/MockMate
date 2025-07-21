"use client"
import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from "lucide-react"
import {GiBookStorm} from "react-icons/gi";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuItem,DropdownMenuTrigger,DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { useUser } from "@/context/UserContext"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Interview",
    url: "/dashboard/interview",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
    const {user,setUser} = useUser();
    const router= useRouter();
    const username = user?.email.split("@")[0];
    
    const logout = async () => {
      localStorage.removeItem("token");
      setUser(null); // Clear user from context
      router.push("/signin");
    }
    
  return (
    <Sidebar variant="floating" collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-xl mx-auto my-5"} >A!_Interview <GiBookStorm /> </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={"space-y-4"} >
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton  asChild>
                    <Link  href={item.url}>
                      <item.icon className=" " />
                      <span className="font-semibold text-lg" >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter  >
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span className="cursor-pointer">Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="cursor-pointer">Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="cursor-pointer" onClick={()=>logout()} >Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}