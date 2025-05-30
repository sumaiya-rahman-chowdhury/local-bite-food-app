import axios from "axios";
import API_URL from "../static/static";
import { AuthToken } from "../cookie";

const createAxiosInstance = async () => {
  const token = await AuthToken();

  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export default createAxiosInstance;
