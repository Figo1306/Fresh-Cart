import { apiClint } from "@/shared/services/apiclint";
import { SingleCategoryApiResponse } from "../types/categorise.types";

export async function getCategoryById(
  id: string
): Promise<SingleCategoryApiResponse> {
  const { data } = await apiClint.get<SingleCategoryApiResponse>(
    `/categories/${id}`
  );
  return data;
}

export default getCategoryById;
