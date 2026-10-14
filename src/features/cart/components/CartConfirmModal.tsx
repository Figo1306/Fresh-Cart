"use client";

import React, { useEffect } from "react";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";

interface CartConfirmModalProps {
  isOpen: boolean;
  type: "remove" | "clear";
  itemTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CartConfirmModal({
  isOpen,
  type,
  itemTitle,
  onConfirm,
  onCancel,
  isLoading = false,
}: CartConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onCancel();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={isLoading ? undefined : onCancel}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all scale-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Icon Circle */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center border border-red-100 shadow-inner">
          {type === "clear" ? (
            <IconShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" stroke={1.5} />
          ) : (
            <IconTrash className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" stroke={1.5} />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {type === "clear" ? "Clear Your Cart?" : "Remove Item?"}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {type === "clear" ? (
            "All items will be removed from your cart. This action cannot be undone."
          ) : (
            <>
              Remove{" "}
              <span className="font-semibold text-gray-800">
                &ldquo;{itemTitle ? (itemTitle.length > 40 ? itemTitle.slice(0, 40) + "..." : itemTitle) : "this item"}&rdquo;
              </span>{" "}
              from your cart?
            </>
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="flex-1 py-3 px-5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {type === "clear" ? "Keep Shopping" : "Cancel"}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="flex-1 py-3 px-5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : type === "clear" ? (
              "Yes, Clear All"
            ) : (
              "Remove"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
