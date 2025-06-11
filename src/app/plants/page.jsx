"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ProductCard from "../../Component/Card";
import Link from "next/link";

const Plants = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPlantProducts = async () => {
  try {
    const response = await axios.post("/api/getAllPlantProduct", {
      name: "plants",
    });

    if (response.data.success) {
      setProducts(response.data.data.products);
    } else {
      console.error("Failed to fetch:", response.data.message);
    }
  } catch (error) {
    console.error("Axios error:", error);
  }
};


    fetchPlantProducts();
  }, []);

  return (
    <div className="bg-green-50">
      <Image
        src="/plantspage.webp"
        alt="plant-banner"
        width={1600}
        height={500}
        className="object-cover w-full h-auto"
        priority
      />

      <div className="pt-5 pl-3 pr-3 text-black">
        <h1 className="pb-3 text-5xl">Plants</h1>
        <p className="text-xl">
          Plants make for the best house companions, suitable for all your moods and every aesthetic. Ugaoo, an online website for decorative plants, offers a wide variety of plants so that you can buy plants online from the comfort of your home!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 text-black sm:grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          
          <ProductCard key={product._id} product={product} />  
        ))}
        
        
      
      </div>
    </div>
  );
};

export default Plants;
