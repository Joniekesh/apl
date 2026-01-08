import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { getErrorMessage } from "../lib/utils";
import { makeRequest } from "../lib/makeRequest";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            navigate("/admin", { replace: true });
        }
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required!");
            return;
        }
        if (!password) {
            toast.error("Password is required!");
            return;
        }
        setLoading(true);
        try {
            const res = await makeRequest.post("/auth/login", { email, password });
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/admin");
            }
            setLoading(false);
            console.log(res);
        }
        catch (error) {
            toast.error(getErrorMessage(error));
            setLoading(false);
            console.log(error);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center h-screen w-full", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-8 shadow-md rounded-md p-4 ring-1 ring-border w-sm", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "Email" }), _jsx(Input, { type: "email", placeholder: "Enter email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: show ? "text" : "password", placeholder: "Enter password", value: password, onChange: (e) => setPassword(e.target.value), className: "pr-10" }), _jsx("button", { type: "button", onClick: () => setShow((prev) => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer", "aria-label": show ? "Hide password" : "Show password", children: show ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] })] }), loading ? (_jsxs(Button, { disabled: true, size: "sm", children: [_jsx(Spinner, {}), "Loading..."] })) : (_jsx(Button, { disabled: loading, className: "bg-apl-primary text-white disabled:cursor-not-allowed cursor-pointer hover:bg-apl-primary", children: "Login" }))] }) }));
};
export default Login;
