"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import ProductCard from "./ProductCard";
import { Product } from "../types/Products.types";

import "swiper/css";
import "swiper/css/navigation";

interface SimilarProductsProps {
  products: Product[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section id="similar-products" className="py-12 bg-gray-50/50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous similar products"
              className="h-10 w-10 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all cursor-pointer"
            >
              <IconChevronLeft size={20} stroke={2} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next similar products"
              className="h-10 w-10 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all cursor-pointer"
            >
              <IconChevronRight size={20} stroke={2} />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="pb-4"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id || product.id} className="h-auto">
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
