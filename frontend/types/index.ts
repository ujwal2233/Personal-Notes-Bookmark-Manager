export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  userId: string;
  createdAt: string;
}

export interface Bookmark {
  _id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
  userId: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}
