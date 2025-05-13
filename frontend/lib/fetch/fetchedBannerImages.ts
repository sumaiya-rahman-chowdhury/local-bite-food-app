import axios from "axios";
// import { API } from "../auth";
import API_URL from "../static/static";

export const fetchBannerImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/upload-images/banner`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

