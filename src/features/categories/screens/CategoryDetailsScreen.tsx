"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCategory,
  IconFolderOpen,
  IconHome,
  IconLoader2,
  IconShoppingBag,
} from "@tabler/icons-react";
import {
  useCategory,
  useSubcategoriesByCategory,
} from "../hooks/useCategoriesQuery";
import SubcategoryCard from "../components/SubcategoryCard";

interface CategoryDetailsScreenProps {
  id: string;
}

export default function CategoryDetailsScreen({
  id,
}: CategoryDetailsScreenProps) {
  const {
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    refetch: refetchCategory,
  } = useCategory(id);

  const {
    data: subcategories = [],
    isLoading: isSubcategoriesLoading,
    isError: isSubcategoriesError,
    refetch: refetchSubcategories,
  } = useSubcategoriesByCategory(id);

  const isLoading = isCategoryLoading || isSubcategoriesLoading;
  const isError = isCategoryError || isSubcategoriesError;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Banner / Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link
              href="/"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <IconHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium truncate max-w-xs">
              {category?.name || (isLoading ? "Loading..." : "Category")}
            </span>
          </nav>

          {/* Banner Title & Icon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0 overflow-hidden relative">
                {category?.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                ) : (
                  <IconCategory className="w-8 h-8 text-white" stroke={2} />
                )}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {category?.name || (isLoading ? "Loading Category..." : "Category Details")}
                </h1>
                <p className="text-white/85 mt-1 text-sm sm:text-base">
                  Choose a subcategory to browse products
                </p>
              </div>
            </div>

            {/* Total Subcategories Badge */}
            {!isLoading && (
              <div className="self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold ring-1 ring-white/30">
                  <span>
                    {subcategories.length}{" "}
                    {subcategories.length === 1
                      ? "Subcategory"
                      : "Subcategories"}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors w-fit group"
          >
            <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Categories</span>
          </Link>

          {category && (
            <Link
              href={`/products?category=${id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-xl transition-colors w-fit border border-primary-100"
            >
              <IconShoppingBag className="w-4 h-4" />
              <span>View All Products in {category.name}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <IconLoader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Loading subcategories...</p>
            </div>
          </div>
        ) : isError ? (
          /* Error State */
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 text-2xl">
              😕
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Failed to load subcategories
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Something went wrong while fetching this category. Please try again.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  refetchCategory();
                  refetchSubcategories();
                }}
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-primary-600/20"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : subcategories.length > 0 ? (
          /* Subcategories Section */
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {subcategories.length} Subcategories in {category?.name}
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Select a subcategory to browse its product catalog
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {subcategories.map((subcategory) => (
                <SubcategoryCard
                  key={subcategory._id}
                  subcategory={subcategory}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty Subcategories State */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 shadow-xs max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
              <IconFolderOpen className="w-10 h-10 text-primary-500" stroke={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Subcategories Found
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              This category doesn&apos;t have any separate subcategories yet, but you can still explore all products available in {category?.name || "this category"}.
            </p>
            <Link
              href={`/products?category=${id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-600/20"
            >
              <IconShoppingBag className="w-4 h-4" />
              <span>View All Products in {category?.name || "Category"}</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
