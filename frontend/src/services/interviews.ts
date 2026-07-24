import { apiClient } from "@/lib/api";
import { Application } from "./applications";
import { Job } from "./jobs";

export interface Interview {
  id: string;
  application_id: string;
  interviewer_id: string;
  scheduled_at: string;
  duration_minutes: number;
  interview_type: string;
  status: string;
  meeting_url?: string | null;
  feedback?: string | null;
  score?: number | null;
  created_at: string;
  updated_at: string;
  application?: Application;
}

export const interviewService = {
  getInterviews: async (params?: any): Promise<Interview[]> => {
    const response = await apiClient.get("/interviews", { params });
    return response.data;
  },

  getInterview: async (id: string): Promise<Interview> => {
    const response = await apiClient.get(`/interviews/${id}`);
    return response.data;
  },

  scheduleInterview: async (data: any): Promise<Interview> => {
    const response = await apiClient.post("/interviews", data);
    return response.data;
  },

  rescheduleInterview: async (id: string, data: any): Promise<Interview> => {
    const response = await apiClient.post(`/interviews/${id}/reschedule`, data);
    return response.data;
  },

  cancelInterview: async (id: string): Promise<Interview> => {
    const response = await apiClient.post(`/interviews/${id}/cancel`);
    return response.data;
  },

  submitFeedback: async (id: string, data: any): Promise<Interview> => {
    const response = await apiClient.post(`/interviews/${id}/feedback`, data);
    return response.data;
  }
};
