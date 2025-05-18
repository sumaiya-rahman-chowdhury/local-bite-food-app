import axios from "axios";
import API_URL from "../static/static";

export const fetchMarketPlaceData = async () => {
  const data = axios.get(`${API_URL}/food-marketplace/post?limit=4`);
  return (await data).data;
};
