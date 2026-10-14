import { apiClint } from "@/shared/services/apiClinte";
import { BrandsApiResponse, GetBrandsParams } from "../types/brands.types";

export async function getAllBrands(
  params?: GetBrandsParams
): Promise<BrandsApiResponse> {
  const { data } = await apiClint.get<BrandsApiResponse>("/brands", {
    params: {
      limit: 100,
      ...params,
    },
  });
  return data;
}
