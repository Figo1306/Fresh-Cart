import { useQuery } from "@tanstack/react-query";
import { getAllProducts, GetProductsParams } from "../services/getAllProducts";
import { ProductsApiResponse } from "../types/Products.types";

export const PRODUCTS_QUERY_KEY = ["products"] as const;

export function useFilteredProducts(params?: GetProductsParams) {
  return useQuery<ProductsApiResponse>({
    queryKey: params ? [...PRODUCTS_QUERY_KEY, "filtered", params] : PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      return await getAllProducts(params);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
