"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconCheck,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconTrash,
} from "@tabler/icons-react";
import { Product } from "@/features/products/types/Products.types";
import { useAddToCart } from "@/features/cart/hooks/useCart";

interface WishlistItemProps {
  product: Product;
  onRemove: (productId: string, title: string) => void;
  isRemoving?: boolean;
}

export default function WishlistItem({
  product,
  onRemove,
  isRemoving = false,
}: WishlistItemProps) {
  const { addToCart, isPending: isCartPending } = useAddToCart();
  const [isAdded, setIsAdded] = useState(false);

  const productId = product._id || product.id;
  const productDetailPageId = product.id || product._id || productId;

  const hasDiscount = Boolean(
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
  );

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.priceAfterDiscount ?? 0)) / product.price) *
          100
      )
    : 0;

  const currentPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  const isOutOfStock = product.quantity <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    try {
      await addToCart(product, 1);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch {}
  };

  const renderStars = (rating: number = 0) => {
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
        return <IconStar key={index} size={14} className="text-gray-300" />;
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4 sm:p-5 relative overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Loading Overlay when Removing */}
      {isRemoving && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs z-20 flex items-center justify-center">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
            <span className="size-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-700">Removing...</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Product Image */}
        <Link
          href={`/products/${productDetailPageId}`}
          className="relative shrink-0 group block self-center sm:self-auto"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-2.5 border border-gray-100 overflow-hidden flex items-center justify-center">
            {product.imageCover ? (
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              -{discountPercentage}%
            </span>
          )}
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0 w-full">
          {/* Category & Stock Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {product.category?.name && (
              <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                {product.category.name}
              </span>
            )}
            {product.brand?.name && (
              <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {product.brand.name}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isOutOfStock
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-100"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  isOutOfStock ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/products/${productDetailPageId}`}
            className="group/title block mb-2"
          >
            <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-snug text-base sm:text-lg line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-yellow-400">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-xs font-medium text-gray-500">
              {product.ratingsAverage ?? 0} ({product.ratingsQuantity ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-primary-600 font-bold text-lg sm:text-xl">
              {currentPrice.toLocaleString()} EGP
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {product.price.toLocaleString()} EGP
              </span>
            )}
          </div>
        </div>

        {/* Right Actions: Add to Cart & Remove */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isCartPending || isAdded}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs ${
              isAdded
                ? "bg-emerald-600 text-white"
                : isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-md active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
                <IconCheck size={18} stroke={2.5} />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <IconShoppingCart size={18} stroke={2} />
                <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onRemove(productId, product.title)}
            disabled={isRemoving}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 disabled:opacity-40"
            title="Remove from wishlist"
          >
            <IconTrash size={15} stroke={2} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
