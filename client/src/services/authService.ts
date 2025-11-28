import { api } from "@/lib/api";
import { AuthResponse, LoginFormData, RegisterFormData } from "@/types/auth";

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterFormData): Promise<AuthResponse> => {
  try {
    const result = await api.post<{ success: boolean; status: number; message: string; data: { user: any; token: string } }>(
      "/auth/register",
      data as unknown as Record<string, unknown>
    );

    return {
      success: result.success || false,
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
};

/**
 * Login user
 */
export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const result = await api.post<{ success: boolean; status: number; message: string; user: any; token: string }>(
      "/auth/login",
      data as unknown as Record<string, unknown>
    );

    return {
      success: result.success || false,
      message: result.message || "",
      data: {
        user: result.user,
        token: result.token,
      },
    };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
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
};

/**
 * Change user password
 */
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<AuthResponse> => {
  try {
    const result = await api.put<{ success: boolean; status: number; message: string }>(
      "/auth/password/change",
      data as unknown as Record<string, unknown>
    );

    return {
      success: result.success || false,
      message: result.message || "",
      data: undefined,
    };
  } catch (error: unknown) {
    console.error("Change password error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Password change failed",
    };
  }
};

/**
 * Reset password (forgot password)
 */
export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const result = await api.post<{ success: boolean; status: number; message: string }>(
      "/auth/forgot",
      { email } as unknown as Record<string, unknown>
    );

    return {
      success: result.success || false,
      message: result.message || "",
      data: undefined,
    };
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Password reset failed",
    };
  }
};
