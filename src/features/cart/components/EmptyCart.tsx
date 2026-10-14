"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconPackage } from "@tabler/icons-react";

export default function EmptyCart() {
  const popularCategories = ["Electronics", "Fashion", "Home", "Beauty"];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        {/* Empty Box Icon with glow shadow */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto border border-gray-100 shadow-inner">
            <IconPackage
              size={60}
              className="text-gray-300"
              stroke={1.3}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md -z-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8 leading-relaxed text-sm sm:text-base">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
        >
          <span>Start Shopping</span>
          <IconArrowRight size={18} stroke={2} />
        </Link>

        {/* Popular Categories chips */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCategories.map((category) => (
              <Link
                key={category}
                href="/categories"
                className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
