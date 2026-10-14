"use server";

import { apiClinte } from "@/shared/services/apiClinte";
import { RawAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export async function setToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
    path: "/",
    sameSite: "lax",
  });
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return null;
  return token.value;
}

export async function deleteToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }

  try {
    const options: RawAxiosRequestConfig = {
      url: `/auth/verifyToken`,
      method: "GET",
      headers: {
        token: token.value,
      },
    };
    const { data } = await apiClinte.request(options);
    if (data.message == "verified") {
      return {
        isAuthenticated: true,
        userInfo: {
          id: data.decoded.id,
          name: data.decoded.name,
          role: data.decoded.role,
        },
      };
    }
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}

// :Promise<{isAuthenticated:boolean;userInfo:null | {}}>
