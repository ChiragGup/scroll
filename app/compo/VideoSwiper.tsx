"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

import "swiper/css";
import "swiper/css/mousewheel";

export default function VideoSwiper({ videos }: { videos: IVideo[] }) {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
      keyboard={{ enabled: true }}
      modules={[Mousewheel, Keyboard]}
      className="h-screen w-screen"
      touchEventsTarget="container"
    >
      {videos.map((video, index) => (
       <SwiperSlide
  key={video._id?.toString() || index}
  className="h-screen w-screen flex justify-center items-center"
>
  <div className="bg-white rounded-lg border border-gray-300 p-2 w-[240px] h-[426px] flex justify-center items-center mx-auto">
    <VideoComponent video={video} />
  </div>
</SwiperSlide>

      ))}
    </Swiper>
  );
}
