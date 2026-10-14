"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface ProductGalleryProps {
  images: string[];
  title: string;
  discountPercentage?: number;
}

export default function ProductGallery({
  images,
  title,
  discountPercentage = 0,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : ["/placeholder.png"];
  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs sticky top-24">
      {/* Main Large Image Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-white flex items-center justify-center group border border-gray-100">
        <Image
          src={currentImage}
          alt={title}
          width={450}
          height={450}
          priority
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
              Save {discountPercentage}%
            </span>
          </div>
        )}

        {/* Navigation Arrows for Main Image */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-primary-600 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
            >
              <IconChevronLeft size={20} stroke={2} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-primary-600 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
            >
              <IconChevronRight size={20} stroke={2} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {displayImages.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative shrink-0 w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border-2 p-1.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-primary-600 ring-2 ring-primary-100 scale-105"
                    : "border-gray-200 hover:border-primary-300 opacity-70 hover:opacity-100"
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} - Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
