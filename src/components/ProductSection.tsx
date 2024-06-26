"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { axiosConfig } from "@/config";
import Link from "next/link";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const ProductSection = (props: ProductReelProps) => {
  const { title, subtitle, href } = props;
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const getLatestProducts = async () => {
      axiosConfig
        .get("/products?populate=*&_sort=date:DESC&_limit=5")
        .then((res) => {
          // console.log(res.data.data);
          setProductList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLatestProducts();
  }, []);
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {productList.map(
              (product, i) =>
                i <= 3 && (
                  <ProductCard
                    key={`product-${i}`}
                    product={product}
                    index={i}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
