import API_URL from "@/lib/static/static";
import axios from "axios";

export type DistrictType = {
  _id:string;
  name:string;
}
export const fetchDistricts = async ()=>{
    const response = axios.get<DistrictType[]>(`${API_URL}/districts`)
    const data = (await response).data
    return data as DistrictType[]
    // return response
}