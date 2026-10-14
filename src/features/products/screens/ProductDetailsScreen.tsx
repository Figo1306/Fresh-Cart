import React from "react";
import Link from "next/link";
import getSpecficProduct from "../services/getSpecficProduct";
import getAllProducts from "../services/getAllProducts";
import ProductBreadcrumb from "../components/ProductBreadcrumb";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductDetailsTabs from "../components/ProductDetailsTabs";
import SimilarProducts from "../components/SimilarProducts";
import { Product } from "../types/Products.types";

interface ProductDetailsScreenProps {
  id: string;
}

export default async function ProductDetailsScreen({
  id,
}: ProductDetailsScreenProps) {
  let product = null;
  let similarProducts: Product[] = [];

  try {
    const productResponse = await getSpecficProduct(id);
    product = productResponse?.data || null;
  } catch (error) {
    console.error(`Failed to fetch product details for ID ${id}:`, error);
  }

  if (!product) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-xs">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              The product you are looking for does not exist or may have been removed.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Fetch similar products in the same category
  if (product.category?._id) {
    try {
      const similarResponse = await getAllProducts({
        category: product.category._id,
        limit: 12,
      });
      const allCategoryProducts = similarResponse?.data || [];
      const currentId = product._id || product.id;
      similarProducts = allCategoryProducts.filter(
        (p) => (p._id || p.id) !== currentId
      );
    } catch (err) {
      console.error("Failed to fetch similar products:", err);
    }
  }

  const hasDiscount = Boolean(
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
  );
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.priceAfterDiscount ?? 0)) / product.price) *
          100
      )
    : 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <ProductBreadcrumb
        title={product.title}
        category={product.category}
        subcategory={product.subcategory}
      />

      {/* Main Product Presentation (Gallery + Info) */}
      <section id="product-detail" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Gallery */}
            <div id="product-images" className="w-full lg:w-5/12 xl:w-4/12">
              <ProductGallery
                images={product.images}
                title={product.title}
                discountPercentage={discountPercentage}
              />
            </div>

            {/* Right Column: Information & Actions */}
            <div id="product-info" className="w-full lg:w-7/12 xl:w-8/12">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Details, Reviews, Shipping & Returns */}
      <ProductDetailsTabs product={product} />

      {/* Related Products Carousel */}
      <SimilarProducts products={similarProducts} />
    </div>
  );
}
