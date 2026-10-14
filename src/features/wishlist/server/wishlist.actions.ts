"use server";

import { getToken } from "@/features/auth/server/auth.action";
import { apiClinte } from "@/shared/services/apiClinte";
import { RawAxiosRequestConfig } from "axios";
import {
  WishlistActionResponse,
  WishlistResponse,
} from "../types/wishlist.types";

const emptyWishlistData: WishlistResponse = {
  status: "success",
  count: 0,
  data: [],
};

export async function getWishlist(
  clientToken?: string
): Promise<WishlistResponse | null> {
  const token = clientToken || (await getToken());
  if (!token) return null;

  try {
    const options: RawAxiosRequestConfig = {
      url: `/wishlist`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<WishlistResponse>(options);
    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return emptyWishlistData;
    }
    throw new Error(
      error?.response?.data?.message || "Failed to fetch user wishlist"
    );
  }
}

export async function addToWishlist(
  productId: string,
  clientToken?: string
): Promise<WishlistActionResponse> {
  const token = clientToken || (await getToken());
  if (!token) {
    throw new Error("You must be logged in to add products to your wishlist");
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/wishlist`,
      method: "POST",
      data: {
        productId,
      },
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<WishlistActionResponse>(options);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to add product to wishlist"
    );
  }
}

export async function removeFromWishlist(
  productId: string,
  clientToken?: string
): Promise<WishlistActionResponse> {
  const token = clientToken || (await getToken());
  if (!token) {
    throw new Error("You must be logged in to remove products from your wishlist");
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<WishlistActionResponse>(options);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to remove product from wishlist"
    );
  }
}
