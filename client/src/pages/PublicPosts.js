import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCustom } from "../components/spinner/Spinner";
import { getErrorMessage } from "../lib/utils";
import { toast } from "sonner";
import { makeRequest } from "../lib/makeRequest";
import PostItem from "../components/PostItem";
const PublicPosts = () => {
    const fetchPosts = async () => {
        try {
            const res = await makeRequest.get("/post");
            const publishedPosts = res.data.filter((post) => post.isPublished);
            return publishedPosts;
        }
        catch (error) {
            toast.error(getErrorMessage(error));
        }
    };
    const { data = [], isFetching, isError, } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
    console.log("POSTS", data);
    if (isFetching)
        return _jsx(SpinnerCustom, {});
    if (isError)
        return _jsx("span", { children: "Error fetching posts" });
    return (_jsxs("div", { className: "flex flex-col gap-8 w-[90vw] mx-auto my-8", children: [_jsx("h2", { className: "font-semibold text-xl", children: "All Posts" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2", children: data.map((post) => (_jsx(PostItem, { post: post }, post._id))) })] }));
};
export default PublicPosts;
