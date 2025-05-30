import MyPosts from "@/components/posts/MyPosts";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import axios from "axios";
import { revalidatePath } from "next/cache";
import React from "react";

export default async function page() {
  // console.log(API_URL);
  const token = await AuthToken();
  const response = await axios.get(`${API_URL}/request`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  // console.log(data);
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
    revalidatePath("/posts");
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
    // Optionally re-fetch or update local state
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Posts & Requests</h1>
      <MyPosts posts={data.posts} requests={data.requests} />
    </div>
  );
}
