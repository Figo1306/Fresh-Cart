import React from "react";

export default function CategoryDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-3 bg-white/20 rounded" />
            <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-3 bg-white/20 rounded" />
            <div className="h-4 w-28 bg-white/30 rounded animate-pulse" />
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
        <div className="flex justify-between items-center mb-8">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-48 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        <div className="h-6 w-60 bg-gray-200 rounded mb-6 animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between animate-pulse"
            >
              <div className="w-14 h-14 rounded-xl bg-gray-100 mb-4" />
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-1/2 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
