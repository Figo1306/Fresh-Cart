import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllCategorise } from "@/features/categories/services/getAllCategorise";
import { Category } from "@/features/categories/types/categorise.types";

export default async function HomeCategorise() {
  let categories: Category[] = [];

  try {
    const categoriseRsponse = await getAllCategorise();
    categories = categoriseRsponse?.data || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section id="categories" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            prefetch={true}
            className="group inline-flex items-center gap-2 self-start sm:self-auto text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base transition-colors duration-200"
          >
            <span>View All Categories</span>
            <IconArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              stroke={2.5}
            />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              prefetch={true}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 text-center shadow-xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-between"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-primary-50/80 p-1 mb-3.5 flex items-center justify-center ring-2 ring-primary-100/60 group-hover:ring-primary-300 group-hover:bg-primary-100/80 transition-all duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="w-full">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <div className="mt-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-400 group-hover:text-primary-600 transition-colors duration-200">
                  <span>Explore</span>
                  <IconArrowRight
                    className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
                    stroke={2}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
