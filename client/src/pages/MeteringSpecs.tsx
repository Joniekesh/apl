const fileUrl = "https://ik.imagekit.io/joniedev/requirement-4.pdf";
const MeteringSpecs = () => {
  const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;

  return (
    <div className="flex w-[90vw] mx-auto my-10  items-center justify-center flex-col min-h-screen gap-8">
      <img src="/meter-specs-image.png" alt="" />
      <h1 className="text-2xl md:text-4xl text-center">
        TECHNICAL REQUIREMENTS FOR ENERGY METERS IN NIGERIA
      </h1>
      <div className="h-[80vh] w-full ">
        <iframe src={url} className="w-full h-full" />
      </div>
    </div>
  );
};

export default MeteringSpecs;
