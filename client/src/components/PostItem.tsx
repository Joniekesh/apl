import { ChevronRight } from "lucide-react";
import DOMPurify from "dompurify";
import type { IPost } from "../types";
import { Link } from "react-router-dom";

const PostItem = ({ post }: { post: IPost }) => {
  const sanitize = (description: string) => {
    return DOMPurify.sanitize(description) ?? "";
  };

  return (
    <div
      key={post._id}
      className="flex flex-col gap-4 h-100 rounded-md bg-gray-200 p-2"
    >
      <img src={post?.image} alt="" className="h-1/2 rounded-md object-cover" />
      <div className="flex flex-col gap-3 h-1/2">
        <span className="text-xl font-semibold line-clamp-2">
          {" "}
          {post?.title.length > 50
            ? post?.title.substring(0, 50) + "..."
            : post?.title}{" "}
        </span>
        <div
          className="text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: sanitize(post.description),
          }}
        />
        <Link
          to={`/all-posts/${post._id}`}
          className="flex items-center text-sm  text-apl-primary cursor-pointer"
        >
          <span className="">Read more</span>
          <ChevronRight size={2} />
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
