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
      <img
        src="/Desktop_Offer_Strip_Banner-07.webp"
        alt="Top Offer Banner"
        className="object-cover w-full h-auto"
      />
  
      <div className="grid flex-wrap justify-center grid-cols-2 gap-4 px-3 py-6 sm:grid-cols-3 md:flex sm:gap-6 sm:px-4">
        {icons.map((item, index) => (
          <Link key={index} href="#">
            <div className="flex flex-col items-center w-24 space-y-2 sm:w-32 md:w-36">
              <img
                src={item.src}
                alt={item.label}
                className="object-contain h-20 sm:h-28 md:h-36"
              />
              <p className="text-xs font-medium text-center text-gray-700 sm:text-sm md:text-base">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="relative w-full overflow-hidden h-44 sm:h-60 md:h-72">
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
      <h1 className="pt-6 pb-3 text-2xl text-center text-green-800 uppercase sm:text-3xl md:text-4xl sm:pt-8">
        Plant Parent Essentials
      </h1>
      <div className="grid grid-cols-2 gap-3 px-3 pb-6 sm:grid-cols-4 sm:gap-4 sm:px-8">
        {["/Plant_Care.webp", "/Plants.webp", "/Pots_Planters.webp", "/Seeds.webp"].map(
          (img, index) => (
            <img
              key={index}
              src={img}
              alt={`essential-${index}`}
              className="object-contain w-full h-auto"
            />
          )
        )}
      </div>

      <h1 className="pt-6 pb-3 text-2xl text-center text-green-800 uppercase sm:text-3xl md:text-4xl sm:pt-8">
        Why Ugaoo?
      </h1>
      <div className="relative w-full overflow-hidden shadow-md h-28 sm:h-40 md:h-52">
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

      <h1 className="pt-6 pb-2 text-2xl text-center text-green-800 uppercase sm:text-3xl md:text-4xl sm:pt-8">
        About Ugaoo
      </h1>
      <p className="max-w-5xl px-4 pt-2 pb-6 mx-auto text-sm leading-relaxed text-center text-gray-700 sm:text-base">
        As India’s largest and most trusted online plant nursery and gardening store, Ugaoo is here to bring you only the best for all your gardening and plant needs. From exotic indoor plants for your homes to flowering plants and succulents for your ornamental gardens, we bring you all the plants you may want! We also specialize in the highest quality seeds, organic fertilizers, premium pots and planters, and garden tools for effective plant care. So, turn a new leaf and start your gardening journey with Ugaoo!
      </p>
    </div>
  );
};

export default Home;
