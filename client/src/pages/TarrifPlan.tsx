import { Input } from "../components/ui/input";

const TarrifPlan = () => {
  return (
    <div className="w-full my-10">
      {/* Max-width centered container */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-10 text-[18px]">
        <h2 className="text-3xl font-semibold">Tarrif Plan</h2>

        <div className="flex flex-col gap-4 w-full">
          <p className="font-semibold text-xl">
            Enter your Account or Meter number below to view your tariff plan*
          </p>

          <div className="flex w-full">
            <span className="flex items-center px-4 h-12 font-medium bg-apl-primary text-white">
              SEARCH
            </span>
            <Input
              className="flex-1 h-12 px-4"
              placeholder="Enter account or meter number"
            />
          </div>
        </div>

        <div className="w-full">
          <img
            src="/tarrif-plan-image.png"
            alt="Tariff plan"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TarrifPlan;
