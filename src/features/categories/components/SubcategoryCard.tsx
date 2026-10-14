"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconFolderOpen } from "@tabler/icons-react";
import { Subcategory } from "../types/categorise.types";

interface SubcategoryCardProps {
  subcategory: Subcategory;
}

export default function SubcategoryCard({
  subcategory,
}: SubcategoryCardProps) {
  return (
    <Link
      href={`/products?subcategory=${subcategory._id}`}
      prefetch={true}
      className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-xs hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
          <IconFolderOpen className="w-7 h-7 text-primary-600" stroke={1.8} />
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-primary-600 transition-colors mb-2 line-clamp-1">
          {subcategory.name}
        </h3>
      </div>

      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-4">
        <span>Browse Products</span>
        <IconArrowRight className="w-3.5 h-3.5" stroke={2.5} />
      </div>
    </Link>
  );
}
