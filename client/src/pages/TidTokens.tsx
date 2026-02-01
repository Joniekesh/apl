import { Input } from "../components/ui/input";

const TidTokens = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-10 my-20">
      <p>
        The management of the Aba Power Electric Company Limited, APLE wishes to
        inform her esteemed customers that the Nigerian Electricity Regulatory
        Commission has directed APLE to migrate all prepayment meters with a TID
        ROLLOVER KEY CHANGE TOKEN on or before November 2024.
      </p>
      <p>
        Invariably, this implies that any meter that is not migrated with the
        TID rollover key change token code on or before November 2024, will not
        be able to vend.
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-center">
          Enter your meter number below to generate TID token for your meter...
        </span>
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
      <p className="text-red-500">
        Kindly be informed that you are to load your recharge tokens in order of
        purchase (i.e. if you are buying more than one token, load the first
        token, followed by the second…. ).
      </p>
    </div>
  );
};

export default TidTokens;
