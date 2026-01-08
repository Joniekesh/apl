import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { makeRequest } from "../../lib/makeRequest";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SpinnerCustom } from "../../components/spinner/Spinner";
const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { firstName, lastName, email, password, confirmPassword } = inputs;
    const { data, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/find/${id}`);
            return res.data;
        },
        enabled: !!id,
    });
    useEffect(() => {
        if (data) {
            setInputs({
                firstName: data.firstName ?? "",
                lastName: data.lastName ?? "",
                email: data.email ?? "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [data]);
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const updateUser = async (payload) => {
        const res = await makeRequest.put(`/user/${id}`, payload);
        return res.data;
    };
    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success("User updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", id] });
            navigate(-1);
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName.trim() || !lastName.trim()) {
            return toast.error("First name and last name are required.");
        }
        if (password || confirmPassword) {
            if (password.length < 8 || confirmPassword.length < 8) {
                return toast.error("Password must be at least 8 characters.");
            }
            if (password !== confirmPassword) {
                return toast.error("Passwords do not match.");
            }
        }
        mutation.mutate({
            firstName,
            lastName,
            ...(password && { password }),
        });
    };
    if (isLoading)
        return _jsx(SpinnerCustom, {});
    return (_jsxs("div", { className: "flex flex-col gap-6 max-w-xl", children: [_jsxs(Button, { onClick: () => navigate(-1), className: "w-fit bg-transparent ring-1 ring-apl-primary text-apl-primary hover:bg-transparent", children: [_jsx(ArrowLeft, {}), "Back"] }), _jsx("h2", { className: "text-xl font-semibold", children: "Update User" }), _jsxs("form", { className: "flex flex-col gap-6 ring-1 ring-apl-primary rounded-md p-4", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "First Name" }), _jsx(Input, { name: "firstName", value: firstName, onChange: handleChange })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "Last Name" }), _jsx(Input, { name: "lastName", value: lastName, onChange: handleChange })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "Email" }), _jsx(Input, { value: email, disabled: true })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "New Password (optional)" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: show ? "text" : "password", name: "password", value: password, onChange: handleChange, className: "pr-10" }), _jsx("button", { type: "button", onClick: () => setShow((prev) => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2", children: show ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { children: "Confirm Password" }), _jsx(Input, { type: show ? "text" : "password", name: "confirmPassword", value: confirmPassword, onChange: handleChange })] }), _jsx(Button, { disabled: mutation.isPending, className: "bg-apl-primary text-white hover:bg-apl-primary", children: mutation.isPending ? "Updating..." : "Update" })] })] }));
};
export default UpdateUser;
