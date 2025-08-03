"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FileUpload from "../compo/FileUpload";

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !videoUploaded || !thumbnailUploaded) {
      alert("All fields including video and thumbnail are required");
      return;
    }

    try {
      setUploading(true);
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl, thumbnailUrl })
      });

      if (!res.ok) throw new Error("Failed to upload video");

      alert("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setVideoUploaded(false);
      setThumbnailUploaded(false);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = (res: any) => {
    setVideoUrl(res.url);
    setVideoUploaded(true);
  };

  const handleThumbnailUpload = (res: any) => {
    setThumbnailUrl(res.url);
    setThumbnailUploaded(true);
  };

 return (
  <main className="min-h-screen bg-white flex flex-col items-start justify-start px-8 py-6">
    <h1 className="text-4xl font-bold text-indigo-700 mb-6">Upload to ImageKit ReelsPro</h1>

    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Left Side - Text Inputs */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mt-2">
          <button
            type="submit"
            disabled={!videoUploaded || !thumbnailUploaded}
            className={`w-full py-2 rounded-lg font-medium transition ${
              !videoUploaded || !thumbnailUploaded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Upload Video
          </button>

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
          )}
        </div>
      </div>

      {/* Right Side - Uploaders */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Video</label>
          <FileUpload onSuccess={handleVideoUpload} fileType="video" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Thumbnail</label>
          <FileUpload onSuccess={handleThumbnailUpload} fileType="image" />
        </div>
      </div>
    </form>
  </main>
);

}
