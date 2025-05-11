import { AxiosError } from "axios";

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    if (typeof message === "string") {
      return message;
    }
  }
  return fallback;
}
