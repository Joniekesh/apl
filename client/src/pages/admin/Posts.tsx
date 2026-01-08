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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useMemo, useState } from "react";

type PublishFilter = "all" | "published" | "unpublished";
const Posts = () => {
  const [publishFilter, setPublishFilter] = useState<PublishFilter>("all");

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
    isLoading,
    isError,
  } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const filteredPosts = useMemo(() => {
    if (publishFilter === "all") return data;

    return data.filter((post) =>
      publishFilter === "published"
        ? post.isPublished === true
        : post.isPublished === false
    );
  }, [data, publishFilter]);

  const deletePost = async (postId: string) => {
    const res = await makeRequest.delete(`/post/${postId}`);
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

  if (isLoading) return <SpinnerCustom />;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold">Filter</h2>
            <Select
              value={publishFilter}
              onValueChange={(value) =>
                setPublishFilter(value as PublishFilter)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => navigate("/admin/create-post")}
            className="bg-apl-primary text-white cursor-pointer hover:bg-apl-primary"
          >
            <CirclePlus />
            Add
          </Button>
        </div>
      </div>

      <DataTable
        // data={data}
        columns={columns}
        data={filteredPosts}
        filterColumn="createdAt"
      />
    </div>
  );
};

export default Posts;
