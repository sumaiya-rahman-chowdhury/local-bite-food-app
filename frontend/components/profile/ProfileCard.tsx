"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  MapPinIcon,
  MessageCircle,
  PencilIcon,
  PhoneIcon,
  StarIcon,
  Triangle,
  UserIcon,
} from "lucide-react";

interface UserProfileProps {
  profile: Profile;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  const { user, profileComplete } = profile;
  const router = useRouter();
  // if (!user) {
  //   router.push("/login");
  // }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {!profileComplete && (
        <Card className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <Triangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Complete Your Profile
              </h3>
              <p className="text-sm text-yellow-700">
                Some required information is missing. Please update your profile
                to access all features.
              </p>
              <Button
                variant="outline"
                className="mt-2 border-yellow-400 text-yellow-700 hover:bg-yellow-100"
                onClick={() => router.push(`/profile/${user._id}/edit`)}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-8 shadow-md rounded-xl border border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative w-[140px] h-[140px] bg-black rounded-xl border-4 border-[#FF8C42]">
            {user.avatarUrl && (
              <Image
                src={user?.avatarUrl}
                alt={user?.name}
                width={140}
                height={140}
                className="rounded-xl object-cover border-4 border-[#FF8C42] shadow-md bg-black"
              />
            )}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#4A8B2C] text-white px-3 py-1 rounded-full flex items-center shadow-md">
              <StarIcon className="h-4 w-4 mr-1 fill-current" />
              <span className="text-sm font-medium">
                {user?.stars?.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="border-[#4A8B2C] text-[#4A8B2C]"
                  >
                    {user?.role}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {user?.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <Button
                  className="bg-[#FF8C42] hover:bg-[#E67A30] text-white"
                  onClick={() => router.push(`/messages/${user._id}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  className="border-[#4A8B2C] text-[#4A8B2C] hover:bg-[#4A8B2C]/10"
                >
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/profile/${user._id}/edit`)}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* {user.bio && (
              <p className="mt-4 text-gray-600 leading-relaxed">{user.bio}</p>
            )} */}
          </div>
        </div>

        <Separator className="my-8 bg-gray-100" />

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-[#4A8B2C] flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              Work Details
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">
                  {user?.type === "hotel-owner"
                    ? "Food Donor"
                    : "Food Receiver"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p className="font-medium">
                  {user?.district?.name || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-[#4A8B2C] flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Contact Information
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{user?.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${user?.email}`}
                  className="font-medium text-[#FF8C42] hover:underline"
                >
                  {user?.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {user?.specificLocation || user?.location || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-[#4A8B2C] flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              About
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Skills/Interests</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#FF8C42]/10 text-[#FF8C42]">
                    {user?.type === "hotel-owner"
                      ? "Food Preparation"
                      : "Food Distribution"}
                  </Badge>
                  <Badge className="bg-[#4A8B2C]/10 text-[#4A8B2C]">
                    Community Service
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
