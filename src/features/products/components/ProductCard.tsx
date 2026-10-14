"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconHeart,
  IconHeartFilled,
  IconEye,
  IconPlus,
  IconArrowsExchange,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconCheck,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Product } from "../types/Products.types";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { useUnifiedWishlist } from "@/features/wishlist/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isPending } = useAddToCart();
  const { isInWishlist, toggleWishlist } = useUnifiedWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const productId = product._id || product.id;
  const isWishlisted = isInWishlist(productId);
  const [localWishlisted, setLocalWishlisted] = useState<boolean | null>(null);

  const effectiveWishlisted =
    localWishlisted !== null ? localWishlisted : isWishlisted;

  useEffect(() => {
    setLocalWishlisted(null);
  }, [isWishlisted]);

  const hasDiscount = Boolean(
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
  );

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.priceAfterDiscount ?? 0)) / product.price) *
          100
      )
    : 0;

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextState = !effectiveWishlisted;
    setLocalWishlisted(nextState);

    try {
      await toggleWishlist(product);
    } catch {
      setLocalWishlisted(!nextState);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product, 1);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    } catch {}
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`"${product.title}" added to comparison`);
  };

  // Helper to render 5 stars accurately based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      if (rating >= starValue) {
        return (
          <IconStarFilled
            key={index}
            size={14}
            className="text-yellow-400 fill-yellow-400"
          />
        );
      } else if (rating >= starValue - 0.5) {
        return (
          <IconStarHalfFilled
            key={index}
            size={14}
            className="text-yellow-400 fill-yellow-400"
          />
        );
      } else {
        return (
          <IconStar
            key={index}
            size={14}
            className="text-gray-300"
          />
        );
      }
    });
  };

  const productUrl = `/products/${product._id || product.id}`;

  return (
    <div
      id="product-card"
      className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image & Floating Badges */}
      <div className="relative w-full h-44 sm:h-60 bg-white overflow-hidden flex items-center justify-center p-2 sm:p-3">
        <Link href={productUrl} className="w-full h-full flex items-center justify-center">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={240}
            height={240}
            className="w-full h-44 sm:h-60 object-contain bg-white group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none">
            <span className="bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow-xs">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col space-y-1.5 sm:space-y-2 z-10">
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`bg-white size-7 sm:size-8 rounded-full flex items-center justify-center transition shadow-xs hover:shadow-md cursor-pointer ${
              effectiveWishlisted
                ? "text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
            title={effectiveWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            {effectiveWishlisted ? (
              <IconHeartFilled size={15} className="text-red-500" />
            ) : (
              <IconHeart size={15} />
            )}
          </button>

          <button
            type="button"
            onClick={handleCompare}
            className="bg-white size-7 sm:size-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-xs hover:shadow-md transition cursor-pointer"
            title="Compare"
            aria-label="Compare"
          >
            <IconArrowsExchange size={15} />
          </button>

          <Link
            href={productUrl}
            className="bg-white size-7 sm:size-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-xs hover:shadow-md transition cursor-pointer"
            title="View details"
            aria-label="View details"
          >
            <IconEye size={15} />
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 font-medium">
            {product.category?.name}
          </div>

          {/* Product Title */}
          <h3 className="font-medium mb-1 cursor-pointer" title={product.title}>
            <Link
              href={productUrl}
              className="line-clamp-2 text-gray-800 hover:text-primary-600 transition-colors text-xs sm:text-sm font-semibold"
            >
              {product.title}
            </Link>
          </h3>

          {/* Star Ratings */}
          <div className="flex items-center mb-1.5 sm:mb-2">
            <div className="flex text-amber-400 mr-1 sm:mr-2 items-center">
              <div className="text-yellow-400 flex items-center text-xs">
                {renderStars(product.ratingsAverage)}
              </div>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
              {product.ratingsAverage} ({product.ratingsQuantity})
            </span>
          </div>
        </div>

        {/* Pricing and Add-to-cart button */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-gray-100 mt-1.5 sm:mt-2 gap-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline min-w-0">
            {hasDiscount ? (
              <>
                <span className="text-xs sm:text-base font-bold text-primary-600 truncate">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 line-through sm:ml-1.5 truncate">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-xs sm:text-base font-bold text-gray-800 truncate">
                {product.price} EGP
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`size-8 sm:size-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
              isAdded
                ? "bg-emerald-600 text-white scale-105"
                : "bg-primary-600 text-white hover:bg-primary-700 active:scale-95"
            }`}
            title="Add to cart"
            aria-label="Add to cart"
          >
            {isAdded ? (
              <IconCheck className="w-4 h-4 sm:w-5 sm:h-5" stroke={2.5} />
            ) : (
              <IconPlus className="w-4 h-4 sm:w-5 sm:h-5" stroke={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
