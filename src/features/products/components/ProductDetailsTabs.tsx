"use client";

import React, { useState } from "react";
import {
  IconBox,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconTruck,
  IconCheck,
  IconRotate2,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";
import { ProductDetail } from "../types/ProductsDetails.types";

interface ProductDetailsTabsProps {
  product: ProductDetail;
}

type TabType = "details" | "reviews" | "shipping";

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("details");

  const tabs = [
    { id: "details" as TabType, label: "Product Details", icon: IconBox },
    {
      id: "reviews" as TabType,
      label: `Reviews (${product.ratingsQuantity || 0})`,
      icon: IconStar,
    },
    {
      id: "shipping" as TabType,
      label: "Shipping & Returns",
      icon: IconTruck,
    },
  ];

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

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
          {/* Tabs Navigation Header */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/40"
                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} stroke={isActive ? 2.5 : 2} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8">
            {/* Tab 1: Details */}
            {activeTab === "details" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    About this Product
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Information Card */}
                  <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 text-base">
                      Product Information
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="text-gray-900 font-semibold">
                          {product.category?.name || "N/A"}
                        </span>
                      </li>
                      {product.subcategory && product.subcategory.length > 0 && (
                        <li className="flex justify-between text-sm">
                          <span className="text-gray-500">Subcategory</span>
                          <span className="text-gray-900 font-semibold">
                            {product.subcategory.map((sub) => sub.name).join(", ")}
                          </span>
                        </li>
                      )}
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Brand</span>
                        <span className="text-gray-900 font-semibold">
                          {product.brand?.name || "FreshCart"}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Items Sold</span>
                        <span className="text-gray-900 font-semibold">
                          {product.sold}+ sold
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Stock Availability</span>
                        <span className="text-emerald-700 font-semibold">
                          {product.quantity} in stock
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Key Features Card */}
                  <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 text-base">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-gray-700">
                        <IconCheck
                          size={18}
                          className="text-primary-600 mr-2.5 shrink-0"
                          stroke={2.5}
                        />
                        <span>Premium Quality Guaranteed</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <IconCheck
                          size={18}
                          className="text-primary-600 mr-2.5 shrink-0"
                          stroke={2.5}
                        />
                        <span>100% Authentic Brand Merchandise</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <IconCheck
                          size={18}
                          className="text-primary-600 mr-2.5 shrink-0"
                          stroke={2.5}
                        />
                        <span>Carefully Inspected & Sanitized Packaging</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <IconCheck
                          size={18}
                          className="text-primary-600 mr-2.5 shrink-0"
                          stroke={2.5}
                        />
                        <span>Compliant with International Safety Standards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Rating Overview */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50/80 rounded-xl p-6 border border-gray-100">
                  <div className="text-center md:border-r md:border-gray-200 md:pr-8 min-w-44">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      {product.ratingsAverage}
                    </div>
                    <div className="flex justify-center text-amber-400 mb-2">
                      {renderStars(product.ratingsAverage)}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      Based on {product.ratingsQuantity} reviews
                    </p>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const roundedRating = Math.round(product.ratingsAverage);
                      const percentage =
                        stars === roundedRating
                          ? 65
                          : stars === roundedRating - 1 || stars === roundedRating + 1
                          ? 25
                          : 5;

                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-gray-600 w-12">
                            {stars} stars
                          </span>
                          <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right font-medium">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Items List */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg">
                    Customer Reviews ({product.reviews?.length || 0})
                  </h4>

                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.reviews.map((rev) => (
                        <div
                          key={rev._id}
                          className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs hover:border-emerald-200 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                                {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : <IconUser size={16} />}
                              </div>
                              <span className="font-semibold text-sm text-gray-800">
                                {rev.user?.name || "Verified Customer"}
                              </span>
                            </div>
                            <div className="flex text-amber-400">
                              {renderStars(rev.rating)}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {rev.review}
                          </p>
                          <span className="block text-right text-xs text-gray-400 mt-2">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <p className="text-gray-500 text-sm">
                        No written reviews submitted yet for this product.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Shipping & Returns */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Info Card */}
                  <div className="bg-linear-to-br from-primary-50 to-emerald-100/60 rounded-2xl p-6 border border-emerald-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-md">
                        <IconTruck size={24} stroke={2} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">
                        Shipping Information
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-primary-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Free standard shipping on orders over 500 EGP</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-primary-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Standard delivery: 2-4 business days nationwide</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-primary-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Same-day or next-day expedited delivery available</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-primary-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Live SMS & WhatsApp package tracking updates</span>
                      </li>
                    </ul>
                  </div>

                  {/* Returns Card */}
                  <div className="bg-linear-to-br from-emerald-50 to-teal-100/60 rounded-2xl p-6 border border-teal-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-md">
                        <IconRotate2 size={24} stroke={2} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">
                        Returns & Refunds
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-teal-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>30-day hassle-free return and exchange policy</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-teal-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Full immediate refund credited to original payment method</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-teal-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Free return shipping pickups for defective or incorrect items</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-gray-700">
                        <IconCheck size={18} className="text-teal-600 mt-0.5 shrink-0" stroke={2.5} />
                        <span>Simple 1-click return request from your account profile</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Buyer Protection Banner */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex items-center gap-4">
                  <div className="h-14 w-14 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center shrink-0">
                    <IconShieldCheck size={28} stroke={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-base">
                      Buyer Protection Guarantee
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Get a full refund if your order does not arrive or is not as described. FreshCart ensures every transaction is safe, secured, and authentic.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
