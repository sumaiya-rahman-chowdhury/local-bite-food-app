"use client";
import React from "react";
import axios from "axios";
import API_URL from "@/lib/static/static";
import { AuthToken } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import { FoodPost } from "../cards/foods-card/FoodCard";
import { User } from "@/lib/types";
import {
  CheckIcon,
  PackageIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
type MyPostType = {
  posts: FoodPost[];
  requests: {
    _id: string;
    status: "pending" | "accepted" | "rejected";
    food: FoodPost;
    requester: User;
  }[];
};
function MyPosts({ posts, requests }: MyPostType) {
  console.log(posts, requests);
  const router = useRouter();
  const acceptRequest = async (requestId: string) => {
    const token = await AuthToken();
    await axios.post(
      `${API_URL}/request/accept`,
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.refresh();
  };

  const rejectRequest = async (requestId: string) => {
    const token = await AuthToken();
    await axios.post(
      `${API_URL}/food-marketplace/post/request/reject`,
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {posts.map((post: FoodPost) => (
        <div
          key={post._id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Post Header */}
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600">{post.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  post.type === "donation"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {post.type === "donation" ? "Donation" : "For Sale"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center text-gray-500">
                <UsersIcon className="w-4 h-4 mr-1" />
                {requests.filter((r) => r.food._id === post._id).length}{" "}
                requests
              </span>
              <span className="flex items-center text-gray-500">
                <PackageIcon className="w-4 h-4 mr-1" />
                {post.quantity} servings available
              </span>
            </div>
          </div>

          {/* Requests List */}
          {requests.filter((r) => r.food._id === post._id).length > 0 ? (
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {requests
                .filter((r) => r.food._id === post._id)
                .map((request) => (
                  <div
                    key={request._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {request.requester.avatarUrl ? (
                            <img
                              src={request.requester.avatarUrl}
                              alt={request.requester.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {request.requester.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Requested{" "}
                            {new Date(
                              request.food.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>

                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => acceptRequest(request._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                            >
                              <CheckIcon className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => rejectRequest(request._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                            >
                              <XIcon className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-6 text-center border-t border-gray-200">
              <p className="text-gray-500">No requests yet</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
