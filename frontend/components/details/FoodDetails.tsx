import {
  Clock,
  MapPin,
  User,
  Heart,
  Share2,
  MessageSquare,
} from "lucide-react";
import { FoodPost } from "../cards/foods-card/FoodCard";

interface FoodDetailsType {
  food: FoodPost;
}
export default function FoodPostDetails({ food }: FoodDetailsType) {
  // Format date to relative time (e.g., "2 hours ago")
  const formatTime = (dateString: string) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffHours = Math.floor(
      (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Food Image Header */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
        <img
          src={food.imageUrl}
          alt={food.title}
          className="w-full h-96 object-cover"
        />
        {/* Food Type Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
            food.type === "donation"
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {food.type === "donation" ? "Free Donation" : "Paid Meal"}
        </div>
      </div>

      {/* Food Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{food.title}</h1>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Posted By & Time */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="font-medium">Posted by {food.postedBy.name}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(food.createdAt)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {food.description}
            </p>
          </div>

          {/* Comments Section */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Comments
            </h2>
            <div className="space-y-4">
              {/* Comment form would go here */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-500">Sign in to leave a comment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Action Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
            <div className="space-y-4">
              {/* Quantity Available */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available Quantity</p>
                  <p className="font-semibold">{food.quantity} servings</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p className="font-semibold">Downtown Area</p>
                </div>
              </div>

              {/* Expiration */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Best before</p>
                  <p className="font-semibold">Tomorrow, 12 PM</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  food.type === "donation"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                {food.type === "donation"
                  ? "Request This Food"
                  : "Purchase for ₹150"}
              </button>

              {/* Safety Tips */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Always check food quality before consuming. Meet in public
                  places for exchanges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
