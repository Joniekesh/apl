import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { makeRequest } from "../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCustom } from "./spinner/Spinner";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
const News = () => {
    const fetchPosts = async () => {
        try {
            const res = await makeRequest.get("/post");
            const publishedPosts = res.data
                .filter((post) => post.isPublished)
                .slice(0, 4);
            return publishedPosts;
        }
        catch (error) { }
    };
    const { data = [], isFetching, isError, } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
    if (isFetching)
        return _jsx(SpinnerCustom, {});
    if (isError)
        return _jsx("span", { children: "No posts yet" });
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Latest News" }), _jsx("span", { children: "|" }), _jsxs(Link, { to: "/all-posts", className: "flex items-center gap-1 cursor-pointer text-apl-primary", children: [_jsx("span", { children: "See all" }), _jsx(ChevronRight, {})] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2", children: data.map((post) => (_jsx(PostItem, { post: post }, post._id))) })] }));
};
export default News;
