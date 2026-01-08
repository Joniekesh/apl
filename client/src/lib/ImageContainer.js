import { jsx as _jsx } from "react/jsx-runtime";
import { Image } from "@imagekit/react";
const ImageContainer = ({ src, className, width = 500, height = 500, loading = "lazy", alt = "Image", }) => {
    const endPoint = import.meta.env.VITE_API_IMAGE_KIT_ENDPOINT;
    return (_jsx(Image, { urlEndpoint: endPoint, src: src, width: width, height: height, alt: alt, loading: loading, lqip: { active: true, quality: 20 }, className: className }));
};
export default ImageContainer;
