"use client";

import { X, ChevronDown, ChevronRight } from "lucide-react";
import { links, type IData, type ILink } from "../data";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: Props) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }
        `}
      />

      <div
        className={`
          fixed top-0 left-0 h-screen w-75 bg-white shadow-md z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between gap-2 p-4">
          <img
            src="logo.png"
            alt="APL logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <X onClick={() => setOpen(false)} className="m-4 cursor-pointer" />
        </div>
        <hr />

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">
          {links.map((link: ILink) => {
            const isActive = activeId === link.id;

            return (
              <div key={link.id} className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => toggle(link.id)}
                  className="flex items-center justify-between text-apl-primary font-semibold"
                >
                  <span>{link.name}</span>

                  {link.data &&
                    (isActive ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {link.data && (
                  <div
                    className={`
                      overflow-hidden transition-all duration-300
                      ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="flex flex-col gap-2 ml-4 mt-2 border-l border-l-border pl-4">
                      {link.data.map((item: IData) => (
                        <a
                          key={item.id}
                          href={item.url}
                          className="text-sm text-apl-primary hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
