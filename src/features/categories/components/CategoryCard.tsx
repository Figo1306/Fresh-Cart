"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import { Category } from "../types/categorise.types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category._id}`}
      prefetch={true}
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Category Image Container */}
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-4 relative">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Category Name & Action Link */}
      <div>
        <h3 className="font-bold text-gray-900 text-center text-sm sm:text-base line-clamp-1 group-hover:text-primary-600 transition-colors">
          {category.name}
        </h3>
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>View Subcategories</span>
          <IconArrowRight className="w-3.5 h-3.5" stroke={2.5} />
        </div>
      </div>
    </Link>
  );
}
