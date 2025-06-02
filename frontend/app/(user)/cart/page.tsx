"use client";
import { CartItem, useCart } from "@/components/context providers/CartProvider";
import { useAuth } from "@/hooks/useAuth";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, setCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { user } = useAuth();
  if (!user) {
    return router.push("/login");
  }

  const increaseQty = async (item: CartItem) => {
    // if (item.quantity >= item.quantity) return;

    try {
      const token = await AuthToken();
      await axios.put(
        `${API_URL}/cart/${item._id}`,
        {
          quantity: item.quantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } catch (err) {
      console.error("Increase quantity failed", err);
    }
  };

  const decreaseQty = async (item: CartItem) => {
    if (item.quantity <= 1) return;

    try {
      const token = await AuthToken();
      await axios.put(
        `${API_URL}/cart/${item._id}`,
        {
          quantity: item.quantity - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } catch (err) {
      console.error("Decrease quantity failed", err);
    }
  };
  const getCartTotal = () => {
    const totalPrice = cart
      .filter((item) => selectedItems.includes(item._id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice;
  };

  const handleCheckout = async () => {
    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item._id)
    );

    if (selectedCartItems.length === 0) {
      return alert("Please select at least one item to checkout.");
    }

    try {
      const token = await AuthToken();
      const res = await axios.post(
        `${API_URL}/payment/create-checkout-session`,
        { cartItems: selectedCartItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Something went wrong. No checkout URL returned.");
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert("Something went wrong while starting the payment.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Your Items
          </h3>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cart.length}
                  onChange={(e) => {
                    setSelectedItems(
                      e.target.checked ? cart.map((i) => i._id) : []
                    );
                  }}
                />
                Select All
              </label>
            </div>

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={(e) => {
                    setSelectedItems((prev) =>
                      e.target.checked
                        ? [...prev, item._id]
                        : prev.filter((id) => id !== item._id)
                    );
                  }}
                  className="w-4 h-4 accent-[#4A8B2C]"
                />
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <div className="flex items-center gap-2 border rounded-md px-2 py-1 w-fit bg-white shadow-sm">
                    <button
                      onClick={() => decreaseQty(item)}
                      disabled={item.quantity <= 1}
                      className="p-1 disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <p className="text-sm font-medium text-gray-800 min-w-[32px] text-center">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => increaseQty(item)}
                      className="p-1 disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-green-700 text-right min-w-[80px]">
                  Tk {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Checkout */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-fit md:sticky top-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-4 mt-4">
              <span>Total:</span>
              <span className="text-[#4A8B2C]">
                Tk {getCartTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="mt-6 w-full bg-[#4A8B2C] hover:bg-[#3b6d22] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
