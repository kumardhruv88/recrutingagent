import { apiClient } from "@/lib/api";
import { PaginatedResponse } from "./jobs";
import { Candidate } from "./candidates";
import { Job } from "./jobs";

export interface ApplicationNote {
  id: string;
  application_id: string;
  author_id: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

export interface ApplicationTimelineEvent {
  id: string;
  application_id: string;
  event_type: string;
  title: string;
  description: string;
  created_by?: string;
  created_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  current_stage: string;
  ai_match_score?: number | null;
  status: string;
  applied_at: string;
  updated_at: string;
  rejection_reason?: string | null;
  candidate?: Candidate;
  job?: Job;
}

export const applicationService = {
  getApplications: async (params?: any): Promise<PaginatedResponse<Application>> => {
    const response = await apiClient.get("/applications", { params });
    return response.data;
  },

  getApplication: async (id: string): Promise<Application> => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data;
  },

  createApplication: async (data: Partial<Application>): Promise<Application> => {
    const response = await apiClient.post("/applications", data);
    return response.data;
  },

  updateApplication: async (id: string, data: Partial<Application>): Promise<Application> => {
    const response = await apiClient.patch(`/applications/${id}`, data);
    return response.data;
  },

  updateApplicationStage: async (id: string, stage: string): Promise<Application> => {
    const response = await apiClient.patch(`/applications/${id}/stage`, { stage });
    return response.data;
  },

  deleteApplication: async (id: string): Promise<void> => {
    await apiClient.delete(`/applications/${id}`);
  },

  getNotes: async (id: string): Promise<ApplicationNote[]> => {
    const response = await apiClient.get(`/applications/${id}/notes`);
    return response.data;
  },

  addNote: async (id: string, data: Partial<ApplicationNote>): Promise<ApplicationNote> => {
    const response = await apiClient.post(`/applications/${id}/notes`, data);
    return response.data;
  },

  getTimeline: async (id: string): Promise<ApplicationTimelineEvent[]> => {
    const response = await apiClient.get(`/applications/${id}/timeline`);
    return response.data;
  }
};
