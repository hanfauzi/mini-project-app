"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-[#f8fafc] text-[#001a3a] relative overflow-x-hidden grid-cols-12">
    <SidebarProvider>
        {/* Sidebar */}
     
          <Sidebar className="w-full col-span-3 md:w-48 h-16 md:h-screen flex md:block items-center md:items-stretch">
            <SidebarHeader className="hidden md:flex">
              <span className="font-bold text-xl tracking-tight text-blue-700">
                TICKLY
              </span>
            </SidebarHeader>
            <SidebarSeparator className="hidden md:block" />
            <SidebarContent className="w-full flex-1 flex md:block justify-between md:justify-start">
              <SidebarGroup>
                <SidebarGroupLabel className="hidden md:block">Menu</SidebarGroupLabel>
                <SidebarMenu className="flex flex-row md:flex-col w-full">
                  <SidebarMenuItem>
                    <Link href="/organizer/dashboard">
                      <SidebarMenuButton className="w-full">Dashboard</SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton className="w-full">Events</SidebarMenuButton>
                      <Link href={"/organizer/dashboard/events"}>
                      <SidebarMenuSub className="text-[14px]">My Events
                    </SidebarMenuSub>
                    </Link>
                    <Link href={"/organizer/dashboard/create-event"}>
                    <SidebarMenuSub className="text-[14px]">Create Event
                    </SidebarMenuSub>
                  </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/organizer/dashboard/transactions">
                      <SidebarMenuButton className="w-full">Transactions</SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/organizer/dashboard/profile">
                      <SidebarMenuButton className="w-full">Profile</SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/organizer/dashboard/vouchers">
                      <SidebarMenuButton className="w-full">vouchers</SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
           
 <div className="pt-16 col-span-9 min-h-screen w-full">
  <main className="w-full ">
    {children}
  </main>
</div>
        

    </SidebarProvider>
      </div> 
  );
}

{/* Main Content wrapper */}