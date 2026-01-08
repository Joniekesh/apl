"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const Loader = ({ type }) => {
    if (type !== "bounce")
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
          @keyframes move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
        ` }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center", children: _jsx("div", { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-1 h-6 bg-gray-300", style: {
                                    animation: "move 1s ease-in-out infinite alternate",
                                    animationDelay: "0s",
                                } }), _jsx("div", { className: "w-1 h-6 bg-orange-500", style: {
                                    animation: "move 1s ease-in-out infinite alternate",
                                    animationDelay: "0.3s",
                                } }), _jsx("div", { className: "w-1 h-6 bg-gray-300", style: {
                                    animation: "move 1s ease-in-out infinite alternate",
                                    animationDelay: "0.6s",
                                } })] }) }) })] }));
};
export default Loader;
