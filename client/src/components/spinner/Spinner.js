import { jsx as _jsx } from "react/jsx-runtime";
import { LoaderIcon } from "lucide-react";
import { cn } from "../../lib/utils";
function Spinner({ className, ...props }) {
    return (_jsx(LoaderIcon, { role: "status", "aria-label": "Loading", className: cn("size-4 animate-spin", className), ...props }));
}
export function SpinnerCustom() {
    return (_jsx("div", { className: "flex items-center gap-4 justify-center h-screen w-full", children: _jsx(Spinner, {}) }));
}
