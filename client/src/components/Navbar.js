import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronDown, ChevronUp } from "lucide-react";
import { links } from "../data";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../constants/breakpoints";
import { makeRequest } from "../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`);
        const handleChange = (e) => {
            if (e.matches) {
                setOpen(false);
            }
        };
        // Run once on mount
        handleChange(mediaQuery);
        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);
    const fetchProfile = async () => {
        try {
            const res = await makeRequest.get("/user/me");
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
    return (_jsxs("div", { className: "w-full mt-2 relative shadow-md", children: [_jsx(Sidebar, { open: open, setOpen: setOpen }), _jsxs("div", { className: "w-[90vw] mx-auto flex items-center justify-between", children: [_jsxs("div", { className: "flex flex-col gap-2 items-center", children: [_jsx("img", { src: "logo.png", alt: "APL logo", className: "w-12 h-12 rounded-full object-cover" }), _jsx("h2", { className: "text-sm text-apl-primary font-semibold text-center hidden lg:flex", children: "APL ELECTRICITY COMPANY" })] }), _jsx("div", { className: "relative hidden lg:flex items-center gap-4 text-apl-primary", children: links.map((link) => (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "flex items-center gap-1 group cursor-pointer", children: [_jsx("span", { className: "cursor-pointer font-medium", children: link.name }), link.data && (_jsxs(_Fragment, { children: [_jsx(ChevronDown, { className: "w-4 h-4 group-hover:hidden" }), _jsx(ChevronUp, { className: "w-4 h-4 hidden group-hover:block" })] }))] }), link.data && (_jsx("div", { className: "absolute left-0 top-full mt-3 w-xl rounded-xl bg-white shadow-lg\r\n                opacity-0 invisible group-hover:opacity-100 group-hover:visible\r\n                transition-all duration-200 z-50 text-apl-primary", children: _jsx("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-5", children: link.data.map((item) => (_jsx("li", { className: "cursor-pointer rounded-lg p-3 hover:bg-gray-100", children: _jsxs("a", { href: item.url, className: "block", children: [_jsx("p", { className: "font-semibold text-sm", children: item.title }), _jsx("p", { className: "text-xs", children: item.description })] }) }, item.id))) }) }))] }, link.id))) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { className: "ring-1 ring-apl-primary rounded-full py-1 px-4 text-sm text-apl-primary cursor-pointer", children: "TID Tokens" }), _jsx(RxHamburgerMenu, { onClick: () => setOpen((prev) => !prev), className: "flex lg:hidden h-6 w-6 cursor-pointer hover:text-apl-primary" }), data && (_jsx(Avatar, { children: _jsxs(Link, { to: "/admin", children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png" }), _jsx(AvatarFallback, { children: "CN" })] }) }))] })] })] }));
};
export default Navbar;
