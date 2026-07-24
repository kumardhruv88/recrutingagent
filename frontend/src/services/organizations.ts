import { apiClient } from "@/lib/api";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  website?: string | null;
  industry?: string | null;
  size?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export const organizationService = {
  getCurrentOrganization: async (): Promise<Organization> => {
    // The backend uses auth context to return current org
    const response = await apiClient.get("/organizations/current");
    return response.data;
  },

  getMembers: async (orgId: string): Promise<OrganizationMember[]> => {
    const response = await apiClient.get(`/organizations/${orgId}/members`);
    return response.data;
  },

  updateOrganization: async (id: string, data: Partial<Organization>): Promise<Organization> => {
    const response = await apiClient.patch(`/organizations/${id}`, data);
    return response.data;
  }
};
