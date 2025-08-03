"use client";

import { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import VideoSwiper from "./compo/VideoSwiper";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video", {
          headers: { "Content-Type": "application/json" },
        });

        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("application/json")) {
          throw new Error("Not a JSON response from /api/video");
        }

        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to load videos", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center items-center relative overflow-hidden">
      {/* Subtle Animated Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-800 to-gray-900 animate-gradient-x"
        style={{ filter: "blur(60px)", opacity: 0.7 }}
      />

      {/* Content (video swiper) */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        {loading ? (
          <p className="text-white text-center mt-20">Loading...</p>
        ) : videos.length > 0 ? (
          <VideoSwiper videos={videos} />
        ) : (
          <p className="text-white text-center mt-20">No videos found.</p>
        )}
      </div>
    </main>
  );
}
