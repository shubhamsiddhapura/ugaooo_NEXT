"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
 const icons = [
  { src: "/1.avif", label: "Buy 3 Get 1" },
  { src: "/2._Easy_to_Care.avif", label: "XL Plants" },
  { src: "/3._XL_Plants.avif", label: "Ceramic Pots" },
  { src: "/4._Ceramic_Pots.avif", label: "Easy to Care" },
  { src: "/6._Fertilizers.avif", label: "Vegetable Seeds" },
];
const mainBanners = [
  "/banner3.webp",
  "/banners-01_0033f401-3eeb-4c14-963c-38852be82fc9.webp",
  "/Environment_day_banner-01.webp",
];

const safeBanners = [
  "/Safe_Delivery_Strip_Banner.webp",
  "/Self_Watering_Strip_Banner.webp",
];

  const [currentMain, setCurrentMain] = useState(0);
  const [currentSafe, setCurrentSafe] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMain((prev) => (prev + 1) % mainBanners.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSafe((prev) => (prev + 1) % safeBanners.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-50">
      {/* Top Banner */}
      <img
        src="/Desktop_Offer_Strip_Banner-07.webp"
        alt="Top Offer Banner"
        className="w-full h-auto"
      />

      {/* Icons */}
      <div className="grid grid-cols-3 md:flex flex-wrap justify-center gap-6 py-7 px-4">
        {icons.map((item, index) => (
          <Link key={index} href="#">
            <div className="flex flex-col items-center space-y-2 w-28 sm:w-36">
              <img
                src={item.src}
                alt={item.label}
                className="h-24 sm:h-36 object-contain"
              />
              <p className="text-center text-gray-700 text-sm sm:text-base font-medium">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Rotating Main Banner */}
      <div className="w-full h-52 sm:h-64 md:h-72 relative overflow-hidden">
        {mainBanners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`main-banner-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentMain ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Essentials Section */}
      <h1 className="uppercase text-green-800 text-center text-3xl sm:text-4xl pt-8 pb-4">
        Plant Parent Essentials
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 sm:px-8 pb-6">
        {["/Plant_Care.webp", "/Plants.webp", "/Pots_Planters.webp", "/Seeds.webp"].map(
          (img, index) => (
            <img key={index} src={img} alt={`essential-${index}`} className="w-full h-auto object-contain" />
          )
        )}
      </div>

      {/* Why Ugaoo Banner */}
      <h1 className="uppercase text-green-800 text-center text-3xl sm:text-4xl pt-8 pb-4">
        Why Ugaoo?
      </h1>
      <div className="w-full mt-3 h-36 sm:h-48 md:h-52 relative overflow-hidden shadow-md">
        {safeBanners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`safe-banner-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSafe ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* About Section */}
      <h1 className="uppercase text-green-800 text-center text-3xl sm:text-4xl pt-8 pb-2">
        About Ugaoo
      </h1>
      <p className="max-w-5xl mx-auto text-center text-gray-700 text-sm sm:text-base pt-3 pb-6 leading-relaxed px-4">
        As India’s largest and most trusted online plant nursery and gardening store, Ugaoo is here to bring you only the best for all your gardening and plant needs. From exotic indoor plants for your homes to flowering plants and succulents for your ornamental gardens, we bring you all the plants you may want! We also specialize in the highest quality seeds, organic fertilizers, premium pots and planters, and garden tools for effective plant care. So, turn a new leaf and start your gardening journey with Ugaoo!
      </p>
    </div>
  );
};

export default Home;
