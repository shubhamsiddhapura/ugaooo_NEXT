import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="text-center rounded-lg">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="object-cover w-full h-64 mb-4"
      />
      <Link href="/model" className="p-2 text-white bg-black rounded-full">3dmodel</Link>
      <h2 className="px-4 mt-2 text-xl font-bold">{product.title}</h2>
      <p className="px-4 text-black">{product.description}</p>
      
      <p className="px-4 pb-3 mt-2 font-semibold text-green-700">
        ₹{product.price}
      </p>
    </div>
  );
};

export default ProductCard;
