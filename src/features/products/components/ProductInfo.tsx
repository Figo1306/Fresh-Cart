"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconBolt,
  IconHeart,
  IconHeartFilled,
  IconShare,
  IconTruck,
  IconArrowBackUp,
  IconShieldCheck,
  IconCheck,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { ProductDetail } from "../types/ProductsDetails.types";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { useUnifiedWishlist } from "@/features/wishlist/hooks/useWishlist";

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart, isPending } = useAddToCart();
  const { isInWishlist, toggleWishlist } = useUnifiedWishlist();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const productId = product._id || product.id;
  const isWishlisted = isInWishlist(productId);
  const [localWishlisted, setLocalWishlisted] = useState<boolean | null>(null);

  const effectiveWishlisted =
    localWishlisted !== null ? localWishlisted : isWishlisted;

  useEffect(() => {
    setLocalWishlisted(null);
  }, [isWishlisted]);

  const availableQuantity = product.quantity || 1;
  const unitPrice = product.priceAfterDiscount || product.price;
  const totalPrice = unitPrice * qty;

  const hasDiscount = Boolean(
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
  );
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.priceAfterDiscount ?? 0)) / product.price) *
          100
      )
    : 0;

  const isLowStock = availableQuantity > 0 && availableQuantity <= 10;
  const isOutOfStock = availableQuantity <= 0;

  // Star ratings renderer
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starNumber = i + 1;
      if (rating >= starNumber) {
        return (
          <IconStarFilled
            key={i}
            size={16}
            className="text-yellow-400 fill-yellow-400"
          />
        );
      } else if (rating >= starNumber - 0.5) {
        return (
          <IconStarHalfFilled
            key={i}
            size={16}
            className="text-yellow-400 fill-yellow-400"
          />
        );
      } else {
        return <IconStar key={i} size={16} className="text-gray-300" />;
      }
    });
  };

  const handleDecreaseQty = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQty = () => {
    setQty((prev) => Math.min(availableQuantity, prev + 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setQty(Math.min(Math.max(1, val), availableQuantity));
    }
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }
    try {
      await addToCart(product, qty);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch {}
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }
    try {
      await addToCart(product, qty);
      router.push("/cart");
    } catch {}
  };

  const handleToggleWishlist = async () => {
    const nextState = !effectiveWishlisted;
    setLocalWishlisted(nextState);

    try {
      await toggleWishlist(product as any);
    } catch {
      setLocalWishlisted(!nextState);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
      {/* Category & Brand Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {product.category && (
          <Link
            href={`/categories/${product.category._id}`}
            className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
          >
            {product.category.name}
          </Link>
        )}
        {product.brand && (
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
            {product.brand.name}
          </span>
        )}
      </div>

      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
        {product.title}
      </h1>

      {/* Ratings & Reviews */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex text-amber-400 items-center">
          {renderStars(product.ratingsAverage)}
        </div>
        <span className="text-sm font-semibold text-gray-700">
          {product.ratingsAverage}
        </span>
        <span className="text-sm text-gray-400">
          ({product.ratingsQuantity} reviews)
        </span>
        <span className="text-xs text-gray-300">|</span>
        <span className="text-xs text-gray-500 font-medium">
          {product.sold}+ sold
        </span>
      </div>

      {/* Pricing Row */}
      <div className="flex items-baseline flex-wrap gap-3 mb-6">
        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {unitPrice} EGP
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {product.price} EGP
            </span>
            <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-xs">
              Save {discountPercentage}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status Badge */}
      <div className="flex items-center gap-2 mb-6">
        {!isOutOfStock ? (
          <span
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full ${
              isLowStock
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLowStock ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
              }`}
            />
            {isLowStock
              ? `Only ${availableQuantity} left - Order soon!`
              : "In Stock"}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-700">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Out of Stock
          </span>
        )}
      </div>

      {/* Description Snippet */}
      <div className="border-t border-gray-100 pt-5 mb-6">
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-4">
          {product.description}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label
          htmlFor="quantity-input"
          className="block text-sm font-semibold text-gray-800 mb-2"
        >
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              id="decrease-qty"
              type="button"
              onClick={handleDecreaseQty}
              disabled={qty <= 1 || isOutOfStock}
              className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <IconMinus size={16} stroke={2.5} />
            </button>
            <input
              id="quantity-input"
              type="number"
              min={1}
              max={availableQuantity}
              value={qty}
              onChange={handleQuantityChange}
              disabled={isOutOfStock}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-base font-bold text-gray-800"
            />
            <button
              id="increase-qty"
              type="button"
              onClick={handleIncreaseQty}
              disabled={qty >= availableQuantity || isOutOfStock}
              className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Increase quantity"
            >
              <IconPlus size={16} stroke={2.5} />
            </button>
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {availableQuantity} available
          </span>
        </div>
      </div>

      {/* Total Price Card */}
      <div className="bg-gray-50/80 rounded-xl p-4 mb-6 border border-gray-100 flex justify-between items-center">
        <span className="text-gray-600 font-medium text-sm sm:text-base">
          Total Price:
        </span>
        <span className="text-2xl font-bold text-primary-600">
          {totalPrice.toFixed(2)} EGP
        </span>
      </div>

      {/* Primary Actions: Add to Cart & Buy Now */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          id="add-to-cart"
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 py-3.5 px-6 rounded-xl font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 cursor-pointer disabled:opacity-50 text-white ${
            isAdded ? "bg-emerald-600" : "bg-primary-600 hover:bg-primary-700"
          }`}
        >
          {isAdded ? (
            <>
              <IconCheck size={20} stroke={2.5} />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <IconShoppingCart size={20} stroke={2} />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          id="buy-now"
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
        >
          <IconBolt size={20} stroke={2} />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Wishlist & Share Secondary Actions */}
      <div className="flex gap-3 mb-6">
        <button
          id="wishlist-button"
          type="button"
          onClick={handleToggleWishlist}
          className={`flex-1 border-2 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            effectiveWishlisted
              ? "border-red-200 text-red-600 bg-red-50/70"
              : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30"
          }`}
        >
          {effectiveWishlisted ? (
            <IconHeartFilled size={20} className="text-red-500" />
          ) : (
            <IconHeart size={20} stroke={2} />
          )}
          <span>{effectiveWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-semibold"
          title="Share product link"
          aria-label="Share product"
        >
          <IconShare size={20} stroke={2} />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Feature Guarantees (3 boxes) */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
              <IconTruck size={20} stroke={2} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                Free Delivery
              </h4>
              <p className="text-xs text-gray-500">Orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
              <IconArrowBackUp size={20} stroke={2} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                30 Days Return
              </h4>
              <p className="text-xs text-gray-500">Money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
              <IconShieldCheck size={20} stroke={2} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                Secure Payment
              </h4>
              <p className="text-xs text-gray-500">100% Protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
