import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../../components/table/DataTable";
import { makeRequest } from "../../lib/makeRequest";
import { SpinnerCustom } from "../../components/spinner/Spinner";
import { postsColumns } from "../../components/table/columns";
import { Button } from "../../components/ui/button";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";
const Posts = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fetchPosts = async () => {
        try {
            const res = await makeRequest.get("/post");
            console.log(res);
            return res.data ?? [];
        }
        catch (error) {
            return [];
        }
    };
    const { data = [], isFetching, isError, } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
    const deletePost = async (postId) => {
        const res = await makeRequest.delete(`/post/${postId}`);
        console.log(res.data.id);
        return res.data;
    };
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
    const columns = postsColumns({
        onDelete: (id) => deleteMutation.mutate(id),
    });
    if (isFetching)
        return _jsx(SpinnerCustom, {});
    if (isError)
        return _jsx("p", { children: "Something went wrong!" });
    return (_jsxs("div", { className: "flex flex-col gap-4 w-full", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Posts" }), _jsxs(Button, { onClick: () => navigate("/admin/create-post"), className: "bg-apl-primary text-white cursor-pointer hover:bg-apl-primary", children: [_jsx(CirclePlus, {}), "Add"] })] }), _jsx(DataTable, { data: data, columns: columns, filterColumn: "createdAt" })] }));
};
export default Posts;
