import { apiClint } from "@/shared/services/apiclint";
import { SubcategoriesApiResponse } from "../types/categorise.types";

export async function getSubcategoriesByCategoryId(
  categoryId: string
): Promise<SubcategoriesApiResponse> {
  try {
    const { data } = await apiClint.get<SubcategoriesApiResponse>(
      "/subcategories",
      {
        params: {
          category: categoryId,
          limit: 100,
        },
      }
    );
    if (data?.data) {
      return data;
    }
  } catch {
    // Fallback to route-based endpoint if query parameter fails
  }

  const { data } = await apiClint.get<SubcategoriesApiResponse>(
    `/categories/${categoryId}/subcategories`
  );
  if (data?.data) {
    data.data = data.data.filter((item) => item.category === categoryId);
    data.results = data.data.length;
  }
  return data;
}

export default getSubcategoriesByCategoryId;
