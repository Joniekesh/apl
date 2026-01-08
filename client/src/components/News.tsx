import { ChevronRight } from "lucide-react";
import { makeRequest } from "../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCustom } from "./spinner/Spinner";
import type { IPost } from "../types";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

const News = () => {
  const fetchPosts = async () => {
    try {
      const res = await makeRequest.get("/post");
      const publishedPosts = res.data
        .filter((post: IPost) => post.isPublished)
        .slice(0, 4);

      return publishedPosts;
    } catch (error) {}
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <SpinnerCustom />;
  if (isError) return <span>No posts yet</span>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">Latest News</h2>
        <span>|</span>
        <Link
          to="/all-posts"
          className="flex items-center gap-1 cursor-pointer text-apl-primary"
        >
          <span>See all</span>
          <ChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {data.map((post: IPost) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default News;
