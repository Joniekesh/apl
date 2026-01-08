import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1500,
});
const networks = [
    {
        id: 1,
        count: 8,
        value: "38 KV",
        text: "Feeders",
    },
    {
        id: 2,
        count: 21,
        value: "11 KV",
        text: "Feeders",
    },
    {
        id: 3,
        count: 2100,
        text: "Distribution Substations",
    },
    {
        id: 4,
        count: 12,
        text: "Injection Substations",
    },
    {
        id: 5,
        count: 1,
        value: "6.6 KV",
        text: "Feeders",
    },
];
const Network = () => {
    return (_jsxs("div", { className: "flex flex-col gap-16 h-max", children: [_jsxs("h2", { className: "text-center text-2xl", children: [_jsx("span", { className: "text-2xl font-semibold", children: "APLE" }), " Distribution Network"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-8", children: networks.map((network) => (_jsxs("div", { "data-aos": network.id % 2 === 0 ? "zoom-in-left" : "zoom-in-right", className: cn("bg-gray-200 box-border rounded-md p-2 flex-1 flex flex-col items-center justify-center gap-4 h-80 relative z-10", (network.id === 1 || network.id === 2) &&
                        "border-r-4 border-r-apl-primary border-b-4 border-b-apl-primary", (network.id === 4 || network.id === 5) &&
                        "border-l-4 border-l-apl-primary border-b-4 border-b-apl-primary", network.id === 3 && "border-4 border-apl-primary"), children: [_jsxs("span", { className: cn("text-4xl font-semibold", network.id === 3 && "text-apl-primary"), children: [" ", network.count, " ", network.id == 3 && "+"] }), _jsxs("span", { className: "text-lg", children: [" ", network.value, " "] }), _jsxs("span", { className: "text-lg", children: [" ", network.text, " "] })] }, network.id))) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "flex flex-col gap-4 bg-apl-primary rounded-md text-white p-4 h-75 justify-center ", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "MAP Application" }), _jsx("p", { className: "text-sm", children: "Register on the MAP Application Portal" }), _jsxs(Button, { className: "w-fit bg-transparent text-white rounded-full ring-1 ring-border hover:bg-apl-primary hover:text-white text-base cursor-pointer", children: ["Register now", _jsx(ChevronRight, {})] })] }), _jsxs("div", { className: "flex flex-col gap-4 rounded-md p-4 bg-gray-200 h-75 justify-center ", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "NERC Regulations" }), _jsx("p", { className: "text-sm", children: "Read about the NERC Orders and Regulations" }), _jsxs(Button, { className: "w-fit bg-transparent text-black rounded-full ring-1 ring-black hover:bg-apl-primary hover:text-white text-base cursor-pointer", children: ["Read more", _jsx(ChevronRight, {})] })] })] })] }));
};
export default Network;
