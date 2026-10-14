export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface CategoriesApiResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}

export interface SingleCategoryApiResponse {
  data: Category;
}

export interface SubcategoriesApiResponse {
  results: number;
  metadata?: Metadata;
  data: Subcategory[];
}