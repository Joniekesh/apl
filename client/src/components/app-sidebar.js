import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronUp, Inbox, LayoutDashboard, Settings, User2, Users, } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, } from "../components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { makeRequest } from "../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
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
        }
        catch (error) {
            console.log(error);
        }
    };
    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
    });
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (_jsxs(Sidebar, { children: [_jsx(SidebarContent, { className: "bg-apl-primary text-white", children: _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { className: "text-white items-center text-2xl", children: _jsx(Link, { to: "/", children: "APL" }) }), _jsx(SidebarSeparator, {}), _jsx(SidebarGroupContent, { className: "mt-4", children: _jsx(SidebarMenu, { className: "flex flex-col gap-4", children: items.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: item.url, children: [_jsx(item.icon, {}), _jsx("span", { children: item.title })] }) }) }, item.title))) }) })] }) }), _jsx(SidebarFooter, { className: "bg-apl-primary text-white", children: _jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { children: [_jsx(User2, {}), " ", data?.firstName + " " + data?.lastName, _jsx(ChevronUp, { className: "ml-auto" })] }) }), _jsxs(DropdownMenuContent, { side: "top", className: "w-[--radix-popper-anchor-width]", children: [_jsx(DropdownMenuItem, { children: _jsx("span", { children: "Account" }) }), _jsx(DropdownMenuItem, { children: _jsx("span", { children: "Billing" }) }), _jsx(DropdownMenuItem, { onClick: handleLogout, className: "text-[crimson]", children: _jsx("span", { children: "Sign out" }) })] })] }) }) }) })] }));
}
