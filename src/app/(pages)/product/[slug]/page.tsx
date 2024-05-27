"use client";
import { useEffect, useState } from "react";
import ImageMagnifier from "@/components/ImageMagnifier";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { axiosConfig } from "@/config";
import { formatPrice } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: any): any {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const path = usePathname();
  const id = path.split("/")[2];
  const { user } = useUser();
  const router = useRouter();
  // console.log(id);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [prod, setProd] = useState({});
  const [sizes, setSizes] = useState([]); // Define state for sizes
  const [colors, setColors] = useState([]); // Define state for colors
  const [validUrls, setValidUrls] = useState<string[]>([]); // State for valid image URLs
  const allSizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"]; // Define all offered sizes
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // get products
  useEffect(() => {
    const getLatestProducts = async () => {
      axiosConfig
        .get(`/products/${id}?populate=*`)
        .then((res) => {
          // console.log(res.data.data);
          setProd(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLatestProducts();
  }, []);

  // get sizes
  useEffect(() => {
    const formattedSizes = allSizes.map((size) => ({
      name: size,
      inStock: prod?.attributes?.availableSizes?.includes(size), // Check if size exists in availableSizes
    }));

    setSizes(formattedSizes);
  }, [prod]); // Update sizes state when data changes

  // get colors
  useEffect(() => {
    const formattedColors = prod?.attributes?.availableColors.map((color) => ({
      name: color.name,
      class: color.class,
      selectedClass: "ring-gray-400", // Initially set selectedClass to an empty string
    }));
    setColors(formattedColors);
  }, [prod]); // Update colors state when data changes

  // get images
  useEffect(() => {
    function getValidUrls() {
      const validUris: string[] = [];

      if (prod && prod.attributes && prod.attributes.images) {
        const images = prod.attributes.images.data;
        images.forEach((image) => {
          if (image.attributes.url) {
            validUris.push(image.attributes.url);
          } else if (image.formats) {
            const formatUrls = Object.values(image.formats).map(
              (format) => format.url
            );
            validUris.push(...formatUrls);
          }
        });
      }
      setValidUrls(validUris);
      // setIsLoadingImages(false); // Set loading state to false after fetching
    }
    getValidUrls();
  }, [prod]); // Update on product change

  // console.log(validUrls);

  const handleSelect = (index: number) => {
    setSelectedImageIndex(index);
  };
  console.log("Product: ", prod);
  console.log("User: ", user?.fullName);
  const onAddToCartClick = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      // TODO: logic for add to cart
      const data = {
        data: {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          products: prod?.id,
        },
      };
      console.log("Data ", data);
      try {
        await axiosConfig.post("/carts", data).then((res) => {
          console.log("Added to Cart ", res);
        });
      } catch (error) {
        console.log("Error ", error);
      }
    }
  };

  // console.log(selectedImageIndex);
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <p
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {prod?.attributes?.title}
            </p>
          </ol>
        </nav>
        <MaxWidthWrapper className="mt-6">
          <div className="w-full lg:w-3/5 px-4 mb-14 lg:mb-0">
            <div className="flex flex-wrap justify-center -mx-2">
              {/* Thumbnails Section */}
              <div className="w-full sm:w-2/6 md:w-1/4 px-2 mb-7 lg:mb-0 flex justify-center">
                <div className="flex flex-wrap justify-center lg:flex-col">
                  {validUrls.map((image, index) => (
                    <div
                      className="w-1/2 sm:w-full mb-2 sm:mb-4 lg:mb-2 lg:w-full px-2 flex justify-center"
                      key={index}
                    >
                      <div className="relative group block h-36 w-36 sm:h-24 sm:w-24 bg-blueGray-900 rounded-md cursor-pointer">
                        <div className="absolute inset-0">
                          <Image
                            onMouseOver={() => handleSelect(index)}
                            // ref={addRefs}
                            className={
                              selectedImageIndex === index
                                ? "img-fluid w-full h-full object-cover border-blue-600 border-2 shadow-md rounded-md"
                                : "img-fluid w-full h-full object-cover border border-gray-300 shadow-md rounded-md"
                            }
                            src={image}
                            alt={`Thumbnail ${index}`}
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Main Image Section */}
              <div className="w-full sm:w-4/6 md:w-3/4 px-4 h-auto sm:h-auto flex justify-center items-center">
                <div className="relative group block h-80 w-80 xs:h-0 bg-blueGray-900 rounded-md">
                  <div className="absolute inset-0 flex justify-center items-center rounded-md">
                    <ImageMagnifier
                      src={validUrls[selectedImageIndex]}
                      height="1800"
                      width="1800"
                      zoomLevel={1.5}
                      magnifierHeight={300}
                      magnifieWidth={300}
                      imageAlt="Selected Image"
                      square={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {prod?.attributes?.title}
            </h1>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                {prod?.attributes?.description?.map((paragraph, index) => (
                  <p className="text-base text-gray-900" key={index}>
                    {paragraph.children[0].text}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {prod?.attributes?.highlights?.map((paragraph, index) => (
                    <li key={index} className="text-gray-400">
                      <span className="text-gray-600">
                        {paragraph.children[0].text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                {prod?.attributes?.details?.map((paragraph, index) => (
                  <p className="text-sm text-gray-600" key={index}>
                    {paragraph.children[0].text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {formatPrice(prod?.attributes?.price)}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors?.map((color, index) => (
                      <RadioGroup.Option
                        key={index}
                        value={color}
                        className={({
                          active,
                          checked,
                        }: {
                          active: boolean;
                          checked: boolean;
                        }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }: { active: boolean }) =>
                          classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-blue-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({
                          active,
                          checked,
                        }: {
                          active: boolean;
                          checked: boolean;
                        }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size.name}
                            </RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-blue-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => {
                  onAddToCartClick(event);
                }}
              >
                Add to bag
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
