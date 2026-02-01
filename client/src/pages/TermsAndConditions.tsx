const fileUrl =
  "https://ik.imagekit.io/Abapowerimg/Website%20Aple/Terms%20and%20Conditions.pdf";

const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;

const TermsAndConditions = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-10 my-10">
      <h2 className="text-center text-4xl font-semibold">
        Terms and Conditions
      </h2>
      <div className="h-[80vh] w-full ">
        <iframe src={url} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TermsAndConditions;
