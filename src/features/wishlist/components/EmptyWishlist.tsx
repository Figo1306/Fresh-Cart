"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IconArrowRight, IconHeart, IconLogin } from "@tabler/icons-react";
import { AppState } from "@/app/store/store";

export default function EmptyWishlist() {
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );

  const popularCategories = [
    { name: "Electronics", id: "6439d2d167d9aa4ca970649f" },
    { name: "Women's Fashion", id: "6439d58a0049ad0b52b9003f" },
    { name: "Men's Fashion", id: "6439d5b90049ad0b52b90048" },
    { name: "Beauty & Health", id: "6439d30b67d9aa4ca97064b1" },
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        {/* Soft Heart Icon with Subtle Glow */}
        <div className="relative mb-8">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-linear-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center mx-auto border border-red-100 shadow-inner">
            <IconHeart
              size={56}
              className="text-red-400 fill-red-100/50"
              stroke={1.5}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-red-100/50 rounded-full blur-md -z-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Your wishlist is empty
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8 leading-relaxed text-sm sm:text-base">
          Browse products and save your favorites here.
          {!isAuthenticated && " Sign in to sync your wishlist across devices."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3 px-7 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            <span>Browse Products</span>
            <IconArrowRight size={18} stroke={2} />
          </Link>

          {!isAuthenticated && (
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <IconLogin size={18} stroke={2} />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Popular Categories chips */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCategories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.id}`}
                className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
