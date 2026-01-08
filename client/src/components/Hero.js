import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
const Hero = () => {
    return (_jsxs("section", { className: "relative w-[90vw] mx-auto my-8 rounded-xl h-130 overflow-hidden bg-cover bg-center text-white", style: { backgroundImage: "url('/hero-image.png')" }, children: [_jsx("div", { className: "absolute inset-0 bg-black/10" }), _jsx("div", { className: "relative z-10 h-full flex items-center px-6 md:px-12", children: _jsxs("div", { className: "max-w-xl flex flex-col gap-6", children: [_jsxs("h2", { className: "text-2xl md:text-3xl font-semibold leading-tight", children: ["Quick and Easy ", _jsx("br", {}), "Payment Methods for ", _jsx("br", {}), "your Electricity Bills"] }), _jsx("span", { className: "text-sm text-muted w-[80%] ", children: "Explore our various payments methods to pay for your electricity bills" }), _jsxs(Button, { className: "w-fit bg-transparent rounded-full ring-1 ring-border hover:bg-apl-primary text-[12px] text-muted cursor-pointer", children: ["Pay now", _jsx(ChevronRight, {})] })] }) }), _jsx("img", { src: "/woman2.png", alt: "Payment illustration", className: "absolute bottom-0 right-0 h-full w-[60%] object-cover z-0" })] }));
};
export default Hero;
