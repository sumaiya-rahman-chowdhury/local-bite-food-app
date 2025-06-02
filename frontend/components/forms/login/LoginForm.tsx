"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { LoginFormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { getAxiosErrorMessage } from "@/lib/shared/handleError";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { setCookie } from "@/lib/cookie";
import Link from "next/link";

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
      await setCookie(token);
      localStorage.setItem("token", JSON.stringify(token));
      router.push("/");
    } catch (err: unknown) {
      setServerError(getAxiosErrorMessage(err, "Login failed"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black max-w-sm w-full mx-auto bg-white p-8 rounded-xl shadow-md space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

      <div>
        <input
          {...formRegister("email")}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...formRegister("password")}
          type="password"
          placeholder="Password"
          className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Login
      </button>

      {serverError && (
        <p className="text-sm text-center text-red-600">{serverError}</p>
      )}

      {isSubmitSuccessful && !serverError && (
        <p className="text-sm text-center text-green-600 font-medium">
          Login Successful
        </p>
      )}
      <Link href={"/register"}>New Here ? Register Now </Link>
    </form>
  );
}
