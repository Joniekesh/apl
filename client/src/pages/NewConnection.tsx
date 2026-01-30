import { Link } from "react-router-dom";

const NewConnection = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-10 my-10">
      <h2 className="text-3xl font-semibold">New Connection</h2>
      <img src="/request-new.png" alt="" className="object-cover" />
      <p className="font-semibold text-[18px] ">
        Are you a new customer? Please download the form or fill and a member of
        our team will get back to you.
      </p>
      <Link to="/new-connection-pdf" className="text-[#F7C315]  font-semibold">
        Click to Download New Service Application
      </Link>
      <img src="/new-service-appl-image.png" alt="" className="object-cover" />
    </div>
  );
};

export default NewConnection;
