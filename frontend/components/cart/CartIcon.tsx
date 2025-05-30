"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context providers/CartProvider";

const CartIcon = () => {
  const { cart } = useCart();
  console.log(cart)
  const itemCount = cart?.length || 0;

  return (
    <Link href="/cart" className="relative group">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#4A8B2C] transition-colors" />
      {itemCount > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-[#4A8B2C] text-white text-xs font-semibold
          px-1.5 py-0.5 rounded-full animate-bounce"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
