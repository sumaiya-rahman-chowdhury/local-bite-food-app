export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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

export interface Profile extends User {
  phone?: string;
  avatarUrl?: string;
  location?: string;
  district?:
    | {
        _id: string;
        name: string;
      }
    | string;
  specificLocation?: string;
  createdAt?: string;
  updatedAt?: string;
  stars?: number;
}
