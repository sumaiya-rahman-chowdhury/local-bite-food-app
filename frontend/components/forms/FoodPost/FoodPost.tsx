"use client";
import { AuthToken } from "@/lib/cookie";
import API_URL from "@/lib/static/static";
import axios from "axios";
import { Loader2Icon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  foodPic: FileList;
  quantity: number;
  type: "paid" | "donation";
  title: string;
  description: string;
  price: number;
};

const FoodPostForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    const token = await AuthToken();
    console.log(token);
    try {
      const imageFormData = new FormData();
      imageFormData.append("image", data.foodPic[0]);
      const uploadRes = await axios.post(
        `${API_URL}/upload-images/food-picture`,
        imageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const uploadData = await uploadRes.data;
      console.log(uploadData);
      if (!uploadRes || !uploadData.url) {
        throw new Error("Image upload failed");
      }
      const imageUrl = uploadData.url;
      const foodCardData = {
        imageUrl,
        quantity: Number(data.quantity),
        type: data.type,
        title: data.title,
        description: data.description,
        price: data.type === "paid" ? Number(data.price) : 0,
      };
      console.log(foodCardData);
      const postRes = axios.post(
        `${API_URL}/food-marketplace/post`,
        foodCardData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(foodCardData);

      // const postRes = await fetch(`${API_URL}/food-marketplace/post`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   credentials: "include",
      //   body: JSON.stringify(foodCardData),
      // });
      if (!postRes) {
        throw new Error("Failed to post food");
      }

      alert("Food posted successfully!");
      router.push("/");
      reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black"
    >
      {/* Food Picture */}
      <div>
        <label className="block text-sm font-medium text-[#4A8B2C] mb-2">
          Food Picture <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <label className="flex-1 cursor-pointer">
            <div className="hidden">
              <input
                type="file"
                accept="image/*"
                {...register("foodPic", { required: true })}
              />
            </div>
            <div className="border-2 border-dashed border-[#4A8B2C] rounded-lg p-4 text-center hover:bg-[#4A8B2C]/5 transition-colors">
              <UploadIcon className="mx-auto h-8 w-8 text-[#4A8B2C] mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload food photo
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG or PNG (max 5MB)
              </p>
            </div>
          </label>
          {watch("foodPic")?.[0] && (
            <div className="flex-shrink-0">
              <Image
                src={URL.createObjectURL(watch("foodPic")[0])}
                alt="Food preview"
                width={80}
                height={80}
                className="rounded-lg object-cover border border-[#FF8C42]"
              />
            </div>
          )}
        </div>
        {errors.foodPic && (
          <p className="mt-1 text-sm text-red-600">
            Please upload a food photo
          </p>
        )}
      </div>

      {/* Quantity and Type - Inline on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-[#4A8B2C] mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              {...register("quantity", { required: true, min: 1 })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42] px-4 py-2 border"
              placeholder="0"
              min="1"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">
              servings
            </span>
          </div>
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              Enter a valid quantity (min 1)
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-[#4A8B2C] mb-2">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("type", { required: true })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42] px-4 py-2 border"
          >
            <option value="">Select type</option>
            <option value="paid">Paid</option>
            <option value="donation">Donation</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">Please select a type</p>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[#4A8B2C] mb-2">
          Food Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42] px-4 py-2 border"
          placeholder="e.g. Fresh homemade pasta"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">Please enter a title</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[#4A8B2C] mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description", { required: true })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42] px-4 py-2 border"
          rows={4}
          placeholder="Describe the food (ingredients, dietary info, etc.)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            Please enter a description
          </p>
        )}
      </div>
      {/* Price (only shown if type is "paid") */}
      {watch("type") === "paid" && (
        <div>
          <label className="block text-sm font-medium text-[#4A8B2C] mb-2">
            Price (in ₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("price", {
              required: watch("type") === "paid",
              min: 1,
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42] px-4 py-2 border"
            placeholder="e.g. 150"
            min="1"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">Enter a valid price</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#FF8C42] hover:bg-[#E67A30] text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8C42]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
            Posting...
          </span>
        ) : (
          "Post Food"
        )}
      </button>
    </form>
  );
};

export default FoodPostForm;
