"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { links } from "../data";
import { useState } from "react";
const Sidebar = ({ open, setOpen }) => {
    const [activeId, setActiveId] = useState(null);
    const toggle = (id) => {
        setActiveId((prev) => (prev === id ? null : id));
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { onClick: () => setOpen(false), className: `fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        ` }), _jsxs("div", { className: `
          fixed top-0 left-0 h-screen w-75 bg-white shadow-md z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `, children: [_jsxs("div", { className: "flex items-center justify-between gap-2 p-4", children: [_jsx("img", { src: "logo.png", alt: "APL logo", className: "w-10 h-10 rounded-full object-cover" }), _jsx(X, { onClick: () => setOpen(false), className: "m-4 cursor-pointer" })] }), _jsx("hr", {}), _jsx("div", { className: "p-4 flex flex-col gap-4 overflow-y-auto h-full", children: links.map((link) => {
                            const isActive = activeId === link.id;
                            return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("button", { type: "button", onClick: () => toggle(link.id), className: "flex items-center justify-between text-apl-primary font-semibold", children: [_jsx("span", { children: link.name }), link.data &&
                                                (isActive ? (_jsx(ChevronDown, { className: "w-4 h-4" })) : (_jsx(ChevronRight, { className: "w-4 h-4" })))] }), link.data && (_jsx("div", { className: `
                      overflow-hidden transition-all duration-300
                      ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `, children: _jsx("div", { className: "flex flex-col gap-2 ml-4 mt-2 border-l border-l-border pl-4", children: link.data.map((item) => (_jsx("a", { href: item.url, className: "text-sm text-apl-primary hover:underline", onClick: () => setOpen(false), children: item.title }, item.id))) }) }))] }, link.id));
                        }) })] })] }));
};
export default Sidebar;
