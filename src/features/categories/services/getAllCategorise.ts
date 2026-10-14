import { apiClint } from "@/shared/services/apiclint";
import { CategoriesApiResponse } from "../types/categorise.types";

export interface GetCategoriesParams {
  limit?: number;
  page?: number;
  sort?: string;
  keyword?: string;
}

export async function getAllCategorise(
  params?: GetCategoriesParams
): Promise<CategoriesApiResponse> {
  const { data } = await apiClint.get<CategoriesApiResponse>("/categories", {
    params: {
      limit: 100,
      ...params,
    },
  });
  return data;
}

export default getAllCategorise;
