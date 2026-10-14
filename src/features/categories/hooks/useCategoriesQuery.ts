import { useQuery } from "@tanstack/react-query";
import { getAllCategorise, GetCategoriesParams } from "../services/getAllCategorise";
import { getCategoryById } from "../services/getCategoryById";
import { getSubcategoriesByCategoryId } from "../services/getSubcategoriesByCategoryId";
import { Category, Subcategory } from "../types/categorise.types";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;
export const SUBCATEGORIES_QUERY_KEY = ["subcategories"] as const;

export function useCategories(params?: GetCategoriesParams) {
  return useQuery<Category[]>({
    queryKey: params ? [...CATEGORIES_QUERY_KEY, params] : CATEGORIES_QUERY_KEY,
    queryFn: async () => {
      const res = await getAllCategorise(params);
      return res?.data || [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategory(id?: string) {
  return useQuery<Category | null>({
    queryKey: [...CATEGORIES_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getCategoryById(id);
      return res?.data || null;
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  });
}

export function useSubcategoriesByCategory(categoryId?: string) {
  return useQuery<Subcategory[]>({
    queryKey: [...SUBCATEGORIES_QUERY_KEY, "category", categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const res = await getSubcategoriesByCategoryId(categoryId);
      return res?.data || [];
    },
    enabled: Boolean(categoryId),
    staleTime: 1000 * 60 * 10,
  });
}
