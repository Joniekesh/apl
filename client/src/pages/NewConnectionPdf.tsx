const fileUrl =
  "https://ik.imagekit.io/joniedev/APLE-NEW-SERVICE-CONNECTION-FORM-1-1.pdf";

const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;

const NewConnectionPdf = () => {
  return (
    <div className="flex w-[90vw] mx-auto flex-col gap-40 my-10">
      <div className="h-[80vh] w-full ">
        <iframe src={url} className="w-full h-full" />
      </div>
    </div>
  );
};

export default NewConnectionPdf;
