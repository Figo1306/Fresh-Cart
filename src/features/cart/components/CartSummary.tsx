"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCheck,
  IconLock,
  IconShieldCheck,
  IconShoppingBag,
  IconTag,
  IconTruck,
  IconUser,
} from "@tabler/icons-react";
import { toast } from "sonner";

interface CartSummaryProps {
  subtotal: number;
  numOfItems: number;
  isGuest?: boolean;
}

export default function CartSummary({
  subtotal,
  numOfItems,
  isGuest = false,
}: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const freeShippingThreshold = 500;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + shippingCost;
  const freeShippingProgress = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100
  );
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    setIsApplyingPromo(true);
    setTimeout(() => {
      setIsApplyingPromo(false);
      toast.info(`Promo code "${promoCode}" is not active or expired.`);
    }, 800);
  };

  if (isGuest) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-xs">
        {/* Guest Header */}
        <div className="bg-gray-900 px-6 py-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <IconShoppingBag size={20} stroke={2} />
            <span>Order Summary</span>
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {numOfItems} {numOfItems === 1 ? "item" : "items"} in your guest cart
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Guest Prices */}
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal ({numOfItems} items)</span>
              <span className="font-semibold text-gray-900">
                {subtotal.toLocaleString()} EGP
              </span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Shipping</span>
              <span className="text-primary-600 font-medium">
                Calculated at checkout
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-900 font-bold text-base">
                  Estimated Total
                </span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary-600">
                    {subtotal.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-gray-500 ml-1">
                    EGP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Checkout CTAs */}
          <div className="space-y-3 pt-2">
            <Link
              href="/login?redirect=/cart"
              className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            >
              <IconUser size={18} stroke={2} />
              <span>Login to Checkout</span>
            </Link>

            <p className="text-xs text-gray-500 text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup?redirect=/cart"
                className="text-primary-600 hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Member Benefits */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <IconCheck size={14} className="text-primary-600 shrink-0" stroke={3} />
              <span>Your cart items will be saved</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCheck size={14} className="text-primary-600 shrink-0" stroke={3} />
              <span>Track your orders easily</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCheck size={14} className="text-primary-600 shrink-0" stroke={3} />
              <span>Access exclusive member deals</span>
            </div>
          </div>

          {/* Continue Shopping Link */}
          <Link
            href="/"
            className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-1 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-xs">
      {/* Header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <IconShoppingBag size={20} stroke={2} />
          <span>Order Summary</span>
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          {numOfItems} {numOfItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Free Shipping Alert & Progress */}
        {shippingCost > 0 ? (
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100/60">
            <div className="flex items-center gap-2 mb-2">
              <IconTruck size={18} className="text-orange-500 shrink-0" stroke={2} />
              <span className="text-sm font-medium text-gray-700">
                Add{" "}
                <span className="font-bold text-gray-900">
                  {remainingForFreeShipping.toLocaleString()} EGP
                </span>{" "}
                for free shipping
              </span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3 border border-green-100/60">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <IconTruck size={20} className="text-green-600" stroke={2} />
            </div>
            <div>
              <p className="font-semibold text-green-700 text-sm">Free Shipping!</p>
              <p className="text-xs text-green-600">You qualify for free delivery</p>
            </div>
          </div>
        )}

        {/* Pricing Rows */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              {subtotal.toLocaleString()} EGP
            </span>
          </div>

          <div className="flex justify-between text-gray-600 text-sm">
            <span>Shipping</span>
            {shippingCost === 0 ? (
              <span className="font-semibold text-green-600">FREE</span>
            ) : (
              <span className="font-medium text-gray-900">
                {shippingCost.toLocaleString()} EGP
              </span>
            )}
          </div>

          <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-900 font-bold text-base">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  {grandTotal.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-gray-500 ml-1">
                  EGP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code section */}
        <div className="space-y-2">
          {!showPromoInput ? (
            <button
              type="button"
              onClick={() => setShowPromoInput(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all text-sm font-medium"
            >
              <IconTag size={16} stroke={2} />
              <span>Apply Promo Code</span>
            </button>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                disabled={isApplyingPromo}
                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {isApplyingPromo ? "Applying..." : "Apply"}
              </button>
            </form>
          )}
        </div>

        {/* Secure Checkout CTA */}
        <Link
          href="/checkout"
          className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
        >
          <IconLock size={18} stroke={2} />
          <span>Secure Checkout</span>
        </Link>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <IconShieldCheck size={16} className="text-green-500" stroke={2} />
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <IconTruck size={16} className="text-blue-500" stroke={2} />
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <Link
          href="/"
          className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-1 transition-colors"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
