"use client";

import { useState } from "react";
import { mockOrganization } from "@/data/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OrganizationTabProps {
  onChange: () => void;
}

export function OrganizationTab({ onChange }: OrganizationTabProps) {
  const [org, setOrg] = useState(mockOrganization);

  const handleChange = (field: keyof typeof org, value: string) => {
    setOrg({ ...org, [field]: value });
    onChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Organization</h3>
        <p className="text-sm text-muted-foreground">
          Manage your company details and global workspace settings.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 border rounded-xl overflow-hidden flex items-center justify-center bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={org.logo} alt={org.name} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Company Logo</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              This logo will be displayed on candidate-facing portals. Transparent PNG recommended.
            </p>
            <Button variant="outline" size="sm" onClick={onChange} className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input
              id="orgName"
              value={org.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Team Size</Label>
            <Select
              value={org.teamSize}
              onValueChange={(val) => handleChange("teamSize", val || "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-100">51-100 employees</SelectItem>
                <SelectItem value="100-500">100-500 employees</SelectItem>
                <SelectItem value="500+">500+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Headquarters Address</Label>
            <Input
              id="address"
              value={org.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Departments</Label>
          <div className="flex flex-wrap gap-2">
            {org.departments.map((dept) => (
              <Badge key={dept} variant="secondary" className="px-3 py-1 text-sm">
                {dept}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">
              + Add Department
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Default Hiring Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-xl bg-muted/50">
            <div className="space-y-2">
              <Label>Default Currency (for Salary)</Label>
              <Select
                value={org.hiringPreferences.defaultCurrency}
                onValueChange={(val) => {
                  setOrg({
                    ...org,
                    hiringPreferences: { ...org.hiringPreferences, defaultCurrency: val || "USD" },
                  });
                  onChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default Interview Duration (mins)</Label>
              <Input
                type="number"
                value={org.hiringPreferences.interviewDuration}
                onChange={(e) => {
                  setOrg({
                    ...org,
                    hiringPreferences: { ...org.hiringPreferences, interviewDuration: Number(e.target.value) },
                  });
                  onChange();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
