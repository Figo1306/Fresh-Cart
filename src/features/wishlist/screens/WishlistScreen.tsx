"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconHeart,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { useUnifiedWishlist } from "../hooks/useWishlist";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import WishlistItem from "../components/WishlistItem";
import EmptyWishlist from "../components/EmptyWishlist";
import WishlistConfirmModal from "../components/WishlistConfirmModal";

export default function WishlistScreen() {

  const {
    products,
    totalItems,
    isLoading,
    isError,
    refetch,
    removeItem,
    clearAll,
  } = useUnifiedWishlist();

  const { addToCart } = useAddToCart();
  const [isAddingAll, setIsAddingAll] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "remove" | "clear";
    productId?: string;
    itemTitle?: string;
  }>({
    isOpen: false,
    type: "remove",
  });

  const handleOpenRemoveModal = (productId: string, title: string) => {
    setModalState({
      isOpen: true,
      type: "remove",
      productId,
      itemTitle: title,
    });
  };

  const handleOpenClearModal = () => {
    setModalState({
      isOpen: true,
      type: "clear",
    });
  };

  const handleConfirmModal = async () => {
    if (modalState.type === "remove" && modalState.productId) {
      setRemovingId(modalState.productId);
      try {
        await removeItem(modalState.productId);
      } finally {
        setRemovingId(null);
      }
    } else if (modalState.type === "clear") {
      await clearAll();
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Bulk Add All to Cart
  const handleAddAllToCart = async () => {
    if (products.length === 0 || isAddingAll) return;
    setIsAddingAll(true);
    let addedCount = 0;

    for (const product of products) {
      if (product.quantity > 0) {
        try {
          await addToCart(product, 1);
          addedCount++;
        } catch (e) {
          console.warn("Failed to add product to cart:", e);
        }
      }
    }

    setIsAddingAll(false);
    if (addedCount > 0) {
      toast.success(
        `Added ${addedCount} ${addedCount === 1 ? "item" : "items"} to cart!`
      );
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded-lg w-40" />
            <div className="h-10 bg-gray-200 rounded-lg w-64" />
            <div className="space-y-4 pt-4">
              <div className="h-32 bg-white rounded-2xl border border-gray-100" />
              <div className="h-32 bg-white rounded-2xl border border-gray-100" />
              <div className="h-32 bg-white rounded-2xl border border-gray-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-linear-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-3xl">
            😕
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            We couldn&apos;t load your wishlist. Please try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!products.length) {
    return <EmptyWishlist />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header & Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-red-500 to-rose-600 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm shadow-red-500/30">
                  <IconHeart size={24} stroke={2} className="fill-white" />
                </span>
                <span>My Wishlist</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>{" "}
                saved in your wishlist
              </p>
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleAddAllToCart}
                disabled={isAddingAll}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs hover:shadow-md disabled:opacity-50"
              >
                {isAddingAll ? (
                  <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <IconShoppingCart size={18} stroke={2} />
                )}
                <span>Add All to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleOpenClearModal}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-600 hover:text-red-600 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                title="Clear all wishlist items"
              >
                <IconTrash size={16} stroke={2} />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items List */}
        <div className="space-y-4">
          {products.map((product) => {
            const pid = product._id || product.id;
            return (
              <WishlistItem
                key={pid}
                product={product}
                onRemove={handleOpenRemoveModal}
                isRemoving={removingId === pid}
              />
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <IconArrowLeft size={16} stroke={2.5} />
            <span>Continue Shopping</span>
          </Link>

          <button
            type="button"
            onClick={handleOpenClearModal}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors"
          >
            <IconTrash
              size={16}
              stroke={2}
              className="group-hover:scale-110 transition-transform"
            />
            <span>Clear all items</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <WishlistConfirmModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        itemTitle={modalState.itemTitle}
        onConfirm={handleConfirmModal}
        onCancel={handleCloseModal}
      />
    </div>
  );
}
