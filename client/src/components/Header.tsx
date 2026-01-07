import { Mail, Phone } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-apl-primary hidden text-white w-full py-3 px-8 lg:flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 font-bold" />
          <span className="text-sm">info@abapower.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 font-bold" />
          <span className="text-sm">0700 1238 280 / 0700 2338 280</span>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <span className="text-sm">Online Payments</span>
        <span className="text-sm">Whistleblowing</span>
      </div>
    </div>
  );
};

export default Header;
