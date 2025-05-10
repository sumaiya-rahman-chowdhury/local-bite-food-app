"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction}>
      <h2 className="text-xl font-semibold">Login</h2>

      <div>
        <label>Email</label>
        <input name="email" type="email" required className="border p-2" />
      </div>

      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          required
          className="border p-2"
        />
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-600">Login successful!</p>}

      <button disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
