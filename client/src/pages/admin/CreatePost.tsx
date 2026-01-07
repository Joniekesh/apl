import { ArrowLeft, CloudUpload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { makeRequest } from "../../lib/makeRequest";
import QuillEditor from "../../components/textEditor/RichTextEditor";
import { Checkbox } from "../../components/ui/checkbox";
import { uploadFile } from "../../lib/upload";
import { getErrorMessage } from "../../lib/utils";
import { toast } from "sonner";
import type { IPost } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const createPost = async (newPost: Partial<IPost>) => {
    const res = await makeRequest.post("/post", newPost);
    console.log("CREATED POST", res);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setDescription("");
      setFile(null);
      navigate(-1);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      return toast.error("Post title and description are required!");
    }

    let imageUrl = "";

    // Only upload if a file is selected
    if (file) {
      const uploaded = await uploadFile({ file });
      imageUrl = uploaded.url;
    }

    if (!imageUrl) {
      return toast.error("Post image is required!");
    }

    const data = {
      title,
      description,
      image: imageUrl,
      isPublished,
    };

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8">
      <Button
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer text-apl-primary ring-1 ring-apl-primary rounded-sm bg-transparent hover:bg-transparent"
      >
        <ArrowLeft />
        Go Back
      </Button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 rounded-md p-4 ring-1 ring-apl-primary"
      >
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt=""
            className="w-full h-125 object-cover rounded-md"
          />
        )}

        <div className="flex items-center gap-2">
          <Label>Upload Image</Label>
          <Label htmlFor="file">
            <CloudUpload
              size={30}
              className="cursor-pointer text-apl-primary"
            />
          </Label>
          <input
            type="file"
            id="file"
            onChange={handleFile}
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Post Title</Label>
          <Input
            type="text"
            placeholder="Enter post title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Post Description</Label>
          <QuillEditor value={description} onChange={setDescription} />
        </div>
        <div className="flex flex-col gap-6">
          <Label
            htmlFor="toggle-publish"
            className="hover:bg-accent/50 w-fit flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950"
          >
            <Checkbox
              id="toggle-publish"
              checked={isPublished}
              onCheckedChange={(checked) => setIsPublished(Boolean(checked))}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">Publish</p>
            </div>
          </Label>
        </div>

        <Button
          className="w-fit bg-apl-primary disabled:cursor-not-allowed cursor-pointer text-white rounded-sm hover:bg-apl-primary"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
