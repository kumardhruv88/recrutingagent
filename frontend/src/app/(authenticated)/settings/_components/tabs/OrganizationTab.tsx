"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService, Organization } from "@/services/organizations";
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
  const queryClient = useQueryClient();
  const { data: currentOrg, isLoading } = useQuery({
    queryKey: ["currentOrganization"],
    queryFn: () => organizationService.getCurrentOrganization()
  });

  const updateOrgMutation = useMutation({
    mutationFn: (data: Partial<Organization>) => organizationService.updateOrganization(currentOrg!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentOrganization"] });
      onChange();
    }
  });

  const [orgData, setOrgData] = useState<Partial<Organization>>({});

  useEffect(() => {
    if (currentOrg) {
      setOrgData({
        name: currentOrg.name,
        size: currentOrg.size,
        logo_url: currentOrg.logo_url,
        industry: currentOrg.industry,
        website: currentOrg.website,
      });
    }
  }, [currentOrg]);

  const handleChange = (field: keyof Organization, value: string) => {
    setOrgData(prev => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleSave = () => {
    if (currentOrg) {
      updateOrgMutation.mutate(orgData);
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">Loading organization settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Organization</h3>
          <p className="text-sm text-muted-foreground">
            Manage your company details and global workspace settings.
          </p>
        </div>
        <Button onClick={handleSave} disabled={updateOrgMutation.isPending}>
          {updateOrgMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="h-24 w-24 border rounded-xl overflow-hidden flex items-center justify-center bg-card shadow-sm p-4 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={orgData.logo_url || "https://ui-avatars.com/api/?name=" + (orgData.name || "Org")} alt={orgData.name || "Organization Logo"} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-medium">Company Logo</h4>
            <p className="text-xs text-muted-foreground max-w-sm">
              This logo will be displayed on candidate-facing portals. Transparent PNG recommended.
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={() => { /* Not implemented file upload */ }}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input
              id="orgName"
              value={orgData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Team Size</Label>
            <Select
              value={orgData.size || ""}
              onValueChange={(val) => handleChange("size", val || "")}
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
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={orgData.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={orgData.industry || ""}
              onChange={(e) => handleChange("industry", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Departments</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">
              + Add Department
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Default Hiring Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border rounded-xl bg-card shadow-sm">
            <div className="space-y-2">
              <Label>Default Currency (for Salary)</Label>
              <Select
                value={"USD"}
                onValueChange={() => {}}
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
                value={45}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
