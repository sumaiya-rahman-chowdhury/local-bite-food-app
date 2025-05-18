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
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type FoodCardProps = {
  food: FoodPost;
};
function FoodCard({ food }: FoodCardProps) {
  //   console.log(food);
  return (
    <div
      className="w-full rounded-xl overflow-hidden shadow-lg
     hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100
     "
    >
      {/* Food Image */}
      <div className="relative h-48 w-full">
        <Image
          src={food.imageUrl}
          alt={food.title}
          fill
          className="object-cover"
          priority
        />
        {food.type === "paid" ? (
          <div className="absolute top-2 right-2 bg-[#FF8C42] text-white text-xs font-bold px-2 py-1 rounded-full">
            Paid
          </div>
        ) : (
          <div className="absolute top-2 right-2 bg-[#4A8B2C] text-white text-xs font-bold px-2 py-1 rounded-full">
            Free
          </div>
        )}
      </div>

      {/* Food Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/food-marketplace/posts/${food._id}`}>
            <h3 className="text-lg font-bold text-gray-800 hover:underline">{food.title}</h3>
          </Link>
          <span className="bg-[#FF8C42]/10 text-[#FF8C42] text-sm px-2 py-1 rounded-full">
            {food.quantity} {food.quantity === 1 ? "serving" : "servings"}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {food.description}
        </p>

        {/* Posted By */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"></div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {food.postedBy.name}
            </p>
            <p className="text-xs text-gray-500">Posted {food.createdAt}</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-4 w-full bg-[#4A8B2C] hover:bg-[#3E7A25] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          {food.type === "paid" ? "Purchase Now" : "Request Food"}
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
