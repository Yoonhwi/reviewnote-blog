import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

interface RoundImgProps
  extends Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt"> {
  size: number;
  imgSrc: string;
  alt: string;
}

const RoundImage = ({ size, imgSrc, alt, ...rest }: RoundImgProps) => {
  return (
    <div
      className="relative rounded-full overflow-hidden shadow-sm"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="100%"
        className="object-cover"
        priority
        {...rest}
      />
    </div>
  );
};

export default RoundImage;
