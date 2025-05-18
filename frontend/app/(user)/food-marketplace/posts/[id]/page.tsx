import FoodPostDetails from "@/components/details/FoodDetails";
import API_URL from "@/lib/static/static";
import axios from "axios";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  //   console.log(id);
  const details = await axios.get(`${API_URL}/food-marketplace/post/${id}`);
  const food = await details.data;
  console.log(food);
  return (
    <div>
      <FoodPostDetails food={food} />
    </div>
  );
}

export default page;
