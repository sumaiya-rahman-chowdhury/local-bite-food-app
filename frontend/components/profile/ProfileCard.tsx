import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/lib/types";

interface UserProfileProps {
  profile: Profile;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Image
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.name}
            width={120}
            height={120}
            className="rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
            <p className="text-sm text-muted-foreground">{profile.location}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-medium">{profile.stars}</span>
              <div className="flex gap-1">
                
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="default">Send Message</Button>
              <Button variant="secondary">Contacts</Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Work</h4>
            {profile.type}
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Contact Information</h4>
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p>
              <strong>Site:</strong> {profile.location}
            </p>
            <p>
              <strong>Address:</strong> {profile.specificLocation}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${profile.email}`} className="text-blue-600">
                {profile.email}
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Basic Information</h4>
            <p>
              {/* <strong>Birthday:</strong> {profile.birthday} */}
            </p>
            <p>
              {/* <strong>Gender:</strong> {profile.} */}
            </p>
            <h4 className="text-lg font-medium mt-4 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
                <Badge >{profile.type}</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
