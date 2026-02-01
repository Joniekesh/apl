const fileUrl =
  "https://ik.imagekit.io/Abapowerimg/Website%20Aple/Customer-bill-of-rights.pdf?updatedAt=1769793640919";

const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;

const TarrifReview = () => {
  return (
    <div className="flex-col gap-10 items-start flex w-[90vw] mx-auto my-10 text-[18px] ">
      <h2 className="text-center text-3xl w-full">
        Tariff Review Application: A Commitment to Sustainable and Efficient
        Power Supply
      </h2>
      <p>
        APL Electric Company Ltd is committed to ensuring that the residents and
        businesses of Aba continue to enjoy reliable and sustainable
        electricity. In alignment with this commitment APLEhas officially
        applied for a tariff review to the Nigerian Electricity Regulatory
        Commission (NERC).
      </p>
      <p>
        This tariff review is a significant step towards achieving several key
        objectives including enhancing major infrastructure development,
        ensuring cost reflectivity and improving service delivery.
      </p>
      <p>
        APLE values the input and feedback of all our stakeholders, and as part
        of the tariff review process, we will be engaging with the customers
        through public consultations. These sessions will provide an opportunity
        for our customers to understand the necessity of the tariff revision,
        its benefits, and to voice any concerns. Dates and venues for these
        consultations will be announced shortly on our website and through local
        media.
      </p>
      <p>
        Aba Power understands that any change in tariffs affects many
        stakeholders, particularly our valued customers. We are committed to
        implementing this tariff review responsibly, aiming to balance the need
        for critical infrastructure improvements with the economic realities
        faced by our customers.
      </p>
      <p>
        We thank you for your continued trust and support in our efforts to
        enhance the power infrastructure and service quality in Aba.
      </p>
      <div className="flex items-center justify-center w-full">
        <img
          src="/tarrif-review-image.jpeg"
          alt="Tarriff review image"
          className="object-cover"
        />
      </div>
      <div className="h-[80vh] w-full ">
        <iframe src={url} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TarrifReview;
