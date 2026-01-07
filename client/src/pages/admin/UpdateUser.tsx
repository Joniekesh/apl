import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { makeRequest } from "../../lib/makeRequest";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";
import type { IUser } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SpinnerCustom } from "../../components/spinner/Spinner";

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [show, setShow] = useState(false);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = inputs;

  const { data, isLoading } = useQuery<IUser>({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await makeRequest.get(`/user/find/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setInputs({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUser = async (payload: Partial<IUser>) => {
    const res = await makeRequest.put(`/user/${id}`, payload);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      return toast.error("First name and last name are required.");
    }

    if (password || confirmPassword) {
      if (password.length < 8 || confirmPassword.length < 8) {
        return toast.error("Password must be at least 8 characters.");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match.");
      }
    }

    mutation.mutate({
      firstName,
      lastName,
      ...(password && { password }),
    });
  };

  if (isLoading) return <SpinnerCustom />;

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Button
        onClick={() => navigate(-1)}
        className="w-fit bg-transparent ring-1 ring-apl-primary text-apl-primary hover:bg-transparent"
      >
        <ArrowLeft />
        Back
      </Button>

      <h2 className="text-xl font-semibold">Update User</h2>

      <form
        className="flex flex-col gap-6 ring-1 ring-apl-primary rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <Label>First Name</Label>
          <Input name="firstName" value={firstName} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Last Name</Label>
          <Input name="lastName" value={lastName} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input value={email} disabled />
        </div>

        <div className="flex flex-col gap-1">
          <Label>New Password (optional)</Label>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Confirm Password</Label>
          <Input
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button
          disabled={mutation.isPending}
          className="bg-apl-primary text-white hover:bg-apl-primary"
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
