"use client";

import { fetchMarketPlaceData } from "@/lib/fetch/fetchMarketPlaceData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FoodCard, { FoodPost } from "../cards/foods-card/FoodCard";
import { ArrowRightIcon, ShoppingBagIcon } from "lucide-react";

export default function MarketPage() {
  const [foodCards, setFoodCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      const foodCard = await fetchMarketPlaceData();
      console.log(foodCard.foodPosts);
      setFoodCards(foodCard.foodPosts);
    };
    data();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-[#4A8B2C] text-4xl md:text-5xl font-bold text-center">
            Community Food Share
          </h1>
          <p className="text-gray-600 mt-3 text-center max-w-2xl mx-auto">
            Give what you can, take what you need - reducing waste through
            sharing
          </p>
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foodCards.slice(0, 8).map((foodCard: FoodPost) => (
            <FoodCard key={foodCard._id} food={foodCard} />
          ))}
        </div>

        {/* See More Button */}
        {foodCards.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => router.push("food-marketplace/posts")}
              className="bg-[#FF8C42] hover:bg-[#E67A30] text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              See More Listings
              <ArrowRightIcon className="h-5 w-5 ml-2 inline" />
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {foodCards.length === 0 && (
        <div className="text-center py-20">
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No listings yet
          </h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Be the first to share food in your community!
          </p>
          <button
            onClick={() => router.push("/post-food")}
            className="mt-6 bg-[#4A8B2C] hover:bg-[#3E7A25] text-white font-medium py-2 px-6 rounded-md shadow-sm"
          >
            Post Food
          </button>
        </div>
      )}
    </div>
  );
}
