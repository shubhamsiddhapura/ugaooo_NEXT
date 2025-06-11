import React, { useEffect, useState } from "react";
import axios from "axios";
import plantbanner from "../assets/plantspage.webp";
import ProductCard from "../Component/card"; // Adjust path if needed

const Plants = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPlantProducts = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/section/getAllPlantProdutct", {
          name: "plants",
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch plant products:", error);
      }
    };

    fetchPlantProducts();
  }, []);

  return (
    <div className="bg-green-50">
      <img src={plantbanner} alt="plant-banner" />
      <div className="pt-5 pl-3">
        <h1 className="text-5xl pb-3">Plants</h1>
        <p className="text-xl">
          Plants make for the best house companions, suitable for all your moods and every aesthetic. Ugaoo, an online website for decorative plants, offers a wide variety of plants so that you can buy plants online from the comfort of your home!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Plants;
