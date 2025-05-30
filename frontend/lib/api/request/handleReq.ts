import { Dispatch, SetStateAction } from "react";
import { FoodPost } from "@/components/cards/foods-card/FoodCard";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import axios from "axios";

export const handleRequest = async (
  food: FoodPost,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const token = await AuthToken();
  // console.log(token, "token");
  try {
    setLoading(true);
    const res = await axios.post(
      `${API_URL}/request`,
      { foodId: food._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.data;
    console.log(data.message, data.request);
    alert(data.message);
    // toast.success("Request sent! The donor will contact you shortly");
  } catch (err) {
    console.error(err);
    // toast.error("Try again");
    alert("Try again");
  } finally {
    setLoading(false);
  }
};
