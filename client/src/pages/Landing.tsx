import Hero from "../components/Hero";
import Info from "../components/Info";
import Network from "../components/Network";
import News from "../components/News";

const Landing = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-40 my-10">
      <Hero />
      <Info />
      <Network />
      <News />
    </div>
  );
};

export default Landing;
