import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuestCartItem, GuestCartState } from "../types/cart.types";
import { Product } from "@/features/products/types/Products.types";

const GUEST_CART_STORAGE_KEY = "guestCart";

const saveGuestCart = (items: GuestCartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to persist guest cart:", error);
  }
};

const getInitialGuestCartItems = (): GuestCartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUEST_CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read guest cart:", error);
    return [];
  }
};

const initialState: GuestCartState = {
  items: [],
};

export const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      state.items = getInitialGuestCartItems();
    },
    addItem: (
      state,
      action: PayloadAction<{
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
            };
        count?: number;
      }>
    ) => {
      const { product, count = 1 } = action.payload;
      const index = state.items.findIndex(
        (item) => item.productId === product._id
      );

      if (index >= 0) {
        state.items[index].count += count;
      } else {
        const effectivePrice =
          product.priceAfterDiscount && product.priceAfterDiscount > 0
            ? product.priceAfterDiscount
            : product.price;

        state.items.push({
          productId: product._id,
          count,
          price: effectivePrice,
          product: {
            _id: product._id,
            id: product.id || product._id,
            title: product.title,
            imageCover: product.imageCover,
            category: product.category
              ? { name: product.category.name }
              : undefined,
          },
        });
      }

      saveGuestCart(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; count: number }>
    ) => {
      const { productId, count } = action.payload;
      const target = state.items.find((item) => item.productId === productId);
      if (target) {
        target.count = Math.max(1, count);
        saveGuestCart(state.items);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      saveGuestCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveGuestCart(state.items);
    },
  },
});

export const guestCartActions = guestCartSlice.actions;
export const guestCartReducer = guestCartSlice.reducer;
