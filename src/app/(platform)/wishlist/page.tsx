import React, { Suspense } from "react";
import { Metadata } from "next";
import WishlistScreen from "@/features/wishlist/screens/WishlistScreen";
import { IconLoader2 } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Wishlist | FreshCart",
  description: "View and manage your favorite saved products at FreshCart",
};

export default function WishlistPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center py-24">
          <div className="text-center">
            <IconLoader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading wishlist...</p>
          </div>
        </div>
      }
    >
      <WishlistScreen />
    </Suspense>
  );
}
