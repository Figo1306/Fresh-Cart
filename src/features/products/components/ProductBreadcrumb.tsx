import React from "react";
import Link from "next/link";
import { IconHome, IconChevronRight } from "@tabler/icons-react";
import { Category, Subcategory } from "../types/ProductsDetails.types";

interface ProductBreadcrumbProps {
  title: string;
  category?: Category;
  subcategory?: Subcategory[];
}

export default function ProductBreadcrumb({
  title,
  category,
  subcategory,
}: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 bg-gray-50/60 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-gray-500">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="hover:text-primary-600 transition-colors flex items-center gap-1 font-medium"
            >
              <IconHome size={16} stroke={1.8} />
              <span>Home</span>
            </Link>
            <IconChevronRight size={14} className="text-gray-400" />
          </li>

          {category && (
            <li className="flex items-center gap-1.5">
              <Link
                href={`/categories/${category._id}`}
                className="hover:text-primary-600 transition-colors font-medium"
              >
                {category.name}
              </Link>
              <IconChevronRight size={14} className="text-gray-400" />
            </li>
          )}

          {subcategory && subcategory.length > 0 && (
            <li className="flex items-center gap-1.5">
              <Link
                href={`/categories/${category?._id}`}
                className="hover:text-primary-600 transition-colors font-medium"
              >
                {subcategory[0].name}
              </Link>
              <IconChevronRight size={14} className="text-gray-400" />
            </li>
          )}

          <li className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
            {title}
          </li>
        </ol>
      </div>
    </nav>
  );
}
