"use client";

import { CartItem } from "@/components/context providers/CartProvider";
import { createContext } from "react";
export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }) => Promise<void>;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
