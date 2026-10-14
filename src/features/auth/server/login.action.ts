"use server";

import { loginSchema, loginValues } from "@/app/(auth)/schemas/login.schema";
import { apiClinte } from "@/shared/services/apiClinte";
import { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import z, { success } from "zod";
type loginResponse = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

type LoginFieldErrors = Partial<Record<keyof loginValues, string[]>>;

type loginactionReturn =
  | { success: true; message: string; data: loginResponse }
  | { success: false; message: string; fieldErrors?: LoginFieldErrors };

export async function loginAction(
  valuse: loginValues,
): Promise<loginactionReturn> {
  const validationResult = loginSchema.safeParse(valuse);
  if (!validationResult.success) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      message: formErrors[0] ?? "fix Highlited Error",
      fieldErrors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `/auth/signin`,
      method: "post",
      data: validationResult.data,
    };

    const { data } = await apiClinte.request(options);

    return {
      success: true,
      message: "user logged in successfully",
      data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data.message ??
          "can not reach server , try again later",
      };
    }
  }
  return {
    success: false,
    message: "something went wrong",
  };
}
