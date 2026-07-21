"use client";

import { useState } from "react";
import { mockProfile } from "@/data/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ProfileTabProps {
  onChange: () => void;
}

export function ProfileTab({ onChange }: ProfileTabProps) {
  const [profile, setProfile] = useState(mockProfile);

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [field]: value });
    onChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Profile Picture</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Upload a picture to make your profile stand out. PNG or JPG, max 5MB.
            </p>
            <Button variant="outline" size="sm" onClick={onChange} className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select
              value={profile.timezone}
              onValueChange={(val) => handleChange("timezone", val || "America/Los_Angeles")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="h-32 resize-none"
            placeholder="Tell us a little bit about yourself"
          />
          <p className="text-xs text-muted-foreground">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>
      </div>
    </div>
  );
}
