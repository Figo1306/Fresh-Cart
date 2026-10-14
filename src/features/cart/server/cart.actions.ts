"use server";

import { getToken } from "@/features/auth/server/auth.action";
import { apiClinte } from "@/shared/services/apiClinte";
import { RawAxiosRequestConfig } from "axios";
import { CartResponse } from "../types/cart.types";

const emptyCartData: CartResponse = {
  status: "success",
  numOfCartItems: 0,
  data: {
    _id: "",
    cartOwner: "",
    products: [],
    totalCartPrice: 0,
  },
};

export async function getCart(): Promise<CartResponse | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const options: RawAxiosRequestConfig = {
      url: `/cart`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<CartResponse>(options);
    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return emptyCartData;
    }
    throw new Error(
      error?.response?.data?.message || "Failed to fetch user cart"
    );
  }
}

export async function addToCart(productId: string): Promise<CartResponse> {
  const token = await getToken();
  if (!token) {
    throw new Error("You must be logged in to add products to your cart");
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/cart`,
      method: "POST",
      data: {
        productId,
      },
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<CartResponse>(options);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to add product to cart"
    );
  }
}

export async function updateCartQuantity(
  productId: string,
  count: number
): Promise<CartResponse> {
  const token = await getToken();
  if (!token) {
    throw new Error("You must be logged in to update your cart");
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/cart/${productId}`,
      method: "PUT",
      data: {
        count,
      },
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<CartResponse>(options);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update item quantity"
    );
  }
}

export async function removeFromCart(
  productId: string
): Promise<CartResponse> {
  const token = await getToken();
  if (!token) {
    throw new Error("You must be logged in to remove items from your cart");
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/cart/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<CartResponse>(options);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to remove item from cart"
    );
  }
}

export async function clearCart(): Promise<{ message: string; status?: string }> {
  const token = await getToken();
  if (!token) {
    throw new Error("You must be logged in to clear your cart");
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/cart`,
      method: "DELETE",
      headers: {
        token,
      },
    };

    const { data } = await apiClinte.request<{ message: string; status?: string }>(options);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to clear cart"
    );
  }
}
