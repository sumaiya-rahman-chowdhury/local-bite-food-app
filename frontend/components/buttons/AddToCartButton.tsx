"use client";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { FoodPost } from "../cards/foods-card/FoodCard";
import { useCart } from "@/components/context providers/CartProvider";

type AddToCartButtonProps = {
  food: FoodPost;
};

export function AddToCartButton({ food }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <motion.button
      onClick={() => addToCart(food)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className=" my-5 cursor-pointer flex justify-end items-end  w-full
       "
    >
      <span className="flex justify-center items-center bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded">
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </span>
    </motion.button>
  );
}
