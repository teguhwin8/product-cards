import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const imageUrl =
    product.images?.[currentImageIndex] ||
    product.category?.image ||
    "https://placehold.co/400x400/png";

  return (
    <div className="max-w-xs w-full bg-white rounded-3xl overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full object-cover rounded-t-3xl aspect-square"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 text-black text-xl"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={24} className={isWishlisted ? "fill-black" : ""} />
        </button>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {product.images?.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white bg-opacity-50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-gray-900 font-semibold text-lg leading-tight h-[45px] line-clamp-2">
          {product.title}
        </h2>
        <p className="text-gray-900 font-extrabold text-2xl mt-1 ">
          ${product.price}
        </p>
        <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
          {product.description}
        </p>

        <div className="mt-5">
          <p className="text-gray-900 text-sm mb-2">Colors</p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <span className="w-6 h-6 rounded-full bg-[#6CB4EE]"></span>
              <span className="w-6 h-6 rounded-full bg-[#4B7DC1]"></span>
              <span className="w-6 h-6 rounded-full bg-[#2F5A9E]"></span>
              <span className="w-6 h-6 rounded-full bg-[#1E4A8B]"></span>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-3 bg-[#6EF3D7] rounded-xl p-3 shadow-md float-right text-black"
              aria-label="Add to cart"
            >
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>

        <div className="clear-right"></div>
      </div>
    </div>
  );
};

export default ProductCard;
