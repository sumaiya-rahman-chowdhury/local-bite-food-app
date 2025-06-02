"use client";

import { CartContext } from "@/context/cartContext";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import axios from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";

export type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await AuthToken();
        if (token) {
          const res = await axios.get(`${API_URL}/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("Fetched cart:", res.data);
          setCart(res.data.items || []);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart([]);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    try {
      const token = await AuthToken();
      if (!token) {
        return alert("Login first");
      }
      await axios.post(
        `${API_URL}/cart`,
        {
          _id: item._id,
          title: item.title,
          price: item.price,
          quantity: 1,
          imageUrl: item.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prev) => {
        const existing = prev.find((i) => i._id === item._id);
        if (existing) {
          return prev.map((i) =>
            i._id === item._id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }

        return [...prev, item];
      });
      alert("added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("try again");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
