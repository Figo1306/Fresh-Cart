"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppState } from "@/app/store/store";
import {
  addToCart as addToCartServer,
  clearCart as clearCartServer,
  getCart as getCartServer,
  removeFromCart as removeFromCartServer,
  updateCartQuantity as updateCartQuantityServer,
} from "../server/cart.actions";
import { guestCartActions } from "../slices/guestCart.slice";
import { CartResponse } from "../types/cart.types";
import { Product } from "@/features/products/types/Products.types";

export function useCart() {
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );

  return useQuery<CartResponse | null>({
    queryKey: ["cart"],
    queryFn: async () => {
      return await getCartServer();
    },
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      count,
    }: {
      productId: string;
      count: number;
    }) => {
      return await updateCartQuantityServer(productId, count);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update item quantity");
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      return await removeFromCartServer(productId);
    },
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to remove item");
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await clearCartServer();
    },
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to clear cart");
    },
  });
}

// Guest Cart Hooks
export function useInitializeGuestCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(guestCartActions.initializeCart());
  }, [dispatch]);
}

export function useGuestCart() {
  const items = useSelector(
    (state: AppState) => state.guestCartReducer?.items ?? []
  );

  const totalItems = items.reduce((acc, curr) => acc + curr.count, 0);
  const totalPrice = items.reduce(
    (acc, curr) => acc + curr.price * curr.count,
    0
  );

  return {
    items,
    totalItems,
    totalPrice,
  };
}

export function useAddToGuestCart() {
  const dispatch = useDispatch();

  return {
    addItem: (
      product:
        | Product
        | {
            _id: string;
            id?: string;
            title: string;
            price: number;
            priceAfterDiscount?: number;
            imageCover: string;
            category?: { name: string };
          },
      count: number = 1
    ) => {
      dispatch(guestCartActions.addItem({ product, count }));
    },
  };
}

export function useUpdateGuestCartQuantity() {
  const dispatch = useDispatch();

  return {
    updateQuantity: (productId: string, count: number) => {
      dispatch(guestCartActions.updateQuantity({ productId, count }));
    },
  };
}

export function useRemoveFromGuestCart() {
  const dispatch = useDispatch();

  return {
    removeItem: (productId: string) => {
      dispatch(guestCartActions.removeItem(productId));
      toast.success("Item removed from cart");
    },
  };
}

export function useClearGuestCart() {
  const dispatch = useDispatch();

  return {
    clearCart: () => {
      dispatch(guestCartActions.clearCart());
      toast.success("Cart cleared");
    },
  };
}

// Unified Add To Cart Hook
export function useAddToCart() {
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );
  const queryClient = useQueryClient();
  const { addItem } = useAddToGuestCart();

  const serverMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await addToCartServer(productId);
    },
    onSuccess: () => {
      toast.success("Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add product to cart");
    },
  });

  const addToCart = async (
    product: Product | { _id: string; id?: string; title: string; price: number; priceAfterDiscount?: number; imageCover: string; category?: { name: string } },
    count: number = 1
  ) => {
    if (isAuthenticated) {
      await serverMutation.mutateAsync(product._id);
    } else {
      addItem(product, count);
      toast.success(`"${product.title}" added to cart!`);
    }
  };

  return {
    addToCart,
    isPending: serverMutation.isPending,
  };
}

// Unified Cart Count Hook
export function useCartCount() {
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );
  const { data: serverCart } = useCart();
  const { totalItems: guestTotalItems } = useGuestCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return 0;
  if (isAuthenticated) {
    return serverCart?.numOfCartItems ?? 0;
  }
  return guestTotalItems;
}

// Hook to merge guest cart when logging in
export function useMergeCart() {
  const { items, totalItems } = useGuestCart();
  const { clearCart } = useClearGuestCart();
  const queryClient = useQueryClient();

  const mergeCart = async () => {
    if (items.length === 0) return { merged: 0 };
    let mergedCount = 0;
    for (const item of items) {
      try {
        for (let i = 0; i < item.count; i++) {
          await addToCartServer(item.productId);
        }
        mergedCount++;
      } catch (err) {
        console.warn(`Failed to merge item ${item.productId}:`, err);
      }
    }
    clearCart();
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    return { merged: mergedCount };
  };

  return {
    mergeCart,
    hasItemsToMerge: totalItems > 0,
    itemCount: totalItems,
  };
}
