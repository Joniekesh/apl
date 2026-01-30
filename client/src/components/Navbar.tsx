import { ChevronDown, ChevronUp } from "lucide-react";
import { links, type ILink } from "../data";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../constants/breakpoints";
import { makeRequest } from "../lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const fetchProfile = async () => {
    const res = await makeRequest.get("/user/me");
    return res.data;
  };

  const { data: profile } = useQuery<IUser>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  console.log(profile);

  return (
    <header className="w-full mt-2 relative shadow-md h-20">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="w-[90vw] mx-auto flex items-center justify-between h-full">
        <Link to="/" className="flex items-center h-full">
          <img
            src="apl-logo.jpg"
            alt="APL logo"
            className="h-full w-auto max-w-35 object-contain"
          />
        </Link>

        <nav className="relative hidden lg:flex items-center gap-4 text-apl-primary h-full">
          {links.map((link: ILink) => (
            <div key={link.id} className="group relative">
              <div className="flex items-center gap-1 cursor-pointer">
                <a href={link.url} target="_blank" className="font-medium">
                  {link.name}
                </a>

                {link.data && (
                  <>
                    <ChevronDown className="w-4 h-4 group-hover:hidden" />
                    <ChevronUp className="w-4 h-4 hidden group-hover:block" />
                  </>
                )}
              </div>

              {link.data && (
                <div
                  className="absolute left-0 top-full mt-3 w-xl rounded-xl bg-white shadow-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 z-50 text-apl-primary"
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                    {link.data.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-lg p-3 hover:bg-gray-100"
                      >
                        <a href={item.url} target="_blank" className="block">
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-xs">{item.description}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 h-full">
          <a
            href="https://abapower.com/tid-tokens/"
            target="_blank"
            className="ring-1 ring-apl-primary rounded-full py-1 px-4 text-sm text-apl-primary"
          >
            TID Tokens
          </a>

          {profile && (
            <Link to="/admin">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}
          <RxHamburgerMenu
            onClick={() => setOpen((prev) => !prev)}
            className="flex lg:hidden h-6 w-6 cursor-pointer hover:text-apl-primary"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
