import React, { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import Image from "next/image";
import ImageSlider from "./ImageSlider";

interface Product {
  id: number;
  attributes: {
    title: string;
    description: { type: string; children: { type: string; text: string }[] }[];
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    freeDelivery: boolean;
    category: string;
    whatIsIncluded: {
      type: string;
      children: { type: string; text: string }[];
    }[];
  };
}

interface ProductListingProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductListingProps) => {
  // console.log("product", product);
  const [validUrls, setValidUrls] = React.useState<string[]>([]);
  const [isVisible, setisVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => setisVisible(true), index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    function getValidUrls(prod: Product) {
      const validUris: string[] = [];

      if (prod && prod.attributes && prod.attributes.images) {
        const images = prod.attributes.images.data;
        // console.log(images)
        images.forEach((image) => {
          if (image.attributes.url) {
            validUris.push(image.attributes.url);
          } else if (image.formats) {
            // Check for other image formats (optional)
            const formatUrls = Object.values(image.formats).map(
              (format) => format.url
            );
            validUris.push(...formatUrls); // Spread operator to avoid nested arrays
          }
        });
      }
      setValidUrls(validUris);
    }
    getValidUrls(product);
  }, [product]);

  // console.log("validUrls", validUrls);
  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.attributes.category
  )?.label;

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn("group block hover:border p-1 rounded-lg border-blue-300", {
        "visible animate-in fade-in-5": isVisible,
      })}
    >
      <ImageSlider urls={validUrls} />
      <div className="mt-1.5">
        {/* <p className="text-xs text-gray-500">Space Grey</p> */}
        <div className="mt-3 flex justify-between text-sm">
          <div className="flex flex-col">
            <h3 className="text-gray-900 group-hover:underline-offset-4 text">
              {product.attributes.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 ">{label}</p>
          </div>
          <div className="flex flex-col">
            <p></p>
            <p className="text-gray-900 font-bold">
              {formatPrice(product.attributes.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductCard;
