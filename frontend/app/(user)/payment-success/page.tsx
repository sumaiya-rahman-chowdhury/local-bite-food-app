"use client";
import { useCart } from "@/components/context providers/CartProvider";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Home, Package } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { setCart } = useCart();
  useEffect(() => {
    const clearCartAfterPayment = async () => {
      try {
        const token = await AuthToken();
        //  const res = await axios.delete(`http://localhost:5000/api/cart/clear-cart/`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        const res = await fetch(`${API_URL}/cart/clear-cart/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("API Hited", data);
        setCart([]);
      } catch (error) {
        console.error("Failed to clear cart after payment", error);
      }
    };

    clearCartAfterPayment();
  }, [setCart]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
    >
      {/* Success Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10 max-w-md w-full text-center"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be
          prepared shortly.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingBag className="w-5 h-5 text-[#FF8C42]" />
            <h2 className="font-medium text-gray-900">Order Summary</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-medium">#LB-28492</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium text-[#4A8B2C]">₹1,250</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/orders"
            className="flex-1 flex items-center justify-center gap-2 bg-[#4A8B2C] hover:bg-[#3E7A25] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            <Package className="w-5 h-5" />
            View Orders
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Back Home
          </Link>
        </div>
      </motion.div>

      {/* Additional Help */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-sm text-gray-500 max-w-md"
      >
        <p>Need help? Contact our support team at support@localbite.com</p>
      </motion.div>
    </motion.div>
  );
}
