import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from "../components/Hero";
import Info from "../components/Info";
import Network from "../components/Network";
import News from "../components/News";
const Landing = () => {
    return (_jsxs("div", { className: "flex w-[90vw] mx-auto flex-col gap-40 my-10", children: [_jsx(Hero, {}), _jsx(Info, {}), _jsx(Network, {}), _jsx(News, {})] }));
};
export default Landing;
