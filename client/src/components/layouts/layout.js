import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
export const Layout = () => {
    return (_jsxs("div", { className: "flex flex-col w-full justify-between h-screen", children: [_jsxs("div", { className: "flex-flex-col", children: [_jsx(Header, {}), _jsx(Navbar, {}), _jsx("div", { className: "flex flex-col gap-4", children: _jsx(Outlet, {}) })] }), _jsx(Footer, {})] }));
};
export const AdminLayout = () => {
    return (_jsxs(SidebarProvider, { children: [_jsx(AppSidebar, {}), _jsxs("main", { className: "w-full p-4", children: [_jsx("div", { className: "flex items-center justify-between sticky top-0 bg-background z-10 mb-4 pt-2 pb-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(SidebarTrigger, {}), _jsx("h2", { className: "capitalize text-2xl", children: "Admin" })] }) }), _jsx(Outlet, {})] })] }));
};
