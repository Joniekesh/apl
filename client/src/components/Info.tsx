import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const Info = () => {
  return (
    <div className="flex flex-col gap-8 h-max -mt-26">
      <p className="text-center text-3xl">
        <b>ABA Power</b> - We distribute electiricity <br /> through {""}
        <span className="text-amber-500">innovation</span> and with ultimate{" "}
        <br /> customer service
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <img
          src="/info.png"
          alt=""
          className="h-130 w-full object-cover rounded-md"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-gray-200 rounded-md p-4">
            <h2 className="text-3xl font-semibold text-gray-700">
              Driven by the Aba Integrated <br /> Power Project
            </h2>
            <p className="text-[17px] text-gray-700">
              The Aba IPP is a major pioneer of the Aba Electric Company
            </p>
            <Button className="w-fit bg-transparent text-black rounded-full ring-1 ring-black hover:bg-apl-primary hover:text-white text-base cursor-pointer">
              Learn more
              <ChevronRight />
            </Button>
          </div>
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-2 gap-2"
          >
            <div className="flex flex-col gap-4 bg-gray-200 p-4 rounded-md">
              <img src="/naira-logo.png" alt="" className="w-30 h-30" />
              <p className="text-2xl font-semibold text-gray-700">
                Tarriff Info
              </p>
              <span className="text-sm">
                Pay your bills through our direct and alternative channels
              </span>
              <Button className="w-fit bg-transparent text-black rounded-full ring-1 ring-black hover:bg-apl-primary hover:text-white text-base cursor-pointer">
                Pay now
                <ChevronRight />
              </Button>
            </div>
            <div
              data-aos="fade-down"
              className="flex flex-col gap-4 bg-gray-200 p-4 rounded-md"
            >
              <img src="/globe-logo.png" alt="" className="w-30 h-30" />
              <p className="text-2xl font-semibold text-gray-700">
                Customer Portal
              </p>
              <span className="text-sm">
                Register on the Customer portal to access varieties of services
                for customers.
              </span>
              <Button className="w-fit bg-transparent text-black rounded-full ring-1 ring-black hover:bg-apl-primary hover:text-white text-base cursor-pointer">
                Register now
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
