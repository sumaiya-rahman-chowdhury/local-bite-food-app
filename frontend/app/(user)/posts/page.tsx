import MyPosts from "@/components/posts/MyPosts";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  // console.log(API_URL);
  const token = await AuthToken();
  if (!token) {
    redirect("/login");
  }
  const response = await axios.get(`${API_URL}/request`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  // console.log(data);
  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Posts & Requests</h1>
      <MyPosts posts={data.posts} requests={data.requests} />
    </div>
  );
}
