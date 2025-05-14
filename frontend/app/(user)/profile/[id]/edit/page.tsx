"use client";

import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter } from "next/navigation"; // or 'next/navigation' for App Router
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API_URL from "@/lib/static/static";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { DistrictType, fetchDistricts } from "@/lib/api/district.ts/fetch";
import Loading from "@/components/loading/Loading";
import { Loader2Icon, UploadIcon, UserIcon } from "lucide-react";

interface FormValues {
  name: string;
  phone: string;
  location: string;
  specificLocation: string;
  type: "buyer" | "hotel-owner";
  email: string;
  avatarUrl?: string;
  district?: string;
}

export default function EditProfilePage() {
  const [districts, setDistricts] = useState<DistrictType[] | []>([]);
  const { setUser } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const res = await axios.get(`${API_URL}/profile`, {
          withCredentials: true,
        });
        const user = res.data.user;
        setValue("name", user.name);
        setValue("phone", user.phone || "");
        setValue("location", user.location || "");
        setValue("specificLocation", user.specificLocation || "");
        setValue("type", user.type || "buyer");
        setValue("email", user.email || "");
        setValue("avatarUrl", user.avatarUrl || "");
        setValue("district", user.district?._id || "");
      };
      fetchUser();
    }
  }, [id, setValue]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(`${API_URL}/upload-images/profile-picture`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      const imageUrl = data.url;
      console.log(imageUrl);
      setValue("avatarUrl", imageUrl);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };
  useEffect(() => {
    const districts = async () => {
      const data = await fetchDistricts();
      setDistricts(data);
    };
    districts();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setUser(null);
    const response = await axios.put(`${API_URL}/profile`, data, {
      withCredentials: true,
    });
    setUser(response.data);
    router.push(`/profile/`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-[#FF8C42]">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name & Phone - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name" className="text-[#4A8B2C]">
              Name*
            </Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="mt-1 focus:ring-[#FF8C42]"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-[#4A8B2C]">
              Phone
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              className="mt-1 focus:ring-[#FF8C42]"
            />
          </div>
        </div>

        {/* Address Row - District, Location, Specific Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <Label htmlFor="district" className="text-[#4A8B2C]">
              District
            </Label>
            {districts.length > 0 ? (
              <select
                id="district"
                {...register("district")}
                className="w-full mt-1 border rounded-md p-2 focus:ring-[#FF8C42]"
              >
                <option value="">Select district</option>
                {districts.map((district) => (
                  <option key={district._id} value={district._id}>
                    {district.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="mt-1">
                <Loading />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="location" className="text-[#4A8B2C]">
              Location
            </Label>
            <Input
              id="location"
              {...register("location")}
              className="mt-1 focus:ring-[#FF8C42]"
              placeholder="City/Area"
            />
          </div>

          <div>
            <Label htmlFor="specificLocation" className="text-[#4A8B2C]">
              Specific
            </Label>
            <Input
              id="specificLocation"
              {...register("specificLocation")}
              className="mt-1 focus:ring-[#FF8C42]"
              placeholder="Street/Landmark"
            />
          </div>
        </div>

        {/* Email & User Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="email" className="text-[#4A8B2C]">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              className="mt-1 focus:ring-[#FF8C42]"
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-[#4A8B2C]">
              User Type
            </Label>
            <select
              id="type"
              {...register("type")}
              className="w-full mt-1 border rounded-md p-2 focus:ring-[#FF8C42]"
            >
              <option value="buyer">Food Receiver</option>
              <option value="hotel-owner">Food Donor</option>
            </select>
          </div>
        </div>

        {/* Profile Picture */}
        <div>
          <Label htmlFor="avatar" className="text-[#4A8B2C]">
            Profile Picture
          </Label>
          <div className="flex items-center gap-4 mt-1">
            <label className="flex-1">
              <div className="hidden">
                <Input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="border-2 border-dashed border-[#4A8B2C] rounded-md p-3 text-center cursor-pointer hover:bg-[#4A8B2C]/5">
                <UploadIcon className="mx-auto h-6 w-6 text-[#4A8B2C]" />
                <p className="text-sm mt-1">Click to upload</p>
              </div>
            </label>
            <div className="flex-shrink-0">
              {watch("avatarUrl") ? (
                <Image
                  src={watch("avatarUrl") as string}
                  alt="Preview"
                  width={180}
                  height={180}
                  className=" border-2 border-[#FF8C42]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-2 bg-[#FF8C42] hover:bg-[#E67A30] text-white mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
}
