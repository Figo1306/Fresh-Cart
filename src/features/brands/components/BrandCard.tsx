"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import { Brand } from "../types/brands.types";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/products?brand=${brand._id}`}
      prefetch={true}
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Brand Logo Container */}
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center relative">
        {brand.image ? (
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-400 text-xs font-medium">No Logo</div>
        )}
      </div>

      {/* Brand Title & View Products Link */}
      <div>
        <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
          {brand.name}
        </h3>
        <div className="flex items-center justify-center gap-1 mt-1.5 text-xs font-semibold text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>View Products</span>
          <IconArrowRight className="w-3 h-3 text-violet-600" stroke={2.5} />
        </div>
      </div>
    </Link>
  );
}
