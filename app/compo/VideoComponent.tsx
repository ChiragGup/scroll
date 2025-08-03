import { useRef, useState } from "react";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="relative w-full h-full rounded-lg overflow-hidden bg-black cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover"
       
        loop
        playsInline
        autoPlay
      />

      {/* Optional overlay showing play/pause status */}
      {!isPlaying && (
        <div className="absolute inset-0 flex justify-center items-center text-white text-4xl bg-black bg-opacity-40">
          ►
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
        <h3 className="font-semibold text-lg line-clamp-1">{video.title}</h3>
        <p className="text-sm line-clamp-2 mt-1">{video.description}</p>
      </div>
    </div>
  );
}
