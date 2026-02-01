const fileUrl =
  "https://ik.imagekit.io/Abapowerimg/Website%20Aple/NEMSA%20REQUIREMENTS.pdf?updatedAt=1769793635510";

const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;

const MeterInitialization = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-4 my-10">
      <h2 className="text-center font-semibold text-3xl">
        METER INITIALIZATION PROCESS AFTER CUSTOMIZATION
      </h2>
      <img
        src="/meter-initialization-image.png"
        alt=""
        className="object-cover"
      />
      <div className="h-[80vh] w-full ">
        <iframe src={url} className="w-full h-full" />
      </div>
    </div>
  );
};

export default MeterInitialization;
