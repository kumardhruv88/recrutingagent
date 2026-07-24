import { apiClient } from "@/lib/api";

export interface NotificationLog {
  id: string;
  organization_id: string;
  channel: string;
  recipient: string;
  subject: string;
  template_name?: string | null;
  status: string;
  error_message?: string | null;
  sent_at?: string | null;
  created_at: string;
  updated_at: string;
}

export const notificationService = {
  getNotifications: async (status?: string): Promise<NotificationLog[]> => {
    const params = status ? { status } : {};
    const response = await apiClient.get("/notifications", { params });
    return response.data;
  },

  getNotification: async (id: string): Promise<NotificationLog> => {
    const response = await apiClient.get(`/notifications/${id}`);
    return response.data;
  },

  retryNotification: async (id: string): Promise<NotificationLog> => {
    const response = await apiClient.post(`/notifications/${id}/retry`);
    return response.data;
  },
};
