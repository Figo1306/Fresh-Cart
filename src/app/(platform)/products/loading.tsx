import React from "react";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-3 bg-white/20 rounded" />
            <div className="h-4 w-24 bg-white/30 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30 shrink-0 animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-white/30 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-4 w-36 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs animate-pulse space-y-3"
            >
              <div className="aspect-square w-full rounded-xl bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
