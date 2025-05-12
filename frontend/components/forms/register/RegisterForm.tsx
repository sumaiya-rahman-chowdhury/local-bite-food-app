"use client";

import { getAxiosErrorMessage } from "@/lib/shared/handleError";
import { RegisterFormData } from "@/lib/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerAction } from "@/lib/auth";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");
      const res = await registerAction(data);
      console.log("Logged in:", res);
      router.push("/login");
    } catch (err: unknown) {
      setServerError(getAxiosErrorMessage(err, "Login failed"));
    }
  };

  console.log(serverError);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
