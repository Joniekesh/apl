import {
  ChevronUp,
  Inbox,
  LayoutDashboard,
  Settings,
  User2,
  Users,
} from "lucide-react";

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
  SidebarSeparator,
} from "../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { makeRequest } from "../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../types";
import { logout } from "../hooks/services";
import { Link, useNavigate } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: Inbox,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },

  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("/user/me");
      // console.log(res)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery<IUser>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-apl-primary text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white items-center text-2xl">
            <Link to="/">APL</Link>
          </SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-apl-primary text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {data?.firstName + " " + data?.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-[crimson]"
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
