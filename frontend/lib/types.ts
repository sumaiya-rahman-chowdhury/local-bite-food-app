export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  type: "buyer" | "hotel-owner";
}
export type LoginFormData = {
  email: string;
  password: string;
};
export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};
export type ProfileCompletion = {
  profileComplete: boolean;
};
export interface UserProfile extends User {
  phone?: string;
  location?: string;
  district?: {
    _id: string;
    name: string;
  };
  specificLocation?: string;
  createdAt?: string;
  updatedAt?: string;
  stars?: number;
}
export type Profile = {
  user: UserProfile;
  profileComplete: ProfileCompletion;
};
