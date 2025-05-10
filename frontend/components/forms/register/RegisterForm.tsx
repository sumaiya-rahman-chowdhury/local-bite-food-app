"use client";

import { registerAction } from "@/lib/auth";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="text-xl font-semibold">Register</h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-600">Registration successful!</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
