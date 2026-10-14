"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  IconCategory,
  IconHome,
  IconLoader2,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useCategories } from "../hooks/useCategoriesQuery";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesScreen() {
  const { data: categories = [], isLoading, isError, refetch } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const term = searchTerm.toLowerCase().trim();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(term) ||
        category.slug.toLowerCase().includes(term)
    );
  }, [categories, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Banner / Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link
              href="/"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <IconHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>

          {/* Banner Title & Icon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0">
                <IconCategory className="w-8 h-8 text-white" stroke={2} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  All Categories
                </h1>
                <p className="text-white/85 mt-1 text-sm sm:text-base">
                  Browse our wide range of product categories
                </p>
              </div>
            </div>

            {/* Total Categories Badge */}
            {!isLoading && categories.length > 0 && (
              <div className="self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold ring-1 ring-white/30">
                  <span>{categories.length} Categories Available</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {/* Search Bar */}
        {!isLoading && categories.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 shadow-2xs transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <IconX className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchTerm && (
              <p className="text-sm text-gray-500 self-start sm:self-auto">
                Found{" "}
                <span className="font-semibold text-gray-800">
                  {filteredCategories.length}
                </span>{" "}
                {filteredCategories.length === 1 ? "category" : "categories"}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <IconLoader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Loading categories...</p>
            </div>
          </div>
        ) : isError ? (
          /* Error State */
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 text-2xl">
              😕
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Failed to load categories
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Something went wrong while fetching categories. Please try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-primary-600/20"
            >
              Try Again
            </button>
          </div>
        ) : categories.length === 0 ? (
          /* Empty Categories State */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <IconCategory className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Categories Found
            </h3>
            <p className="text-gray-500 text-sm">
              Categories will appear here once available.
            </p>
          </div>
        ) : filteredCategories.length === 0 ? (
          /* No Search Results */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <IconSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              No matching categories
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              We couldn&apos;t find any categories matching &ldquo;{searchTerm}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-primary-600 font-semibold text-sm hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
