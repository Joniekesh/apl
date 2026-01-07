import { Image } from "@imagekit/react";

interface ImageContainerProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: string;
  alt?: string;
}

const ImageContainer = ({
  src,
  className,
  width = 500,
  height = 500,
  loading = "lazy",
  alt = "Image",
}: ImageContainerProps) => {
  const endPoint = import.meta.env.VITE_API_IMAGE_KIT_ENDPOINT;

  return (
    <Image
      urlEndpoint={endPoint}
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      lqip={{ active: true, quality: 20 }}
      className={className}
      // transformation={[{ aiRemoveBackground: true }]}
      // transformation={[{ aiUpscale: true }]}
    />
  );
};

export default ImageContainer;
