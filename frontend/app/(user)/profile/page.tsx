import UserProfile from "@/components/profile/ProfileCard";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import { redirect } from "next/navigation";

export default async function page() {
  const token = await AuthToken();
  const profileRes = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
  const profile = await profileRes.json();
  console.log(profile);
  if (!profile || !profile.user) {
    redirect("/login");
  }
  return (
    <div>
      <UserProfile profile={profile} />{" "}
    </div>
  );
}

// export default page;
