"use server";

import axios from "axios";
import API_URL from "./static/static";
import { handleActionError } from "./shared/handleError";
import { loginSchema, registerSchema } from "./schemas";


export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const parsed = registerSchema.safeParse({ name, email, password });
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }
  try {
    const res = await axios.post(`${API_URL}/auth/register`, parsed.data);
    return { success: true, data: res.data };
  } catch (error) {
    return handleActionError(error, "Registration failed");
  }
}

export async function loginAction(_prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const parsed = loginSchema.safeParse({ email, password });

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  try {
    const res = await axios.post(`${API_URL}/auth/login`, parsed.data);
    return { success: true, data: res.data };
  } catch (error) {
    return handleActionError(error, "Login failed");
  }
}
