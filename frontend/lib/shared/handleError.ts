import { AxiosError } from "axios";

export type ActionError = {
  success: false;
  error: string;
};

export function handleActionError(error: unknown, fallbackMessage = "Something went wrong"): ActionError {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message ||
      error.message ||
      fallbackMessage;
    return { success: false, error: message };
  }

  if (error instanceof Error) {
    return { success: false, error: error.message || fallbackMessage };
  }

  return { success: false, error: fallbackMessage };
}
