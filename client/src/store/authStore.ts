import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserDetail } from "@/services/userApi";
import { logoutUser } from "@/services/authService";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        try {
          await logoutUser();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        }
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      refreshUser: async () => {
        const { isAuthenticated } = get();
        if (!isAuthenticated) return;

        set({ isLoading: true });
        try {
          const userData = await getUserDetail();
          if (userData) {
            set({ user: userData as unknown as User });
          }
        } catch (error) {
          console.error("Refresh user error:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      initialize: async () => {
        const { token, isAuthenticated } = get();
        if (token && isAuthenticated) {
          await get().refreshUser();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
