import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { toast } from "sonner";
import { makeRequest } from "./makeRequest";
import { getErrorMessage } from "./utils";

export interface UploadResult {
  url: string;
  fileId: string;
  name: string;
}

interface UploadOptions {
  file: File;
  onProgress?: (progress: number) => void;
  abortSignal?: AbortSignal;
  folder?: string;
  fileNamePrefix?: string;
}

/**
 * Fetch ImageKit auth parameters from backend
 */
const authenticate = async () => {
  try {
    const res = await makeRequest.get("/imagekit-auth");
    return res.data as {
      signature: string;
      expire: number;
      token: string;
      publicKey: string;
    };
  } catch (error) {
    toast.error(getErrorMessage(error));
    throw error;
  }
};

/**
 * Reusable ImageKit upload function for a single file
 */
export async function uploadFile(
  options: UploadOptions
): Promise<UploadResult> {
  const { file, onProgress, abortSignal, fileNamePrefix } = options;

  const { signature, expire, token, publicKey } = await authenticate();

  try {
    const response = await upload({
      file,
      fileName: fileNamePrefix ? `${fileNamePrefix}-${file.name}` : file.name,
      publicKey,
      expire,
      token,
      signature,
      abortSignal,
      onProgress: (event) => {
        if (onProgress && event.total) {
          onProgress((event.loaded / event.total) * 100);
        }
      },
    });

    if (!response.url || !response.fileId || !response.name) {
      throw new Error("Invalid upload response from ImageKit");
    }

    return {
      url: response.url,
      fileId: response.fileId,
      name: response.name,
    };
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      throw new Error("Upload aborted");
    }
    if (error instanceof ImageKitInvalidRequestError) {
      throw new Error(error.message);
    }
    if (error instanceof ImageKitUploadNetworkError) {
      throw new Error("Network error during upload");
    }
    if (error instanceof ImageKitServerError) {
      throw new Error("ImageKit server error");
    }
    throw error;
  }
}
