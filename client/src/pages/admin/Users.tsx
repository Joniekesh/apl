import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../components/table/DataTable";
import { makeRequest } from "../../lib/makeRequest";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/utils";
import { SpinnerCustom } from "../../components/spinner/Spinner";
import type { IUser } from "../../types";
import { usersColumns } from "../../components/table/columns";

import { Button } from "../../components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Users = () => {
  const [show, setShow] = useState(false);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const fetchUsers = async (): Promise<IUser[]> => {
    try {
      const res = await makeRequest.get("/user");
      const filtered = res.data.filter(
        (user: IUser) => user.role !== "admin" && user.deletedAt == null
      );
      return filtered ?? [];
    } catch (error) {
      toast.error(getErrorMessage(error));
      return [];
    }
  };

  const {
    data = [],
    isFetching,
    isError,
  } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUser = async (newUser: Partial<IUser>) => {
    const res = await makeRequest.post("/user/create", newUser);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setInputs({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(getErrorMessage(error));
    },
  });

  const columns = usersColumns({
    onDelete: (id: string) => deleteMutation.mutate(id),
  });

  const deleteUser = async (userId: string) => {
    const res = await makeRequest.put(`/user/delete/${userId}`);
    console.log(res.data.id);
    return res.data;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (
      [firstName, lastName, email, password, confirmPassword].some(
        (field) => !field?.trim()
      )
    ) {
      return toast.error("All fields must be filled.");
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      return toast.error(
        "Password and Confirm Password must be 8 or more characters length"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    mutation.mutate(inputs);
  };

  if (isFetching) return <SpinnerCustom />;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-apl-primary text-white cursor-pointer hover:bg-apl-primary">
              <CirclePlus />
              Add
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex flex-col gap-8">
              <SheetTitle className="text-xl">Create an Admin User</SheetTitle>
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Last Name</Label>
                  <Input
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Password</Label>

                  <div className="relative">
                    <Input
                      type={show ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShow((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Confirm Password</Label>

                  <div className="relative">
                    <Input
                      type={show ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      placeholder="Conform Password"
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShow((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-apl-primary text-white cursor-pointer hover:bg-apl-primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Creating..." : "Create"}
                </Button>
              </form>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <DataTable data={data} columns={columns} filterColumn="email" />
    </div>
  );
};

export default Users;
