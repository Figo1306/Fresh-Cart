import { apiClint } from "@/shared/services/apiClinte";
import { AxiosRequestConfig } from "axios";
import { ProductsApiResponse } from "../types/Products.types";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  keyword?: string;
  [key: string]: unknown;
}

export async function getAllProducts(
  params?: GetProductsParams
): Promise<ProductsApiResponse> {
  const options: AxiosRequestConfig = {
    url: `/products`,
    method: "GET",
    params,
  };
  const { data } = await apiClint.request(options);
  return data;
}

export default getAllProducts;
