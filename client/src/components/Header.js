import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, Phone } from "lucide-react";
const Header = () => {
    return (_jsxs("div", { className: "bg-apl-primary hidden text-white w-full py-3 px-8 lg:flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-8", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "h-4 w-4 font-bold" }), _jsx("span", { className: "text-sm", children: "info@abapower.com" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "h-4 w-4 font-bold" }), _jsx("span", { className: "text-sm", children: "0700 1238 280 / 0700 2338 280" })] })] }), _jsxs("div", { className: "flex items-center gap-8", children: [_jsx("span", { className: "text-sm", children: "Online Payments" }), _jsx("span", { className: "text-sm", children: "Whistleblowing" })] })] }));
};
export default Header;
