import { AddToCartButton } from "@/components/buttons/AddToCartButton";
import { ViewDetailsButton } from "@/components/buttons/ViewDetailsButton";
import Image from "next/image";
import Link from "next/link";

export type FoodPost = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
  type: "paid" | "donation";
  postedBy: {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
  price: number;
  __v: number;
};

type FoodCardProps = {
  food: FoodPost;
};

function FoodCard({ food }: FoodCardProps) {

  return (
    <div className="w-full flex flex-col justify-between h-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-100">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={food.imageUrl}
          alt={food.title}
          fill
          className="object-cover"
          priority
        />
        <div
          className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${
            food.type === "paid" ? "bg-[#FF8C42]" : "bg-[#4A8B2C]"
          }`}
        >
          {food.type === "paid" ? "Paid" : "Free"}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <Link href={`/food-marketplace/posts/${food._id}`}>
              <h3 className="text-lg font-bold text-gray-800 hover:underline line-clamp-1">
                {food.title}
              </h3>
            </Link>
            <span className="bg-[#FF8C42]/10 text-[#FF8C42] text-sm px-2 py-1 rounded-full whitespace-nowrap">
              {food.quantity} {food.quantity === 1 ? "serving" : "servings"}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3">
            {food.description.slice(0, 20)}...
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {food.postedBy?.avatarUrl ? (
                <Image
                  src={food.postedBy.avatarUrl}
                  alt={food.postedBy.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xs">
                  {food.postedBy?.name?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {food?.postedBy?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">Posted {food.createdAt}</p>
            </div>
          </div>

          {food.type === "paid" ? (
            <AddToCartButton food={food} />
          ) : (
            <ViewDetailsButton foodId={food._id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
