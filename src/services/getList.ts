import api from "../api/axios";

export interface ActionItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: number;
  createdAt: string;
}

export interface ActionsResponse {
  data: {
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
    data: ActionItem[];
  };
}

const API_URL = import.meta.env.VITE_API_GET_URL;

export const actionsService = {
  async getAdminList(pageNumber = 1, pageSize = 10): Promise<ActionsResponse> {
    const response = await api.get<ActionsResponse>(
      `${API_URL}/api/v1/actions/admin-list?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  },
};
