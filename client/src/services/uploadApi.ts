import { api } from "@/lib/api";

export interface UploadResponse {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
}

/**
 * Upload single file
 */
export const uploadFile = async (file: File): Promise<UploadResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const result = await api.upload<UploadResponse>('/upload', formData);
    return result.data || null;
  } catch (error) {
    console.error("Upload file error:", error);
    return null;
  }
};

/**
 * Upload multiple files
 */
export const uploadFiles = async (files: File[]): Promise<UploadResponse[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const result = await api.upload<UploadResponse[]>('/upload', formData);
    return result.data || [];
  } catch (error) {
    console.error("Upload files error:", error);
    return [];
  }
};

/**
 * Upload image with specific constraints
 */
export const uploadImage = async (
  file: File,
  options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  }
): Promise<UploadResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    if (options?.maxWidth) {
      formData.append('maxWidth', options.maxWidth.toString());
    }
    if (options?.maxHeight) {
      formData.append('maxHeight', options.maxHeight.toString());
    }
    if (options?.quality) {
      formData.append('quality', options.quality.toString());
    }

    const result = await api.upload<UploadResponse>('/upload/image', formData);
    return result.data || null;
  } catch (error) {
    console.error("Upload image error:", error);
    return null;
  }
};
