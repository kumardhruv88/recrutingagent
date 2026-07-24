import { apiClient } from "@/lib/api";

export interface Job {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  status: string;
  created_at: string;
  description?: string | null;
  requirements?: string[] | null;
  responsibilities?: string[] | null;
  benefits?: string[] | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  headcount?: number | null;
  applications_count?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

export const jobService = {
  getJobs: async (params?: any): Promise<PaginatedResponse<Job>> => {
    const response = await apiClient.get("/jobs", { params });
    return response.data;
  },

  getJob: async (id: string): Promise<Job> => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.post("/jobs", data);
    return response.data;
  },

  updateJob: async (id: string, data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.patch(`/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  }
};
