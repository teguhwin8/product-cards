import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Product";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  isLoading,
  error,
  onAddToCart,
}) => {
  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="max-w-xs w-full bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse"
        >
          <div className="aspect-square bg-gray-200 rounded-t-3xl"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="w-6 h-6 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      ));
  };

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load products
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
      {isLoading
        ? renderSkeletons()
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
    </div>
  );
};

export default ProductsGrid;
