import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg text-center">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-64 w-full object-cover mb-4"
      />
      <h2 className="text-xl font-bold px-4">{product.title}</h2>
      <p className="text-black px-4">{product.description}</p>
      <p className="text-green-700 px-4 pb-3 font-semibold mt-2">
        ₹{product.price}
      </p>
    </div>
  );
};

export default ProductCard;
