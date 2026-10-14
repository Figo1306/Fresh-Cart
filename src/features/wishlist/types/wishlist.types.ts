import { Product } from "@/features/products/types/Products.types";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishlistActionResponse {
  status: string;
  message: string;
  data: string[];
}

export interface GuestWishlistItem {
  productId: string;
  product: Product;
  addedAt?: string;
}

export interface GuestWishlistState {
  items: GuestWishlistItem[];
}
