export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface BrandsApiResponse {
  results: number;
  metadata: BrandsMetadata;
  data: Brand[];
}

export interface SingleBrandApiResponse {
  data: Brand;
}

export interface GetBrandsParams {
  page?: number;
  limit?: number;
  keyword?: string;
  [key: string]: unknown;
}
