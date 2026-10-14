import axios from "axios";

export const apiClinte = axios.create({
  baseURL: `https://ecommerce.routemisr.com/api/v1`,
  timeout: 30000,
});

export const apiClint = apiClinte;
export default apiClinte;
