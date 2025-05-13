import axios from "axios";
import API_URL from "./static/static";
import { LoginFormData, RegisterFormData } from "./types";
import { getAxiosErrorMessage } from "./shared/handleError";

export const API = axios.create({
  baseURL: API_URL,
});

export const registerAction = async (data: RegisterFormData) => {
  try {
    const response = await API.post("/auth/register", data,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      getAxiosErrorMessage(error, "Registration failed")
    );
    throw error;
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await API.post("/auth/login", data,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", getAxiosErrorMessage(error, "Login failed"));
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/auth/logout",{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", getAxiosErrorMessage(error, "LogOut failed"));
    throw error;
  }
};
