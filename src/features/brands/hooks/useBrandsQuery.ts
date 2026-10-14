import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../services/getAllBrands";
import { getBrandById } from "../services/getBrandById";
import { Brand, GetBrandsParams } from "../types/brands.types";
import { getAllProducts } from "@/features/products/services/getAllProducts";
import { Product } from "@/features/products/types/Products.types";

export const BRANDS_QUERY_KEY = ["brands"] as const;

export function useBrands(params?: GetBrandsParams) {
  return useQuery<Brand[]>({
    queryKey: params ? [...BRANDS_QUERY_KEY, params] : BRANDS_QUERY_KEY,
    queryFn: async () => {
      const res = await getAllBrands(params);
      return res?.data || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}

export function useBrand(id?: string) {
  return useQuery<Brand | null>({
    queryKey: [...BRANDS_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getBrandById(id);
      return res?.data || null;
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  });
}

export function useBrandProducts(brandId?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", "brand", brandId],
    queryFn: async () => {
      if (!brandId) return [];
      const res = await getAllProducts({ brand: brandId });
      return res?.data || [];
    },
    enabled: Boolean(brandId),
    staleTime: 1000 * 60 * 5,
  });
}
