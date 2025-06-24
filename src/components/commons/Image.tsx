import { Image as IKImage } from "@imagekit/react";
import { URL_ENDPOINT } from "../../api/config/imagekit";

interface ImageProps {
  className?: string;
  alt?: string;
  src: string;
  width: number;
  height: number;
}

const Image = ({ className, alt, src, width, height }: ImageProps) => {
  return (
    <IKImage
      urlEndpoint={URL_ENDPOINT}
      src={src}
      className={className ? className : ""}
      alt={alt ? alt : src.slice(1)}
      lqip={{ active: true, quality: 20 }}
      width={width}
      height={height}
    />
  );
};

export default Image;
