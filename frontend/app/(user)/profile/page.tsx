// import UserProfile from "@/components/profile/ProfileCard";
// import { getProfile } from "@/lib/api/profile/profile";
import API_URL from "@/lib/static/static";
// import axios from "axios";

async function page() {
  const profile = await fetch(`${API_URL}/profile`, {
    credentials: "include",
  })
  console.log(profile);
  return (
    <div>
      {/* <UserProfile profile={profile} /> */}
    </div>
  );
}

export default page;
