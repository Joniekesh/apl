import { quickLinks, services, type IQuickLink } from "../data";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <div className="w-full bg-apl-primary text-white h-max">
      <div className="w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-4">
        <div className="flex-1">
          <h2 className="font-semibold mb-2 text-lg">About Us</h2>
          <p className="text-sm text-gray-200">
            APLE is a pioneer private sector licensee of the Nigerian
            Electricity Regulatory Commission, NERC for electricity distribution
            in Nigeria. APLE is a special purpose vehicle of the Aba Integrated
            Power Project for distribution of electricity to consumers within
            its ring-fenced Aba metropolis.
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold mb-2 text-lg">Quicklinks</h2>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link: IQuickLink) => (
              <span
                key={link.id}
                className="text-sm text-gray-200 cursor-pointer hover:text-white"
              >
                {link.title}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold mb-2 text-lg">Our Services</h2>
          <div className="flex flex-col gap-2">
            {services.map((service: IQuickLink) => (
              <span
                key={service.id}
                className="text-sm text-gray-200 cursor-pointer hover:text-white"
              >
                {service.title}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold mb-2 text-lg">Contact Info</h2>
          <div className="flex flex-col gap-4">
            <p className="text-gray-200 text-sm">
              Address: Suite 300,  Aba Power Plaza, No.2 Geometric Power Road
              Osisioma-Aba, Abia State
            </p>
            <span className="text-sm text-gray-200">
              Phone: 07001238280 / 070022276937
            </span>
            <div className="flex items-center gap-4 *:cursor-pointer">
              <FaLinkedinIn />
              <CiTwitter />
              <IoLogoInstagram />
              <FaFacebookF />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90vw] mx-auto border-t border-white py-4 flex justify-between items-center text-sm">
        <span>© {new Date().getFullYear()} Aba Power Electricity Company.</span>
        <span>Powered by Geometric Power</span>
      </div>
    </div>
  );
};

export default Footer;
