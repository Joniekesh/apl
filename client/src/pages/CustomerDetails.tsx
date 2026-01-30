import { Input } from "../components/ui/input";

const CustomerDetails = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-4 my-10">
      <div className="flex flex-col gap-4 w-full">
        <p className="font-semibold text-xl">
          Enter your meter number or account number below to generate your
          feeder band*
        </p>

        <div className="flex w-full">
          <span className="flex items-center px-4 h-12 font-medium bg-apl-primary text-white">
            SEARCH
          </span>
          <Input
            className="flex-1 h-12 px-4"
            placeholder="Enter meter number"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
