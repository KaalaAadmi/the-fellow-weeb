"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
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

const ProductListing = ({ product, index }: ProductListingProps) => {
	console.log("product", product);
	const [validUrls, setValidUrls] = React.useState<string[]>([]);
	const [isVisible, setisVisible] = useState<boolean>(false);
	useEffect(() => {
		const timer = setTimeout(() => setisVisible(true), index * 75);

		return () => clearTimeout(timer);
	}, [index]);

	useEffect(() => {
		function getValidUrls(prod:Product) {
      const validUris:string[] = [];
    
      if (prod && prod.attributes && prod.attributes.images) {
        const images = prod.attributes.images.data;
    // console.log(images)
        images.forEach((image) => {
          if (image.attributes.url) {
            validUris.push(image.attributes.url);
          } else if (image.formats) {
            // Check for other image formats (optional)
            const formatUrls = Object.values(image.formats).map((format) => format.url);
            validUris.push(...formatUrls); // Spread operator to avoid nested arrays
          }
        });
      }
      setValidUrls(validUris);
    }
		getValidUrls(product);
	}, [product]);

	console.log("validUrls", validUrls);
	if (!product || !isVisible) return <ProductPlaceholder />;
	
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.attributes.category
  )?.label

	console.log(validUrls);
	if (isVisible && product) {
		return (
			<Link
				href={`/product/${product.id}`}
				className={cn("invisible h-4 w-4 cursor-pointer group/main", {
					"visible animate-in fade-in-5": isVisible,
				})}
			>
				<div className="flex flex-col w-full">
					<ImageSlider urls={validUrls} />
					<h3 className="mt-4 font-medium text-sm text-gray-700">
						{product.attributes.title}
					</h3>
					<p className="mt-1 text-sm text-gray-500 ">{label}</p>
					<p className="mt-1 font-medium text-sm text-gray-900">
						{formatPrice(product.attributes.price)}
					</p>
				</div>
			</Link>
		);
	}
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

export default ProductListing;
