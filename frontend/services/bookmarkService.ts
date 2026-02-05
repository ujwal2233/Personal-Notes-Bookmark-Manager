import api from './api';
import { Bookmark, ApiResponse } from '@/types';

export const bookmarkService = {
  async getAll(params?: { q?: string; tags?: string; favorite?: string }): Promise<Bookmark[]> {
    const response = await api.get<ApiResponse<Bookmark[]>>('/bookmarks', { params });
    return response.data.data;
  },

  async getById(id: string): Promise<Bookmark> {
    const response = await api.get<ApiResponse<Bookmark>>(`/bookmarks/${id}`);
    return response.data.data;
  },

  async create(data: {
    url: string;
    title?: string;
    description?: string;
    tags?: string[];
    isFavorite?: boolean;
  }): Promise<Bookmark> {
    const response = await api.post<ApiResponse<Bookmark>>('/bookmarks', data);
    return response.data.data;
  },

  async update(
    id: string,
    data: {
      url?: string;
      title?: string;
      description?: string;
      tags?: string[];
      isFavorite?: boolean;
    }
  ): Promise<Bookmark> {
    const response = await api.put<ApiResponse<Bookmark>>(`/bookmarks/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/bookmarks/${id}`);
  },
};
