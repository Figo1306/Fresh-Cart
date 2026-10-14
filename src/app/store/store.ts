import { authReducer, initialState } from "@/features/auth/slicese/auth.slice";
import { guestCartReducer } from "@/features/cart/slices/guestCart.slice";
import { GuestCartState } from "@/features/cart/types/cart.types";
import { guestWishlistReducer } from "@/features/wishlist/slices/guestWishlist.slice";
import { GuestWishlistState } from "@/features/wishlist/types/wishlist.types";
import { configureStore } from "@reduxjs/toolkit";

export type preloadedState = {
  authReducer: initialState;
  guestCartReducer?: GuestCartState;
  guestWishlistReducer?: GuestWishlistState;
};

export function CreateStore(preloadedState: preloadedState) {
  const myStore = configureStore({
    reducer: {
      authReducer,
      guestCartReducer,
      guestWishlistReducer,
    },
    preloadedState: {
      authReducer: preloadedState.authReducer,
      guestCartReducer: preloadedState.guestCartReducer ?? { items: [] },
      guestWishlistReducer: preloadedState.guestWishlistReducer ?? { items: [] },
    },
  });

  return myStore;
}

export type AppStore = ReturnType<typeof CreateStore>;
export type AppState = ReturnType<AppStore["getState"]>;
