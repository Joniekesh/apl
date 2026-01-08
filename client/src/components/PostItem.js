import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
const PostItem = ({ post }) => {
    const sanitize = (description) => {
        return DOMPurify.sanitize(description) ?? "";
    };
    return (_jsxs("div", { className: "flex flex-col gap-4 h-100 rounded-md bg-gray-200 p-2", children: [_jsx("img", { src: post?.image, alt: "", className: "h-1/2 rounded-md object-cover" }), _jsxs("div", { className: "flex flex-col gap-3 h-1/2", children: [_jsxs("span", { className: "text-xl font-semibold line-clamp-2", children: [" ", post?.title.length > 50
                                ? post?.title.substring(0, 50) + "..."
                                : post?.title, " "] }), _jsx("div", { className: "text-sm text-gray-700 line-clamp-3", dangerouslySetInnerHTML: {
                            __html: sanitize(post.description),
                        } }), _jsxs(Link, { to: `/all-posts/${post._id}`, className: "flex items-center text-sm  text-apl-primary cursor-pointer", children: [_jsx("span", { className: "", children: "Read more" }), _jsx(ChevronRight, { size: 2 })] })] })] }, post._id));
};
export default PostItem;
