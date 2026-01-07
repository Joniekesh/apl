import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../../components/table/DataTable";
import { makeRequest } from "../../lib/makeRequest";
import { SpinnerCustom } from "../../components/spinner/Spinner";
import type { IPost } from "../../types";
import { postsColumns } from "../../components/table/columns";
import { Button } from "../../components/ui/button";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";

const Posts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchPosts = async (): Promise<IPost[]> => {
    try {
      const res = await makeRequest.get("/post");
      console.log(res);
      return res.data ?? [];
    } catch (error) {
      return [];
    }
  };

  const {
    data = [],
    isFetching,
    isError,
  } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePost = async (postId: string) => {
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
    onDelete: (id: string) => deleteMutation.mutate(id),
  });

  if (isFetching) return <SpinnerCustom />;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <Button
          onClick={() => navigate("/admin/create-post")}
          className="bg-apl-primary text-white cursor-pointer hover:bg-apl-primary"
        >
          <CirclePlus />
          Add
        </Button>
      </div>

      <DataTable data={data} columns={columns} filterColumn="createdAt" />
    </div>
  );
};

export default Posts;
