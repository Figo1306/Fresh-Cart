import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/features/products/types/Products.types";
import { GuestWishlistItem, GuestWishlistState } from "../types/wishlist.types";

const GUEST_WISHLIST_STORAGE_KEY = "guestWishlist";

const saveGuestWishlist = (items: GuestWishlistItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GUEST_WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to persist guest wishlist:", error);
  }
};

const getInitialGuestWishlistItems = (): GuestWishlistItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUEST_WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read guest wishlist:", error);
    return [];
  }
};

const initialState: GuestWishlistState = {
  items: [],
};

export const guestWishlistSlice = createSlice({
  name: "guestWishlist",
  initialState,
  reducers: {
    initializeWishlist: (state) => {
      state.items = getInitialGuestWishlistItems();
    },
    addItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const productId = product._id || product.id;
      const exists = state.items.some(
        (item) => item.productId === productId || item.product._id === productId
      );

      if (!exists) {
        state.items.push({
          productId,
          product,
          addedAt: new Date().toISOString(),
        });
        saveGuestWishlist(state.items);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const targetId = action.payload;
      state.items = state.items.filter(
        (item) => item.productId !== targetId && item.product._id !== targetId
      );
      saveGuestWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveGuestWishlist(state.items);
    },
  },
});

export const guestWishlistActions = guestWishlistSlice.actions;
export const guestWishlistReducer = guestWishlistSlice.reducer;
