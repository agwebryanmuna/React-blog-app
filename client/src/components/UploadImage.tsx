import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../api/config/server";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useAuth } from "@clerk/clerk-react";

const authenticator = async (clerkToken: string | null) => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch(`${BASE_URL}/posts/upload-files`, {
      headers: {
        Authorization: `Bearer ${clerkToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    console.log("token", clerkToken);

    throw new Error("Authentication request failed");
  }
};

interface UploadImageProps {
  children: React.ReactNode;
  setData: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const UploadImage = ({ children, setData, setProgress }: UploadImageProps) => {
  const { getToken } = useAuth();
  const [isUploading, setIsUploading] = useState<Boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImageToImageKit = async () => {
    setIsUploading(true);
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.warn("Please select a file to upload");
      setIsUploading(false);
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      const token = await getToken();
      authParams = await authenticator(token);
    } catch (authError: any) {
      setIsUploading(false);
      console.log(authError);

      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });
      setData(uploadResponse.url as string);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);

        toast.error("Upload aborted!");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);

        toast.error(error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);

        toast.error("Upload failed! Please check your internet connection.");
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);

        toast.error("Upload failed! Server had some issues.");
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);

        toast.error("Could not upload image. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={uploadImageToImageKit}
        ref={fileInputRef}
      />

      <div onClick={() => fileInputRef.current?.click()}>
        {isUploading ? <div>Uploading image...</div> : children}
      </div>
    </div>
  );
};

export default UploadImage;
