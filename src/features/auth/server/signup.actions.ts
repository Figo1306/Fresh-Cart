"use server";

import { signUpSchema, signupValues } from "@/app/(auth)/schemas/signup.schema";
import { apiClinte } from "@/shared/services/apiClinte";
import { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import z, { success } from "zod";
type singupFieldErorrs = Partial<Record<keyof signupValues, string[]>>;

type signupActionRetun =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: singupFieldErorrs };

export async function signupAction(
  values: signupValues,
): Promise<signupActionRetun> {
  const validationResult = signUpSchema.safeParse(values);

  if (validationResult.success == false) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);
    return {
      success: false,
      message: formErrors[0] ?? "fix Highlited Error",
      fieldErrors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/signup`,
      data: validationResult.data,
    };

    await apiClinte.request(options);

    return {
      success: true,
      message: "Acount Created Successfully",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data.message ??
          "can not reach server , please try again later",
      };
    }
    return {
      success: false,
      message: "Something Went Wrong",
    };
  }
}
