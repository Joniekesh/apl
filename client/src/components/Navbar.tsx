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
      if (e.matches) {
        setOpen(false);
      }
    };

    // Run once on mount
    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("/user/me");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery<IUser>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  return (
    <div className="w-full mt-2 relative shadow-md">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="w-[90vw] mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          <img
            src="logo.png"
            alt="APL logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-sm text-apl-primary font-semibold text-center hidden lg:flex">
            APL ELECTRICITY COMPANY
          </h2>
        </div>

        <div className="relative hidden lg:flex items-center gap-4 text-apl-primary">
          {links.map((link: ILink) => (
            <div key={link.id} className="group">
              <div className="flex items-center gap-1 group cursor-pointer">
                <span className="cursor-pointer font-medium">{link.name}</span>

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
                        className="cursor-pointer rounded-lg p-3 hover:bg-gray-100"
                      >
                        <a href={item.url} className="block">
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
        </div>

        <div className="flex items-center gap-4">
          <button className="ring-1 ring-apl-primary rounded-full py-1 px-4 text-sm text-apl-primary cursor-pointer">
            TID Tokens
          </button>
          <RxHamburgerMenu
            onClick={() => setOpen((prev) => !prev)}
            className="flex lg:hidden h-6 w-6 cursor-pointer hover:text-apl-primary"
          />
          {data && (
            <Avatar>
              <Link to="/admin">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Link>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
