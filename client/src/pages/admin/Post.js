import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";
import { makeRequest } from "../../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCustom } from "../../components/spinner/Spinner";
import ImageContainer from "../../lib/ImageContainer";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);
    const fetchPost = async () => {
        try {
            const res = await makeRequest.get(`/post/find/${id}`);
            // console.log(res);
            return res.data;
        }
        catch (error) {
            toast.error(getErrorMessage(error));
        }
    };
    const { data, isFetching, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: fetchPost,
    });
    const cleanHtml = DOMPurify.sanitize(data?.description ?? "");
    console.log("POST", data);
    if (isFetching)
        return _jsx(SpinnerCustom, {});
    if (isError)
        return _jsx("span", { children: "Something went wrong" });
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs(Button, { onClick: () => navigate(-1), className: "w-fit cursor-pointer text-apl-primary ring-1 ring-apl-primary rounded-sm bg-transparent hover:bg-transparent", children: [_jsx(ArrowLeft, {}), "Go Back"] }), _jsx(ImageContainer, { src: data?.image || "info.png", className: "w-full h-100 object-cover rounded-md" }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: "Posted By:" }), _jsxs("span", { className: "text-muted-foreground", children: [data?.user?.firstName + " " + data?.user?.lastName, " "] })] }), data?.createdAt && new Date(data?.createdAt).toDateString()] }), _jsx("span", { className: "text-2xl font-semibold", children: data?.title }), _jsx("div", { className: "text-sm leading-relaxed", dangerouslySetInnerHTML: { __html: cleanHtml } })] }));
};
export default Post;
