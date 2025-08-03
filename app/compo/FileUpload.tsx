"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({
  onSuccess,
  onProgress,
  fileType = "video",
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Validate file type and size
  const validateFile = (file: File): boolean => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100MB.");
      return false;
    }
    return true;
  };

  // ✅ Handle file input change and perform upload
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      console.info("[UPLOAD_SUCCESS]", res);
      onSuccess(res);
    } catch (err) {
      console.error("[UPLOAD_ERROR]", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="btn btn-primary cursor-pointer">
        Select {fileType} File
        <input
          type="file"
          className="hidden"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
        />
      </label>

      {uploading && (
        <div className="flex items-center gap-2">
          <span className="loading loading-spinner text-primary" />
          <span className="text-sm text-primary">Uploading...</span>
        </div>
      )}

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default FileUpload;
