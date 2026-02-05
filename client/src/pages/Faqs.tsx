const fileUrl =
  "https://ik.imagekit.io/Abapowerimg/Website%20Aple/FREQUENTLY-ASKED-QUESTIONS-1.pdf?updatedAt=1769793630960";
const url2 = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;
const fileUrl2 =
  "https://ik.imagekit.io/Abapowerimg/Website%20Aple/FAQ-MAP.pdf?updatedAt=1769793630656";
const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl2)}`;

const Faqs = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-4 my-10">
      <div className="h-[80vh] w-full ">
        <iframe src={url} className="w-full h-full" />
      </div>
      <div className="h-[80vh] w-full ">
        <iframe src={url2} className="w-full h-full" />
      </div>
    </div>
  );
};

export default Faqs;
