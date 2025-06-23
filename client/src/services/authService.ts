import { api } from "@/lib/api";
import { AuthResponse, LoginFormData, RegisterFormData } from "@/types/auth";

class AuthService {
  async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      const result = await api.post<AuthResponse["data"]>(
        "/auth/register",
        data as unknown as Record<string, unknown>
      );

      return {
        success: result.success,
        message: result.message || "",
        data: result.data,
      };
    } catch (error: unknown) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
      };
    }
  }

  async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      const result = await api.post<AuthResponse["data"]>(
        "/auth/login",
        data as unknown as Record<string, unknown>
      );

      return {
        success: result.success,
        message: result.message || "",
        data: result.data,
      };
    } catch (error: unknown) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  }

  async logout(): Promise<void> {
    try {
      // Optional: Call logout endpoint to invalidate token on server
      try {
        await api.post("/auth/logout");
      } catch (error) {
        console.error("Server logout error:", error);
        // Continue with local logout even if server logout fails
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Remove these methods as Zustand store will handle token management
  // getToken, getCurrentUser, isAuthenticated methods are no longer needed
}

export const authService = new AuthService();
export default authService;
