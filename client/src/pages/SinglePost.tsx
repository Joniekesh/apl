import { useQuery } from "@tanstack/react-query";
import type { IPost } from "../types";
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
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const { data, isLoading, isError } = useQuery<IPost>({
    queryKey: ["posts", id],
    queryFn: fetchPost,
  });

  const sanitize = (description?: string) => {
    if (!description) return "";
    return DOMPurify.sanitize(description);
  };

  if (isLoading) return <SpinnerCustom />;
  if (isError) return <span>Error fetching posts</span>;

  return (
    <div className="w-[90vw] mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <img
          src={data?.image}
          alt=""
          className="w-full rounded-sm object-cover h-75"
        />
        <div className="w-full flex flex-col gap-3 ">
          <span className="text-xl font-semibold">{data?.title}</span>
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: sanitize(data?.description),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
