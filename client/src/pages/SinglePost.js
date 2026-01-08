import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../lib/makeRequest";
import { toast } from "sonner";
import { getErrorMessage } from "../lib/utils";
import { useParams } from "react-router-dom";
import { SpinnerCustom } from "../components/spinner/Spinner";
import DOMPurify from "dompurify";
const SinglePost = () => {
    const { id } = useParams();
    const fetchPost = async () => {
        try {
            const res = await makeRequest.get(`/post/find/${id}`);
            return res.data;
        }
        catch (error) {
            toast.error(getErrorMessage(error));
        }
    };
    const { data, isFetching, isError } = useQuery({
        queryKey: ["posts", id],
        queryFn: fetchPost,
    });
    const sanitize = (description) => {
        if (!description)
            return "";
        return DOMPurify.sanitize(description);
    };
    if (isFetching)
        return _jsx(SpinnerCustom, {});
    if (isError)
        return _jsx("span", { children: "Error fetching posts" });
    return (_jsx("div", { className: "w-[90vw] mx-auto my-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 w-full gap-4", children: [_jsx("img", { src: data?.image, alt: "", className: "w-full rounded-sm object-cover h-75" }), _jsxs("div", { className: "w-full flex flex-col gap-3 ", children: [_jsx("span", { className: "text-xl font-semibold", children: data?.title }), _jsx("div", { className: "text-sm text-gray-700", dangerouslySetInnerHTML: {
                                __html: sanitize(data?.description),
                            } })] })] }) }));
};
export default SinglePost;
