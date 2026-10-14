"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  IconBox,
  IconCategory,
  IconFilter,
  IconHome,
  IconLoader2,
  IconPackage,
  IconTags,
  IconX,
} from "@tabler/icons-react";
import { useFilteredProducts } from "../hooks/useProductsQuery";
import { useBrand } from "@/features/brands/hooks/useBrandsQuery";
import { useCategory } from "@/features/categories/hooks/useCategoriesQuery";
import ProductCard from "../components/ProductCard";

export default function ProductsScreen() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand") || undefined;
  const categoryId = searchParams.get("category") || undefined;
  const subcategoryId = searchParams.get("subcategory") || undefined;

  // Specific brand details from GET /brands/:id
  const { data: brand, isLoading: isBrandLoading } = useBrand(brandId);
  // Category details if filtered
  const { data: category } = useCategory(categoryId);

  // Filtered products from GET /products?brand=...
  const { data: productsData, isLoading: isProductsLoading } =
    useFilteredProducts({
      brand: brandId,
      category: categoryId,
      subcategory: subcategoryId,
      limit: 50,
    });

  const products = productsData?.data || [];
  const isLoading = isProductsLoading || (Boolean(brandId) && isBrandLoading);
  const hasActiveFilter = Boolean(brandId || categoryId || subcategoryId);

  // Dynamic banner title & subtitle
  const title = brand
    ? brand.name
    : category
    ? category.name
    : "All Products";

  const subtitle = brand
    ? `Shop ${brand.name} products`
    : category
    ? `Browse products in ${category.name}`
    : "Explore our complete product collection";

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Banner / Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6 flex-wrap">
            <Link
              href="/"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <IconHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span className="text-white/40">/</span>

            {brand && (
              <>
                <Link
                  href="/brands"
                  className="hover:text-white transition-colors"
                >
                  Brands
                </Link>
                <span className="text-white/40">/</span>
              </>
            )}

            {category && (
              <>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
                <span className="text-white/40">/</span>
              </>
            )}

            <span className="text-white font-medium">{title}</span>
          </nav>

          {/* Banner Title & Icon */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0 overflow-hidden relative">
              {brand?.image ? (
                <div className="relative w-12 h-12">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              ) : category?.image ? (
                <div className="relative w-12 h-12">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <IconBox className="w-8 h-8 text-white" stroke={2} />
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="text-white/85 mt-1 text-sm sm:text-base">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Active Filters Bar */}
        {hasActiveFilter && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <IconFilter size={16} stroke={2} />
              <span>Active Filters:</span>
            </span>

            {brand && (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
              >
                <IconTags size={14} stroke={2.5} />
                <span>{brand.name}</span>
                <IconX size={14} stroke={2.5} />
              </Link>
            )}

            {category && (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                <IconCategory size={14} stroke={2.5} />
                <span>{category.name}</span>
                <IconX size={14} stroke={2.5} />
              </Link>
            )}

            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-gray-700 underline font-medium ml-1"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Showing Count */}
        {!isLoading && (
          <div className="mb-6 text-sm text-gray-500 font-medium">
            Showing {products.length} {products.length === 1 ? "product" : "products"}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <IconLoader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Loading products...</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          /* Products Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Products State */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <IconPackage className="w-10 h-10 text-gray-400" stroke={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {hasActiveFilter
                ? "No products match your current filters."
                : "Products will appear here once available."}
            </p>
            {hasActiveFilter && (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-xs text-sm"
              >
                <span>View All Products</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
