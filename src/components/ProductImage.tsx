import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

const ProductImage = ({ src, alt }: ImageProps) => {
  return (
    <div className="relative group"> {/* Use group class for hover effects */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition duration-300 ease-in-out transform hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out" />
    </div>
  );
};

export default ProductImage;
