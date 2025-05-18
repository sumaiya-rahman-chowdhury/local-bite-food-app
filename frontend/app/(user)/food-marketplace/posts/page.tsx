"use client";
import FoodCard, { FoodPost } from "@/components/cards/foods-card/FoodCard";
import Loading from "@/components/loading/Loading";
import API_URL from "@/lib/static/static";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search as SearchIcon,
  ChevronDown as ChevronDownIcon,
  XIcon,
} from "lucide-react";
import Pagination from "@/components/pagination/Pagination";

const FoodList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [foods, setFoods] = useState([]);
  const [postedBy, setPostedBy] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateURLParams();
    fetchFoods();
  }, [search, type, page]);

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type) params.set("type", type);
    if (postedBy) params.set("postedBy", postedBy);
    params.append("page", page.toString());
    params.append("limit", "10");
    router.push(`/food-marketplace/posts?${params.toString()}`);
  };

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (search) {
        queryParams.append("search", search);
      }
      if (type) queryParams.append("type", type);
      if (postedBy) queryParams.append("postedBy", postedBy);
      queryParams.append("page", page.toString());
      queryParams.append("limit", "10");
      const res = await axios.get(
        `${API_URL}/food-marketplace/post?${queryParams.toString()}`,
        {
          withCredentials: true,
        }
      );
      setFoods(res.data.foodPosts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(foods);
  return (
    <>
      <div className="mx-auto space-y-4 ">
        {/* Filters */}
        <div className="max-w-3xs md:max-w-3xl md:flex gap-4 my-6 mx-auto">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search foods (e.g. 'vegetables', 'bread')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="relative w-48">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A8B2C] focus:border-transparent text-gray-700 cursor-pointer transition-all"
            >
              <option value="">All Types</option>
              <option value="paid">Paid Foods</option>
              <option value="donation">Free Donations</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Food List */}
        {loading ? (
          <div className="h-screen w-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full 
          justify-center items-center 
          "
          >
            {foods?.map((food: FoodPost) => {
              return <FoodCard key={food._id} food={food} />;
            })}
          </div>
        )}
        {!loading && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  );
};
export default FoodList;
