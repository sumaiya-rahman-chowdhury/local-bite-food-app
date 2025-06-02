import FoodPostForm from "@/components/forms/FoodPost/FoodPost";
import { AuthToken } from "@/lib/cookie";
import { redirect } from "next/navigation";

export default async function page() {
  const token = await AuthToken();
  if (!token) {
    redirect("/login");
  }
  return (
    <div>
      <FoodPostForm />
    </div>
  );
}
