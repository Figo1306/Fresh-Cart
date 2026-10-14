export interface CartProductCategory {
  _id?: string;
  name: string;
  slug?: string;
}

export interface CartProductBrand {
  _id?: string;
  name: string;
  slug?: string;
  image?: string;
}

export interface CartProductSubcategory {
  _id?: string;
  name: string;
  slug?: string;
  category?: string;
}

export interface CartProduct {
  _id: string;
  id: string;
  title: string;
  quantity?: number;
  imageCover: string;
  category?: CartProductCategory;
  brand?: CartProductBrand;
  ratingsAverage?: number;
  subcategory?: CartProductSubcategory[];
}

export interface CartItemType {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItemType[];
  totalCartPrice: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartData;
  message?: string;
}

export interface GuestCartProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  category?: {
    name: string;
  };
}

export interface GuestCartItem {
  productId: string;
  count: number;
  price: number;
  product: GuestCartProduct;
}

export interface GuestCartState {
  items: GuestCartItem[];
}
