interface IteamMember {
  id: number;
  name: string;
  image: string;
  role: string;
}

const teamMembers: IteamMember[] = [
  {
    id: 1,
    name: "Ugochukwu Opiegbe",
    image: "/team-ugo.jpeg",
    role: "Managing Director, Aba Power",
  },
  {
    id: 2,
    name: "Abdullahi Omeh",
    image: "/no-pic.png",
    role: "CTA",
  },
  {
    id: 3,
    name: "Livinus Nmaram",
    image: "/team-livinus.jpeg",
    role: "Director, Training Technical",
  },
  {
    id: 4,
    name: "Emeka Ngwoke",
    image: "/no-pic.png",
    role: "DCO",
  },
  {
    id: 5,
    name: "Chijioke Agbo",
    image: "/no-pic.png",
    role: "Head Finance",
  },
];

const About = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-20 my-10">
      <h2 className="bg-gray-200 h-[70vh] flex items-center justify-center text-7xl font-semibold">
        About Us
      </h2>
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-center">
        <div className="flex flex-1 flex-col gap-4">
          <hr className="w-20 bg-apl-primary h-1" />

          <h2 className="font-semibold text-5xl">Who We Are</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nam nec
            tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae
            erat consequat auctor eu in elit.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="/about-image.png"
            alt=""
            className="object-cover w-full rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-8 w-full text-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center w-full">
            <hr className="w-20 bg-apl-primary h-1 text-center flex items-center justify-center" />
          </div>
          <p className="font-semibold text-xl ">A Few Words About</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">Our Team</h2>
          <p className="w-full sm:w-[70vw] text-[18pxy s] ">
            At Aba Power Electric Company Limited , we are more than just a
            power distribution company—we are a dedicated team of professionals
            committed to delivering reliable, efficient, and sustainable energy
            solutions to our communities. Our mission is to ensure that every
            home, business, and institution has access to the power they need to
            thrive, while also driving innovation in the energy sector.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member: IteamMember) => (
          <div
            className="flex flex-col gap-4 items-center justify-center rounded-md p-2 bg-gray-200 hover:shadow-lg transition-shadow hover:bg-gray-300 hover:scale-105 duration-300 hover:ease-in h-90 "
            key={member.id}
          >
            <img
              src={member.image}
              alt=""
              className="w-25 h-25 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-base text-center">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
