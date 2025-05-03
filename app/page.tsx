"use client";

import CartNotification from "@/components/CardNotification";
import ProductsGrid from "@/components/ProductGrid";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/Product";
import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    isVisible: boolean;
  }>({
    message: "",
    isVisible: false,
  });
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    setNotification({
      message: `${product.title} added to cart!`,
      isVisible: true,
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">ShopNest</h1>

          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingBag size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our curated collection of premium items
          </p>
        </div>

        <ProductsGrid
          products={products}
          isLoading={isLoading}
          error={error}
          onAddToCart={handleAddToCart}
        />
      </main>

      <CartNotification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default Page;
