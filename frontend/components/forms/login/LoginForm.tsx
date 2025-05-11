"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { LoginFormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { getAxiosErrorMessage } from "@/lib/shared/handleError";

export default function LoginForm() {
  const [serverError, setServerError] = useState("");

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
