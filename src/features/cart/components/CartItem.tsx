"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconCheck, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { CartItemType, GuestCartItem } from "../types/cart.types";

interface CartItemProps {
  item: CartItemType | GuestCartItem;
  onUpdateQuantity: (productId: string, newCount: number) => void;
  onRemove: (productId: string, title: string) => void;
  isUpdating?: boolean;
  isRemoving?: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
  isRemoving = false,
}: CartItemProps) {
  const { count, price, product } = item;
  const productId = product._id || (item as GuestCartItem).productId;
  const productDetailPageId = product.id || product._id || productId;
  const totalItemPrice = price * count;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4 sm:p-5 relative overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Updating Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-2xs z-20 flex items-center justify-center">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
            <span className="size-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-700">Updating...</span>
          </div>
        </div>
      )}

      <div className="flex gap-4 sm:gap-6">
        {/* Product Image & Link */}
        <Link
          href={`/products/${productDetailPageId}`}
          className="relative shrink-0 group block"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-2.5 border border-gray-100 overflow-hidden flex items-center justify-center">
            {product.imageCover ? (
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <IconCheck size={10} stroke={3} />
            <span>In Stock</span>
          </div>
        </Link>

        {/* Product Details & Controls */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Title */}
            <Link
              href={`/products/${productDetailPageId}`}
              className="group/title block"
            >
              <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-snug text-base sm:text-lg line-clamp-2">
                {product.title}
              </h3>
            </Link>

            {/* Badges / SKU */}
            <div className="flex flex-wrap items-center gap-2 mt-1.5 sm:mt-2">
              {product.category?.name && (
                <span className="inline-block px-2.5 py-0.5 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {product.category.name}
                </span>
              )}
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-500 font-mono">
                SKU: {productId.slice(-6).toUpperCase()}
              </span>
            </div>

            {/* Price Per Unit */}
            <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
              <span className="text-primary-600 font-bold text-lg">
                {price.toLocaleString()} EGP
              </span>
              <span className="text-xs text-gray-400">per unit</span>
            </div>
          </div>

          {/* Stepper + Total + Remove Button */}
          <div className="mt-4 pt-3 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
            {/* Stepper */}
            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
              <button
                type="button"
                onClick={() => onUpdateQuantity(productId, count - 1)}
                disabled={count <= 1 || isUpdating || isRemoving}
                className="h-8 w-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Decrease quantity"
              >
                <IconMinus size={14} stroke={2.5} />
              </button>

              <span className="w-10 sm:w-12 text-center font-bold text-gray-900 text-sm sm:text-base">
                {count}
              </span>

              <button
                type="button"
                onClick={() => onUpdateQuantity(productId, count + 1)}
                disabled={isUpdating || isRemoving}
                className="h-8 w-8 rounded-lg bg-primary-600 shadow-xs flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Increase quantity"
              >
                <IconPlus size={14} stroke={2.5} />
              </button>
            </div>

            {/* Right: Line Total + Trash */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-0.5">
                  Total
                </p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {totalItemPrice.toLocaleString()}{" "}
                  <span className="text-xs sm:text-sm font-medium text-gray-400">
                    EGP
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(productId, product.title)}
                disabled={isUpdating || isRemoving}
                className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 shrink-0"
                title="Remove item"
                aria-label="Remove item from cart"
              >
                <IconTrash size={18} stroke={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
