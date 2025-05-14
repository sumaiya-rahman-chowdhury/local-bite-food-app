import UserProfile from "@/components/profile/ProfileCard";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import { cookies } from "next/headers";

export default async function page() {
  // const cookieStorie = await cookies();
  // console.log(cookieStorie);
  // const token = cookieStorie.get("token")?.value;
  const token = await AuthToken();
  const profileRes = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const profile = await profileRes.json();
  console.log(profile);

  return (
    <div>
      <UserProfile profile={profile} />{" "}
    </div>
  );
}

// export default page;
