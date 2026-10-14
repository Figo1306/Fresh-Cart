"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  IconArrowLeft,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { AppState } from "@/app/store/store";
import {
  useCart,
  useClearCart,
  useClearGuestCart,
  useGuestCart,
  useInitializeGuestCart,
  useRemoveFromCart,
  useRemoveFromGuestCart,
  useUpdateCartQuantity,
  useUpdateGuestCartQuantity,
} from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";
import CartConfirmModal from "../components/CartConfirmModal";

export default function CartScreen() {
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );

  // Initialize guest cart from localStorage
  useInitializeGuestCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <div className="size-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 text-sm">Loading your cart...</p>
      </div>
    );
  }

  return isAuthenticated ? <UserCartScreen /> : <GuestCartScreen />;
}

// ==========================================
// Logged-in User Cart Screen
// ==========================================
function UserCartScreen() {
  const { data: cartResponse, isLoading, isError, refetch } = useCart();
  const updateQuantityMutation = useUpdateCartQuantity();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

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
      await removeFromCartMutation.mutateAsync(modalState.productId);
    } else if (modalState.type === "clear") {
      await clearCartMutation.mutateAsync();
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCloseModal = () => {
    if (
      !removeFromCartMutation.isPending &&
      !clearCartMutation.isPending
    ) {
      setModalState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded-lg w-48" />
            <div className="h-28 bg-white rounded-2xl border border-gray-100" />
            <div className="h-28 bg-white rounded-2xl border border-gray-100" />
            <div className="h-28 bg-white rounded-2xl border border-gray-100" />
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
            We couldn&apos;t load your cart. Please try again.
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

  const cartData = cartResponse?.data;
  const products = cartData?.products ?? [];
  const numOfItems = cartResponse?.numOfCartItems ?? 0;

  // Empty State
  if (!products.length) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header & Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm shadow-primary-600/30">
                  <IconShoppingCart size={24} stroke={2} />
                </span>
                <span>Shopping Cart</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {numOfItems} {numOfItems === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4">
              {products.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={(productId, newCount) => {
                    updateQuantityMutation.mutate({
                      productId,
                      count: newCount,
                    });
                  }}
                  onRemove={handleOpenRemoveModal}
                  isUpdating={
                    updateQuantityMutation.isPending &&
                    updateQuantityMutation.variables?.productId ===
                      item.product._id
                  }
                  isRemoving={
                    removeFromCartMutation.isPending &&
                    removeFromCartMutation.variables === item.product._id
                  }
                />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
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
                disabled={clearCartMutation.isPending}
                className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
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

          {/* Right: Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={cartData?.totalCartPrice ?? 0}
              numOfItems={numOfItems}
              isGuest={false}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <CartConfirmModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        itemTitle={modalState.itemTitle}
        onConfirm={handleConfirmModal}
        onCancel={handleCloseModal}
        isLoading={
          removeFromCartMutation.isPending || clearCartMutation.isPending
        }
      />
    </div>
  );
}

// ==========================================
// Guest Cart Screen
// ==========================================
function GuestCartScreen() {
  const { items, totalItems, totalPrice } = useGuestCart();
  const { updateQuantity } = useUpdateGuestCartQuantity();
  const { removeItem } = useRemoveFromGuestCart();
  const { clearCart } = useClearGuestCart();

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

  const handleConfirmModal = () => {
    if (modalState.type === "remove" && modalState.productId) {
      removeItem(modalState.productId);
    } else if (modalState.type === "clear") {
      clearCart();
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Empty State
  if (!items.length) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header & Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-primary-600 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm shadow-primary-600/30">
                  <IconShoppingCart size={24} stroke={2} />
                </span>
                <span>Shopping Cart</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={handleOpenRemoveModal}
                />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
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

          {/* Right: Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={totalPrice}
              numOfItems={totalItems}
              isGuest={true}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <CartConfirmModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        itemTitle={modalState.itemTitle}
        onConfirm={handleConfirmModal}
        onCancel={handleCloseModal}
      />
    </div>
  );
}
