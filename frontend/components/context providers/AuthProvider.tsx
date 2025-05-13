"use client";
import { AuthContext } from "@/context/authContext";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    try {
      if (rawUser && rawUser !== "undefined") {
        setUser(JSON.parse(rawUser));
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
