import React from "react";

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-3 bg-white/20 rounded" />
            <div className="h-4 w-20 bg-white/30 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30 shrink-0 animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-white/30 rounded-lg animate-pulse" />
              <div className="h-4 w-72 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {/* Search Bar Skeleton */}
        <div className="mb-8 flex justify-between items-center">
          <div className="h-10 w-80 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs flex flex-col justify-between animate-pulse"
            >
              <div className="aspect-square w-full rounded-xl bg-gray-200 mb-4" />
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto" />
                <div className="h-3 w-1/2 bg-gray-100 rounded mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
