import React from "react";

interface ThumbnailProps {
  src: string;
  alt: string;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  isSelected?: boolean;
}

const ProductThumbnail = ({
  src,
  alt,
  onClick,
  isSelected,
}: ThumbnailProps) => (
  <div
    className={`product-image-thumb cursor-pointer mb-2 border p-2 rounded-md ${
      isSelected ? "bg-gray-200" : ""
    }`}
    onClick={onClick}
  >
    <img src={src} alt={alt} className="h-24 w-24 object-cover object-center" />
  </div>
);

export default ProductThumbnail;
