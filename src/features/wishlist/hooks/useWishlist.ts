"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppState } from "@/app/store/store";
import { Product } from "@/features/products/types/Products.types";
import {
  addToWishlist as addToWishlistServer,
  getWishlist as getWishlistServer,
  removeFromWishlist as removeFromWishlistServer,
} from "../server/wishlist.actions";
import {
  addToWishlistClient,
  getClientToken,
  getWishlistClient,
  removeFromWishlistClient,
} from "../services/wishlist.service";
import { WishlistResponse } from "../types/wishlist.types";

export const WISHLIST_QUERY_KEY = ["wishlist"] as const;

// Primary Wishlist Query
export function useWishlist() {
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );

  return useQuery<WishlistResponse>({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: async () => {
      const token = getClientToken();
      if (token) {
        return await getWishlistClient(token);
      }

      if (isAuthenticated) {
        const res = await getWishlistServer();
        if (res) return res;
      }

      return { status: "success", count: 0, data: [] };
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
}

// Add to Wishlist Mutation
export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const token = getClientToken();
      if (token) {
        return await addToWishlistClient(productId, token);
      }
      return await addToWishlistServer(productId);
    },
    onSuccess: () => {
      toast.success("Product added to wishlist!");
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add to wishlist");
    },
  });
}

// Remove from Wishlist Mutation
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const token = getClientToken();
      if (token) {
        return await removeFromWishlistClient(productId, token);
      }
      return await removeFromWishlistServer(productId);
    },
    onSuccess: () => {
      toast.success("Product removed from wishlist");
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to remove from wishlist");
    },
  });
}

// Wishlist Count for Navbar
export function useWishlistCount() {
  const { data } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return 0;
  return data?.count ?? data?.data?.length ?? 0;
}

// Unified Wishlist Hook for Screens & Components
export function useUnifiedWishlist() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer
  );

  const { data: wishlistData, isLoading, isError, refetch } = useWishlist();
  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveFromWishlist();

  const products: Product[] = useMemo(() => {
    return wishlistData?.data ?? [];
  }, [wishlistData]);

  const wishlistIds = useMemo(() => {
    const ids = new Set<string>();
    products.forEach((p) => {
      if (p._id) ids.add(p._id);
      if (p.id) ids.add(p.id);
    });
    return ids;
  }, [products]);

  const isInWishlist = (productId: string) => {
    return wishlistIds.has(productId);
  };

  const toggleWishlist = async (product: Product) => {
    const token = getClientToken();
    if (!token && !isAuthenticated) {
      toast.error("Please log in to add products to your wishlist");
      router.push("/login");
      return;
    }

    const productId = product._id || product.id;
    const exists = isInWishlist(productId);

    if (exists) {
      await removeMutation.mutateAsync(productId);
    } else {
      await addMutation.mutateAsync(productId);
    }
  };

  const removeItem = async (productId: string) => {
    await removeMutation.mutateAsync(productId);
  };

  const clearAll = async () => {
    const token = getClientToken();
    const itemsToClear = [...products];
    for (const item of itemsToClear) {
      const pid = item._id || item.id;
      try {
        if (token) {
          await removeFromWishlistClient(pid, token);
        } else {
          await removeFromWishlistServer(pid);
        }
      } catch (err) {
        console.warn("Failed removing item:", err);
      }
    }
    queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    toast.success("Wishlist cleared");
  };

  return {
    products,
    totalItems: products.length,
    isLoading,
    isError,
    refetch,
    isInWishlist,
    toggleWishlist,
    removeItem,
    clearAll,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
}
