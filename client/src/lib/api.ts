import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface FetchOptions extends RequestInit {
  data?: Record<string, unknown> | FormData | string;
}

async function fetchWithAuth<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Get token from Zustand store instead of localStorage (only on client)
  try {
    if (typeof window !== 'undefined') {
      const token = useAuthStore.getState().token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.warn("Failed to get auth token:", error);
  }

  const { data, ...restOptions } = options;

  const config: RequestInit = {
    ...restOptions,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "API request failed");
  }

  return result;
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions): Promise<T> =>
    fetchWithAuth<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    data?: Record<string, unknown>,
    options?: FetchOptions
  ): Promise<T> =>
    fetchWithAuth<T>(endpoint, { ...options, method: "POST", data }),

  put: <T>(
    endpoint: string,
    data?: Record<string, unknown>,
    options?: FetchOptions
  ): Promise<T> =>
    fetchWithAuth<T>(endpoint, { ...options, method: "PUT", data }),

  delete: <T>(
    endpoint: string,
    data?: Record<string, unknown>,
    options?: FetchOptions
  ): Promise<T> =>
    fetchWithAuth<T>(endpoint, { ...options, method: "DELETE", data }),

  upload: async <T>(
    endpoint: string,
    formData: FormData
  ): Promise<T> => {
    const headers: Record<string, string> = {};

    // Get token from Zustand store instead of localStorage (only on client)
    try {
      if (typeof window !== 'undefined') {
        const token = useAuthStore.getState().token;
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.warn("Failed to get auth token:", error);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Upload failed");
    }

    return result;
  },
};
