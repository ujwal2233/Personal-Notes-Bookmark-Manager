import api from './api';
import { Note, ApiResponse } from '@/types';

export const noteService = {
  async getAll(params?: { q?: string; tags?: string; favorite?: string }): Promise<Note[]> {
    const response = await api.get<ApiResponse<Note[]>>('/notes', { params });
    return response.data.data;
  },

  async getById(id: string): Promise<Note> {
    const response = await api.get<ApiResponse<Note>>(`/notes/${id}`);
    return response.data.data;
  },

  async create(data: {
    title: string;
    content: string;
    tags?: string[];
    isFavorite?: boolean;
  }): Promise<Note> {
    const response = await api.post<ApiResponse<Note>>('/notes', data);
    return response.data.data;
  },

  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
      tags?: string[];
      isFavorite?: boolean;
    }
  ): Promise<Note> {
    const response = await api.put<ApiResponse<Note>>(`/notes/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
  },
};
