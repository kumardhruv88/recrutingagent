import { apiClient } from "@/lib/api";
import { PaginatedResponse } from "./jobs";

export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  current_title?: string | null;
  current_company?: string | null;
  years_of_experience?: number | null;
  status: string;
  source?: string | null;
  created_at: string;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  skills?: string[] | null;
  notes?: string | null;
  resume_url?: string | null;
}

export const candidateService = {
  getCandidates: async (params?: any): Promise<PaginatedResponse<Candidate>> => {
    const response = await apiClient.get("/candidates", { params });
    return response.data;
  },

  getCandidate: async (id: string): Promise<Candidate> => {
    const response = await apiClient.get(`/candidates/${id}`);
    return response.data;
  },

  createCandidate: async (data: Partial<Candidate>): Promise<Candidate> => {
    const response = await apiClient.post("/candidates", data);
    return response.data;
  },

  updateCandidate: async (id: string, data: Partial<Candidate>): Promise<Candidate> => {
    const response = await apiClient.patch(`/candidates/${id}`, data);
    return response.data;
  },

  deleteCandidate: async (id: string): Promise<void> => {
    await apiClient.delete(`/candidates/${id}`);
  }
};
