import { API } from "@/lib/auth";
import { Profile } from "@/lib/types";

export const getProfile = (): Promise<Profile> =>
  API.get("/profile", { withCredentials: true }).then((res) => res.data);

export const updateProfile = (data: Profile): Promise<Profile> =>
  API.put("/profile", data, { withCredentials: true }).then((res) => res.data);
