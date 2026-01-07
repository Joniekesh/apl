import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      className="relative w-[90vw] mx-auto my-8 rounded-xl h-130 overflow-hidden bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/hero-image.png')" }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div className="max-w-xl flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            Quick and Easy <br />
            Payment Methods for <br />
            your Electricity Bills
          </h2>

          <span className="text-sm text-muted w-[80%] ">
            Explore our various payments methods to pay for your electricity
            bills
          </span>

          <Button className="w-fit bg-transparent rounded-full ring-1 ring-border hover:bg-apl-primary text-[12px] text-muted cursor-pointer">
            Pay now
            <ChevronRight />
          </Button>
        </div>
      </div>

      <img
        src="/woman2.png"
        alt="Payment illustration"
        className="absolute bottom-0 right-0 h-full w-[60%] object-cover z-0"
      />
    </section>
  );
};

export default Hero;
