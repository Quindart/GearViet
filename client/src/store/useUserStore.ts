import { create } from 'zustand';
import { api } from '@/lib/api';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface LoginValues {
  username: string;
  password: string;
}

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (values: LoginValues) => Promise<void>;
  register: (values: RegisterValues) => Promise<void>;
  logout: () => void;
  updateProfile: (userId: string, data: Partial<User>) => Promise<void>;
}

const toRecord = <T>(obj: T): Record<string, unknown> => {
  return Object.entries(obj as Record<string, unknown>).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (values) => {
    try {
      const response = await api.post<{ user: User; token: string }>(
        '/auth/login',
        toRecord(values)
      );
      if (response.success && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (values) => {
    try {
      const response = await api.post<{ user: User; token: string }>(
        '/auth/register',
        toRecord(values)
      );
      if (response.success && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (userId, data) => {
    try {
      const response = await api.put<{ user: User }>(
        `/user/${userId}`,
        toRecord(data)
      );
      if (response.success && response.data) {
        set({ user: response.data.user });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },
})); 