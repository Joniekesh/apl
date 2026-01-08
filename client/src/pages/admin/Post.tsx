import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";
import { makeRequest } from "../../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCustom } from "../../components/spinner/Spinner";
import ImageContainer from "../../lib/ImageContainer";
import type { IPost } from "../../types";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const fetchPost = async () => {
    try {
      const res = await makeRequest.get(`/post/find/${id}`);
      // console.log(res);
      return res.data;
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const { data, isLoading, isError } = useQuery<IPost>({
    queryKey: ["post", id],
    queryFn: fetchPost,
  });

  const cleanHtml = DOMPurify.sanitize(data?.description ?? "");

  console.log("POST", data);

  if (isLoading) return <SpinnerCustom />;
  if (isError) return <span>Something went wrong</span>;

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer text-apl-primary ring-1 ring-apl-primary rounded-sm bg-transparent hover:bg-transparent"
      >
        <ArrowLeft />
        Go Back
      </Button>
      <ImageContainer
        src={data?.image || "info.png"}
        className="w-full h-100 object-cover rounded-md"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span>Posted By:</span>
          <span className="text-muted-foreground">
            {data?.user?.firstName + " " + data?.user?.lastName}{" "}
          </span>
        </div>
        {data?.createdAt && new Date(data?.createdAt).toDateString()}
      </div>
      <span className="text-2xl font-semibold">{data?.title}</span>
      <div
        className="text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
};

export default Post;
