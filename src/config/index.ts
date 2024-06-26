import axios from "axios";

export const PRODUCT_CATEGORIES = [
  {
    label: "T-Shirt",
    value: "tshirt" as const,
    featured: [
      {
        name: "Editor Picks",
        href: "#",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Hoodies",
    value: "hoodies" as const,
    featured: [
      {
        name: "Favourite Icon Picks",
        href: "#",
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "#",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
export const BASE_URL = "http://localhost:1400/api";

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});
