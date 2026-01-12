import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import type { INetwork } from "../types";
import { Button } from "./ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1500,
});

const networks: INetwork[] = [
  {
    id: 1,
    count: 8,
    value: "38 KV",
    text: "Feeders",
  },
  {
    id: 2,
    count: 21,
    value: "11 KV",
    text: "Feeders",
  },
  {
    id: 3,
    count: 2100,
    text: "Distribution Substations",
  },
  {
    id: 4,
    count: 12,
    text: "Injection Substations",
  },
  {
    id: 5,
    count: 1,
    value: "6.6 KV",
    text: "Feeders",
  },
];

const Network = () => {
  return (
    <div className="flex flex-col gap-16 h-max">
      <h2 className="text-center text-2xl">
        <span className="text-2xl font-semibold">APLE</span> Distribution
        Network
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-8">
        {networks.map((network: INetwork) => (
          <div
            data-aos={network.id % 2 === 0 ? "zoom-in-left" : "zoom-in-right"}
            key={network.id}
            className="bg-gray-200 box-border rounded-md p-2 flex-1 flex flex-col items-center justify-center gap-4 h-80 relative z-10 transition-transform duration-300 ease-out hover:scale-[1.05] hover:border-4 hover:border-apl-primary"
          >
            <span
              className={cn(
                "text-4xl font-semibold",
                network.id === 3 && "text-apl-primary"
              )}
            >
              {network.count} {network.id == 3 && "+"}
            </span>
            <span className="text-lg"> {network.value} </span>
            <span className="text-lg"> {network.text} </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 bg-apl-primary rounded-md text-white p-4 h-75 justify-center ">
          <h2 className="text-2xl font-semibold">MAP Application</h2>
          <p className="text-sm">Register on the MAP Application Portal</p>
          <Button className="w-fit bg-transparent text-white rounded-full ring-1 ring-border hover:bg-apl-primary hover:text-white text-base cursor-pointer">
            Register now
            <ChevronRight />
          </Button>
        </div>
        <div className="flex flex-col gap-4 rounded-md p-4 bg-gray-200 h-75 justify-center ">
          <h2 className="text-2xl font-semibold">NERC Regulations</h2>
          <p className="text-sm">Read about the NERC Orders and Regulations</p>
          <Button className="w-fit bg-transparent text-black rounded-full ring-1 ring-black hover:bg-apl-primary hover:text-white text-base cursor-pointer">
            Read more
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Network;
