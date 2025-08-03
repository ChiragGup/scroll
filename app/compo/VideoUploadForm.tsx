"use client";
import { useState } from "react";

export default function UploadForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !thumbnail || !video) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    // Example: Send to your API route
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-indigo-600">Upload Video</h2>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Write something about the video..."
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700">Thumbnail (Image)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700">Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
