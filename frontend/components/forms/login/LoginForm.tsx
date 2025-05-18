"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { LoginFormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { getAxiosErrorMessage } from "@/lib/shared/handleError";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { setCookie } from "@/lib/cookie";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(""); // clear previous error
      const res = await login(data);
      console.log("Logged in:", res);
      const { token, user } = res;
      // console.log(token, user);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      await setCookie(token)
      localStorage.setItem("token", JSON.stringify(token));
      router.push("/");
    } catch (err: unknown) {
      setServerError(getAxiosErrorMessage(err, "Login failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...formRegister("email")} type="email" placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...formRegister("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>

      {/* Show server error if exists */}
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      {isSubmitSuccessful && !serverError && <p>Login Successful</p>}
    </form>
  );
}
