import { apiClint } from "@/shared/services/apiClinte";
import { SingleBrandApiResponse } from "../types/brands.types";

export async function getBrandById(id: string): Promise<SingleBrandApiResponse> {
  const { data } = await apiClint.get<SingleBrandApiResponse>(`/brands/${id}`);
  return data;
}
