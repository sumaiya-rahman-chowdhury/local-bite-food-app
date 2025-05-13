"use client";

import { User } from "@/lib/types";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

