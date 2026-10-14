import { apiClinte } from "@/shared/services/apiClinte";
import {
  WishlistActionResponse,
  WishlistResponse,
} from "../types/wishlist.types";

export function getClientToken(): string | null {
  if (typeof window === "undefined") return null;

  // 1. Check localStorage for "token" or "userToken"
  const localToken =
    localStorage.getItem("token") || localStorage.getItem("userToken");
  if (localToken) return localToken;

  // 2. Check document.cookie for "token="
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);

  return null;
}

export async function getWishlistClient(token?: string): Promise<WishlistResponse> {
  const authToken = token || getClientToken();
  if (!authToken) {
    return { status: "success", count: 0, data: [] };
  }

  try {
    const { data } = await apiClinte.get<WishlistResponse>("/wishlist", {
      headers: {
        token: authToken,
      },
    });
    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return { status: "success", count: 0, data: [] };
    }
    throw new Error(
      error?.response?.data?.message || "Failed to fetch wishlist"
    );
  }
}

export async function addToWishlistClient(
  productId: string,
  token?: string
): Promise<WishlistActionResponse> {
  const authToken = token || getClientToken();
  if (!authToken) {
    throw new Error("Please log in to add products to your wishlist");
  }

  try {
    const { data } = await apiClinte.post<WishlistActionResponse>(
      "/wishlist",
      { productId },
      {
        headers: {
          token: authToken,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to add product to wishlist"
    );
  }
}

export async function removeFromWishlistClient(
  productId: string,
  token?: string
): Promise<WishlistActionResponse> {
  const authToken = token || getClientToken();
  if (!authToken) {
    throw new Error("Please log in to remove products from your wishlist");
  }

  try {
    const { data } = await apiClinte.delete<WishlistActionResponse>(
      `/wishlist/${productId}`,
      {
        headers: {
          token: authToken,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to remove product from wishlist"
    );
  }
}
