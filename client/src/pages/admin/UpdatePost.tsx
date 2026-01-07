import { ArrowLeft, CloudUpload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { makeRequest } from "../../lib/makeRequest";
import QuillEditor from "../../components/textEditor/RichTextEditor";
import { Checkbox } from "../../components/ui/checkbox";
import { uploadFile } from "../../lib/upload";
import { getErrorMessage } from "../../lib/utils";
import { toast } from "sonner";
import type { IPost } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SpinnerCustom } from "../../components/spinner/Spinner";

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await makeRequest.get(`/post/find/${id}`);
      return res.data as IPost;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
      setIsPublished(Boolean(data.isPublished));
      setExistingImage(data.image ?? "");
    }
  }, [data]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const updatePost = async (payload: Partial<IPost>) => {
    const res = await makeRequest.put(`/post/${id}`, payload);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      return toast.error("Title and description are required");
    }

    let imageUrl = existingImage;

    if (file) {
      const uploaded = await uploadFile({ file });
      imageUrl = uploaded.url;
    }

    mutation.mutate({
      title,
      description,
      image: imageUrl,
      isPublished,
    });
  };

  if (isLoading) return <SpinnerCustom />;

  return (
    <div className="flex flex-col gap-8">
      <Button
        onClick={() => navigate(-1)}
        className="w-fit text-apl-primary ring-1 ring-apl-primary rounded-sm bg-transparent hover:bg-transparent"
      >
        <ArrowLeft />
        Go Back
      </Button>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 rounded-md p-4 ring-1 ring-apl-primary"
      >
        {(file || existingImage) && (
          <img
            src={file ? URL.createObjectURL(file) : existingImage}
            alt=""
            className="w-full h-125 object-cover rounded-md"
          />
        )}

        <div className="flex items-center gap-2">
          <Label>Change Image</Label>
          <Label htmlFor="file">
            <CloudUpload
              size={30}
              className="cursor-pointer text-apl-primary"
            />
          </Label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleFile}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Post Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Post Description</Label>
          <QuillEditor value={description} onChange={setDescription} />
        </div>

        <Label
          htmlFor="publish"
          className="flex gap-3 border rounded-lg p-3 w-fit"
        >
          <Checkbox
            id="publish"
            checked={isPublished}
            onCheckedChange={(v) => setIsPublished(Boolean(v))}
          />
          <span className="text-sm font-medium">Publish</span>
        </Label>

        <Button
          disabled={mutation.isPending}
          className="w-fit bg-apl-primary text-white rounded-sm"
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
