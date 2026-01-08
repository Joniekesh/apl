import { useQuery } from "@tanstack/react-query";
import { SpinnerCustom } from "../components/spinner/Spinner";
import type { IPost } from "../types";
import { getErrorMessage } from "../lib/utils";
import { toast } from "sonner";
import { makeRequest } from "../lib/makeRequest";
import PostItem from "../components/PostItem";

const PublicPosts = () => {
  const fetchPosts = async () => {
    try {
      const res = await makeRequest.get("/post");
      const publishedPosts = res.data.filter((post: IPost) => post.isPublished);

      return publishedPosts;
    } catch (error) {
      toast.error(getErrorMessage(error));
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

  console.log("POSTS", data);

  if (isLoading) return <SpinnerCustom />;
  if (isError) return <span>Error fetching posts</span>;

  return (
    <div className="flex flex-col gap-8 w-[90vw] mx-auto my-8">
      <h2 className="font-semibold text-xl">All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {data.map((post: IPost) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PublicPosts;
