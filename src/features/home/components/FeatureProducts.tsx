import React from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import getAllProducts from "@/features/products/services/getAllProducts";
import ProductCard from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types/Products.types";

export default async function FeatureProducts() {
  let products: Product[] = [];

  try {
    const productsResponse = await getAllProducts();
    products = productsResponse?.data || [];
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section id="featured-products" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured <span className="text-emerald-600">Products</span>
            </h2>
          </div>

          <Link
            href="/products"
            prefetch={true}
            className="group inline-flex items-center gap-2 self-start sm:self-auto text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base transition-colors duration-200"
          >
            <span>View All Products</span>
            <IconArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              stroke={2.5}
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
