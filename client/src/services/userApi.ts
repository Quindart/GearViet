import { api } from "@/lib/api";
import { User, UpdateUserData } from "@/types/user";
import { UserResponse } from "@/types/api-response";

/**
 * Get user detail (own profile)
 */
export const getUserDetail = async (): Promise<User | null> => {
  try {
    const result = await api.get<UserResponse>("/user/detail");
    return result.user || null;
  } catch (error) {
    console.error("Get user detail error:", error);
    return null;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const result = await api.get<UserResponse>(`/user/${userId}`);
    return result.user || null;
  } catch (error) {
    console.error("Get user by ID error:", error);
    return null;
  }
};

/**
 * Edit user profile
 */
export const editUser = async (
  userId: string,
  data: UpdateUserData
): Promise<User | null> => {
  try {
    const result = await api.put<UserResponse>(
      `/user/${userId}`,
      data as unknown as Record<string, unknown>
    );
    return result.user || null;
  } catch (error) {
    console.error("Edit user error:", error);
    return null;
  }
};

