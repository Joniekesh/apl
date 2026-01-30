import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { getErrorMessage } from "../lib/utils";
import { makeRequest } from "../lib/makeRequest";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import type { IUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("/user/me");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: profile } = useQuery<IUser>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (profile) {
      navigate("/admin", { replace: true });
    }
  }, [navigate, profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required!");
      return;
    }
    if (!password) {
      toast.error("Password is required!");
      return;
    }

    setLoading(true);
    try {
      const res = await makeRequest.post("/auth/login", { email, password });
      if (res.status === 200) {
        navigate("/admin");
      }
      setLoading(false);
      console.log(res);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 shadow-md rounded-md p-4 ring-1 ring-border w-sm"
      >
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password</Label>

          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {loading ? (
          <Button disabled size="sm">
            <Spinner />
            Loading...
          </Button>
        ) : (
          <Button
            disabled={loading}
            className="bg-apl-primary text-white disabled:cursor-not-allowed cursor-pointer hover:bg-apl-primary"
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default Login;
