export interface User {
  id: string;
  name: string;
  email: string;
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
