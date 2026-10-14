import { apiClint } from "@/shared/services/apiClinte";
import { AxiosRequestConfig } from "axios";
import { ProductDetailApiResponse } from "../types/ProductsDetails.types";

export async function getSpecficProduct(
  id: string
): Promise<ProductDetailApiResponse> {
  const options: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "GET",
  };
  const { data } = await apiClint.request(options);
  return data;
}

export default getSpecficProduct;
