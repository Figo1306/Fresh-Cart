import React from "react";

export default function BrandsLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-3 bg-white/20 rounded" />
            <div className="h-4 w-16 bg-white/30 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30 shrink-0 animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-44 bg-white/30 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs flex flex-col justify-between animate-pulse"
            >
              <div className="aspect-square w-full rounded-xl bg-gray-200 mb-3" />
              <div className="space-y-1.5">
                <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
